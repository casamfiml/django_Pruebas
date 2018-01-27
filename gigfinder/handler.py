from corsheaders.signals import check_request_enabled

from .models import gigfinder

def cors_allow_mysites(sender, request, **kwargs):
    return gigfinder.objects.filter(host=request.host).exists()

check_request_enabled.connect(cors_allow_mysites)