"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import AllowedProgram


from datetime import timedelta


class AllowedProgramModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = AllowedProgram
        fields = (
            'id',
            'program',
            'is_admin',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    # def validate(self, attrs):
    #     if len(attrs['title']) == 0:
    #         raise serializers.ValidationError('El titulo no puede estar vacio')

    #     return super().validate(attrs)

    # def create(self, validated_data):

    #     validated_data['program'] = self.context['program']

    #     return super().create(validated_data)
