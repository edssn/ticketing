## Order Service
This is the Microservice to handle orders processing in the app.

## Resources

#### Fields
| **Name** | **Description** |
| ------ | ----------- |
| `userId` | User who created this order and is trying to buy a ticket. |
| `status`   | Whether the order is expired, paid or pending. |
| `ticketId` | ID of the ticket the user is trying to buy |
| `expiresAt` | Time at which this order expires (user has 15 mins to pay) |


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

### Ticket
(Collection with reduced data of Tickets)

##### TicketAttrs
| **Name** | **Type** |
| ------ | ----------- |
| title   | `string` |
| price | `number` |

##### TicketDoc
| **Name** | **Type** |
| ------ | ----------- |
| title   | `string` |
| price | `number` |

##### TicketModel
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(TicketAttrs) => TicketDoc` |

## Endpoints
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/orders` | GET | `-` | Retrieve all active order for the given user making the request
| `/api/orders/:id` | GET | `-` | Get details about a specific order
| `/api/orders` | POST | `{ticketId: string` | Create an order to purchase the specified ticket
| `/api/orders/:id` | DELETE | `-` | Cancel the order

## Events

### Publish

### Listen
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