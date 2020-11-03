"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from api.programs.models import Program, Student, Instructor, AllowedProgram, EventStudent, VideoPack, StudentPack, Video,CourseBlock


@admin.register(Program)
class Program(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('code', 'title', 'actived',
                    'current_accounts', 'level_pro', 'user')
    list_filter = ('created', 'modified')
    search_fields = ('code', 'title', 'user__first_name',
                     'user__last_name', 'user__email')


@admin.register(Video)
class Video(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('code',)


@admin.register(Student)
class Student(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('user', 'program')


@admin.register(Instructor)
class Instructor(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('user', 'admin')


@admin.register(AllowedProgram)
class AllowedProgram(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('program', 'is_admin')


@admin.register(EventStudent)
class EventStudent(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id', 'user')


@admin.register(VideoPack)
class VideoPack(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id',)


@admin.register(StudentPack)
class StudentPack(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id', 'user')

@admin.register(CourseBlock)
class CourseBlock(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('id',)