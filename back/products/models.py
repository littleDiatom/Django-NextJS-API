# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Nutrients(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    abbreviation = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'nutrients'


class NutritionalNeeds(models.Model):
    id = models.BigAutoField(primary_key=True)
    plankton_id = models.BigIntegerField()
    nutrient_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'nutritional_needs'


class PlanktonSolutions(models.Model):
    id = models.BigAutoField(primary_key=True)
    solution_id = models.BigIntegerField()
    plankton_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'plankton_solutions'



class Planktonslibrary(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    description = models.TextField(blank=True, null=True)
    picture = models.CharField(max_length=255, blank=True, null=True)
    localisation = models.CharField(max_length=255, blank=True, null=True)
    water_temperature = models.IntegerField(blank=True, null=True)
    bloom_period = models.BigIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'planktonsLibrary'



class Solutions(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    description = models.CharField(max_length=255)
    picture = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'solutions'
