"""Work experience views."""

# Django REST Framework
from api.programs.models import Rating
from api.users.models import User
from api.users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpSerializer,
    AccountVerificationSerializer,

)
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)

# Serializers
from api.programs.serializers import RatingModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class RatingViewSet(mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.ListModelMixin,
                    AddProgramMixin):
    """User view set.

    Handle sign up, login and account verification.
    """
    serializer_class = RatingModelSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        queryset = Rating.objects.filter(rated_program=self.program)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ['update', 'delete', 'partial_update', 'post']:
            permissions = [IsAuthenticated]

        return [p() for p in permissions]

    def create(self, request, *args, **kwargs):
        rating_user = request.user

        program = self.program
        serializer = RatingModelSerializer(
            data=request.data,
            context={'request': request, 'program': program},
        )
        serializer.is_valid(raise_exception=True)
        rating = serializer.save()

        data = RatingModelSerializer(rating).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def get_program_rating(self, request, *args, **kwargs):
        program = self.program
        import pdb
        pdb.set_trace()
        instance = get_object_or_404(
            Rating, rated_program=program, rating_user=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
