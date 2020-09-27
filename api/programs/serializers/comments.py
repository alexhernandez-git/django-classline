"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Comment


from datetime import timedelta


class CommentModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Comment
        fields = (
            'id',
            'user',
            'message',
            'created',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_user(self, obj):
        from api.users.serializers.users import UserSharedModelSerializer
        return UserSharedModelSerializer(obj.user, read_only=True).data

    def validate(self, attrs):
        if len(attrs['message']) == 0:
            raise serializers.ValidationError(
                'El mensaje no puede estar vacio')
        return super().validate(attrs)

    def create(self, validated_data):

        validated_data['post'] = self.context['post']
        validated_data['user'] = self.context['user']

        return super().create(validated_data)
