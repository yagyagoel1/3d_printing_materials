# Material Storing System

3D printing Materials is a Node.js application for managing materials. It uses MongoDB for data storage and Cloudinary for image storage. The application includes endpoints for CRUD operations on materials, integrates with Prometheus for monitoring, eslint and prettier for linting the code and docker for containerization.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
  - [Get All Materials](#get-all-materials)
  - [Create Material](#create-material)
  - [Get Material by ID](#get-material-by-id)
  - [Update Material](#update-material)
  - [Delete Material](#delete-material)
  - [Get Metrics](#get-metrics)
- [Testing](#testing)
- [Code formatting](#code-formatting)
- [Additional Information](#additional-information)
- [Conclusion](#conclusion)

## Setup and Installation

### Prerequisites
 - Node.js (v20.x or later)
 - Docker
 - MongoDB

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yagyagoel1/3d_printing_materials
    cd 3d_printing_materials
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory with the following environment variables or you can copy the .env.sample:**
    ```
    MONGODB_URL=mongodb://localhost:27017/
    DB_NAME=yourDatabaseName
    CLOUDINARY_CLOUD_NAME=yourCloudinaryCloudName
    CLOUDINARY_API_KEY=yourCloudinaryAPIKey
    CLOUDINARY_API_SECRET=yourCloudinaryAPISecret
    PORT=8000
    CORS_ORIGIN=http://localhost:3000
    ```


    
### Running the Server without docker

4. **Ensure MongoDB is running on your system using docker or you should have provided the url to it in env file:**

*to run mongo using docker run:*
```sh
sudo docker run -p 27017:27017 -d mongo 
```

5. **Running the server**
    ```sh
    npm run start 
    ```



### Running the Server with docker

4. **ensure the env  file has all the required environment variable(mongodb url is going to get overridden by docker compose file)**

5. **Running the server**
    ```sh
    sudo docker-compose up 
    ```


The server should be running on `http://localhost:8000`.

## API Endpoints

### Get All Materials

- **URL:** `/api/v1/materials`
- **Method:** `GET`
- **Query Parameters:** `page` (optional, default: 1)
- **Success Response:**
    - **Code:** 200
    - **Content:**
        ```json
        {
          "statusCode": 200,
          "message": "Successfully fetched the materials",
          "data": [
            {
              "_id": "60c72b2f5f1b2c001d8e4b6a",
              "name": "Material 1",
              "technology": "Tech 1",
              "colors": ["red", "blue"],
              "pricePerGram": 2.5,
              "applicationTypes": ["type1", "type2"],
              "imageUrl": "http://example.com/image1.jpg"
            },
            ...
          ]
        }
        ```

### Create Material

- **URL:** `/api/v1/materials`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "name": "New Material",
      "technology": "New Technology",
      "colors": "[\"red\", \"blue\"]",
      "pricePerGram": "2.5",
      "applicationTypes": "[\"type1\", \"type2\"]"
    }
    ```
- **Form Data:** `material_img` (image file)
- **Success Response:**
    - **Code:** 201
    - **Content:**
        ```json
        {
          "statusCode": 201,
          "message": "Material created successfully",
          "data": {
            "_id": "60c72b2f5f1b2c001d8e4b6a",
            "name": "New Material",
            "technology": "New Technology",
            "colors": ["red", "blue"],
            "pricePerGram": 2.5,
            "applicationTypes": ["type1", "type2"],
            "imageUrl": "http://example.com/image1.jpg"
          }
        }
        ```

### Get Material by ID

- **URL:** `/api/v1/materials/:id`
- **Method:** `GET`
- **Success Response:**
    - **Code:** 200
    - **Content:**
        ```json
        {
          "statusCode": 200,
          "message": "Material fetched successfully",
          "data": {
            "_id": "60c72b2f5f1b2c001d8e4b6a",
            "name": "Material 1",
            "technology": "Tech 1",
            "colors": ["red", "blue"],
            "pricePerGram": 2.5,
            "applicationTypes": ["type1", "type2"],
            "imageUrl": "http://example.com/image1.jpg"
          }
        }
        ```

### Update Material

- **URL:** `/api/v1/materials/:id`
- **Method:** `PUT`
- **Request Body:** (without image)
    ```json
    {
      "name": "Updated Material",
      "technology": "Updated Technology",
      "colors": ["green", "yellow"],
      "pricePerGram": 3.5,
      "applicationTypes": ["type3", "type4"]
    }
    ```
- **Success Response:**
    - **Code:** 200
    - **Content:**
        ```json
        {
          "statusCode": 200,
          "message": "Material updated successfully",
          "data": {
            "_id": "60c72b2f5f1b2c001d8e4b6a",
            "name": "Updated Material",
            "technology": "Updated Technology",
            "colors": ["green", "yellow"],
            "pricePerGram": 3.5,
            "applicationTypes": ["type3", "type4"],
            "imageUrl": "http://example.com/image1.jpg"
          }
        }
        ```

### Delete Material

- **URL:** `/api/v1/materials/:id`
- **Method:** `DELETE`
- **Success Response:**
    - **Code:** 200
    - **Content:**
        ```json
        {
          "statusCode": 200,
          "message": "Material deleted successfully"
        }
        ```

### Get Metrics

- **URL:** `/api/v1/metrics`
- **Method:** `GET`
- **Success Response:**
    - **Code:** 200
    - **Content:** Prometheus metrics in text format

## Testing

1. **Before running the test ensure that all the environment variable are provided in ``` .env ``` file**

2. **Also make sure the mongodb url is either provided that of an actual instance or Docker is running in the background**

*to run mongo using docker run:*
```sh
sudo docker run -p 27017:27017 -d mongo 
```

3. **To run tests, use the following command:**
```sh
npm test
```

## Code Formatting

**To format your code, use the following command:**

```sh
npm run format
```

**This command will run Prettier and ESLint to format and fix your code according to the defined standards.**

## Additional Information

**Logger Configuration**

The application uses Winston for logging. The logger is configured to log messages to both the console and log files.

**Cloudinary Integration**

The application uses Cloudinary for image uploads. Ensure that you have set the correct Cloudinary credentials in your .env file.

**Rate Limiting and Security**

The application uses express-rate-limit and helmet for basic security and rate limiting.

**Monitoring**

The application uses prometheus to monitor each route.

**Health Check**
A simple health check endpoint is available at the root URL (/):

```http

GET /
```
***Response:***
```json
{
  "message": "Is Healthy"
} 
```
## Conclusion

The  application is a robust and scalable solution for managing materials, integrating seamlessly with MongoDB for data storage and Cloudinary for image management. With a comprehensive set of API endpoints, it supports all essential CRUD operations and ensures efficient data handling. The inclusion of Prometheus for monitoring and robust security measures like rate limiting and helmet makes it a reliable choice for production environments.

The provided setup guide and detailed instructions make it easy to get started and maintain the application. With automated tests and code formatting tools, you can ensure the codebase remains clean and functional. Whether you are developing new features or maintaining existing ones, this documentation should serve as a valuable resource.

For any further questions or issues, please refer to the project's GitHub repository or reach out to ```yagyagoel87@gmail.com```. Thank you for using this application, and we hope it meets all your material management needs effectively.
