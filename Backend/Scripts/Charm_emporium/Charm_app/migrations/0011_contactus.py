# Generated by Django 5.1 on 2025-02-05 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Charm_app', '0010_remove_brand_slug_remove_category_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=10)),
                ('message', models.CharField(max_length=550)),
            ],
        ),
    ]
