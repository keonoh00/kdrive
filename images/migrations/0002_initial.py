# Generated by Django 4.1.6 on 2023-02-08 03:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("images", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="image",
            name="created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="images",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
