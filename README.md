# Videos Corporativos

Plataforma web de videos corporativos hecha con React 18, Vite, Tailwind CSS y React Router v6.
Es solo el **frontend**: no hay backend, todo está simulado en el navegador para que
puedas aprender a conectarlo con tu propio servidor (por ejemplo Java/Spring) más adelante.

## Instalar

```bash
npm install
```

## Arrancar

```bash
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

## Probar

```bash
npm test          # modo interactivo
npm test -- --run # una sola vez
```

## Compilar para producción

```bash
npm run build
```

## Datos de prueba (mock)

- Registro: cualquier correo corporativo (no gmail, hotmail, outlook, yahoo, live, icloud).
  El correo `existente@empresa.com` simula el error "ya registrado".
- Login: cualquier correo válido con cualquier contraseña. La contraseña `incorrecta1!`
  simula "credenciales inválidas".

## Estructura

```
src/
  components/  Piezas de la interfaz (Navbar, Sidebar, HeroBanner, VideoCard,
               VideoCarousel, VideoModal, RegisterForm, LoginForm, Toast, Spinner,
               ProtectedRoute, FormField...)
  pages/       Pantallas: LoginPage, RegisterPage, HomePage
  context/     AuthContext (sesión) y ToastContext (avisos)
  hooks/       useRegisterForm (lógica del formulario de registro)
  services/    api.js (URL base y fetch), authService.js, videoService.js
  utils/       validators.js (validaciones), constants.js, format.js, storage.js
  data/        videos.js (videos de ejemplo)
  test/        configuración de pruebas
```

## Cómo conectarlo a tu backend

Toda la comunicación con el servidor está en `src/services/`. Cada función mock tiene un
comentario `TODO backend` con el endpoint y el JSON exacto.

1. Copia `.env.example` a `.env` y ajusta la URL:
   `VITE_API_URL=http://localhost:8080/api`
2. En `authService.js` y `videoService.js` reemplaza el mock por `fetch` (puedes usar el
   helper `request()` de `api.js`).

| Acción | Endpoint | Cuerpo (JSON) | Respuesta |
|---|---|---|---|
| Registrar usuario | `POST /api/usuarios` | `{ "nombre", "correo", "rol", "departamento", "contrasenia" }` | `201` con `{ "id", "nombre", "correo", "rol", "departamento" }`; `409` si el correo existe |
| Iniciar sesión | `POST /api/auth/login` | `{ "correo", "contrasenia" }` | `200` con `{ "token", "usuario": {...} }`; `401` si no coincide |
| Listar videos | `GET /api/videos` | - | Lista de videos (`id, seccion, titulo, descripcion, autor, departamento, duracion, vistas, thumbnail, videoUrl, recursos[]`) |

Valores de `rol`: `ADMINISTRADOR`, `COLABORADOR`, `GESTOR_DE_CONTENIDO`.
Valores de `departamento`: `TECNOLOGIA`, `RECURSOS_HUMANOS`, `MARKETING`, `FINANZAS`, `OPERACIONES`.

Notas importantes:

- **Contraseñas:** el frontend envía la contraseña por HTTPS y el backend la guarda
  cifrada (hash, por ejemplo BCrypt) en `contrasenia_hash`. Nunca se guarda en texto plano.
- **CORS:** el navegador bloquea las llamadas a otro origen (el frontend en `:5173`, el
  backend en `:8080`). En Spring Boot permite el origen del frontend, por ejemplo con
  `@CrossOrigin(origins = "http://localhost:5173")` o una configuración global de CORS.
- **Token:** al conectar el login real, guarda el `token` y envíalo en la cabecera
  `Authorization: Bearer <token>` en las siguientes peticiones.
