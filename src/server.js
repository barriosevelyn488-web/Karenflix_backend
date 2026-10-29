import app from './app.js';
import { env } from './config/env.js';
import { verificarConexion, cerrarConexion } from './config/db.js';
try {
  await verificarConexion();
  const server = app.listen(env.port, () =>
    console.log(`KarenFlix API escuchando en puerto ${env.port} [${env.nodeEnv}]`)
  );
  const shutdown = () =>
    server.close(async () => {
      await cerrarConexion();
      process.exit(0);
    });
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} catch (error) {
  console.error('No se pudo iniciar la API o conectar con MySQL:', error.message);
  process.exit(1);
}
