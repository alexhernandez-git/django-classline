"""Profile serializer."""
# Django
from django.db.models import Avg

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Rating
from api.users.models import User
# Serializers


class RatingModelSerializer(serializers.ModelSerializer):
    rating_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Rating
        fields = (
            'id',
            'rating',
            'comment',
            'rating_user',
            'related_instructor',
            'created',
            'rated_program'
        )
        read_only_fields = (
            'id',
            'created',
        )

    def get_rating_user(self, obj):
        from api.users.serializers import UserWithoutTeacherModelSerializer
        return UserWithoutTeacherModelSerializer(obj.rating_user, many=False).data

    def validate(self, attrs):
        q = Rating.objects.filter(
            rating_user=self.context['request'].user,
            rated_program=self.context['program'],
        )
        if q.exists():
            q.delete()

        return attrs

    def create(self, validated_data):

        rating = Rating.objects.create(
            **validated_data,
            rating_user=self.context['request'].user,
            rated_program=self.context['program'],
            related_instructor=self.context['program'].user,
        )

        related_instructor = self.context['program'].user
        program_avg = round(
            Rating.objects.filter(
                # rating_user=self.context['request'].user,
                rated_program=self.context['program']
            ).aggregate(Avg('rating'))['rating__avg'],
            1
        )
        self.context['program'].rating = program_avg
        self.context['program'].save()

        instructor_avg = round(
            Rating.objects.filter(
                related_instructor=related_instructor
            ).aggregate(Avg('rating'))['rating__avg'],
            1
        )
        related_instructor.teacher.rating = instructor_avg
        related_instructor.teacher.save()

        return rating
