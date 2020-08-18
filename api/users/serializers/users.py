"""Users serializers."""

# Django
from django.conf import settings
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator, validate_email
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from django.utils import timezone

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from api.users.models import Profile, User, Teacher

from api.programs.models import Program, AccountCreated, Student


# Serializers
from api.users.serializers.profiles import ProfileModelSerializer
from api.users.serializers.teachers import TeacherModelSerializer, TeacherProgramsCountModelSerializer
from api.programs.serializers import ProgramBasicModelSerializer


import re

# Utilities
import jwt
import time
from datetime import timedelta


def gen_verification_token(user):
    """Create JWT token than the user can use to verify its account."""
    exp_date = timezone.now() + timedelta(days=3)
    payload = {
        'user': user.username,
        'exp': int(exp_date.timestamp()),
        'type': 'email_confirmation'
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token.decode()


def send_confirmation_email(user_pk):
    """Send account verification link to given user."""

    user = User.objects.get(pk=user_pk)
    verification_token = gen_verification_token(user)
    subject = 'Welcome @{}! Verify your account to start using Classline Academy'.format(
        user.username)
    from_email = 'Classline Academy <noreply@classlineacademy.com>'
    content = render_to_string(
        'emails/users/account_verification.html',
        {'token': verification_token, 'user': user}
    )
    msg = EmailMultiAlternatives(subject, content, from_email, [user.email])
    msg.attach_alternative(content, "text/html")
    msg.send()


class UserModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherModelSerializer(read_only=True)
    programs = serializers.SerializerMethodField()

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'teacher',
            'programs',
            'first_password',
            'created_account',
            'first_password'

        )

        read_only_fields = (
            'id',
            'username',
        )

    def get_programs(self, obj):
        programs = Program.objects.filter(students__id=obj.pk)
        return ProgramBasicModelSerializer(programs, many=True).data


class UserTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'teacher',
            'created_account',
            'first_password'

        )

        read_only_fields = (
            'id',
            'username',
        )


class UserWithoutTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'created_account',
            'first_password'


        )

        read_only_fields = (
            'id',
            'username',
        )


class UserTeacherCountModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherProgramsCountModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'created_account',
            'first_password',
            'teacher'


        )

        read_only_fields = (
            'id',
            'username',
        )


class UserListTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'teacher',
            'created_account',
            'first_password'


        )

        read_only_fields = (
            'id',
            'username',
        )


class UserProgramTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'teacher',
            'created_account',
            'first_password'


        )

        read_only_fields = (
            'id',
            'username',
        )


class UserCustomTeacherModelSerializer(serializers.ModelSerializer):
    """User model serializer."""

    profile = ProfileModelSerializer(read_only=True)
    teacher = TeacherModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = User
        fields = (
            'id',
            'code',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'is_staff',
            'profile',
            'teacher',
            'created_account',
            'first_password'
        )

        read_only_fields = (
            'id',
            'username',
        )


class UserSignUpSerializer(serializers.Serializer):
    """Useer sign up serializer.

    Handle sign up data validation and user/profile creation.
    """
    email = serializers.CharField(
        validators=[
            UniqueValidator(queryset=User.objects.filter(
                created_account=False))
        ],
        required=False
    )
    username = serializers.CharField(
        min_length=4,
        max_length=40,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    # Phone number
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +999999999. Up to 15 digits allowed."
    )
    phone_number = serializers.CharField(
        validators=[phone_regex], required=False)

    # Password
    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)

    # Name
    first_name = serializers.CharField(min_length=2, max_length=30)
    last_name = serializers.CharField(min_length=2, max_length=30)

    first_password = serializers.CharField(max_length=40, required=False)

    created_account = serializers.BooleanField()

    def validate(self, data):
        """Verify passwords match."""
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError('Las contraseñas no coinciden')
        password_validation.validate_password(passwd)
        if self.context['are_program']:
            if self.context['program'].accounts_to_create_left == 0:
                raise serializers.ValidationError('No te quedan cuentas')

        return data

    def create(self, data):
        """Handle user and profile creation."""

        data.pop('password_confirmation')
        if self.context['are_program']:
            user = User.objects.create_user(
                **data, is_verified=True, is_client=True)
        else:
            # Change is verified to false to verify with email later
            user = User.objects.create_user(
                **data, is_verified=False, is_client=True)

        profile = Profile.objects.create(user=user)
        teacher = Teacher.objects.create(user=user)
        if self.context['are_program']:
            program = self.context['program']
            program.students.add(user)
            program.created_accounts.add(user)
            program.accounts_to_create_left -= 1
            program.save()
            return {
                'user': AccountCreated.objects.get(user=user),
                'program': program
            }
        else:
            send_confirmation_email(user_pk=user.pk)
            return user


