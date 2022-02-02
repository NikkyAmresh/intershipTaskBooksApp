# Internship Task BooksApp


## In this codebase there is mainly 5 APIs are created
#### Create User

1. **POST** `/register` 
   This api creates user which are uniue by email

   ```json
   {
       "name": "Nikky",
       "password": "1234",
       "email": "new@gmail.com",
       "referrerUserEmail": "user2@gmail.com"
    }
    ```

    `name` , `email` and `password` are mandatory fields while `referrerUserEmail` is optional.

    this api returns the authToken on successful account creation.
    ___
2. **POST** `/login` 
    ```json
    {
        "email":"new1@gmail.com",
        "password":"1234"
    }
    ```
    this api returns the authToken on successful login
    `email` and `password` are mandatory fields
    ___
3. **GET** `/secure/`

    this api returns the status of current loggedin user.
    ___

4. **GET** `/secure/me`

    this api returns current User Profile.
    ___
5. **PUT** `/secure/paymentHandler`
    this api verify the currect user and process the payment and reward 10 credits to its referrer user.

    ```json
    {
        "email" : "test@gmail.com"
    }
    ```
## Authentication
- Bearer token in header

