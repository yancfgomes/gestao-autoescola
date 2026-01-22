from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlunoViewSet, AulaViewSet

# O roteador cria automaticamente as rotas para o CRUD
router = DefaultRouter()
router.register(r'alunos', AlunoViewSet)
router.register(r'aulas', AulaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]