class UserLoginSerializer(serializers.Serializer):
    """User login serializer.

    Handle the login request
    """

    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Check credentials."""
        # Validation with email or password
        email = data['email']
        password = data['password']
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        if email and password:
            print(email)
            if re.search(regex, email):
                user_request = get_object_or_404(
                    User,
                    email=email
                )
                email = user_request.username
            # Check if user set email

        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError(
                'Las credenciales no son correctas')

        if not user.created_account is None:
            if user.created_account:
                raise serializers.ValidationError(
                    'Con esta cuenta no puedes acceder a classlineacademy.com')

        if not user.is_verified:
            raise serializers.ValidationError('Esta cuenta no esta verificada')
        self.context['user'] = user
        return data

    def create(self, data):
        """Generate or retrieve new token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserLoginPlatformSerializer(serializers.Serializer):
    """User login serializer.

    Handle the login request
    """

    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Check credentials."""
        # Validation with email or password
        email = data['email']
        password = data['password']
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        if email and password:
            print(email)
            if re.search(regex, email):
                user_request = get_object_or_404(
                    User,
                    email=email
                )
                email = user_request.username
            # Check if user set email
        user = authenticate(username=email, password=password)
        # import pdb; pdb.set_trace()
        program = self.context['program']
        print(user)
        print(program.user)
        if not user:
            raise serializers.ValidationError('Credenciales invalidas')

        if not user in program.students.all() and user != program.user:
            raise serializers.ValidationError('No perteneces a esta academia')

        if not user.is_verified:
            raise serializers.ValidationError('Esta cuenta no esta verificada')
        self.context['user'] = user
        return data

    def create(self, data):
        """Generate or retrieve new token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserLoginAppSerializer(serializers.Serializer):
    """User login serializer.

    Handle the login request
    """

    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Check credentials."""
        # Validation with email or password
        email = data['email']
        password = data['password']
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        if email and password:
            print(email)
            if re.search(regex, email):
                user_request = get_object_or_404(
                    User,
                    email=email
                )
                email = user_request.username
            # Check if user set email
        user = authenticate(username=email, password=password)
        # import pdb; pdb.set_trace()
        if not user:
            raise serializers.ValidationError('Credenciales invalidas')

        if not user.is_verified:
            raise serializers.ValidationError(
                'Esta cuenta no esta verificada')

        if not Student.objects.filter(user=user).exists():
            raise serializers.ValidationError(
                'No perteneces a ninguna academia')

        self.context['user'] = user
        return data

    def create(self, data):
        """Generate or retrieve new token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class ChangePasswordSerializer(serializers.Serializer):
    """User login serializer.

    Handle the login request
    """
    email = serializers.CharField()
    password = serializers.CharField(min_length=8, max_length=64)
    new_password = serializers.CharField(min_length=8, max_length=64)
    repeat_password = serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        """Check credentials."""
        # Validation with email or password

        new_password = self.context['new_password']
        repeat_password = self.context['repeat_password']
        email = data['email']
        password = password = data['password']
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'

        if email and password:
            if re.search(regex, email):
                user_request = get_object_or_404(
                    User,
                    email=email
                )
                email = user_request.username
            # Check if user set email

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError('Credenciales invalidas')
        if new_password != repeat_password:
            raise serializers.ValidationError('Las contraseñas no coinciden')
        user.set_password(new_password)
        user.password_changed = True
        user.save()

        return data


class AccountVerificationSerializer(serializers.Serializer):
    """Acount verification serializer."""

    token = serializers.CharField()

    def validate_token(self, data):
        """Verifiy token is valid."""
        try:
            payload = jwt.decode(data, settings.SECRET_KEY,
                                 algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError('Verification link has expired')
        except jwt.PyJWTError:
            raise serializers.ValidationError('Invalid token')
        if payload['type'] != 'email_confirmation':
            raise serializers.ValidationError('Invalid token')
        self.context['payload'] = payload
        return data

    def save(self):
        """Update user's verified status."""
        payload = self.context['payload']
        user = User.objects.get(username=payload['user'])
        if user.is_verified:
            raise serializers.ValidationError('Tu cuenta ya esta validada')

        user.is_verified = True
        user.save()
