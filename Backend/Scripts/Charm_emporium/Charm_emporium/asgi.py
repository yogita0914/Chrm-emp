"""
ASGI config for Charm_emporium project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# settings_module = 'Charm_emporium.deployment_settings' if 'RENDER_EXTERNAL_HOSTNAME' in os.environ else 'Charm_emporium.settings'

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Charm_emporium.settings')

application = get_asgi_application()


# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# application = get_asgi_application()

