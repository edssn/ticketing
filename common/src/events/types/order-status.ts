export enum OrderStatus {
    // When the order has been created, but the 
    // ticket it is trying to order has not been reserve
    Created = 'created',

    // The ticket the order is trying reserve has already
    // been reserved, or when the user has cancelled the order,
    // or when the order expires before payment
    Cancelled = 'cancelled',

    // The order has succesfully reserved the ticket
    AwaitingPayment = 'awaiting:payment',

    // The order has reserves the ticket and the user has
    // provided payment succesfully
    Complete = 'complete', 

}