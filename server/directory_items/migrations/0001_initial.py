# Generated by Django 4.0.10 on 2023-02-28 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DirectoryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=140)),
                ('image_url', models.URLField(null=True)),
                ('path', models.CharField(default='/', max_length=1000)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
