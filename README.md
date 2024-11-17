# General considerations

This project was developed using Laravel 11 and DDEV as the local development environment. To set it up, I recommend using DDEV and running the following commands:
## 1. Configure the project
```
ddev config --project-type=laravel --docroot=public --create-docroot
```
## 2. Start the DDEV environment
```
ddev start
```
## 3. Launch the project in your browser
```
ddev launch
```
## 4. Prepare the database
```
ddev artisan migrate
ddev artisan db:seed
```

And that’s it! 🚀 Your Laravel project should now be ready to use.


# API Documentation: User Login

This document provides comprehensive information about the `User Login` request. This endpoint allows users to log in to the system by providing valid credentials.

## Endpoint

- **URL:** `https://task.ddev.site/api/auth/login`
- **Method:** `POST`

## Headers

The request requires the following headers:

- `Content-Type: application/json`

## Request Body

The body of the request must be sent as raw JSON with the following fields:

- `email`: The user's email address.
- `password`: The user's password.

### Example

```json
{
    "email": "andres.guerrero@staffboom.com",
    "password": "andresguerrero"
}
```

## Response

Upon a successful login, the server will return a response containing user-specific data, typically including a new token for authentication in future requests.

- **Status Code:** `200 OK`
- **Response Format:** JSON


When using this endpoint, ensure that the access token and credentials are kept secure, especially in production environments.

# API Documentation: Create Task

This document provides information about the `Create Task` request. This endpoint allows users to create a new task by providing necessary details such as title, description, status, and expiration date.

## Endpoint

- **URL:** `https://task.ddev.site/api/tasks`
- **Method:** `POST`

## Headers

The request requires the following headers for proper authentication and data processing:

- `Content-Type: application/json`
- `Authorization: Bearer <your_access_token>`
  - Example: `Bearer 4|MXGTDt5Uh6bfwrrjMRBn8x5lKK2GaL3TE9L4DChkd2c3c0e0`

## Request Body

The body of the request must be sent as raw JSON with the following fields:

- `title`: The title of the task.
- `description`: A detailed description of the task.
- `status`: The initial status of the task (e.g., `0` for pending).
- `expiration`: The expiration date and time for the task in `YYYY-MM-DD HH:MM:SS` format.

### Example

```json
{
    "title": "task title",
    "description": "task description",
    "status": 0,
    "expiration": "2024-11-16 17:19:34"
}
```

## Response

Upon successfully creating a task, the server will return a response containing details about the created task.

- **Status Code:** `200 OK`
- **Response Format:** JSON


Ensure that all fields are correctly formatted and valid before making the request to prevent errors. This will ensure successful task creation and minimize request failures.

# API Documentation: Create Task (Without Payload Data)

This document provides information about the `Create Task` endpoint when no payload data is supplied. The endpoint allows users to initiate a task creation request, but without providing specific task details in the body.

## Endpoint

- **URL:** `https://task.ddev.site/api/tasks`
- **Method:** `POST`

## Headers

To authenticate and authorize the request, you must include the following headers:

- `Content-Type: application/json`: Specifies that the request body format is JSON.
- `Authorization: Bearer <your_access_token>`: Access token for authenticating the request.
  - Example: `Bearer 4|MXGTDt5Uh6bfwrrjMRBn8x5lKK2GaL3TE9L4DChkd2c3c0e0`

## Request Body

No data is included in the body of this request (`--data ''`). Therefore, no task details such as title, description, or expiration date will be provided, which could result in errors depending on the endpoint's validation requirements.

## Expected Response

Since no data is provided, the server is expected to return an error indicating missing required fields for creating a task.

- **Common Status Code:** `200 OK` or another relevant code indicating incomplete input.
- **Response Format:** JSON


To successfully create a task, ensure that all required fields are included in the request body in future requests. This will allow the server to process the task creation request accurately.

# API Documentation: Retrieve Specific Task

This document provides information on the `Retrieve Specific Task` endpoint for fetching details of a task with a specified ID.

## Endpoint

- **URL:** `https://task.ddev.site/api/tasks/6`
- **Method:** `GET`

## Headers

To authenticate and authorize the request, you must include the following headers:

- `Content-Type: application/json`: Indicates that the request expects a JSON response.
- `Authorization: Bearer <your_access_token>`: Access token for authenticating the request.
  - Example: `Bearer 4|MXGTDt5Uh6bfwrrjMRBn8x5lKK2GaL3TE9L4DChkd2c3c0e0`

## Request Body

For a `GET` request to retrieve task details, no body data is required. The query parameters or path parameters are generally used instead.

## Expected Response

This request fetches details for the task with ID `6`. The server should return the task details in a JSON format.

- **Common Status Code:** `200 OK`
- **Response Format:** JSON


Ensure your request has valid authorization credentials and points to an existing task ID for successful retrieval.

# API Documentation: Update a Specific Task

This document outlines the `Update a Specific Task` endpoint, which allows you to update the details of a task identified by its ID.

## Endpoint

- **URL:** `https://task.ddev.site/api/tasks/6`
- **Method:** `PUT`

## Headers

The following headers are required to authorize and process your request:

- `Content-Type: application/json`: Specifies that the request body is JSON.
- `Authorization: Bearer <your_access_token>`: Provides the necessary token for user authentication.
  - Example: `Bearer 4|MXGTDt5Uh6bfwrrjMRBn8x5lKK2GaL3TE9L4DChkd2c3c0e0`

## Request Body

Include a JSON object in the request body to specify the task attributes you want to update:

```json
{
    "title": "task title 5",
    "description": "task description",
    "status": 0
}
```

- **title**: The new title for the task.
- **description**: Updated description for the task.
- **status**: Status of the task, where `0` might indicate an incomplete or pending state.

## Expected Response

Upon successful execution, this request will update the task details. The server typically responds with the updated task data in JSON format.

- **Common Status Code:** `200 OK`
- **Response Format:** JSON


Ensure the task ID exists and the authorization credentials are valid before making the request.

# API Documentation: Delete a Specific Task

This document outlines the `Delete a Specific Task` endpoint, which allows you to delete a task by its ID.

## Endpoint

- **URL:** `https://task.ddev.site/api/tasks/5`
- **Method:** `DELETE`

## Headers

The following headers are required to authorize and process your request:

- `Content-Type: application/json`: Specifies that the request body is JSON.
- `Authorization: Bearer <your_access_token>`: Provides the necessary token for user authentication.
  - Example: `Bearer 4|MXGTDt5Uh6bfwrrjMRBn8x5lKK2GaL3TE9L4DChkd2c3c0e0`


## Expected Response

Upon successful execution, this request will delete the specified task. The server typically confirms the deletion with a status message or an empty response.

- **Common Status Code:** `200 OK`
- **Response Format:** May vary; often no content if successful.


Ensure the task ID exists and the authorization credentials are valid before making the request.
