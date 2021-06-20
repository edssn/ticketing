import { Subjects, Publisher, ExpirationCompleteEvent } from "@edssntickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;   
}