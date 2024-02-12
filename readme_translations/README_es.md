# TypeMasteryHub Backend

## Rutas del API

### Cursos

- **📚 Obtener Cursos**

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

- **📖 Obtener Tema Específico**

  - **Endpoint:** `api/v1/course/:name`
  - **Método:** 📥 GET
  - **Descripción:** Recupera información detallada sobre un tema específico dentro de un curso.

  - **Parámetros:**

    - `name` (Parámetro de Ruta): Nombre del tema a recuperar.

  - Ejemplo de respuesta JSON para una solicitud exitosa:

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

- **📖 Obtener Prueba Específica**

  - **Endpoint:** `api/v1/test/:topicName/:title`
  - **Método:** 📥 GET
  - **Descripción:** Obtiene información detallada sobre una prueba específica dentro de un tema.

  - **Parámetros:**
    - `topicName` (Parámetro de Ruta): Nombre del tema que contiene la prueba.
    - `title` (Parámetro de Ruta): Título de la prueba a recuperar.

  Ejemplo de respuesta JSON para una solicitud exitosa:

  ```json
  {
    "success": true,
    "result": [
      {
        "performance": {
          // Detalles del rendimiento para el tema especificado
        },
        "test": {
          "title": "Test Title",
          "order": 1,
          "text_test": "jsadjfldsajfl"
        }
      }
    ]
  }
  ```

  - Respuestas de error:

    - **404 No Encontrado: Cuando no se encuentra el tema especificado.**

    ```json
    {
      "success": false,
      "message": "Topic not found."
    }
    ```

    - **404 No Encontrado: Cuando no se encuentra el curso especificado.**

    ```json
    {
      "success": false,
      "message": "Course not found."
    }
    ```

    - **404 No Encontrado: Cuando no se encuentra la prueba especificada.**

    ```json
    {
      "success": false,
      "message": "Test not found."
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

- **📊 Add result**

  - **Endpoint:** `api/v1/user/addResult`
  - **Method:** 📤 POST
  - **Middleware:** `jwtAuth` para autenticación.
  - **Description:** Permite a los usuarios enviar resultados de pruebas proporcionando información como el ID del tema, el ID de la prueba, las estrellas obtenidas, las pulsaciones por minuto (ppm) durante la prueba, el tiempo de duración del test y los errores cometidos.

    - `id_topic`: ID del tema.
    - `id_test`: ID de la prueba.
    - `stars`: Número de estrellas obtenidas en la prueba.
    - `ppm`: Pulsaciones por minuto (ppm).
    - `time_test`: Tiempo de duración del test (segundos).
    - `errorCount`: Número de errores cometidos en el test.

  Ejemplo solicitud JSON:

  ```json
  {
    "id_topic": "example_id",
    "id_test": "example_id",
    "stars": "3",
    "ppm": "80",
    "time_test": "45",
    "errorCount": "3"
  }
  ```

  Ejemplo de encabezados:

  ```json
  {
    "Authorization": "Bearer Token"
  }
  ```

  - **404 Not Found: When the specified user is not found.**

  ```json
  {
    "success": false,
    "message": "User does not exist."
  }
  ```
