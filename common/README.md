## Common Functions
This is the project of a npm library with commons errors, events and middlewares along the entire app. 

## Installation
```
npm install @edssntickets/common
```

## Errors
#### Custom
This is an abstract class that acts as parent class for different types of errors. 
This class cannot be instanced and only is used to extends.


#### Bad Request
This class allows you to raise an error when the request parameters are incorrect. The class constructor params is an string.

The raised error shoul be catch by **errorHandler Middleware**

##### Usage
```
import { BadRequestError } from '@edssntickets/common';

...
const existingUser = await User.findOne({ email });
if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
}
...
```


#### Database Connection
This class allows you to raise an error when there is a error connecting to database. The raised error shoul be catch by **errorHandler Middleware**

##### Usage
```
import { DatabaseConectionError } from '@edssntickets/common';

...
try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {});
    console.log('Connected to MongoDb');
  } catch (err) {
    throw new DatabaseConectionError();
  }
...
```


#### Not Authorized
This class allows you to raise an error when the request doesn't have a authorization cookie. The raised error shoul be catch by **errorHandler Middleware**

##### Usage
```
import { NotAuthorizedError } from '@edssntickets/common';

...
if (!req.currentUser) {
    throw new NotAuthorizedError();
}
...
```


#### Not Found
This class allows you to raise an error when the resource requested doesn't exists. The raised error shoul be catch by **errorHandler Middleware**

##### Usage
```
import { NotFoundError } from '@edssntickets/common';

...
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
...
```


#### Request Validation
This class allows you to raise an error when a request body fails the [express-validator](https://express-validator.github.io/docs) validation. The class param is an array of [ValidationError](https://express-validator.github.io/docs/validation-result-api/) object.

The raised error shoul be catch by **errorHandler Middleware**

##### Usage
```
import { RequestValidationError } from '@edssntickets/common';

...
const errors = validationResult(req);
if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
}
...
```



## Middlewares
#### Current User
This is and NodeJS - Express Middleware to decode jwt inside cookie session and get information from logged user. The decoded information is set in currentUset attribute of Request object. 

##### Usage
```
import { currentUser } from '@edssntickets/common';

...
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
...
```

#### Error Handler
This is and NodeJS - Express Middleware to handle raised error of type *BadRequestError, DatabaseConectionError, NotAuthorizedError, NotFoundError and RequestValidationError*.  

##### Usage
```
import { errorHandler } from '@edssntickets/common';

...
const app = express();
app.use(errorHandler);
...
```

#### Require Auth
This is and NodeJS - Express Middleware to raised error of type *NotAuthorizedError* if the request is made without authorization cookie. 

##### Usage
```
import { requireAuth } from '@edssntickets/common';

...
router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket');      
  ...
});
...
```

#### Validate Request
This is and NodeJS - Express Middleware to validate Post Body request. It uses [express-validator](https://express-validator.github.io/docs) library. 

##### Usage
```
import { validateRequest } from '@edssntickets/common';

...
router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    ...
  }
);
...
```

## OrderStatus
| **Name** | **Type** | **Description** |
| ------ | ----------- | ----------- |
| Created   | `created` | When the order has been created, but the ticket it is trying to order has not been reserve |
| Cancelled | `cancelled` | The ticket the order is trying reserve has already or when the order expires before payment |
| AwaitingPayment | `awaiting:payment` | The order has succesfully reserved the ticket |
| Complete | `complete` | The order has reserves the ticket and the user has provided payment succesfully |


## Event Subjects
| **Name** | **Type** |
| ------ | ----------- |
| TicketCreated   | `ticket:created` |
| TicketUpdated | `ticket:updated` |
| OrderCreated | `order:created` |
| OrderCancelled | `order:cancelled` |
| ExpirationComplete | `expiration:complete` |
| PaymentCreated | `payment:created` |


## Events

##### TicketCreated
Emited when a ticket is created `(POST /api/tickets)`. 
Event is sent to **`ticket:created`** queue. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| title | `string` |
| price | `number` |
| userId | `string (Ref to Urder)` |
| version | `number` |

##### TicketUpdated
Emited when a ticket is updated `(PUT /api/tickets)`. 
Event is sent to **`ticket:updated`** nats streaming channel. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| title | `string` |
| price | `number` |
| userId | `sring (Ref to Urder)` |
| version | `number` |

##### OrderCreated
Emited when a order is created `(POST /api/orders)`. 
Event is sent to **`order:created`** queue. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| status | `string (Ref to OrderStatus)` |
| userId | `sring (Ref to Urder)` |
| expiesAt | `date` |
| ticket | `{id: string, price: number}` |
| version | `number` |

##### OrderCancelled
Emited when a order is cancelled `(DELETE /api/orders/:id)`. 
Event is sent to **`order:cancelled`** queue. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| ticket | `{id: string, price: number}` |
| version | `number` |

##### ExpirationComplete
This event is emitted 15 minutes after an order has been created and no payment has been received.
| **Name** | **Type** |
| ------ | ----------- |
| orderId | `sring (Ref to Order)` |

##### PaymentCreated
Emmited when a customer pays for an order.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| orderId | `string (Ref to OrderStatus)` |
| stripeId | `sring (Token with payment method used)` |