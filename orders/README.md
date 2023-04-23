## Order Service
This is the Microservice to handle orders processing in the app.


## Fields
| **Name** | **Description** |
| ------ | ----------- |
| `userId` | User who created this order and is trying to buy a ticket. |
| `status`   | Whether the order is expired, paid or pending. |
| `ticketId` | ID of the ticket the user is trying to buy |
| `expiresAt` | Time at which this order expires (user has 15 mins to pay) |


## Models
#### Order

##### OrderStatus
| **Enum** |
| ------ |
| `Created`   |
| `Cancelled` |
| `AwaitingPayment` |
| `Complete` |

##### OrderAttrs
Properties that are required to build a new Order
| **Name** | **Type** |
| ------ | ----------- |
| userId   | `string` |
| status | `OrderStatus` |
| expiresAt | `date` |
| ticket | `TicketDoc (Ref to Ticket)` |

##### OrderDoc
Properties that a Order has
| **Name** | **Type** |
| ------ | ----------- |
| userId   | `string` |
| status | `OrderStatus` |
| expiresAt | `date` |
| ticket | `TicketDoc (Ref to Ticket)` |

##### OrderModel
Properties tied to the Model
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(OrderAttrs) => OrderDoc` |

## Endpoints
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/orders` | POST | `{ticketId: string}` | Create a Order for a ticket


## Events

### Publish
##### OrderCreated
Emited when a order is created `(POST /api/orders)`. 
Event is sent to **`order:created`** queue. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| status | `string (Ref to OrderStatus)` |
| userId | `sring (Ref to User)` |
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

#### Listen
##### TicketCreated
Orders service needs to know the valid tickets that can be purchased and the price of each ticket.

##### TicketUpdated
Orders service needs to know when the price of a ticket has changed and when a ticket has successfully been reserved.

##### ExpirationComplete
Orders service needs to know that an order has gone over the 15 minutes time limit. It is up to the orders service to decide wheter or not to cancel the order (it might have already been paid!!!).