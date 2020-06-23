from rest_framework import serializers
from tlv_app.models import Config


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""

    def to_internal_value(self, data):
        return data

    def to_representation(self, value):
        return value


class ConfigSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=30)
    heading = serializers.CharField(required=True, allow_blank=False, max_length=100)
    description = serializers.CharField(
        required=True, allow_blank=False, max_length=500
    )
    filters = JSONSerializerField()
    user = serializers.ReadOnlyField(source="user.username")

    def create(self, validated_data):
        return Config.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.heading = validated_data.get("heading", instance.heading)
        instance.description = validated_data.get("description", instance.description)
        instance.filters = validated_data.get("filters", instance.filters)

        instance.save()
        return instance

    class Meta:
        model = Config
        fields = ("id","name", "heading", "description", "filters", "user")

