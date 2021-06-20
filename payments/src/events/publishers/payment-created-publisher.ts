import { Subjects, Publisher, PaymentCreatedEvent } from '@edssntickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

    
}