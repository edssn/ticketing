## Ticket Service
This is the Microservice to handle tickets processing in the app.

## Ticket Resources

#### TicketAttrs
Properties that are required to build a new Ticket
| **Name** | **Type** |
| ------ | ----------- |
| title   | string |
| price | `number` |
| userId | `string (Ref to User)` |
| orderId | `sring (Ref to Order)` |

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
| build   | `(attrs) => Doc` |

## Services
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/tickets` | GET | `-` | Retrieve all tickets
| `/api/tickets/:id` | GET | `-` | Retrieve ticket with specific ID
| `/api/tickets` | POST | `{title: string, price: string}` | Create a ticket
| `/api/tickets` | PUT | `{title: string, price: string}` | Update a ticket a ticket