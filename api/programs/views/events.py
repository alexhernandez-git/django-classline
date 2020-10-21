"""Circle views."""
import os
import stripe
# Django REST Framework
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


# Models
from api.programs.models import Program, Event, EventStudent
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import EventModelSerializer, AddEventStudentSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin

from datetime import datetime, timedelta
import pytz


class EventViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   AddProgramMixin):
    """Circle view set."""

    serializer_class = EventModelSerializer
    lookup_field = 'pk'
    pagination_class = None

    def get_queryset(self):
        """Restrict list to public-only."""

        queryset = Event.objects.filter(
            program=self.program, event_buyed=False)
        if self.action == 'list_events_booked':
            queryset = Event.objects.filter(
                event_students=self.request.user)
        if self.action == 'cancel_event_purchase':
            queryset = Event.objects.filter(
                program=self.program, event_buyed=True)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        serializer = EventModelSerializer(
            data=request.data,
            context={
                'program': program,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        data = EventModelSerializer(event, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = EventModelSerializer(
            event,
            data=request.data,
            context={
                'program': program,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        data = serializer.save()

        data = {'event': EventModelSerializer(
            data['event']).data, 'are_events_booked': data['are_events_booked']}
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def list_events_booked(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def purchase_event(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        event = self.get_object()
        program = self.program
        user = request.user
        profile = user.profile
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        customer_id = ''
        # if Event.objects.filter(
        #     program__user=user
        # ) == event:
        #     return Response({'message': 'Ya has comprado este evento'}, status=status.HTTP_400_BAD_REQUEST)
        if EventStudent.objects.filter(event__start=request.data['event']['start'], user=request.user).exists():
            return Response({'message': 'Ya has adquirido esta clase'}, status=status.HTTP_400_BAD_REQUEST)
        event_parent = Event.objects.get(id=request.data['event']['id'])
        del request.data['event']['id']
        event_info = Event.objects.create(
            **request.data['event'],
            event_buyed_parent=event_parent,
            program=program,
            event_buyed=True)

        serialized_event = EventModelSerializer(
            event, many=False).data

        if not serialized_event['bookable']:
            return Response({'message': 'Este evento no esta en venta'}, status=status.HTTP_400_BAD_REQUEST)
        if serialized_event['price'] == 0:
            return Response({'message': 'Este evento no tiene un precio válido'}, status=status.HTTP_400_BAD_REQUEST)

        product = stripe.Product.create(
            name=serialized_event.get('title'))
        if not 'currency' in serialized_event or serialized_event['currency'] == None:
            serialized_event['currency'] = 'EUR'

        price = stripe.Price.create(
            currency=serialized_event.get('currency'),
            product=product.get('id'),
            nickname=serialized_event.get('description'),
            unit_amount=int(float(serialized_event['price'])*100),
        )

        if profile.stripe_customer_id == None or profile.stripe_customer_id == '':
            newCustomer = stripe.Customer.create(
                description="claCustomer_"+user.first_name+'_'+user.last_name,
                name=user.first_name+' '+user.last_name,
                email=user.email,
                payment_method=request.data.get('payment_method'),
                invoice_settings={
                    "default_payment_method": request.data.get('payment_method')
                }

            )
            customer_id = newCustomer.id
            profile.stripe_customer_id = customer_id
            serializer = ProfileModelSerializer(
                profile,
                data=request.data,
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:

            customer_id = profile.stripe_customer_id

            stripe.PaymentMethod.attach(
                request.data.get('payment_method'),
                customer=customer_id,
            )
            stripe.Customer.modify(
                customer_id,
                invoice_settings={
                    "default_payment_method": request.data.get('payment_method')
                },
            )

        invoice_item = stripe.InvoiceItem.create(
            customer=customer_id,
            price=price.id,
        )

        invoice = stripe.Invoice.create(
            customer=customer_id,
            transfer_data={
                "destination": event_info.program.user.profile.stripe_account_id,
            },
            application_fee_amount=int(
                (float(serialized_event['price'])*100) * 25/100),
        )

        stripe.Invoice.pay(invoice['id'])
        new_purchased_item = PurchasedItem.objects.create(
            invoice_item_id=invoice_item['id'],
            invoice_id=invoice['id'],
            user=user,
            program=program,
            event=event_info,
            payment_issue=False,
            is_a_purchased_event=True
        )
        profile.purchased_items.add(
            new_purchased_item
        )
        profile.save()

        serializer = AddEventStudentSerializer(
            event,
            data=request.data,
            context={'user': user, 'request': request,
                     'event_buyed': event_info, 'program': program},
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        data = EventModelSerializer(event_info, many=False).data

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'])
    def cancel_event_purchase(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        event = self.get_object()
        # import pdb
        # pdb.set_trace()
        start = event.start - timedelta(hours=1)
        utc = pytz.UTC

        now = utc.localize(datetime.now())

        if start < now:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        profile = user.profile
        program = self.program
        # user = User.objects.get(pk=self.kwargs['pk'])
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'
        cancel_purchased_item = profile.purchased_items.filter(
            user=request.user, event=event, active=True, is_a_purchased_event=True)[0]

        if cancel_purchased_item:
            # Reembolso
            invoice = stripe.Invoice.retrieve(
                cancel_purchased_item.invoice_id)
            if invoice['amount_paid'] >= 1:

                charge = stripe.Charge.retrieve(
                    invoice['charge'],
                )
                transfer = stripe.Transfer.retrieve(
                    charge['transfer']
                )
                try:
                    stripe.Transfer.create_reversal(
                        transfer['id'],
                        amount=int(transfer['amount'] -
                                   transfer['amount'] * 10 / 100),
                    )
                except:
                    pass
                stripe.CreditNote.create(
                    invoice=invoice.id,
                    lines=[
                        {
                            "type": "invoice_line_item",
                            "invoice_line_item": invoice['lines']['data'][0]['id'],
                            "quantity": invoice['lines']['data'][0]['quantity']
                        }
                    ],
                    refund_amount=str(invoice['amount_paid'])
                )

            student = cancel_purchased_item.user
            event_parent = cancel_purchased_item.event.event_buyed_parent
            event_parent.current_students -= 1
            event_parent.save()
            EventStudent.objects.get(
                user=student, event=event, program=program).delete()
            cancel_purchased_item.active = False
            cancel_purchased_item.refunded = True

            cancel_purchased_item.save()

            event.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)
