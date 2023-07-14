# Back-end E-commerce Gaming Store
This is an Express REST API project developed using NodeJs and MongoDB. 

## Main Services
- User Service: Responsible for managing the customers.
- Product Service: Responsible for managing the products available on the website. This includes features like adding, updating, and deleting products, as well as managing product categories and attributes that is managed by admin.
- Library Service: Responsible for managing the user's Library and adding products to it by purchasing it.
- Order Service: Responsible for creating and cancelling orders made by customers, basically purchase history.
- Cart Service: Responsible for managing the shopping cart and adding products to it.
- WishList Service: Responsible for managing the wish list and adding products to it.

## Technology stack
- NodeJS
- ExpressJS
- MongoDB

## Used Packages
- Multer: Uploading files. 
- Cloudinary: Hosting images.
- bcrypt: Password hashing.
- Stripe: Payment handling.
- JWT: Token generation.
- DotEnv: Envirnoment variables.

## Getting Started with project
- Clone to your local machine.
- NPM install dependacies.
- Create .env file and add envirnoment varibles.
- NPM start.

## API Endpoints:

## Users

### Get all users
- #### GET /users/
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  }
  
### Get user data with token
- #### GET /users/user-info
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  }

### Create new user
- #### POST /users/
- ```
  "req":{
  "body" : {
    "email" : "ahmed100@gmail.com",
    "user_name" : "Ahmed",
    "password" : "Ah123456789",
    "repeat_password": "Ah123456789"
    }
  }

### Login to site, get token
- #### POST /users/login
- ```
  "req":{
  "body" : {
    "email" : "ahmed100@gmail.com",
    "password" : "Ah123456789",
    }
  }
- ```
  "res":{
  "body" : {
    "message": "user logged in successfully!",
    "user": {
        "_id": "64a54d1b505f84baf547a6a1",
        "user_name": "Ahmed",
        "email": "ahmed100@gmail.com",
        "role": "user",
        "profile_pic": "http://res.cloudinary.com/ddkkalgoh/image/upload/v1689198316/profile_pics/user-5.png.png",
        "balance": 0,
        "created_at": "2023-07-05T10:38:54.522Z",
        "__v": 0,
        "orders": [],
        "library": [],
        "wishlist": [],
        "orders": [],
        "cart": []
  }

### Update user data
- #### PATCH /users/:id
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  }
- ```
  "res":{
  "body" : {
    "message" : "user updated successfully"
    }
  }

### Upload user profile picture
- #### PATCH /users/:id/profile_pic
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  }
- ```
  "res":{
  "body" : {
    "message" : "user updated successfully"
    }
  }

### Change user password
- #### PATCH /users/:id/changePassword
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  "body": {
      "currentPassword" : "Ah123456789",
      "newPassword" : "Ah123456",
      "confirmPassword" : "Ah123456"
    }
  }
- ```
  "res":{
  "body" : {
    "message" : "user updated successfully"
    }
  }

### Change user role, used by admin only
- #### PATCH /users/changeRole
- ```
  "req":{
  "header" : {
    "authorization" : --token--
    }
  }
- ```
  "res":{
  "body" : {
    "message" : "user updated successfully"
    }
  }
