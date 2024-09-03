from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account


class AdminAccount(UserAdmin):
    list_display = (
        "email",
        "username",
        "date_joined",
        "last_login",
        "is_active",
    )
    list_display_links = ("email", "username")
    readonly_fields = ("last_login", "date_joined")
    ordering = ("date_joined",)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AdminAccount)
