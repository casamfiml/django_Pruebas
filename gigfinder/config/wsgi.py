"""
WSGI config for gigfinder project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os,sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")


#path a donde esta el manage.py de nuestro proyecto Django
sys.path.append('/home/ubuntu/workspace/gigfinder')
os.environ.setdefault("LANG", "en_US.UTF-8")
os.environ.setdefault("LC_ALL", "en_US.UTF-8")
activate_this = '/home/ubuntu/workspace/myvenv/bin/activate_this.py'
application = get_wsgi_application()