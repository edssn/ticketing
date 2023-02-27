## User Resource

| **Name** | **Type** |
| :------: | :-----------: |
| email   | string |
| password | string |

## Services
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/users/signup` | POST | `{email: string, password: string}` | Sign up for an account
| `/api/users/signin` | POST | `{email: string, password: string}` | Sign in to an existing account
| `/api/users/signout` | POST | `{}` | Sign out
| `/api/users/currentuser` | POST | `-` | Return info about the user

## Errors Responses

### Route Not Found
```
HTTP 404
{
    errors: {
        "message": "Route not found",
    }
}
```

### Request Invalid
```
HTTP 400
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
```

### Database Connection
```
HTTP 503
{
    errors: {
        "message": "Error connectiong to database"
    }
}
```

### Unknown
```
HTTP 400
{
    errors: {
        "message": "Error connectiong to database"
    }
}
```