# Generated by Django 3.1.4 on 2020-12-20 14:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_auto_20201220_0914'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='media',
            name='white',
        ),
    ]
