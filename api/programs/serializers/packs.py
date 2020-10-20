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
    Pack,
    PackPrice,
    PackLanguage,
    VideoPack,
    PodcastPack,

)

# Serializes
from .videos import VideoModelSerializer
from .packs_prices import PackPriceModelSerializer
from .packs_languages import PackLanguageModelSerializer

# Utils
from datetime import timedelta


class PackModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    pack_price = serializers.SerializerMethodField(read_only=True)
    pack_language = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    videos = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Pack
        fields = (
            'id',
            'code',
            'title',
            'description',
            'pack_price',
            'pack_language',
            'picture',
            'videos',
            'podcasts',
            'students_count',
            'students',
            'instructor',
            'are_playlists',
            'are_videos',
            'are_podcasts',
            'are_resources',
            'published',
        )

        read_only_fields = (
            'id',
        )

    def get_videos(self, obj):
        videos = VideoPack.objects.filter(pack=obj.id).count()
        return videos

    def get_podcasts(self, obj):
        podcasts = PodcastPack.objects.filter(pack=obj.id).count()
        return podcasts

    def get_students_count(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_pack_price(self, obj):
        # import pdb
        # pdb.set_trace()
        price = PackPrice.objects.filter(pack=obj)
        if price.count() > 0:
            return PackPriceModelSerializer(price[0], many=False).data

    def get_pack_language(self, obj):
        language = PackLanguage.objects.filter(pack=obj)
        if language.count() > 0:
            return PackLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data


class PackCreateSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    class Meta:
        """Meta class."""

        model = Pack
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


class PackModifyModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    pack_price = serializers.SerializerMethodField(read_only=True)
    pack_language = serializers.SerializerMethodField(read_only=True)
    students = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    videos = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Pack
        fields = (
            'id',
            'code',
            'title',
            'description',
            'pack_price',
            'pack_language',
            'picture',
            'videos',
            'podcasts',

            'students',
            'instructor',
            'are_playlists',
            'are_videos',
            'are_podcasts',
            'are_resources',
            'published',
        )

        read_only_fields = (
            'id',
        )

    def get_videos(self, obj):
        videos = VideoPack.objects.filter(pack=obj.id).count()
        return videos

    def get_podcasts(self, obj):
        podcasts = PodcastPack.objects.filter(pack=obj.id).count()
        return podcasts

    def get_students(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_pack_price(self, obj):
        price = PackPrice.objects.filter(pack=obj)
        if price.count() > 0:
            return PackPriceModelSerializer(price[0], many=False).data

    def get_pack_language(self, obj):
        language = PackLanguage.objects.filter(pack=obj)
        if language.count() > 0:
            return PackLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        if 'price' in self.context and self.context['price'] != None:
            PackPrice.objects.filter(pack=instance).delete()
            price = PackPrice.objects.create(
                **self.context['price'], pack=instance)

        if 'language' in self.context and self.context['language'] != None:
            PackLanguage.objects.filter(pack=instance).delete()
            language = PackLanguage.objects.create(
                **self.context['language'], pack=instance)

        return super(PackModifyModelSerializer, self).update(instance, validated_data)


class PublishPackSerializer(serializers.Serializer):

    def validate(self, data):
        pack = self.instance
        if not PackPrice.objects.filter(pack=pack).exists():
            raise serializers.ValidationError(
                'El pack no tiene un precio especificado')

        if not pack.picture:
            raise serializers.ValidationError(
                'El pack no tiene una imágen')

        if not pack.user.profile.stripe_account_id:
            raise serializers.ValidationError(
                'Necesitas conectarte con stripe para poder recibir pagos')
        if len(pack.title) == 0:
            raise serializers.ValidationError('Se requiere un titulo')

        return data

    def update(self, instance, validated_data):

        instance.published = True
        instance.save()
        return instance


class CancelPublishPackSerializer(serializers.Serializer):

    def update(self, instance, validated_data):

        instance.published = False
        instance.save()
        return instance


class AddStudentPackSerializer(serializers.Serializer):
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


class AddVideoPackSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        video = self.context['video']
        if VideoPack.objects.filter(video=video, pack=instance).exists():
            raise serializers.ValidationError(
                'Tu pack ya contiene ese video')
        instance.videos.add(video)
        instance.save()
        return get_object_or_404(VideoPack, video=video, pack=instance)


class RemoveVideoPackSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        video = self.context['video']
        if not VideoPack.objects.filter(video=video, pack=instance).exists():
            raise serializers.ValidationError(
                'Tu pack ya no contiene ese video')
        instance.videos.remove(video)
        instance.save()
        return instance


class AddPodcastPackSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        podcast = self.context['podcast']
        if PodcastPack.objects.filter(podcast=podcast, pack=instance).exists():
            raise serializers.ValidationError(
                'Tu pack ya contiene ese podcast')
        instance.podcasts.add(podcast)
        instance.save()
        return get_object_or_404(PodcastPack, podcast=podcast, pack=instance)


class RemovePodcastPackSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        podcast = self.context['podcast']
        if not PodcastPack.objects.filter(podcast=podcast, pack=instance).exists():
            raise serializers.ValidationError(
                'Tu pack ya no contiene ese podcast')
        instance.podcasts.remove(podcast)
        instance.save()
        return instance
