from rest_framework import viewsets,generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, CreateAPIView
from retail.models import Chain, Store, Employee, Map
from retail.serializers import ChainSerializer, StoreSerializer,EmployeeSerializer, MapSerializer
from rest_framework.response import Response
from django.db.models import Sum

# class GameCreateAPIView(CreateAPIView):
#     queryset = Game.objects.all()
#     serializer_class = GameSerializer
#     def perform_create(self, serializer):
#         game = self.request.data
#         _ = serializer.save(game=game)
#         return Response(_)
# class UserList(generics.ListCreateAPIView):
#     model = User
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [
#         permissions.AllowAny
#     ]

class ChainViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Chain objects """
    queryset = Chain.objects.all()
    serializer_class = ChainSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class StoreViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Store objects """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class EmployeeViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Employee objects """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer
    permission_classes = [
        permissions.AllowAny
    ]