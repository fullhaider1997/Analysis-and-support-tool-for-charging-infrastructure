from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class FleetManagmentOperatorForm(UserCreationForm):
   class Meta:
       model = User
       fields = ("first_name","last_name","email","password1","password2")
  
   def save(self,commit=True):
      user = super(FleetManagmentReport,self).save(commit=False)
      user.first_name = cleaned_data["first_name"]
      user.last_name  = cleaned_data["last_name"]
      user.email = clean_data["email"]

      if commit:
          user.save()

