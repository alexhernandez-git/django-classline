"""Teacher serializer."""

# Django
from django.core.exceptions import ObjectDoesNotExist

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import (
    User,
    Subscription
)
from api.programs.models import (
    Program,
    Benefit,
    ProgramPrice,
    Event,
    ProgramLanguage,
    Playlist,
    Video,
    Podcast,
    Rating,
    File,
    PlaylistAdmin,
    EventStudent
)


# Serializes
from .prices import ProgramPriceModelSerializer
from .languages import ProgramLanguageModelSerializer
from .benefits import BenefitModelSerializer
from .events import EventModelSerializer

# Utils
from datetime import timedelta


class ProgramMainInfoModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
        )

        read_only_fields = (
            'id',
        )


class ProgramCreateModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
        )

        read_only_fields = (
            'id',
        )

    def create(self, validated_data):
        language = self.context['language']
        if language != None:
            language = ProgramLanguage.objects.create(**language)
            validated_data['language'] = language
        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['teacher'] = user.teacher

        return super().create(validated_data)


class ProgramModifyModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    program_price = serializers.SerializerMethodField(read_only=True)
    program_language = serializers.SerializerMethodField(read_only=True)
    students = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)
    is_subscribed = serializers.SerializerMethodField(read_only=True)
    events = serializers.SerializerMethodField(read_only=True)
    playlists = serializers.SerializerMethodField(read_only=True)
    videos = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)
    docs = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'benefits',
            'actived',
            'program_price',
            'program_language',
            'picture',
            'video_presentation',
            'events',
            'playlists',
            'videos',
            'podcasts',
            'docs',
            'students',
            'instructor',
            'are_meetups',
            'are_videos',
            'are_admin_playlists',
            'are_podcasts',
            'are_docs',
            'are_forum',
            'accounts_to_create_left',
            'level_pro',
            'level_adquired',
            'current_accounts',
            'published',
            'rating',
            'ratings',
            'is_subscribed',
            'event_booking',
            'event_booking_calendar'
        )

        read_only_fields = (
            'id',
        )

    def get_benefits(self, obj):
        benefits = Benefit.objects.filter(program=obj.id)
        return BenefitModelSerializer(benefits, many=True).data

    def get_events(self, obj):
        events = Event.objects.filter(program=obj.id)
        return len(events)

    def get_videos(self, obj):
        videos = Video.objects.filter(program=obj.id).count()
        return videos

    def get_playlists(self, obj):
        playlists = PlaylistAdmin.objects.filter(program=obj.id).count()
        return playlists

    def get_podcasts(self, obj):
        podcasts = Podcast.objects.filter(program=obj.id).count()
        return podcasts

    def get_docs(self, obj):
        files = File.objects.filter(program=obj.id, is_private=False).count()
        return files

    def get_students(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_program_price(self, obj):
        price = ProgramPrice.objects.filter(program=obj)
        if price.count() > 0:
            return ProgramPriceModelSerializer(price[0], many=False).data

    def get_program_language(self, obj):
        language = ProgramLanguage.objects.filter(program=obj)
        if language.count() > 0:
            return ProgramLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(rated_program=obj).count()
        return ratings

    def get_is_subscribed(self, obj):
        from api.users.serializers.subscriptions import AccountsSubscriptionModelSerializer
        return obj.user.teacher.subscriptions.filter(
            program=obj, active=True).exists()

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        price = self.context['price']
        if price != None:
            ProgramPrice.objects.filter(program=instance).delete()
            price = ProgramPrice.objects.create(**price, program=instance)

        language = self.context['language']
        if language != None:
            ProgramLanguage.objects.filter(program=instance).delete()
            language = ProgramLanguage.objects.create(
                **language, program=instance)

        if self.context['benefits'] != None:
            Benefit.objects.filter(program=instance.pk).delete()
            for benefit in self.context['benefits']:
                Benefit.objects.create(**benefit, program=instance)

        return super(ProgramModifyModelSerializer, self).update(instance, validated_data)


class ProgramBasicModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    program_price = serializers.SerializerMethodField(read_only=True)
    program_language = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)
    is_subscribed = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'program_price',
            'program_language',
            'actived',
            'instructor',
            'picture',
            'subtitle',
            'are_meetups',
            'are_videos',
            'are_admin_playlists',
            'are_podcasts',
            'are_admin_playlists',

            'are_docs',
            'are_forum',
            'accounts_to_create_left',
            'level_pro',
            'level_adquired',
            'current_accounts',
            'published',
            'rating',
            'ratings',
            'is_subscribed',
            'event_booking',
            'event_booking_calendar'

        )

        read_only_fields = (
            'id',
        )

    def get_program_price(self, obj):
        price = ProgramPrice.objects.filter(program=obj)
        if price.count() > 0:
            return ProgramPriceModelSerializer(price[0], many=False).data

    def get_program_language(self, obj):
        language = ProgramLanguage.objects.filter(program=obj)
        if language.count() > 0:
            return ProgramLanguageModelSerializer(language[0], many=False).data

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(rated_program=obj).count()
        return ratings

    def get_is_subscribed(self, obj):
        from api.users.serializers.subscriptions import AccountsSubscriptionModelSerializer

        return obj.user.teacher.subscriptions.filter(
            program=obj, active=True).exists()


class ProgramModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    program_price = serializers.SerializerMethodField(read_only=True)
    program_language = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    students = serializers.SerializerMethodField(read_only=True)
    students_count = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)
    events = serializers.SerializerMethodField(read_only=True)
    videos = serializers.SerializerMethodField(read_only=True)
    playlists = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)
    docs = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)
    is_subscribed = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'benefits',
            'actived',
            'instructor',
            'program_price',
            'program_language',
            'actived',
            'picture',
            'video_presentation',
            'students_count',
            'students',
            'events',
            'videos',
            'playlists',
            'podcasts',
            'docs',
            'are_meetups',
            'are_videos',
            'are_admin_playlists',
            'are_podcasts',
            'are_docs',
            'are_forum',
            'accounts_to_create_left',
            'level_pro',
            'level_adquired',
            'current_accounts',
            'published',
            'rating',
            'ratings',
            'is_subscribed',
            'event_booking',
            'event_booking_calendar'

        )
        read_only_fields = (
            'id',
        )

    def get_benefits(self, obj):
        benefits = Benefit.objects.filter(
            program=obj.id).order_by('modified', 'created')
        return BenefitModelSerializer(benefits, many=True).data

    def get_events(self, obj):
        events = Event.objects.filter(program=obj.id)
        return len(events)

    def get_videos(self, obj):
        videos = Video.objects.filter(program=obj.id).count()
        return videos

    def get_playlists(self, obj):
        playlists = PlaylistAdmin.objects.filter(program=obj.id).count()
        return playlists

    def get_podcasts(self, obj):
        podcasts = Podcast.objects.filter(program=obj.id).count()
        return podcasts

    def get_docs(self, obj):
        files = File.objects.filter(program=obj.id, is_private=False).count()
        return files

    def get_students_count(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_students(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user, read_only=True).data

    def get_program_price(self, obj):
        price = ProgramPrice.objects.filter(program=obj)
        if price.count() > 0:
            return ProgramPriceModelSerializer(price[0], many=False).data

    def get_program_language(self, obj):
        language = ProgramLanguage.objects.filter(program=obj)
        if language.count() > 0:
            return ProgramLanguageModelSerializer(language[0], many=False).data

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(rated_program=obj).count()
        return ratings

    def get_is_subscribed(self, obj):
        from api.users.serializers.subscriptions import AccountsSubscriptionModelSerializer
        return obj.user.teacher.subscriptions.filter(
            program=obj, active=True).exists()


class ProgramListModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    program_price = serializers.SerializerMethodField(read_only=True)
    program_language = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    students = serializers.SerializerMethodField(read_only=True)
    benefits = serializers.SerializerMethodField(read_only=True)
    events = serializers.SerializerMethodField(read_only=True)
    videos = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)
    docs = serializers.SerializerMethodField(read_only=True)
    ratings = serializers.SerializerMethodField(read_only=True)
    is_subscribed = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Program
        fields = (
            'id',
            'code',
            'title',
            'subtitle',
            'description',
            'benefits',
            'actived',
            'instructor',
            'program_price',
            'program_language',
            'actived',
            'picture',
            'video_presentation',
            'events',
            'students',
            'videos',
            'podcasts',
            'docs',
            'are_meetups',
            'are_videos',
            'are_admin_playlists',

            'are_admin_playlists',
            'are_podcasts',
            'are_docs',
            'are_forum',
            'accounts_to_create_left',
            'current_accounts',
            'level_pro',
            'level_adquired',
            'published',
            'rating',
            'ratings',
            'is_subscribed',
            'event_booking',
            'event_booking_calendar'

        )
        read_only_fields = (
            'id',
        )

    def get_benefits(self, obj):
        benefits = Benefit.objects.filter(program=obj.id)
        return BenefitModelSerializer(benefits, many=True).data

    def get_events(self, obj):
        events = Event.objects.filter(program=obj.id)
        return len(events)

    def get_students(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        students = obj.students.all().count()
        return students

    def get_instructor(self, obj):
        from api.users.serializers.users import UserTeacherCountModelSerializer
        return UserTeacherCountModelSerializer(obj.user).data

    def get_videos(self, obj):
        videos = Video.objects.filter(program=obj.id).count()
        return videos

    def get_podcasts(self, obj):
        podcasts = Podcast.objects.filter(program=obj.id).count()
        return podcasts

    def get_docs(self, obj):
        files = File.objects.filter(program=obj.id, is_private=False).count()
        return files

    def get_program_price(self, obj):
        price = ProgramPrice.objects.filter(program=obj)
        if price.count() > 0:
            return ProgramPriceModelSerializer(price[0], many=False).data

    def get_program_language(self, obj):
        language = ProgramLanguage.objects.filter(program=obj)
        if language.count() > 0:
            return ProgramLanguageModelSerializer(language[0], many=False).data

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(rated_program=obj).count()
        return ratings

    def get_is_subscribed(self, obj):
        from api.users.serializers.subscriptions import AccountsSubscriptionModelSerializer
        return obj.user.teacher.subscriptions.filter(
            program=obj, active=True).exists()


class ActiveProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance

        if len(program.title) == 0:
            raise serializers.ValidationError('Se requiere un titulo')

        if not program.picture:
            raise serializers.ValidationError(
                'La academia no tiene una imágen')

        if program.actived is True:
            raise serializers.ValidationError(
                'La academia ya ha sido activado')

        return data

    def update(self, instance, validated_data):

        instance.actived = True
        instance.save()
        return instance


class PublishProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance

        try:
            program.programprice
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                'La academia no tiene un precio especificado')

        if not program.picture:
            raise serializers.ValidationError(
                'La academia no tiene una imágen')

        if not program.user.profile.stripe_account_id:
            raise serializers.ValidationError(
                'Necesitas conectarte con stripe para poder recibir pagos')
        if len(program.title) == 0:
            raise serializers.ValidationError('Se requiere un titulo')

        return data

    def update(self, instance, validated_data):

        instance.actived = True
        instance.published = True
        instance.save()
        return instance


class CancelActiveProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance
        students = program.students.all().count()
        if students > 0:
            raise serializers.ValidationError(
                'No puedes desactivar una academia con alumnos')

        if program.published:
            raise serializers.ValidationError(
                'No puedes desactivar una academia publicado')

        return data

    def update(self, instance, validated_data):

        instance.actived = False
        instance.save()
        return instance


class CancelPublishProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance

        return data

    def update(self, instance, validated_data):

        instance.published = False
        instance.save()
        return instance


class AddStudentProgramSerializer(serializers.Serializer):
    student = serializers.SerializerMethodField()

    def get_student(self, obj):
        from api.users.serializers.users import UserModelSerializer
        return UserModelSerializer(self.context['request'].user).data

    def validate(self, data):
        program = self.instance
        user = self.context['request'].user

        data = {
            'user': user
        }
        return data

    def update(self, instance, validated_data):

        instance.students.add(validated_data['user'])

        instance.save()
        return instance


class AddAccountsSerializer(serializers.Serializer):
    def validate(self, data):

        program = self.instance
        accounts_acquired = self.context['accounts_acquired']

        data = {
            'accounts_acquired': accounts_acquired,
        }

        return data

    def update(self, instance, validated_data):

        accounts_acquired = validated_data['accounts_acquired']

        instance.current_accounts = accounts_acquired['accounts']
        instance.accounts_to_create_left = int(
            accounts_acquired['accounts']) - instance.created_accounts.count()
        instance.level_adquired = accounts_acquired['level']
        instance.currency = accounts_acquired['currency']
        instance.accounts_price = accounts_acquired['price']

        instance.level_pro = accounts_acquired['level_pro']
        print(accounts_acquired['level_pro'])

        instance.save()
        return instance


class CancelAccountsSerializer(serializers.Serializer):
    def validate(self, data):

        return data

    def update(self, instance, validated_data):
        program = self.context['program']

        instance.accounts_acquired = None
        instance.accounts_to_create_left = 0
        instance.level_pro = False
        instance.level_adquired = None
        instance.accounts_subscription_id = None
        instance.pro_price = 0
        instance.current_accounts = 0
        instance.currency = None

        instance.save()

        return instance


class ActiveEventBookingProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance

        if not program.user.profile.stripe_account_id:
            raise serializers.ValidationError(
                'Necesitas conectarte con stripe para poder recibir pagos')

        return data

    def update(self, instance, validated_data):

        instance.event_booking = True
        instance.save()
        return instance


class CancelEventBookingProgramSerializer(serializers.Serializer):

    def validate(self, data):
        program = self.instance

        events = EventStudent.objects.filter(program=program)
        if events.exists():
            raise serializers.ValidationError(
                'No puedes desactivar la reserva de eventos despues de usuario hayan reservado algun evento')

        if program.published:
            raise serializers.ValidationError(
                'No puedes desactivar una academia publicado')

        return data

    def update(self, instance, validated_data):

        instance.event_booking = False
        instance.save()
        return instance
