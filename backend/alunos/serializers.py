from rest_framework import serializers
from .models import Aluno, Aula

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__' # Expõe todos os campos (nome, telefone, categorias, etc.)

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = '__all__'