## User Resource

| **Name** | **Type** |
| :------: | :-----------: |
| email   | string |
| password | string |

## Services
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| /api/users/signup | POST | {email: string, password: string} | Sign up for an account
| /api/users/signin | POST | {email: string, password: string} | Sign in to an existing account
| /api/users/signout | POST | {} | Sign out
| /api/users/currentuser | POST | - | Return info about the user