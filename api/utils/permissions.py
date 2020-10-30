"""Add circle mixin abstract."""

# Django REST Framework
from rest_framework import mixins, viewsets
from rest_framework.generics import get_object_or_404

# Models
from api.programs.models import Program, Post, Pack, ProgramTopic, Event


class AddProgramMixin(viewsets.GenericViewSet):
    """Add circle mixin

    Manages adding a circle object to views
    that require it.
    """

    def dispatch(self, request, *args, **kwargs):
        """Return the normal dispatch but adds the circle model."""

        id = self.kwargs['slug_id']

        self.program = get_object_or_404(
            Program,
            code=id
        )

        return super(AddProgramMixin, self).dispatch(request, *args, **kwargs)


class AddPostMixin(viewsets.GenericViewSet):
    """Add circle mixin

    Manages adding a circle object to views
    that require it.
    """

    def dispatch(self, request, *args, **kwargs):
        """Return the normal dispatch but adds the circle model."""

        id = self.kwargs['slug_id']

        self.program = get_object_or_404(
            Program,
            code=id
        )

        post_id = self.kwargs['post_id']
        self.post_instance = get_object_or_404(
            Post,
            code=post_id
        )

        return super(AddPostMixin, self).dispatch(request, *args, **kwargs)


class AddPackMixin(viewsets.GenericViewSet):
    """Add circle mixin

    Manages adding a circle object to views
    that require it.
    """

    def dispatch(self, request, *args, **kwargs):
        """Return the normal dispatch but adds the circle model."""

        id = self.kwargs['slug_id']

        self.program = get_object_or_404(
            Program,
            code=id
        )

        pack_id = self.kwargs['pack_id']
        self.pack = get_object_or_404(
            Pack,
            code=pack_id
        )

        return super(AddPackMixin, self).dispatch(request, *args, **kwargs)


class AddTopicMixin(viewsets.GenericViewSet):
    """Add circle mixin

    Manages adding a circle object to views
    that require it.
    """

    def dispatch(self, request, *args, **kwargs):
        """Return the normal dispatch but adds the circle model."""

        id = self.kwargs['slug_id']

        self.program = get_object_or_404(
            Program,
            code=id
        )

        topic_id = self.kwargs['topic_id']
        self.topic = get_object_or_404(
            ProgramTopic,
            code=topic_id
        )

        return super(AddTopicMixin, self).dispatch(request, *args, **kwargs)


class AddEventMixin(viewsets.GenericViewSet):
    """Add circle mixin

    Manages adding a circle object to views
    that require it.
    """

    def dispatch(self, request, *args, **kwargs):
        """Return the normal dispatch but adds the circle model."""

        id = self.kwargs['slug_id']

        self.program = get_object_or_404(
            Program,
            code=id
        )

        event_id = self.kwargs['event_id']
        self.event = get_object_or_404(
            Event,
            id=event_id
        )

        return super(AddEventMixin, self).dispatch(request, *args, **kwargs)
