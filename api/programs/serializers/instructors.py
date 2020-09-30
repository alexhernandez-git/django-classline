"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Instructor


from datetime import timedelta


class InstructorModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    user = serializers.SerializerMethodField(read_only=True)
    admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Instructor
        fields = (
            'id',
            'user',
            'admin',
            'allowed_programs',
            'is_active',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_user(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_admin(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data
