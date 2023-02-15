# Ticketing App #

- Users can list a ticket for an event(concert, sport) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When user attempt to puchase a ticket, the ticket is *locked* for 15 minutes. The user has 15 minutes to enter their payment info
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should *unlock*
- Tcicket proces can be edited if they are not locked

This project was developed in **Ubuntu 22.04**

## Microservices

| **Option** | **Description** |
| ------ | ----------- |
| *auth*   | Everything related to user (signup/signin/signout). |
| *tickets* | Ticket creation/editing. Knows whether a ticket can be updated |
| *orders* | Order creation/editing. |
| *expiration* | Watches for orders to be created, cancel them after 15 minutes. |
| *payments* | Handles credit card payments. Cancel orders if payments fails, completes if payment succeeds |


## Events

`UserCreated` `UserUpdated`
`OrderCreated` `OrderCancelled` `OrderExired`
`TicketCreated` `TicketUpdated` 
`ChargeCreated`



## Tecnology ##
| BackEnd | FrontEnd | Database | CI/CD |
| --- | --- | --- | --- |
| NodeJS  | React | Mongo/Redis | Skaffold |

# Requeriments
1. Docker instalado.
2. Clúster de Kubernets. En este proyecto se utilizó minikube (https://minikube.sigs.k8s.io/docs/start/).
3. Crear un ingress controller en kubernets. En este proyecto se utilizó ingress-inginx en minikube (https://kubernetes.github.io/ingress-nginx/deploy/#minikube) ![Working Image](/assets/ingress.png)
4. Skaffold. Skaffold es opcional, pero facilita el despliegue en modo desarrollo con 1 solo comando. Si prefieres, puedes crear cada deployment manualmente. (https://skaffold.dev/docs/install/)