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
    CourseBlockTrack,
    CourseBlock,
    CourseItemTrack,
    LectureContent,
    CourseUserData,
    LectureMaterial
)

# Serializes
from .prices import CoursePriceModelSerializer
from .languages import CourseLanguageModelSerializer
from .benefits import CourseBenefitModelSerializer

# Utils
from datetime import timedelta

from django.db.models import Sum

class CourseModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    course_price = serializers.SerializerMethodField(read_only=True)
    course_language = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)
    blocks = serializers.SerializerMethodField(read_only=True)
    items = serializers.SerializerMethodField(read_only=True)
    total_duration = serializers.SerializerMethodField(read_only=True)

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
            'blocks',
            'items',
            'total_duration',
            'color'
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


    def get_benefits(self, obj):
        benefits = CourseBenefit.objects.filter(course=obj.id)
        return CourseBenefitModelSerializer(benefits, many=True).data

    def get_blocks(self, obj):
        return obj.blocks.count()

    def get_items(self, obj):
        items = CourseItemTrack.objects.filter(course=obj.id).count()
        return items

    def get_total_duration(self, obj):
        return LectureContent.objects.filter(course=obj.id, type_choices="VI").aggregate(Sum('duration'))['duration__sum']

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

            'color',

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
            CoursePrice.objects.create(
                **self.context['price'], course=instance)

        if 'language' in self.context and self.context['language'] != None:
            CourseLanguage.objects.filter(course=instance).delete()
            CourseLanguage.objects.create(
                **self.context['language'], course=instance)
        if 'benefits' in self.context and  self.context['benefits'] != None:
            CourseBenefit.objects.filter(course=instance.pk).delete()
            for benefit in self.context['benefits']:
                CourseBenefit.objects.create(**benefit, course=instance)
       
        # Actualizar el tracks
        if 'tracks' in self.context and self.context['tracks'] != None:
            tracks = self.context['tracks']
            for track in tracks:
                track_object = get_object_or_404(CourseBlockTrack, id=track['id'])
                track_object.position = track['position']
                track_object.save()
       
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
        # import pdb; pdb.set_trace()
        if not self.context['publish_in_program']:
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

    


class CoursePlayingModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    course_language = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    blocks = serializers.SerializerMethodField(read_only=True)
    blocks_count = serializers.SerializerMethodField(read_only=True)
    items_count = serializers.SerializerMethodField(read_only=True)
    total_duration = serializers.SerializerMethodField(read_only=True)
    current_item_watching = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Course
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'course_language',
            'picture',
            'students_count',
            'students',
            'instructor',
            'published_in_program',
            'video_presentation',
            'published',
            'blocks',
            'blocks_count',
            'items_count',
            'total_duration',
            'color',
            'current_item_watching'
        )

        read_only_fields = (
            'id',
        )


    def get_students_count(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students


    def get_course_language(self, obj):
        language = CourseLanguage.objects.filter(course=obj)
        if language.count() > 0:
            return CourseLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_blocks(self, obj):
        from api.programs.serializers import CourseBlockTrackPlayingModelSerializer

        blocks = CourseBlockTrack.objects.filter(course=obj.id)
        request = self.context.get('request', None)
        if request: 
            return CourseBlockTrackPlayingModelSerializer(blocks,user=request.user, many=True).data
        else:
            return CourseBlockTrackPlayingModelSerializer(blocks,user=None, many=True).data

    def get_items_count(self, obj):
        items = CourseItemTrack.objects.filter(course=obj.id).count()
        return items

    def get_blocks_count(self, obj):
        return obj.blocks.count()

    def get_total_duration(self, obj):
        return LectureContent.objects.filter(course=obj.id, type_choices="VI").aggregate(Sum('duration'))['duration__sum']

    def get_current_item_watching(self, obj):
        from api.programs.serializers import CourseUserDataModelSerializer
        course_user_data = CourseUserData.objects.filter(course=obj.id, user=self.context['request'].user)
        if len(course_user_data) > 0:
            return CourseUserDataModelSerializer(course_user_data[0], many=False).data['current_item_watching']
        else: 
            return None

class CourseContentModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    course_language = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    blocks = serializers.SerializerMethodField(read_only=True)
    blocks_count = serializers.SerializerMethodField(read_only=True)
    items_count = serializers.SerializerMethodField(read_only=True)
    materials_count = serializers.SerializerMethodField(read_only=True)
    total_duration = serializers.SerializerMethodField(read_only=True)
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
            'course_language',
            'picture',
            'students_count',
            'students',
            'instructor',
            'published_in_program',
            'video_presentation',
            'published',
            'blocks',
            'blocks_count',
            'items_count',
            'total_duration',
            'color',
            'materials_count',
            'benefits',
            'modified'
        )

        read_only_fields = (
            'id',
        )


    def get_students_count(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students


    def get_course_language(self, obj):
        language = CourseLanguage.objects.filter(course=obj)
        if language.count() > 0:
            return CourseLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_blocks(self, obj):
        from api.programs.serializers import CourseBlockTrackContentModelSerializer

        blocks = CourseBlockTrack.objects.filter(course=obj.id)
        return CourseBlockTrackContentModelSerializer(blocks, many=True).data

    def get_items_count(self, obj):
        items = CourseItemTrack.objects.filter(course=obj.id).count()
        return items

    def get_blocks_count(self, obj):
        return obj.blocks.count()

    def get_materials_count(self, obj):
        items = LectureMaterial.objects.filter(course=obj.id).count()
        return items


    def get_total_duration(self, obj):
        return LectureContent.objects.filter(course=obj.id, type_choices="VI").aggregate(Sum('duration'))['duration__sum']

    def get_benefits(self, obj):
        benefits = CourseBenefit.objects.filter(course=obj.id)
        return CourseBenefitModelSerializer(benefits, many=True).data