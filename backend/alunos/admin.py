from django.contrib import admin
from .models import Aluno, Aula

@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    # Atualize para os novos campos
    list_display = ('nome', 'categoria', 'aulas_carro_realizadas', 'aulas_moto_realizadas', 'telefone')
    list_filter = ('categoria',)
    search_fields = ('nome', 'telefone')

@admin.register(Aula)
class AulaAdmin(admin.ModelAdmin):
    list_display = ('aluno', 'data_aula', 'realizada')
    list_filter = ('aluno','realizada', 'data_aula')