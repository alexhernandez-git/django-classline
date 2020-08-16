"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import (
    Teacher,
    User
)
from api.programs.models import Program, Rating, Student

# Serializes
from api.programs.serializers import ProgramModifyModelSerializer


class TeacherModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    programs = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    students = serializers.SerializerMethodField()
    academies = serializers.SerializerMethodField()

    class Meta:
        """Meta class."""

        model = Teacher
        fields = (
            'programs',
            'rating',
            'ratings',
            'students',
            'academies'

        )

    def get_programs(self, obj):
        programs = Program.objects.filter(teacher=obj)
        return ProgramModifyModelSerializer(programs, many=True).data

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(
            related_instructor=User.objects.get(teacher=obj)).count()
        return ratings

    def get_students(self, obj):
        students = Student.objects.filter(
            program__user=User.objects.get(teacher=obj)).count()
        return students

    def get_academies(self, obj):
        academies = Program.objects.filter(
            user=User.objects.get(teacher=obj)).count()
        return academies

        return super(TeacherModelSerializer, self).update(instance, validated_data)


class TeacherProgramsCountModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    programs = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    students = serializers.SerializerMethodField()
    academies = serializers.SerializerMethodField()

    class Meta:
        """Meta class."""

        model = Teacher
        fields = (
            'programs',
            'rating',
            'ratings',
            'students',
            'academies'
        )

    def get_programs(self, obj):
        programs = Program.objects.filter(teacher=obj).count()
        return programs

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(
            related_instructor=User.objects.get(teacher=obj)).count()
        return ratings

    def get_students(self, obj):
        students = Student.objects.filter(
            program__user=User.objects.get(teacher=obj)).count()
        return students

    def get_academies(self, obj):
        academies = Program.objects.filter(
            user=User.objects.get(teacher=obj)).count()
        return academies

        return super(TeacherModelSerializer, self).update(instance, validated_data)
