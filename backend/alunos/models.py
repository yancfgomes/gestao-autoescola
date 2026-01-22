from django.db import models

class Aluno(models.Model):
    CATEGORIA_CHOICES = [
        ('A', 'Moto'),
        ('B', 'Carro'),
        ('AB', 'Carro e Moto'),
    ]

    nome = models.CharField(max_length=100)
    # Trocando email por telefone
    telefone = models.CharField(max_length=20, unique=True) 
    categoria = models.CharField(max_length=2, choices=CATEGORIA_CHOICES, default='B')
    
    # Dividindo as aulas por tipo
    aulas_carro_realizadas = models.IntegerField(default=0, blank=True, null=True)
    aulas_moto_realizadas = models.IntegerField(default=0, blank=True, null=True)
    
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} - Categoria {self.categoria}"
    
class Aula(models.Model):
    # Relacionamento: Se o Aluno for deletado, as aulas dele também serão (CASCADE)
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='aulas')
    data_aula = models.DateTimeField()
    descricao = models.TextField(blank=True, null=True) # Ex: "Treino de baliza e rampa"
    realizada = models.BooleanField(default=False)

    def __str__(self):
        return f"Aula de {self.aluno.nome} em {self.data_aula.strftime('%d/%m/%Y')}"