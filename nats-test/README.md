# NATS Test #
This is a project to test nats-server

### Installation
Open two or more consoles. On first console write `npm run publish`. 

On the others consoles write `npm run listen` 

To emit new event, on publish console write `rs`. The event arrive to only one of susbcribers to avoid it being processed twice.

### Tests
#### Sign Up
![NATS Test](/assets/nats/nats-test.gif)