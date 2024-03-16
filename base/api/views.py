from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializer import UserRegistrationSerializer
from base.serializer import ProfileSerializer
from base.serializer import QuoteSerializer
from base.models import Profile
from base.models import QuoteForm
from django.http import JsonResponse
from .getquote import calculate_suggested_price

#This is where everything happens. Views works like a server. It handle request and response.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_view(request): #This gets the request from the front end.
    user = request.user

    if request.method == 'GET': #If the request is GET
        try:
            profile = Profile.objects.get(user=user) #It will get the profile of the user from the database. In this case, it is SQLite
            serializer = ProfileSerializer(profile) #It will serialize the data -> convert it to json format
            return Response(serializer.data) #Return the response
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        if Profile.objects.filter(user=user).exists():
            return Response({'error': 'Profile already exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PATCH':
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['POST'])
@permission_classes([]) # Explicitly clear default permission classes if needed
def user_registration(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            print(errors)
            error_messages = {'errors': errors}
            return Response(error_messages, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quote(request):
    if request.method == 'POST':
        serializer = QuoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Automatically associate the quote with the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quote_history(request):
    quotes = QuoteForm.objects.filter(user=request.user).order_by('-delivery_date')
    serializer = QuoteSerializer(quotes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_quote_price(request):
    location = request.data.get('location')
    gallons_requested = request.data.get('gallons_requested')
    user = request.user

    # Determine if the user has a rate history
    has_history = QuoteForm.objects.filter(user=user).exists()
    
    suggested_price = calculate_suggested_price(location, gallons_requested, has_history)
    total_amount_due = suggested_price * gallons_requested
    
    return JsonResponse({'suggested_price': suggested_price, 'total_amount_due': total_amount_due})