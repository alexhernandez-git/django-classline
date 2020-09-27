"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Post, Comment


from datetime import timedelta


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
        if len(attrs['title']) == 0:
            raise serializers.ValidationError('El titulo no puede estar vacio')
        if len(attrs['message']) == 0:
            raise serializers.ValidationError(
                'El mensaje no puede estar vacio')
        return super().validate(attrs)

    def create(self, validated_data):

        validated_data['program'] = self.context['program']
        validated_data['user'] = self.context['user']

        return super().create(validated_data)
