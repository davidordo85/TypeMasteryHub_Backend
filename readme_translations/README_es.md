# TypeMasteryHub Backend

## Rutas del API

### 🎓 Cursos

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

### 👤 Usuarios

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

### 📊 Resultados

- **🔍 Obtener resultados**

  - **Endpoint:** `api/v1/user/results`
  - **Método:** 📥 GET
  - **Descripción:** Permite que un usuario obtener información de todos sus resultados:

  - Ejemplo de respuesta JSON:

  ```json
  {
    "success": true,
    "result": {
      "_id": "id_results",
      "id_user": "id_user",
      "resultTest": [
        {
          "topic_name": "topic_name",
          "test_name": "test_name",
          "result": [
            {
              "stars": 2,
              "ppm": 130,
              "time_test": 50,
              "errorCount": 2,
              "date": "date",
              "_id": "id_result"
            },
            {
              "stars": 2,
              "ppm": 130,
              "time_test": 50,
              "errorCount": 2,
              "date": "date",
              "_id": "id_result"
            }
          ],
          "_id": "id_resultTest"
        }
      ],
      "__v": 2
    }
  }
  ```

  - Ejemplo de encabezados:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Respuestas de error:

  - **401 No Encontrado: Cuando no se encuentra el resultado para el usuario.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **🎯 Obtener resultados por nombre de prueba**

  - **Endpoint:** `api/v1/user/results/test/:test_name`
  - **Método:** 📥 GET
  - **Descripción:** Permite que un usuario obtener información de todos sus resultados de la prueba específica:

  - Ejemplo de respuesta JSON:

  ```json
  {
    "success": true,
    "resultsTest": {
      "topic_name": "topic_name",
      "test_name": "lskdajfklsadj",
      "result": [
        {
          "stars": 2,
          "ppm": 130,
          "time_test": 50,
          "errorCount": 2,
          "date": "date",
          "_id": "id_result"
        },
        {
          "stars": 2,
          "ppm": 130,
          "time_test": 50,
          "errorCount": 2,
          "date": "date",
          "_id": "id_result"
        }
      ],
      "_id": "id_resultsTest"
    }
  }
  ```

  - Ejemplo de encabezados:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Respuestas de error:

  - **401 No Encontrado: Cuando no se encuentra el resultado para el nombre de la prueba.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **🎯 Obtener resultados por nombre de tema**

  - **Endpoint:** `api/v1/user/results/topic/:topic_name`
  - **Método:** 📥 GET
  - **Descripción:** Permite que un usuario obtener información de todos sus resultados de el tema específico:

  - Ejemplo de respuesta JSON:

  ```json
  {
    "success": true,
    "resultsTest": {
      "topic_name": "topic_name",
      "test_name": "lskdajfklsadj",
      "result": [
        {
          "stars": 2,
          "ppm": 130,
          "time_test": 50,
          "errorCount": 2,
          "date": "date",
          "_id": "id_result"
        },
        {
          "stars": 2,
          "ppm": 130,
          "time_test": 50,
          "errorCount": 2,
          "date": "date",
          "_id": "id_result"
        }
      ],
      "_id": "id_resultsTest"
    }
  }
  ```

  - Ejemplo de encabezados:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Respuestas de error:

  - **401 No Encontrado: Cuando no se encuentra el resultado para el nombre de el tema.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **➕ Añadir resultados**

  - **Endpoint:** `api/v1/user/results/`
  - **Método:** 🔄 PUT
  - **Descripción:** Permite a un usuario añadir el resultado de su prueba:

    - `test_name`: Nombre de la prueba.
    - `stars`: Número de estrellas conseguida en la prueba.
    - `ppm`: Número de pulsaciones por minuto en la prueba (ppm).
    - `time_test`: Tiempo de duración de la prueba (segundos).
    - `errorCount`: Número de errores cometidos durante la prueba.

  - Ejemplo solicitud JSON:

  ```json
  {
    "topic_name": "topic_name",
    "test_name": "Nombre del test",
    "starts": 3,
    "ppm": 150,
    "time_test": 50,
    "errorCount": 3
  }
  ```

  - Ejemplo de encabezados:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Respuestas de error:

  **400 Not found: Si no recibe cualquiera de los datos en el body**

  ```Json
  {
    "success": false,
    "message": "Missing required fields.",
  }
  ```

  **404 Not found: Si no encuentra pruebas de el usuario**

  ```Json
  {
    "success": false,
    "message": "Not found results",
  }
  ```
