Table Waitlist Lite
A minimal restaurant waitlist prototype built with Next.js 14 (App Router), JavaScript, and TailwindCSS.
Setup

Clone the repository.
Install dependencies: npm install
Create a .env file with:DATA_PATH=./data/guests.json

Run the app: npm run dev
Access at http://localhost:3000/waitlist

Features

/waitlist: Add guests (name, party size, optional phone, priority), view list with statuses (WAITING, CALLED, SEATED, REMOVED), search by name, filter by status, and perform actions (Call, Seat, Remove). Includes a 2-minute grace timer for CALLED guests (reverts to WAITING on expiration).
/seated: Log of seated guests with actual wait times.
/stats: Today’s metrics (total added, seated, removed, average wait, % removed, party size breakdown).
Quoted Wait Formula: quotedWaitMin = positionInQueue \* 15 + (partySize >= 5 ? 5 : 0)
positionInQueue: Number of waiting guests + 1.
Adds 5 minutes for parties of 5 or more.

Future Extensions

Manager Features: Add a /manager route with authentication, detailed analytics (e.g., hourly wait time trends), and CSV export functionality.
Database: Replace JSON file with a proper NoSQL database (e.g., MongoDB) for scalability.
Notifications: Integrate SMS/email notifications for CALLED guests using their phone number.
Multi-user Support: Add user roles (host, manager) with Clerk or NextAuth for authentication.
Real-time Updates: Use WebSockets or Server-Sent Events for live updates without page refresh.

Notes

Uses a JSON file (data/guests.json) as a simple NoSQL-like store.
Server actions handle optimistic UI updates.
TailwindCSS ensures mobile-first, readable styling.
Error and empty states are handled (e.g., "No guests yet").
# table-wait-list-demo
