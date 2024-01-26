
# API Rest - Backend Tattoo Studio


# Target

This project required a functional API connected through a MySQL database.

Chosen topic was Tattoo Studio or shop, where the user could create appointments  with an admin user who could modify, create and handle users. 

## Stack or Tooling:

- TypeScript.
- TypeORM.
- Express.
- NodeJS.

   
## Database Schema:
![Schema](./schema.png)

## Installation:

### Local installation:

    1. Clone the repository by using: 'git clone 'https://github.com/kxlde/fsd_project3.git' in the terminal.
    2. Install the node modules by typing: 'npm i' or 'npm install'
    3. To run the server, type 'npm run dev' in the terminal. (You firstly need to have docker installed and running otherwise it will not get started)
    4. To refresh the server run: 'npm run db:refresh' in the terminal it will drop, seed and start the server.

## Endpoints:

#### To register 📃

    POST localhost:3000/api/auth/register

 #### Body:

    {
    "username": "username",
    "password": "password",
    "email": "email@email.com"
    }

#### To login 🔓

    POST localhost:3000/api/auth/login

  #### Body:

    {
    "email": "email@email.com",
    "password": "password"
    }

### Interest users ✨

 Admin user:

    {
    "username": "admin",
    "email": "root",
    "password": "admin@email.com"
    }

Artist user:

    {
    "username": "artist",
    "email": "root",
    "password": "artist@email.com"
    }

Customer user:

    {
    "username": "customer",
    "email": "root",
    "password": "customer@email.com"
    }

#### To update a profile ✏

    PUT localhost:3000/api/auth/profile

    User token is required.

 #### Body:

    {
    "username": "juan",
    "email": "juan@email.com",
    "password": "4321"
    }

#### To watch your profile 👀

    GET localhost:3000/api/auth/profile

    User token is required.

#### To watch all artists 🎨

    GET localhost:3000/api/auth/artists/


### Create appointments 📑

    POST localhost:3000/api/appointments

    User token is required.

 #### Body:

    {
    "artist_id": "ID",
    "date": "YYYY-MM-DD HH-MM-SS"
    }

### Delete appointment ❌

    DELETE localhost:3000/api/appointments/2

    User token is required.

### Check my appointments (as Customer)😀

    GET localhost:3000/api/appointments

    User token is required.

### Check my appointments (as Artist)😎

    GET localhost:3000/api/artist  

    Artist token is required.

### As admin👑:

### Create artist✔

    POST localhost:3000/api/artists/

 #### Body:

    {
    "user_id": "ID",
    "name": "artistic_name",
    }

### List all users👨‍👨‍👧‍👧

    GET localhost:3000/api/users/

### Delete user🚩

    DELETE localhost:3000/api/:id


## License

My personal license, but Apache License is being used to simulate a standard license with its full text license.

## Documentation used

- https://typeorm.io/
- https://nodejs.org/docs/latest/api/
- https://expressjs.com/
- https://learning.postman.com/docs/introduction/overview/
- https://dbeaver.com/docs/dbeaver/
- https://docs.docker.com/