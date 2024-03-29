"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 4.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
from pathlib import Path
import os
import environ
import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

env = environ.Env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")
CF_API_TOKEN = env("CF_API_TOKEN")
CF_ACCOUNT_ID = env("CF_ACCOUNT_ID")
CF_ACCOUNT_HASH = env("CF_ACCOUNT_HASH")
GPU_SERVER_ADDRESS = env("GPU_SERVER_ADDRESS")
GPU_SERVER_USERNAME = env("GPU_SERVER_USERNAME")
GPU_SERVER_PASSWORD = env("GPU_SERVER_PASSWORD")
GPU_SERVER_PORT = env("GPU_SERVER_PORT")
SENTRY_DSN = env("SENTRY_DSN")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = "RENDER" not in os.environ

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "backend.kdrive-ai.com",
]

RENDER_EXTERNAL_HOSTNAME = os.environ.get("RENDER_EXTERNAL_HOSTNAME")

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# Application definition
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
]

CUSTOM_APPS = [
    "users.apps.UsersConfig",
    "common.apps.CommonConfig",
    "directory_items.apps.DirectoryItemsConfig",
]

SYSTEM_APPS = [
    # Installed by default
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

INSTALLED_APPS = SYSTEM_APPS + THIRD_PARTY_APPS + CUSTOM_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

if DEBUG:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": dj_database_url.config(
            conn_max_age=600,
        ),
    }


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-US"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/
# This setting tells Django at which URL static files are going to be served to the user.
# Here, they well be accessible at your-domain.onrender.com/static/...
STATIC_URL = "/static/"
# Following settings only make sense on production and may break development environments.
if not DEBUG:  # Tell Django to copy statics to the `staticfiles` directory
    # in your application directory on Render.
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    # Turn on WhiteNoise storage backend that takes care of compressing static files
    # and creating unique names for each version so they can safely be cached forever.
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Auth
AUTH_USER_MODEL = "users.User"


# Image Storage
MEDIA_ROOT = "uploads"


# Constants
DEFAULT_PAGINATION_CONTENT_SIZE = 10

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "config.authentication.TrustMeBroAuth",
        "rest_framework.authentication.TokenAuthentication",
        "config.authentication.JWTAuthentication",
    ],
}

if DEBUG:
    CORS_ALLOWED_ORIGINS = ["http://127.0.0.1:3000"]
    CSRF_TRUSTED_ORIGINS = ["http://127.0.0.1:3000"]
else:
    CORS_ALLOWED_ORIGINS = ["https://kdrive-ai.com"]
    CSRF_TRUSTED_ORIGINS = ["https://kdrive-ai.com"]


CORS_ALLOW_CREDENTIALS = True


if not DEBUG:
    SESSION_COOKIE_DOMAIN = ".kdrive-ai.com"
    CSRF_COOKIE_DOMAIN = ".kdrive-ai.com"
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration()],
        traces_sample_rate=1.0,
        send_default_pii=True,
    )
