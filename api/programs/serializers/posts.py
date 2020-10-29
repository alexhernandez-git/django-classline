"""Work experience serializer serializer."""

# Django
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Post, Comment


from datetime import timedelta
import re


class PostModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    comments = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Post
        fields = (
            'id',
            'code',
            'title',
            'message',
            'user',
            'comments',
            'created',
        )
        read_only_fields = (
            'id',
        )

    def get_comments(self, obj):
        posts = Comment.objects.filter(post=obj)
        return posts.count()

    def get_user(self, obj):
        from api.users.serializers.users import UserSharedModelSerializer
        return UserSharedModelSerializer(obj.user, read_only=True).data

    def validate(self, attrs):
        if len(attrs['title']) == 0:
            raise serializers.ValidationError('El titulo no puede estar vacio')
        if len(attrs['message']) == 0:
            raise serializers.ValidationError(
                'El mensaje no puede estar vacio')
        return super().validate(attrs)

    def create(self, validated_data):
        program = self.context['program']
        user = self.context['user']
        validated_data['program'] = program
        validated_data['user'] = user

        result = super().create(validated_data)
        subject = '{} ha compartido en el foro:'.format(
            user.username)
        from_email = 'Classline Academy <no-reply@classlineacademy.com>'
        content = render_to_string(
            'emails/programs/forum-notification.html',
            {
                'post': result,
                'program': program,
                'user': user
            }
        )
        students_sp = program.students.through.objects.all().values_list('user__email')
        students_spe = [i[0] for i in students_sp]
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        new_email_ar = []
        for email in students_spe:
            if re.search(regex, email):
                new_email_ar.append(email)
        try:
            msg = EmailMultiAlternatives(
                subject, content, from_email, [new_email_ar])
            msg.attach_alternative(content, "text/html")
            msg.send()
        except:
            pass
        return result
