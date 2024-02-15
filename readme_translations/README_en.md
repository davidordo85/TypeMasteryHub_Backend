# TypeMasteryHub Backend

## API Routes

### 🎓 Courses

- **📚 Get Courses**

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

- **📖 Get Specific Topic**

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

- **📖 Get Specific Test**

  - **Endpoint:** `api/v1/test/:topicName/:title`

  - **Method:** 📥 GET

  - **Description:** Retrieves detailed information about a specific test within a topic.

  - **Parameters:**
    - `topicName` (Path Parameter): Name of the topic containing the test.
    - `title` (Path Parameter): Title of the test to retrieve.

  Example JSON response for a successful request:

  ```json
  {
    "success": true,
    "result": [
      {
        "performance": {
          // Details of the performance for the specified topic
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

  - Error Responses:

    - **404 Not Found: When the specified topic is not found.**

    ```json
    {
      "success": false,
      "message": "Topic not found."
    }
    ```

    - **404 Not Found: When the specified course is not found.**

    ```json
    {
      "success": false,
      "message": "Course not found."
    }
    ```

    - **404 Not Found: When the specified test is not found.**

    ```json
    {
      "success": false,
      "message": "Test not found."
    }
    ```

### 👤 User

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

  - Example JSON request:

  ```json
  {
    "username": "example_user",
    "email": "example@email.com",
    "password": "secure_password"
  }
  ```

### 📊 Results

- **🔍 Get results**

  - **Endpoint:** `api/v1/user/results`
  - **Method:** 📥 GET
  - **Description:** Allows a user to obtain information about all their results:

  - Example JSON request:

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

  - Example of headers:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Error responses:

  - **401 Not Found: When the result is not found for the user.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **🎯 Get results by test name**

  - **Endpoint:** `api/v1/user/results/test/:test_name`
  - **Method:** 📥 GET
  - **Description:** Allows a user to obtain information about all their results from the specific test:

  - Example JSON request:

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

  - Example of headers:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Error responses:

  - **401 Not Found: When the result for the test name is not found.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **🎯 Get results by test topic**

  - **Endpoint:** `api/v1/user/results/topic/:topic_name`
  - **Method:** 📥 GET
  - **Description:** Allows a user to obtain information about all their results from the specific topic:

  - Example JSON request:

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

  - Example of headers:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Error responses:

  - **401 Not Found: When the result for the topic name is not found.**

  ```json
  {
    "success": false,
    "message": "Not results found."
  }
  ```

  **➕ Add results**

  - **Endpoint:** `api/v1/user/results/`
  - **Method:** 🔄 PUT
  - **Description:** Allows a user to add the result of their test:

    - `test_name`: Test name.
    - `stars`: Number of stars achieved in the test.
    - `ppm`: Number of pulses per minute in the test (ppm).
    - `time_test`: Duration of the test (seconds).
    - `errorCount`: Number of errors made during the test.

  - Example JSON request:

  ```json
  {
    "topic_name": "topic_name",
    "test_name": "Test name",
    "starts": 3,
    "ppm": 150,
    "time_test": 50,
    "errorCount": 3
  }
  ```

  - Example of headers:

  ```Json
    {
      "Authorization": "Bearer Token"
    }
  ```

  - Error responses:

  **400 Not found: If it does not receive any of the data in the body.**

  ```Json
  {
    "success": false,
    "message": "Missing required fields.",
  }
  ```

  **404 Not found: If not found user**

  ```Json
  {
    "success": false,
    "message": "Not found results",
  }
  ```
