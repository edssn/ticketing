import { Publisher, Subjects, TicketCreatedEvent } from '@edssntickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> { 
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}