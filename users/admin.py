from django.contrib import admin
from .models import Profile, BusinessGallery

# Register your models here.
class BusinessGalleryInline(admin.TabularInline):
    model = BusinessGallery
    extra = 3
    fields = ('image', 'caption')

class ProfileAdmin(admin.ModelAdmin):
    inlines = [BusinessGalleryInline]
    list_display = ('user', 'buiness_name', 'profile_type', 'contact_no')
    list_filter = ('profile_type',)
    search_fields = ('buiness_name', 'user__username', 'user__email')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(BusinessGallery)
