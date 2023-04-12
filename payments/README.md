## Charge Resource

| **Name** | **Type** |
| ------ | ----------- |
| orderId | Ref to Order |
| status   | Created | Failed | Completed |
| amount | number |
| stripeId | string |
| stripeRefundId | string |


## Events

#### Publish

#### Listen
##### OrderCreated
Payments service needs tod know there is a new order that a user might submit a payment for.

##### OrderCancelled
Payments service should know that any incoming payments for this order should be rejected.