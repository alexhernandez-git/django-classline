"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Student
from api.users.models import User


from datetime import timedelta


class StudentModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Student
        fields = (
            'id',
            'user',
            'created'
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_user(self, obj):
        from api.users.serializers import UserWithoutTeacherModelSerializer
        user = obj.user
        return UserWithoutTeacherModelSerializer(user, many=False).data


class StudentListModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Student
        fields = (
            'id',
            'user',
            'created'
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_user(self, obj):
        from api.users.serializers import UserSharedModelSerializer
        user = obj.user
        return UserSharedModelSerializer(user, many=False).data
