"""Circle views."""

from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import mixins, viewsets, status, filters
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
from api.programs.models import Program, ItemQuestion
from api.users.models import User

# Serializers
from api.programs.serializers import ItemQuestionModelSerializer

# Utils
from api.utils.permissions import AddItemMixin


class ItemQuestionViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  AddItemMixin):
    """ItemQuestion view set."""

    serializer_class = ItemQuestionModelSerializer
    lookup_field = 'code'
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'details']

    def get_queryset(self):
        item = self.item

        queryset = ItemQuestion.objects.filter(item=item)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        course = self.course
        item = self.item
        serializer = ItemQuestionModelSerializer(
            data=request.data,
            context={
                'course': course,
                'item': item,
                'user': request.user,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        question = serializer.save()

        data = ItemQuestionModelSerializer(question, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        question = self.get_object()
        partial = request.method == 'PATCH'

        serializer = ItemQuestionModelSerializer(
            question,
            data=request.data,
            context={
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        question = serializer.save()

        data = ItemQuestionModelSerializer(question).data
        return Response(data, status=status.HTTP_200_OK)
