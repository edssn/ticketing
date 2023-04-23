## Payments Service
This is the Microservice to handle payments processing in the app.

[STRIPE ](https://market.strapi.io/plugins/strapi-stripe) developer api was used to simulate payments.

### Payments Fields

| **Name** | **Type** |
| ------ | ----------- |
| id | number |
| status   | Created | Failed | Completed |
| version | number |
| version | number |
| userId | Ref to User |
| orderId | Ref to Order |
| amount | number |
| stripeId | string |
| stripeRefundId | string |


## Endpoints
| **Route** | **Method** | **Body** | **Porpuse** |
| :------: | :-----------: | :-----------: | :-----------: |
| `/api/payments` | POST | `{orderId: string, token: string}` | Pay a order

## Models
#### Order

##### OrderAttrs
Properties that are required to build a new Order
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| version | `number` |
| userId | `string` |
| price | `number` |
| status | `OrderStatus` |

##### OrderDoc
Properties that a Order has
| **Name** | **Type** |
| ------ | ----------- |
| version | `number` |
| userId   | `string` |
| price | `number` |
| status | `OrderStatus` |

##### OrderModel
Properties tied to the Model
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(OrderAttrs) => OrderDoc` |


#### Payment

##### PaymentAttrs
Properties that are required to build a new Payment
| **Name** | **Type** |
| ------ | ----------- |
| orderId   | `string` |
| stripeId | `string` |

##### PaymentDoc
Properties that a Payment has
| **Name** | **Type** |
| ------ | ----------- |
| orderId | `number` |
| stripeId   | `string` |

##### PaymentModel
Properties tied to the Model
| **Name** | **Type** |
| ------ | ----------- |
| build   | `(OrderAttrs) => PaymentDoc` |


## Events

#### Publish
##### PaymentCreated
Emmited when a customer pays for an order.
| **Name** | **Type** |
| ------ | ----------- |
| id   | `string` |
| orderId | `string (Ref to OrderStatus)` |
| stripeId | `sring (Token with payment method used)` |

#### Listen
##### OrderCreated
Payments service needs tod know there is a new order that a user might submit a payment for.

##### OrderCancelled
Payments service should know that any incoming payments for this order should be rejected.