# Colección de pruebas KarenFlix

Importa esta carpeta en Bruno y activa el environment Local. El orden de secuencia cubre health, registro/login, perfil, validación, categorías, propuesta/aprobación, catálogo, detalle, reseñas, reacciones y ranking.

La cuenta bruno.demo@example.com y sus contraseñas son datos de demostración locales. La primera petición registra el usuario; ejecútala una vez. Para las siguientes corridas usa Login. En el environment Local agrega adminToken con el JWT de un administrador y otherToken con el JWT de una segunda cuenta. Para crear el primer admin, registra una cuenta y cambia su rol manualmente en Workbench según README raíz.

Los JSON de referencia están en data/. La colección no crea ni borra automáticamente todos los datos; revisa los códigos esperados y los requisitos de cada caso. Repite manualmente Login con credenciales incorrectas hasta superar diez intentos en quince minutos para observar el rate limit.
