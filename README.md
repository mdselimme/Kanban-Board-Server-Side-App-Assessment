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

```js
    { 
        success: true,
        message: "Registration User Successfully."
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

## Todos Management documentation

### Add Todo by With User id

register api url : https://kanban-board-server-side-app-assessment.onrender.com/todos/add-todo

method: POST

#### Add Todo schema model

```js
    {
    userId: string,
    todoTitle: string,
    todoDescription: string,
    todoDeadline:Date,//ISO format
    todoPriority:string,
    todoStatus: string //["todo", "in_progress", "done"] within this values
}
```
* After Succesfully todo create Get a Response Message like this:

```js
    { 
        success: true,
        message: "Todo Added Successfully.",
        todoTitle: "Hello"//which title will you give 
    }
```

### Get Todos filter With User id

register api url : https://kanban-board-server-side-app-assessment.onrender.com/todos/user-todo/:userId

method: GET

* After Succesfully find to by given id response: An array of todos


