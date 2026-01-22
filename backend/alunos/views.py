from rest_framework import viewsets, permissions
from .models import Aluno, Aula
from .serializers import AlunoSerializer, AulaSerializer

class AlunoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite visualizar ou editar alunos.
    """
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [permissions.AllowAny]  # Permite acesso público
class AulaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite visualizar ou editar aulas.
    """
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer
    permission_classes = [permissions.AllowAny]  # Permite acesso público