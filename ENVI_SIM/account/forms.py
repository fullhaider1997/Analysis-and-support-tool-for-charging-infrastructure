from unittest.util import _MAX_LENGTH
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import AuthenticationForm

class FleetManagmentOperatorForm(UserCreationForm):
  
   email = forms.EmailField(widget=forms.TextInput(attrs={ 'size':'30','class': 'form-control'}))
   first_name = forms.CharField(max_length=50,widget=forms.TextInput(attrs={ 'size':'60', 'class': 'form-control'}))
   last_name = forms.CharField(max_length=50,widget=forms.TextInput(attrs={ 'size':'60','class': 'form-control'}))                                           
   username = forms.CharField(max_length=8,widget=forms.TextInput(attrs={ 'size':'60','class': 'form-control'}))
   password1 = forms.CharField(widget=forms.PasswordInput(attrs={ 'size':'60','class': 'form-control'}))
   password2 = forms.CharField(widget=forms.PasswordInput(attrs={ 'size':'60','class': 'form-control'}))

   class Meta:
       model = User
       fields = ("username", "first_name", "last_name", "email", "password1","password2")

   def __init__(self, *args, **kwargs):
    super(FleetManagmentOperatorForm, self).__init__(*args, **kwargs) # Call to ModelForm constructor
    self.fields['email'].widget.attrs['style'] ="padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"
    self.fields['username'].widget.attrs['style'] ="padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"
    self.fields['first_name'].widget.attrs['style'] = "padding: 0 0 0 0 ; margin: 0 0 10px 0; height:20px"
    self.fields['last_name'].widget.attrs['style']= "padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"
    self.fields['password1'].widget.attrs['style'] ="padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"
    self.fields['password2'].widget.attrs['style'] = "padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"
    


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'size':'50'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'}))

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['style'] = "padding: 0 0 0 0; margin: 0 0 10px 0; height:50px"
        self.fields['password'].widget.attrs['style'] = "padding: 0 0 0 0; margin: 0 0 10px 0; height:20px"