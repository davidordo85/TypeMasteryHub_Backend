# TypeMasteryHub Backend

## API Routes

### Courses

**📚 Get Courses**

- **Endpoint:** `api/v1/course`
- **Method:** 📥 GET
- **Description:** Retrieves a list of available courses and their topics.

- Example JSON response:

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

- Error Responses:

- **500 Internal Server Error: For unexpected errors during the data retrieval process.**

```json
{
  "success": false,
  "error": "Internal Server Error. Please try again later."
}
```

**📖 Get Specific Topic**

- **Endpoint:** `api/v1/course/:name`
- **Method:** 📥 GET
- **Description:** Retrieves detailed information about a specific topic within a course.

- **Parameters:**

  - `name` (Path Parameter): Name of the topic to retrieve.

  Example JSON response for a successful request:

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

- Error Responses:

- **404 Not Found: When the specified topic is not found.**

```json
{
  "success": false,
  "message": "Topic not found."
}
```

### User

- **🔒 Login**

  - **Endpoint:** `api/v1/user/login`
  - **Method:** 📤 POST
  - **Description:** Allows a user to log in by providing either the `username` or `email` along with the `password`.
    - `usernameOrEmail`: Example username or email.
    - `password`: Secure password.

  Example JSON request using username or email:

  ```json
  {
    "usernameOrEmail": "example_user or email",
    "password": "user_password"
  }
  ```

- **🔐 Register**

  - **Endpoint:** `api/v1/user/register`
  - **Method:** 📤 POST
  - **Description:** Allows a user to register an account by providing the following information:
    - `username`: Unique username.
    - `email`: Valid email address.
    - `password`: Secure password.

  Example JSON request:

  ```json
  {
    "username": "example_user",
    "email": "example@email.com",
    "password": "secure_password"
  }
  ```
