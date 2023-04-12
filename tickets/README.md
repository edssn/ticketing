## Ticket Service
This is the Microservice to handle tickets processing in the app.

## Resources

#### Fields
| **Name** | **Description** |
| ------ | ----------- |
| `title`   | Title of event this tickets is for |
| `price` | Price of the ticket in USD |
| `userId` | ID of the user who is sellgin this ticket |
| `version` | Version of this ticket. Increment every time this ticket is changed |

#### TicketAttrs
Properties that are required to build a new Ticket
| **Name** | **Type** |
| ------ | ----------- |
| title   | `string` |
| price | `number` |
| userId | `string (Ref to User)` |
| orderId | `sring (Ref to Order) - Optional` |

#### TicketDoc
Properties that a Ticket has
| **Name** | **Type** |
| ------ | ----------- |
| title   | `string` |
| price | `number` |
| userId | `string (Ref to User)` |

#### TicketModel
Properties tied to the Model
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(TicketAttrs) => TicketDoc` |

## Endpoints
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/tickets` | GET | `-` | Retrieve all tickets
| `/api/tickets/:id` | GET | `-` | Retrieve ticket with specific ID
| `/api/tickets` | POST | `{title: string, price: string}` | Create a ticket
| `/api/tickets` | PUT | `{title: string, price: string}` | Update a ticket a ticket

## Events

#### Publish

##### TicketCreated
Emited when a ticket is created `(POST /api/tickets)`. 
Event is sent to **`ticket:created`** queue. The `version` field is used to handle concurrency problems.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| title | `string` |
| price | `number` |
| userId | `sring (Ref to Urder)` |
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


#### Listen
##### OrderCreated
Tickets service needs to be told that one of its tickets has been reserved, and no further edits to that ticket should be allowed.

##### OrderCancelled
Tickets service should unreserve a ticket if the corresponding order has beed cancelled so this ticket can be edited again.