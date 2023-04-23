## Expiration Service
This is the Microservice to handle orders expiration time in the app.

This project uses Bull JS to create a 15-minute timer after receiving a event **OrderCreated**. After 15 minutes have elapsed, an event **ExpirationComplete** is emitted to indicate that a reservation has expired.

## Events

#### Publish
##### ExpirationComplete
This event is emitted 15 minutes after an order has been created and no payment has been received.
| **Name** | **Type** |
| ------ | ----------- |
| orderId | `sring (Ref to Order)` |

#### Listen
##### OrderCreated
Expiration service needs to start a 15 minutes timer to eventually time out this order.