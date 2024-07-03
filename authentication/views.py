from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail

from django.contrib.auth.models import User
from .serializers import UserSerializer
from music.models import FavoriteList 



@api_view(['POST'])
def login(request):
    user = get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Incorrect credentials!"},status=status.HTTP_404_NOT_FOUND)
    
    Token.objects.filter(user=user).delete()
    token = Token.objects.create(user=user)


    serializer = UserSerializer(instance=user)
    userData = serializer.data
    userData.pop('password','Non-existent key')
    return Response({"token":token.key,"user":userData})



@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        
        email = serializer.validated_data['email']
        if User.objects.filter(email=email).exists():
            return Response({"detail": "EMAIL_EXISTS"}, status=status.HTTP_409_CONFLICT)

        serializer.save()

        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)

        favorite_list= FavoriteList.objects.create(user=user)
        favorite_list.save()
        userData = serializer.data
        userData.pop('password','Non-existent key')
        return Response({"token":token.key,"user":userData},status=status.HTTP_201_CREATED)
    if not serializer.is_valid():
        return Response({"detail": "USER_EXISTS"}, status=status.HTTP_409_CONFLICT)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Delete the user's token to logout
        request.user.auth_token.delete()
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_detail)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def tokenIsValid(request):
    print(request.data)
    message = {'detail': 'Valid token.'}
    return Response(message)



@api_view(['POST'])
def recovery_email(request):
    try:
        email = request.data.get('email')
        user = get_object_or_404(User, email=email)
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        
        send_mail(
            'Password recovery',
            f'You are receiving this email because you requested a password change for your HEART-RATE platform user account.\n\nPlease go to the following page and choose a new password: \n\n http://localhost:4200/password-recovery/?token={token} \n\nYour username, in case you have forgotten it: {user.username} \n\nThanks for using our site!',
            'musicsoundbizcochos@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response({'detail': 'SEND_MAIL'})
    except:
        return Response({'detail':'ERROR_MAIL'},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def reset_password(request):
    token = request.data.get('token')
    password = request.data.get('password')
    if token and password:
        try:
            user = Token.objects.get(key=token).user
            user.set_password(password)
            user.save()
            Token.objects.filter(user=user).delete()
            return Response({'detail': 'The password has been reset successfully.'})
        except:
            return Response({'error': 'INVALID_TOKEN'}, status=400)
    return Response({'error': 'RESET_FAIL'}, status=status.HTTP_400_BAD_REQUEST)