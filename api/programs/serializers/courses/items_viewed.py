"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import ItemViewed,CourseUserData


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
            'is_completed',
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
        course = self.context['course']
        if ItemViewed.objects.filter(item=item, user=user).exists():
            raise serializers.ValidationError(
                'No puedes crear este elemento porque ya esta creado')
        validated_data['item'] = item
        validated_data['user'] = user
        validated_data['course'] = course

        # Course user data
        course_user_data = CourseUserData.objects.get_or_create(user=user, course=course)
        course_user_data.current_item_watching = item
        course_user_data.save()

        return super().create(validated_data)

    def update(self, instance, validated_data):
        item = self.context['item']
        user = self.context['user']
        course = self.context['course']
        # Course user data
        course_user_data = CourseUserData.objects.get_or_create(user=user, course=course)[0]
        course_user_data.current_item_watching = item
        course_user_data.save()

        return super(ItemViewedModelSerializer, self).update(instance, validated_data)

