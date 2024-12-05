This repository contains the Score Balance app

## Instruction

After cloning the repository, run the following commands to start the app:

```bash
npm install
npm run build
npm start
```

## Discussions

### Idea

The important requirements we have here are:
- **Data Freshness**: We need to have up-to-date data (< 2 minutes delay)
- **Performance**: Our service will be called millions of time a day
- **Rate limit**: Transaction API is rate limited to 5 calls per minute.

The solution I mocked here is to have a **processor logic** with a **balance storage**
- On a regular basis (and below the rate limit), we will call the transaction API to get the latest transaction
- We process these and store directly the balance

#### Pros 
- Since we store the balance, we avoid computation on our API endpoints' calls _(Performance)_
- We can have relatively fresh data while respecting the rate limit. _(Freshness)_
- We know we can't make more than 5 calls per minutes (1 per 12 seconds), each limited to 1000 records. So we can be 
  confident that the processor logic will not be a bottleneck with this volume.

#### Limits 
- The balance computation is highly dependent on the transaction API calls. We need to be sure we don't miss any 
  transaction to have a correct balance. This is hard considering the rate limit here. So we would need to highly 
  monitor our fetching logic - Is there more than 1000 transactions in the last 12 seconds? Can we make more calls?
  What if we achieve more than 5k transaction per minute? Could we continue to fetch the surplus transaction in the 
  next calls but then data freshness is impacted? -
  
- Depending on the requirement, auditability is really not good here as we can't compute a good balances from zero. 
It would be harder to recover from missing calls for example.

#### Implementations limits for this MVP 
- I didn't implement pagination in our API as I don't think it was bringing much value for this MVP.
I discussed performances of this endpoint above though. 
- There is no real storage outside in-memory objects.
- The transactions fetching is done with a simple `setInterval`. In a real scenario we could have a proper async jobs service for
this "Fetching -> Processing -> Storing" pipeline.

### Testing and Quality check

There is no testing in this MVP.

It would be important to unit test our processing logic (thought it's not the hardest). In this case, TDD would have been 
very helpful as the input and output are very easily testable.
For the fetching logic, it would be useful to have integration tests (where we could challenge as well our app with the 
rate or volume limit behaviour)

It would be also very important to monitor the fetching logic as we want to be sure not to miss any transactions, 
even considering the rate and volume limit. (See "Limits" above).
For data freshness, I would choose to monitor the latency between the transaction time and the balance update time. 
This is a metric that would be very easily actionable (for alerting, SLA, etc.)