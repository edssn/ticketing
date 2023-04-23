# Ticketing App #

Ticketing App is a project developed to learn about the operation of Microservices and Event Driven Architectures. 

- Users can list a ticket for an event(concert, sport) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When user attempt to puchase a ticket, the ticket is *locked* for 15 minutes. The user has 15 minutes to enter their payment info
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should *unlock*
- Ticket process can be edited if they are not locked

![Client](/assets/client/client-app.gif)

## What did I learn in this project?
- What are event-driven architectures and how do they work?
- How communication between microservices is done with an event bus.
- How to handle concurrency problems in event-driven architectures.
- TTD - Test Drive Development in NodeJS World.
- JEST and how configure it with NodeJS (Mocking imports with JEST).  

This project was developed in **Ubuntu 22.04** with **Docker** and **Kubernets** and developed with **React** and **NodeJS**.

## Microservices

| **Option** | **Description** |
| ------ | ----------- |
| *auth*   | Everything related to user (signup/signin/signout). |
| *tickets* | Ticket creation/editing. Knows whether a ticket can be updated |
| *orders* | Order creation/editing. |
| *expiration* | Watches for orders to be created, cancel them after 15 minutes. |
| *payments* | Handles credit card payments. Cancel orders if payments fails, completes if payment succeeds |


## Microservices Events

### Auth
`UserCreated` `UserUpdated` <br>

### Orders
`OrderCreated` `OrderCancelled` `OrderExired` <br>

### Tickets
`TicketCreated` `TicketUpdated` <br>

### Payments 
`PaymentCreated` <br>



## Tecnology ##
| BackEnd | FrontEnd | Database | CI/CD |
| --- | --- | --- | --- |
| NodeJS  | React | Mongo/Redis | Skaffold |

## Requeriments
1. Docker.
2. Kubernets Cluster. I used minikube (https://minikube.sigs.k8s.io/docs/start/).
3. Ingress Controller created on kubernets. I used ingress-inginx to minikube (https://kubernetes.github.io/ingress-nginx/deploy/#minikube) ![Working Image](/assets/ingress.png)
4. Skaffold (optional). Skaffold makes it easier develop and deploy the entire app (skaffol dev). You can create all deployments one by one. (https://skaffold.dev/docs/install/)
5. Postman. Postman is used to test endpoints.
6. At final, execute the following commands to kubernets cluster.
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=abcd
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=sk_test...
```
Value for *STRIPE_KEY* can be get from [STRIPE developer console ](https://market.strapi.io/plugins/strapi-stripe). Se more info in payments folder.


## Common Error Response Structure

```
{
    errors: {
        message: string,
        field?: string    // optional
    } [] // array 
}
```

## Kubernets Secrets
You need to execute the following command in order to create necesary secrets
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```  