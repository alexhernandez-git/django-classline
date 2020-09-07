"""File serializer."""

# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import File, Folder
from api.users.models import User

# Serializers
from api.programs.serializers import TopFolderModelSerializer


class FileModelSerializer(serializers.ModelSerializer):
    """File model serializer."""
    shared_users = serializers.SerializerMethodField(read_only=True)
    filename = serializers.SerializerMethodField(read_only=True)
    top_folder = TopFolderModelSerializer(read_only=True)

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
            'filename',
            'shared_users',
        )

        read_only_fields = (
            'id',
        )

    def get_shared_users(self, obj):
        from api.users.serializers import UserSharedModelSerializer
        return UserSharedModelSerializer(obj.shared_users, many=True).data

    def get_filename(self, obj):
        return obj.filename()

    def create(self, validated_data):
        program = self.context['program']
        validated_data['program'] = program
        if self.context['top_folder']:
            validated_data['top_folder'] = Folder.objects.get(
                pk=self.context['top_folder'])
        return super().create(validated_data)


class ShareUsersFilesSerializer(serializers.Serializer):
    """Folder model serializer."""
    shared_users = serializers.ListField(child=serializers.DictField())

    def validate(self, data):
        shared_users = data['shared_users']
        program = self.context['program']

        def get_users(user):
            return get_object_or_404(User, pk=user['id'])
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


class MoveFilesSerializer(serializers.Serializer):
    """Folder model serializer."""
    top_folder = serializers.CharField()

    def validate(self, data):
        if 'top_folder' in data:
            top_folder = data['top_folder']
            top_folder = get_object_or_404(Folder, pk=top_folder)
        else:
            top_folder = None

        return {
            'top_folder': top_folder,
        }

    def update(self, instance, validated_data):
        # program = validated_data['program']
        top_folder = validated_data['top_folder']

        instance.top_folder = top_folder
        instance.save()

        return instance
