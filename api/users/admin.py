"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from api.users.models import User, Profile, Teacher, Subscription, Coupon


class CustomUserAdmin(UserAdmin):
    """User model admin."""

    list_display = ('email', 'first_name', 'last_name',
                    'is_staff', 'is_client')
    list_filter = ('is_client', 'is_staff', 'created', 'modified')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Profile model admin."""

    list_display = ('user', 'is_teacher',
                    'stripe_customer_id', 'stripe_account_id')
    search_fields = ('user__username', 'user__email',
                     'user__first_name', 'user__last_name')
    # list_filter = ('birth_date',)


@admin.register(Teacher)
class ProfileAdmin(admin.ModelAdmin):
    """Profile model admin."""

    # list_display = ('user',)
    # search_fields = ('user__username', 'user__email',
    #                  'user__first_name', 'user__last_name')
    # list_filter = ('reputation',)


@admin.register(Subscription)
class Program(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id',)


@admin.register(Coupon)
class Coupon(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id',)


admin.site.register(User, CustomUserAdmin)
