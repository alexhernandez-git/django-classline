"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from api.programs.models import Program
from api.programs.models import Student


@admin.register(Program)
class Program(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('code', 'title', 'actived',
                    'current_accounts', 'level_pro', 'user')
    list_filter = ('created', 'modified')
    search_fields = ('code', 'title', 'user__first_name',
                     'user__last_name', 'user__email')


@admin.register(Student)
class Student(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('user', 'program')