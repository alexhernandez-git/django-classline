"""Profile serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Rating
from api.users.models import User
# Serializers
from api.users.serializers.profiles import ProfileModelSerializer


class UserWithoutTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',

        )

        read_only_fields = (
            'id',
            'username',
        )


class RatingModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    rating_user = UserWithoutTeacherModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = Rating
        fields = (
            'id',
            'rating',
            'comment',
            'rating_user',
            'created',
            'related_teacher'
        )
        read_only_fields = (
            'id',
        )

    def validate(self, attrs):
        if self.context['rating_user'] == self.context['request'].user:
            raise serializers.ValidationError('You can not rate yourself')

        return attrs

    def create(self, validated_data):
        return Rating.objects.create(
            **validated_data,
            rating_user=self.context['rating_user'],
            rated_user=self.context['request'].user,
            related_teacher=self.context['request'].user.teacher
        )
