## Create Ticket Test
This NodeJS app allow create 200 proccess of create/update tickets.
With this project.

This project allows to see the concurrency problem when handling an event-oriented architecture in which 2 events get to be processed in a different order than the one in which the events were emitted.

###### Without version field in events
Some 15-update-ticket process are execute before 10-update-ticket process. As result, at final exist some tickets with price 10. That is incorrect behaviour.

###### With version field in events
All 15-update-ticket process are execute after 10-update-ticket process. As result, there is no exist tickets with price 10. That is correct behaviour.

#### Process
1. **Create** ticket with price **5**
2. **Update** ticket with price **10**
3. **Update** ticket with price **15**

#### Installation

First, You should modify the line 4 and write a correct session token. The session token is generated in ` GET /api/users/currentuser` end point

After, install dependencies
```npm install```

Finally, run program
```node index.js```

