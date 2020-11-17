"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import ItemViewed


from datetime import timedelta


class ItemViewedModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""


    class Meta:
        """Meta class."""

        model = ItemViewed
        fields = (
            'id',
            'item',
            'user',
            'duration',
            'is_viewed',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
            'item',
            'user'
        )


    def create(self, validated_data):
        item = self.context['item']
        user = self.context['user']
        if ItemViewed.objects.filter(item=item, user=user).exists():
            raise serializers.ValidationError(
                'No puedes crear este elemento porque ya esta creado')
        validated_data['item'] = item
        validated_data['user'] = user
        validated_data['course'] = self.context['course']

        return super().create(validated_data)
