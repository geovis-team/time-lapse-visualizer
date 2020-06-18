from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tlv_app.serializers import UserSerializerWithToken


@api_view(['POST'])
def register(request):
    serializer = UserSerializerWithToken(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
