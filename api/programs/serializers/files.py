"""File serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import File


class FileModelSerializer(serializers.ModelSerializer):
    """File model serializer."""
    shared_users = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = File
        fields = (
            'id',
            'name',
            'code',
            'is_private',
            'file',
            'top_folder',
            'shared_users'
        )

        read_only_fields = (
            'id',
        )

    def get_shared_users(self, obj):
        from api.users.serializers import UserSharedModelSerializer
        return UserSharedModelSerializer(obj.shared_users, many=True).data

    def create(self, validated_data):
        program = self.context['program']
        validated_data['program'] = program
        return super().create(validated_data)
