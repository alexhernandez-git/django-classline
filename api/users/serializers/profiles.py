"""Profile serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Profile


class ProfileModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    subscriptions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Profile
        fields = (
            'picture',
            # 'is_teacher',
            'is_enterprise',
            'company_name',
            'language',
            'biography',
            'country',
            'stripe_account_id',
            'stripe_customer_id',
            'subscriptions'
        )

    def get_subscriptions(self, obj):
        from api.users.serializers.subscriptions import SubscriptionModelSerializer

        return SubscriptionModelSerializer(obj.subscriptions.filter(active=True), many=True).data


class ProfileWithoutSubscriptionsModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Profile
        fields = (
            'picture',
        )
