"""Work experience views."""

# Django REST Framework
from api.users.models import Rating
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
from api.users.permissions import IsAccountOwner, IsTeacherOwner

# Serializers
from api.users.serializers import RatingModelSerializer


# Models


class RatingViewSet(mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """
    queryset = Rating.objects.all()
    serializer_class = RatingModelSerializer
    lookup_field = 'pk'

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['update', 'delete', 'partial_update', 'post']:
            permissions = [IsAuthenticated, IsTeacherOwner]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def create(self, request, *args, **kwargs):
        rating_user = get_object_or_404(
            User, pk=request.data.get('rating_user'))
        serializer = RatingModelSerializer(
            data=request.data,
            context={'rating_user': rating_user, 'request': request},
        )
        serializer.is_valid(raise_exception=True)
        rating = serializer.save()

        data = RatingModelSerializer(rating).data
        return Response(data, status=status.HTTP_201_CREATED)
