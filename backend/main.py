import os
import sys
import secrets  # <-- Use Python's built-in secrets module instead
from django.conf import settings
from django.core.management import execute_from_command_line
from django.http import JsonResponse
from django.urls import path
from corsheaders.middleware import CorsMiddleware

# Minimal Django Settings
if not settings.configured:
    settings.configure(
        SECRET_KEY=secrets.token_urlsafe(32), # <-- Generates a perfectly safe key automatically
        DEBUG=True,
        ALLOWED_HOSTS=['*'],
        ROOT_URLCONF=__name__,
        MIDDLEWARE=[
            'corsheaders.middleware.CorsMiddleware',
            'django.middleware.common.CommonMiddleware',
        ],
        CORS_ALLOW_ALL_ORIGINS=True, 
    )

# Simple global variable to track visits
stats = {"request_count": 0}

def api_status(request):
    stats["request_count"] += 1
    return JsonResponse({
        "status": "Healthy",
        "framework": "Django",
        "total_api_requests": stats["request_count"]
    })

urlpatterns = [
    path('api/status', api_status),
]

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', __name__)
    # Start the server on port 8000
    execute_from_command_line([sys.argv[0], 'runserver', '0.0.0.0:8000'])