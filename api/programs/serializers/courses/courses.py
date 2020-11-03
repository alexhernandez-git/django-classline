"""Teacher serializer."""

# Django
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import (
    User,
    Subscription
)
from api.programs.models import (
    Course,
    CoursePrice,
    CourseLanguage,
    CourseBenefit,
    CourseBlockTrack
)

# Serializes
from .prices import CoursePriceModelSerializer
from .languages import CourseLanguageModelSerializer
from .benefits import CourseBenefitModelSerializer

# Utils
from datetime import timedelta


class CourseModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    course_price = serializers.SerializerMethodField(read_only=True)
    course_language = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Course
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'course_price',
            'course_language',
            'picture',
            'students_count',
            'students',
            'instructor',
            'published_in_program',

            'benefits',
            'video_presentation',
            'published',
        )

        read_only_fields = (
            'id',
        )


    def get_students_count(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_course_price(self, obj):
        # import pdb
        # pdb.set_trace()
        price = CoursePrice.objects.filter(course=obj)
        if price.count() > 0:
            return CoursePriceModelSerializer(price[0], many=False).data

    def get_course_language(self, obj):
        language = CourseLanguage.objects.filter(course=obj)
        if language.count() > 0:
            return CourseLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_benefits(self, obj):
        benefits = CourseBenefit.objects.filter(course=obj.id)
        return CourseBenefitModelSerializer(benefits, many=True).data


class CourseCreateSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    class Meta:
        """Meta class."""

        model = Course
        fields = (
            'id',
        )

        read_only_fields = (
            'id',
        )

    def create(self, validated_data):

        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['teacher'] = user.teacher

        program = self.context['program']
        validated_data['program'] = program

        return super().create(validated_data)


class CourseModifyModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    course_price = serializers.SerializerMethodField(read_only=True)
    course_language = serializers.SerializerMethodField(read_only=True)
    students = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Course
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'course_price',
            'course_language',
            'picture',
            'students',
            'instructor',
            'benefits',
            'published',
            'published_in_program',
            'video_presentation',

        )

        read_only_fields = (
            'id',
        )


    def get_students(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_course_price(self, obj):
        price = CoursePrice.objects.filter(course=obj)
        if price.count() > 0:
            return CoursePriceModelSerializer(price[0], many=False).data

    def get_course_language(self, obj):
        language = CourseLanguage.objects.filter(course=obj)
        if language.count() > 0:
            return CourseLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data


    def get_benefits(self, obj):
        benefits = CourseBenefit.objects.filter(course=obj.id)
        return CourseBenefitModelSerializer(benefits, many=True).data

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        if 'price' in self.context and self.context['price'] != None:
            CoursePrice.objects.filter(course=instance).delete()
            price = CoursePrice.objects.create(
                **self.context['price'], course=instance)

        if 'language' in self.context and self.context['language'] != None:
            CourseLanguage.objects.filter(course=instance).delete()
            language = CourseLanguage.objects.create(
                **self.context['language'], course=instance)
        if self.context['benefits'] != None:
            CourseBenefit.objects.filter(course=instance.pk).delete()
            for benefit in self.context['benefits']:
                CourseBenefit.objects.create(**benefit, course=instance)
       
        return super(CourseModifyModelSerializer, self).update(instance, validated_data)


class PublishCourseSerializer(serializers.Serializer):

    def validate(self, data):
        course = self.instance
        if not self.context['publish_in_program']:
            if not CoursePrice.objects.filter(course=course).exists():
                raise serializers.ValidationError(
                    'El curso no tiene un precio especificado')

        if not course.picture:
            raise serializers.ValidationError(
                'El curso no tiene una imágen')

        if not self.context['publish_in_program']:
            if not CoursePrice.objects.filter(course=course).exists():
                if not course.user.profile.stripe_account_id:
                    raise serializers.ValidationError(
                        'Necesitas conectarte con stripe para poder recibir pagos')

        if len(course.title) == 0:
            raise serializers.ValidationError('Se requiere un titulo')

        return data

    def update(self, instance, validated_data):
        if self.context['publish_in_program']:
            instance.published_in_program = True

        else:
            instance.published = True
        instance.save()
        return instance


class CancelPublishCourseSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        if self.context['publish_in_program']:
            instance.published_in_program = False

        else:
            instance.published = False
        instance.save()
        return instance


class AddStudentCourseSerializer(serializers.Serializer):
    student = serializers.SerializerMethodField()

    def get_student(self, obj):
        from api.users.serializers.users import UserModelSerializer
        return UserModelSerializer(self.context['request'].user).data

    def validate(self, data):
        user = self.context['request'].user

        data = {
            'user': user
        }
        return data

    def update(self, instance, validated_data):

        instance.students.add(validated_data['user'])

        instance.save()
        return instance

    

