"""Folder serializer."""

# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Folder
from api.users.models import User


class TopFolderModelSerializer(serializers.ModelSerializer):
    """Folder model serializer."""
    class Meta:
        """Meta class."""

        model = Folder
        fields = (
            'id',
            'name',
            'code',
            'is_private',
        )

        read_only_fields = (
            'id',
        )


class FolderModelSerializer(serializers.ModelSerializer):
    """Folder model serializer."""
    shared_users = serializers.SerializerMethodField(read_only=True)
    top_folder = TopFolderModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = Folder
        fields = (
            'id',
            'name',
            'code',
            'color',
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
        if self.context['top_folder']:
            validated_data['top_folder'] = Folder.objects.get(
                pk=self.context['top_folder'])
        return super().create(validated_data)


class ShareUsersFoldersSerializer(serializers.Serializer):
    """Folder model serializer."""
    shared_users = serializers.ListField(child=serializers.DictField())

    def validate(self, data):
        shared_users = data['shared_users']
        program = self.context['program']

        def get_users(user):
            return get_object_or_404(User, pk=user.id)
        new_shared_users = list(map(get_users, shared_users))

        return {
            'shared_users': new_shared_users,
            'program': program
        }

    def update(self, instance, validated_data):
        # program = validated_data['program']
        shared_users = validated_data['shared_users']

        instance.shared_users.clear()
        for user in shared_users:
            instance.shared_users.add(user)

        instance.save()

        return instance
