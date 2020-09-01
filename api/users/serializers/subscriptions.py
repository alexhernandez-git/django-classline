"""Users serializers."""

# Django
from django.conf import settings


# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import User, Subscription
from api.programs.models import Program

# Serializers
from api.users.serializers import UserModelSerializer
from api.users.serializers.profiles import ProfileModelSerializer
from api.programs.serializers import ProgramModelSerializer


class AccountsSubscriptionModelSerializer(serializers.ModelSerializer):
    """Subscription model serializer."""

    class Meta:
        """Meta class."""

        model = Subscription
        fields = (
            'id',
            'subscription_id',
            'to_be_cancelled',
            'current_period_end',
            'cancelled',
            'payment_issue',
            'user',
            'program',
            'product'
        )

        read_only_fields = (
            'id',
        )


class AccountsSubscriptionSignUpSerializer(serializers.Serializer):
    """Subscription sign up serializer.

    Handle subscription sign up data validation and subscription creation.
    """
    subscription_id = serializers.CharField()
    user = UserModelSerializer()
    program = ProgramModelSerializer()
    product = serializers.CharField()
    to_be_cancelled = serializers.BooleanField()
    cancelled = serializers.BooleanField()
    payment_issue = serializers.BooleanField()
    current_period_end = serializers.IntegerField()

    class Meta:
        """Meta class."""

        model = Subscription
        fields = (
            'id',
            'subscription_id',
            'to_be_cancelled',
            'current_period_end'
            'cancelled',
            'payment_issue',
            'user',
            'program',
            'product'
        )

        read_only_fields = (
            'id'
        )

    def create(self, validated_data):
        """Handle subscription creation."""

        subscription = Subscription.objects.create(
            **validated_data)
        return subscription


class AccountsSubscriptionCancelSerializer(serializers.Serializer):
    """Subscription cancel serializer."""

    def validate(self, data):
        self.context['subscription_id'] = data.subscription_id
        return data

    def save(self):
        """Update subscription cancellation status."""
        subscription_id = self.context['subscription_id']
        subscription = Subscription.objects.get(id=subscription_id)
        subscription.to_be_cancelled = True
        subscription.save()


class SubscriptionModelSerializer(serializers.ModelSerializer):
    """Subscription model serializer."""

    class Meta:
        """Meta class."""

        model = Subscription
        fields = (
            'id',
            'subscription_id',
            'to_be_cancelled',
            'current_period_end',
            'cancelled',
            'payment_issue',
            'user',
            'program',
            'payments'
        )

        read_only_fields = (
            'id',
        )


class SubscriptionSignUpSerializer(serializers.Serializer):
    """Subscription sign up serializer.

    Handle subscription sign up data validation and subscription creation.
    """
    subscription_id = serializers.CharField()
    user = UserModelSerializer()
    program = ProgramModelSerializer()
    to_be_cancelled = serializers.BooleanField()
    cancelled = serializers.BooleanField()
    payment_issue = serializers.BooleanField()
    current_period_end = serializers.IntegerField()

    class Meta:
        """Meta class."""

        model = Subscription
        fields = (
            'id',
            'subscription_id',
            'to_be_cancelled',
            'current_period_end'
            'cancelled',
            'payment_issue',
            'user',
            'program',
            'active'
        )

        read_only_fields = (
            'id'
        )

    def create(self, validated_data):
        """Handle subscription creation."""

        subscription = Subscription.objects.create(
            **validated_data)
        return subscription


class SubscriptionCancelSerializer(serializers.Serializer):
    """Subscription cancel serializer."""

    def validate(self, data):
        self.context['subscription_id'] = data.subscription_id
        return data

    def save(self):
        """Update subscription cancellation status."""
        subscription_id = self.context['subscription_id']
        subscription = Subscription.objects.get(id=subscription_id)
        subscription.to_be_cancelled = True
        subscription.save()
