from django.urls import re_path
from .views import signup,login,logout,tokenIsValid,recovery_email,reset_password

urlpatterns = [
    re_path('sign-up/',signup,name='sign-up'),
    re_path('log-in/',login,name='log-in'),
    re_path('log-out/',logout,name='log-out'),
    re_path('validate-token/',tokenIsValid,name='validate-token'),

    re_path('recovery-email',recovery_email,name='recovery-email'),
    re_path('reset-password',reset_password,name='reset-password')
]
