# TypeMasteryHub Backend

## API Routes

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
