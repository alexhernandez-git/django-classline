"""Circle views."""

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
from api.programs.models import Program, Course
from api.users.models import User

# Serializers
from api.programs.serializers import CourseModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class CourseViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    AddProgramMixin):
    """Circle view set."""

    serializer_class = CourseModelSerializer
    lookup_field = 'pk'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    page_size = 12

    def get_queryset(self):
        program = self.program
        queryset = Course.objects.filter(program=program)
        if self.action == 'get_popular_courses':
            queryset = Course.objects.filter(program=program)[:12]
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def get_popular_courses(self, request, *args, **kwargs):
        course = self.get_queryset()
        course = self.serializer_class(course, many=True).data
        return Response(course, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        serializer = CourseModelSerializer(
            data=request.data,
            context={
                'tracks': request.data['tracks'],
                'program': program,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = CourseModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = CourseModelSerializer(
            course,
            data=request.data,
            context={
                'tracks': request.data['tracks'],
                'program': program,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModelSerializer(course).data
        return Response(data, status=status.HTTP_200_OK)
