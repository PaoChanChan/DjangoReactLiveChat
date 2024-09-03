from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from .models import Server
from .schema import server_list_docs
from .serializer import ServerSerializer


# Definición de un ViewSet personalizado para listar servidores
class ServerListViewSet(viewsets.ViewSet):

    # Definición del conjunto de consultas inicial
    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """Maneja solicitudes GET para listar servidores con filtros opcionales.

        Este método recupera una lista de servidores basada en varios parámetros
        de consulta proporcionados en la solicitud. Soporta filtrado por categoría,
        limitación de resultados, filtrado por usuario autenticado, filtrado por ID
        de servidor, e inclusión del número de miembros en la respuesta.

        Args:
            request (HttpRequest): Objeto de la solicitud que contiene los parámetros de consulta.

        Parámetros de Consulta:
            - category (str): Filtra servidores por nombre de categoría.
            - qty (str): Limita la cantidad de servidores devueltos.
            - by_user (str): Filtra servidores por el usuario autenticado ('true' o 'false').
            - by_serverid (str): Filtra servidores por un ID de servidor específico.
            - with_num_members (str): Incluye el número de miembros en la respuesta ('true' o 'false').

        Raises:
            AuthenticationFailed: Si se solicita filtrado por usuario pero el usuario no está autenticado.
            ValidationError: Si el ID del servidor es inválido o no se encuentra.

        Returns:
            Response: Objeto Response que contiene los datos serializados del servidor.
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("by_user") == "true"

        # Filtrar servidores por categoría si se proporciona
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filtrar servidores por usuario si se solicita
        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()

        # Anotar servidores con el número de miembros si se solicita
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Limitar la cantidad de resultados si se proporciona el parámetro qty
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filtrar servidores por ID si se proporciona
        if by_serverid:
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                # Verificar si existe el servidor con el ID proporcionado
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Servidor con ID {by_serverid} no encontrado"
                    )
            except ValueError:
                raise ValidationError(detail="Valor del servidor erróneo")

        # Serializar los datos del conjunto de consultas
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        # Devolver la respuesta serializada
        return Response(serializer.data)
