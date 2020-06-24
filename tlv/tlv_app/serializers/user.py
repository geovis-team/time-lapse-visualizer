from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from tlv_app.models import Config


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user model. It also serializes the configs owned by the user.
    """
    config = serializers.PrimaryKeyRelatedField(many=True, queryset=Config.objects.all())
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email','config')


class UserSerializerWithToken(serializers.ModelSerializer):
    """
    This serializer serializes the user model with appropriate jwt token.
    """
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    @staticmethod
    def get_token(obj):
        """
        This method utilises the jwt handler to return appropriate token.
        :param obj:
        :return:
        """
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        """
        This method overrides the create method of the serializer
        :param validated_data: validated data to be saved as object
        :return: the save object instance
        """
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token')
        extra_kwargs = {'password': {'write_only': True}}
