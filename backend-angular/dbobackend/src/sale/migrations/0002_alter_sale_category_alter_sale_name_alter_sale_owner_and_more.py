# Generated by Django 4.0.1 on 2022-01-20 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sale', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='category',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='sale',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='sale',
            name='owner',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='sale',
            name='quantity_sold',
            field=models.IntegerField(default=0),
        ),
    ]
