from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class RegisterUserForm(UserCreationForm):
    first_name = forms.CharField()
    last_name = forms.CharField()
    work_id = forms.IntegerField(max_length=8)


    class Meta:
        pass

