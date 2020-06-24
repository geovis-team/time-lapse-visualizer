from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        """
        This method returns true if the authorised user is the owner.
        Thus, all the operations whether GET, POST, PATCH for config
        can only be performed by the owner.
        :param request: request made the user
        :param view: view specifies the specific apiview to be acted upon
        :param obj: object that needs to be accessed
        :return: permission (true or false)
        """
        return obj.user == request.user