# TypeMasteryHub Backend

## Rutas del API

### Cursos

**📚 Obtener Cursos**

- **Endpoint:** `api/v1/course`
- **Método:** 📥 GET
- **Descripción:** Recupera una lista de cursos disponibles y sus temas.

- Ejemplo de respuesta JSON:

```json
{
  "success": true,
  "result": [
    {
      "courseName": "Course A",
      "topics": [
        { "name": "Topic 1", "order": 1 },
        { "name": "Topic 2", "order": 2 }
      ]
    },
    {
      "courseName": "Course B",
      "topics": [
        { "name": "Topic X", "order": 1 },
        { "name": "Topic Y", "order": 2 }
      ]
    }
  ]
}
```

- Respuestas de Error:

- **500 Internal Server Error: Para errores inesperados durante el proceso de recuperación de datos.**

```json
{
  "success": false,
  "error": "Internal Server Error. Please try again later."
}
```

**📖 Obtener Tema Específico**

- **Endpoint:** `api/v1/course/:name`
- **Método:** 📥 GET
- **Descripción:** Recupera información detallada sobre un tema específico dentro de un curso.

- **Parámetros:**

  - `name` (Parámetro de Ruta): Nombre del tema a recuperar.

  Ejemplo de respuesta JSON para una solicitud exitosa:

  ```json
  {
    "success": true,
    "result": {
      "topicName": "Topic A",
      "tests": [
        { "title": "Test 1", "order": 1 },
        { "title": "Test 2", "order": 2 }
      ]
    }
  }
  ```

- Respuestas de Error:

- **404 Not Found: Cuando no se encuentra el tema especificado.**

```json
{
  "success": false,
  "message": "Topic not found."
}
```

### User

- **🔒 Iniciar Sesión**

  - **Endpoint:** `api/v1/user/login`
  - **Método:** 📤 POST
  - **Descripción:** Permite que un usuario inicie sesión proporcionando ya sea el `username` o el `email` junto con la `password`.
    - `usernameOrEmail`: Ejemplo de nombre de usuario o correo electrónico.
    - `password`: Contraseña segura.

  Ejemplo de solicitud JSON utilizando nombre de usuario o correo electrónico:

  ```json
  {
    "usernameOrEmail": "example_user or email",
    "password": "user_password"
  }
  ```

- **🔐 Registrarse**

  - **Endpoint:** `api/v1/user/register`
  - **Método:** 📤 POST
  - **Descripción:** Permite que un usuario registre una cuenta proporcionando la siguiente información:
    - `username`: Nombre de usuario único.
    - `email`: Dirección de correo electrónico válida.
    - `password`: Contraseña segura.

  Ejemplo de solicitud JSON:

  ```json
  {
    "username": "example_user",
    "email": "example@email.com",
    "password": "secure_password"
  }
  ```