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
from api.programs.serializers import EventStudentModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddEventMixin
from django.utils.dateparse import parse_date
from dateutil.parser import parse
from datetime import datetime, timedelta
import pytz


class EventStudentViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          AddEventMixin):
    """Circle view set."""

    serializer_class = EventStudentModelSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        """Restrict list to public-only."""

        start = self.request.GET['start']
        end = self.request.GET['end']
        event = self.event

        if end != "null":
            start = parse(start)
            end = parse(end)
            queryset = EventStudent.objects.filter(
                event__start=start, event__end=end, event__event_buyed=True, event__event_buyed_parent=event)
        else:
            start = parse(start)
            queryset = EventStudent.objects.filter(
                event__start=start, event__end__isnull=True, event__event_buyed=True, event__event_buyed_parent=event)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]
