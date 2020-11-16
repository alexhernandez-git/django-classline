"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import ItemAnswer


from datetime import timedelta


class ItemAnswerModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = ItemAnswer
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


    def create(self, validated_data):

        validated_data['question'] = self.context['question']
        validated_data['user'] = self.context['user']

        return super().create(validated_data)
