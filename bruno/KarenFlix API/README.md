# Pruebas de la API KarenFlix

Esta carpeta contiene la colección para Bruno. Impórtala desde Bruno y selecciona el entorno `Local`. Antes de ejecutar las operaciones protegidas, configura `token` y `adminToken`; puedes obtenerlos al iniciar sesión con las cuentas correspondientes. La API debe estar levantada y conectada a MySQL.

Las peticiones numeradas cubren autenticación, catálogo, categorías, propuestas, reseñas, reacciones y ranking. Las solicitudes de creación guardan sus identificadores en el entorno. Para editar o borrar, ejecuta primero la creación correspondiente y conserva esos valores.

La colección exportada para Postman está en `export/KarenFlix-CRUD.postman_collection.json`. Los ejemplos de cuerpos están en `data/`, y `data/casos-crud.json` resume rutas y respuestas esperadas. Los ejemplos usan datos de prueba; cambia nombres y correos si ya existen en tu base.

Para probar roles, registra dos cuentas distintas. Promueve una a administrador en Workbench siguiendo las instrucciones del README principal y usa su JWT en `adminToken`. `otherToken` sirve para comprobar que una segunda cuenta no puede editar o eliminar recursos ajenos.

Algunas eliminaciones pueden responder `409` si el registro tiene relaciones que impiden borrarlo, por ejemplo una categoría asignada a películas o una película con reseñas. En ese caso, revisa los datos antes de repetir la prueba.
