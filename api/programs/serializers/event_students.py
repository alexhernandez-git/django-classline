"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import EventStudent
from api.users.models import User


from datetime import timedelta


class EventStudentModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = EventStudent
        fields = (
            'id',
            'user',
            'event',
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


class EventStudentListModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = EventStudent
        fields = (
            'id',
            'user',
            'event',

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


class AddEventStudentSerializer(serializers.Serializer):
    student = serializers.SerializerMethodField()

    def get_student(self, obj):
        from api.users.serializers.users import UserModelSerializer
        return UserModelSerializer(self.context['request'].user).data

    def validate(self, data):
        user = self.context['request'].user

        data = {
            'user': user
        }
        return data

    def update(self, instance, validated_data):

        instance.event_students.add(validated_data['user'])

        instance.current_students += 1
        instance.save()
        return instance
