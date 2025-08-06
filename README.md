# Table Waitlist Lite

A minimal restaurant waitlist prototype built with Next.js 14 (App Router), JavaScript, and TailwindCSS.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   DATA_PATH=./app/data/guests.json
   ```
4. Run the app: `npm run dev`
5. Access at `http://localhost:3000/waitlist`

## Features

- **/waitlist**: Add guests (name, party size, optional phone, priority), view list with statuses (WAITING, CALLED, SEATED, REMOVED), search by name, filter by status, and perform actions (Call, Seat, Remove). Includes a 2-minute grace timer for CALLED guests (reverts to WAITING on expiration).
- **/seated**: Log of seated guests with actual wait times.
- **/stats**: Today’s metrics (total added, seated, removed, average wait, % removed, party size breakdown).
- **Quoted Wait Formula**: `quotedWaitMin = positionInQueue * 15 + (partySize >= 5 ? 5 : 0)`
  - `positionInQueue`: Number of waiting guests + 1.
  - Adds 5 minutes for parties of 5 or more.

## TODO's

[x] Need to Enhance the UI due to short timeframe

## Notes

- Uses a JSON file (`data/guests.json`) as a simple NoSQL-like store.
- Server actions handle optimistic UI updates.
- TailwindCSS ensures mobile-first, readable styling.
- Error and empty states are handled (e.g., "No guests yet").
