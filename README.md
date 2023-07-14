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
- ``` "req":{
  "header" : {
    "authorization" : --token--
    }
  }

### Get user data with token
- #### GET /users/user-info

### Login to site, get token
- #### POST /users/login

### Create new user
- #### POST /users/

### Update user data
- #### PATCH /users/:id

### Upload user profile picture
- #### PATCH /users/:id/profile_pic

### Change user password
- #### PATCH /users/:id/changePassword

### Change user role, used by admin only
- #### PATCH /users/changeRole
