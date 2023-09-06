# hapio-node-sdk

## Usage

```ts
import { HapioClient } from 'hapio-node-sdk'

const hapioClient = new HapioClient('your-api-token')

const bookings = await hapioClient.bookings.getBookings()
```
