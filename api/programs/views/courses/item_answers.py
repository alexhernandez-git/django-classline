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
from api.programs.models import Program, ItemAnswer
from api.users.models import User

# Serializers
from api.programs.serializers import ItemAnswerModelSerializer

# Utils
from api.utils.permissions import AddQuestionMixin


class ItemAnswerViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     AddQuestionMixin):
    """ItemAnswer view set."""

    serializer_class = ItemAnswerModelSerializer
    lookup_field = 'id'
    filter_backends = [filters.SearchFilter]
    search_fields = ['message']

    def get_queryset(self):
        question = self.question
        queryset = ItemAnswer.objects.filter(question=question)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        question = self.question

        serializer = ItemAnswerModelSerializer(
            data=request.data,
            context={
                'user': request.user,
                'question': question,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        answer = serializer.save()

        data = ItemAnswerModelSerializer(answer, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        answer = self.get_object()
        partial = request.method == 'PATCH'

        serializer = ItemAnswerModelSerializer(
            answer,
            data=request.data,
            context={
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        answer = serializer.save()

        data = ItemAnswerModelSerializer(answer).data
        return Response(data, status=status.HTTP_200_OK)
