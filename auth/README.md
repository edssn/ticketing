## Auth Service
This is the Microservice to handle authorization and acces to the all services in the app.


## Models

#### User
##### UserAttrs
Properties that are required to build a new User
| **Name** | **Type** |
| ------ | ----------- |
| email   | `string` |
| password | `string` |

##### UserDoc
Properties that a User has
| **Name** | **Type** |
| ------ | ----------- |
| email   | `string` |
| password | `string` |

##### UserModel
Properties tied to the Model
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(UserAttrs) => UserDoc` |

## Endpoints
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/users/signup` | POST | `{email: string, password: string}` | Sign up for an account
| `/api/users/signin` | POST | `{email: string, password: string}` | Sign in to an existing account
| `/api/users/signout` | POST | `{}` | Sign out
| `/api/users/currentuser` | GET | `-` | Return info about the user

### Postman Tests
#### Sign Up
![Working Image](/assets/services/auth/signup.png)

#### Sign In
![Working Image](/assets/services/auth/signin.png)

#### Current User
![Working Image](/assets/services/auth/currentuser.png)

#### Sign Out
![Working Image](/assets/services/auth/signout.png)

## Errors Responses
### 
```
Route Not Found (HTTP 404)
{
    errors: {
        "message": "Route not found",
    }
}

Request Invalid (HTTP 400)
{
    "errors": [
        {
            "message": "Email must be valid",
            "field": "email"
        },
        {
            "message": "Password must be between 4 and 20 characters",
            "field": "password"
        }
    ]
}

Database Connection (HTTP 503)
{
    errors: {
        "message": "Error connectiong to database"
    }
}

Unknown (HTTP 400)
{
    errors: {
        "message": "Error connectiong to database"
    }
}
```

## Swagger Test
To tests endpoints with Swagger, open and copy all content of file *swagger_auth_file.txt*. Paste the content to [Swagger Online Editor](https://editor.swagger.io)