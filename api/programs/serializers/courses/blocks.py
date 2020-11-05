"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File
from django.db.models import Max

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseBlock, Video, CourseBlockTrack,CourseItem,CourseItemTrack,CourseBlockTrack


from datetime import timedelta
import random
import string





class CourseBlockModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseBlock
        fields = (
            'id',
            'code',
            'name',
            'picture',
            'description',
            'items',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_items(self, obj):
        return CourseItemTrack.objects.filter(block=obj).count()