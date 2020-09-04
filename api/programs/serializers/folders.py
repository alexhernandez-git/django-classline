"""Folder serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Folder


class FolderModelSerializer(serializers.ModelSerializer):
    """Folder model serializer."""
    shared_users = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Folder
        fields = (
            'id',
            'name',
            'code',
            'is_private',
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
