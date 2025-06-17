# Kanban board server api integration documentation.

## User Authentication documentation

### Register User

register api url : https://kanban-board-server-side-app-assessment.onrender.com/users/register
method: POST

#### Register schema model

```js
    {
        fullName: string,
        email: string,
        passoword:string
    }
```
* After Succesfully User Registration Get a Response Message like this:

```json
    { 
        "success": true,
        "message": "Registration User Successfully." //Status Code 201
    }
```

### Login User

login api url : https://kanban-board-server-side-app-assessment.onrender.com/users/login
method: POST

#### Login schema model

```js
    {
        email: string,
        passoword:string
    }
```
* After Succesfully User Login Get a Response Message like this:

```js
    { 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", 
    message: "User Logged in Successfully", 
    user: { 
        id: user._id,
         name: user.fullName 
         } 
    }
```
### Logout User

login api url : https://kanban-board-server-side-app-assessment.onrender.com/users/logout
method: POST


* After Succesfully User LogOut Get a Response Message like this:

```js
    {
     success: true,
     message: "User Logged Out Successfully" 
     }
```

