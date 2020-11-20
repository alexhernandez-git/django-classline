"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseUserData


from datetime import timedelta


class CourseUserDataModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""


    class Meta:
        """Meta class."""

        model = CourseUserData
        fields = (
            'id',
            'current_item_watching',
            'user',
            'course',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
            'course',
            'user'
        )


