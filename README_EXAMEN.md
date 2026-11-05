# Exportacion de Resenas en CSV

Se implemento un endpoint en el backend que permite exportar todas las resenas asociadas a una pelicula en un archivo CSV dentro del servidor.

El archivo generado incluye:
- Nombre del usuario
- Calificacion asignada en escala de 1 a 5
- Comentario de la resena
- Fecha de creacion

El archivo se almacena en el directorio `exports/` del servidor y el endpoint responde con un objeto JSON confirmando la operacion sin forzar la descarga en el cliente.

---

## 1. Puesta en marcha del backend

Para instalar dependencias y levantar el servidor en entorno local:

```bash
cp .env.example .env
npm install
npm run dev
```

El servidor quedara disponible en `http://localhost:3000`.

---

## 2. Apertura de Bruno en Linux

Para evitar problemas de renderizado de interfaz en Linux con Electron:

```bash
/home/camper/Descargas/bruno_4.2.1_x86_64_linux.AppImage --no-sandbox --disable-gpu &
```

---

## 3. Pruebas desde Bruno

1. Abrir la coleccion ubicada en `bruno/KarenFlix API`.
2. Seleccionar el entorno `local` (`baseUrl: http://localhost:3000`).
3. Seleccionar la solicitud `Exportar resenas en CSV`.
   - Metodo: `POST`
   - URL: `{{baseUrl}}/api/v1/peliculas/1/exportar-resenas`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {}
     ```
4. Presionar Send.

### Respuesta esperada (HTTP 200)

```json
{
  "status": "success",
  "message": "Archivo CSV generado exitosamente en el servidor",
  "data": {
    "archivo": "resenas_pelicula_1.csv",
    "ruta": "exports/resenas_pelicula_1.csv",
    "total_resenas": 1,
    "pelicula": "Interstellar"
  }
}
```

---

## 4. Prueba alternativa con cURL

```bash
curl -X POST http://localhost:3000/api/v1/peliculas/1/exportar-resenas
```

---

## 5. Verificacion del archivo en el servidor

Para comprobar la creacion y el contenido del archivo generado:

```bash
ls -la exports/
cat exports/resenas_pelicula_1.csv
```

Estructura del archivo CSV resultante:

```csv
Nombre del usuario,Calificacion (1 a 5),Comentario,Fecha de creacion
"Admin Karenflix",5,"Una obra maestra del cine","2026-11-05 13:09:43"
```
