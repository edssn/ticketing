import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@edssntickets/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // If no ticket, throw Error
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        // Mark the ticket has been reserve by setting it orderId propoerty 
        ticket.set({ orderId: undefined });
        
        // Save the ticket 
        await ticket.save();
        
        // Publish ticket update event
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
        });

        // ack the message
        msg.ack();
    }
}
