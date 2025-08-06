"use client";

import { useState, useEffect } from "react";
import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";

export default function WaitlistPage() {
  const [guests, setGuests] = useState([]);

  // Fetch guests from API route
  async function fetchGuests() {
    const res = await fetch("/api/guests");
    const data = await res.json();
    console.log(data.guests);
    setGuests(data.guests);
  }

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="space-y-4  w-full flex flex-row ">
      <div className="w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded shadow">
        <h2 className="text-2xl  font-bold">Add Guest</h2>
        <GuestForm onGuestAdded={fetchGuests} />
      </div>
      <div className="w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded shadow">
        <h2 className="text-2xl  font-bold">WaitList</h2>
        <GuestList initialGuests={guests} />
      </div>
    </div>
  );
}
