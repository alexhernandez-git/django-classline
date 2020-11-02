"""Benefit serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseBenefit


class CourseBenefitModelSerializer(serializers.ModelSerializer):
    """CourseBenefit model serializer."""

    class Meta:
        """Meta class."""

        model = CourseBenefit
        fields = (
            'id',
            'name',
        )

        read_only_fields = (
            'id',
        )
