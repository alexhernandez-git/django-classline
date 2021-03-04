"""Work experience serializer serializer."""

# Django
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Post, Comment

# Celery
from api.taskapp.tasks import send_notification_new_post

from datetime import timedelta
import re


class PostModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    comments = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Post
        fields = (
            'id',
            'code',
            'title',
            'message',
            'user',
            'comments',
            'created',
        )
        read_only_fields = (
            'id',
        )

    def get_comments(self, obj):
        posts = Comment.objects.filter(post=obj)
        return posts.count()

    def get_user(self, obj):
        from api.users.serializers.users import UserSharedModelSerializer
        return UserSharedModelSerializer(obj.user, read_only=True).data

    def validate(self, attrs):
        if len(attrs['message']) == 0:
            raise serializers.ValidationError(
                'El mensaje no puede estar vacio')
        return super().validate(attrs)

    def create(self, validated_data):
        program = self.context['program']
        user = self.context['user']
        validated_data['program'] = program
        validated_data['user'] = user

        result = super().create(validated_data)
        send_notification_new_post(user, program, result)
        return result
