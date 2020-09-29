"""Circle views."""

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
from api.programs.models import Program, Event
from api.users.models import User

# Serializers
from api.programs.serializers import EventModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


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

        queryset = Event.objects.filter(program=self.program)

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

        event = serializer.save()

        data = EventModelSerializer(event).data
        return Response(data, status=status.HTTP_200_OK)
