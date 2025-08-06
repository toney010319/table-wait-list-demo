"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Filters from "./Filters";
import { callGuestAction, seatGuestAction, removeGuestAction } from "../lib/action";

export default function GuestList({ initialGuests }) {
  const [guests, setGuests] = useState(initialGuests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [timers, setTimers] = useState({});
  const router = useRouter();
  useEffect(() => {
    setGuests(initialGuests);
  }, [initialGuests]);

  // Handle grace timer for CALLED guests
  useEffect(() => {
    const interval = setInterval(() => {
      setGuests((prevGuests) => {
        const updatedGuests = [...prevGuests];
        updatedGuests.forEach((guest) => {
          if (guest.status === "CALLED" && guest.calledAt) {
            const timeLeft = 120000 - (Date.now() - new Date(guest.calledAt));
            if (timeLeft <= 0 && !timers[guest.id]) {
              setTimers((prev) => ({ ...prev, [guest.id]: true }));
              removeGuestAction(guest.id);
              router.refresh();
            }
          }
        });
        return updatedGuests;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers, router]);

  const handleAction = async (action, id) => {
    const result = await action(id);
    if (result.success) {
      setGuests((prev) => prev.map((g) => (g.id === id ? result.guest : g)));
      router.refresh();
    }
  };

  const filteredGuests = guests.filter(
    (guest) => (filter === "ALL" || guest.status === filter) && guest.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Filters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      {filteredGuests.length === 0 && <p className="text-center text-gray-500">No guests yet</p>}
      <div className="space-y-2">
        {filteredGuests.map((guest) => (
          <div key={guest.id} className="flex items-center p-2 bg-white border rounded">
            <div className="flex-1">
              <p className="font-medium">
                {guest.name} (Party of {guest.partySize})
              </p>
              <p className="text-sm text-gray-500">
                Added {new Date(guest.createdAt).toLocaleTimeString()}
                {guest.priority && " • Priority"}
              </p>
              <p className="text-sm">Quoted Wait: {guest.quotedWait} min</p>
              {guest.status === "CALLED" && guest.calledAt && (
                <p className="text-sm text-red-500">
                  Grace: {Math.max(0, Math.round((120000 - (Date.now() - new Date(guest.calledAt))) / 1000))}s
                </p>
              )}
            </div>
            <StatusBadge status={guest.status} />
            <div className="flex space-x-2">
              {guest.status === "WAITING" && (
                <button
                  onClick={() => handleAction(callGuestAction, guest.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Call
                </button>
              )}
              {guest.status !== "SEATED" && (
                <button
                  onClick={() => handleAction(seatGuestAction, guest.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Seat
                </button>
              )}
              {guest.status !== "REMOVED" && (
                <button
                  onClick={() => handleAction(removeGuestAction, guest.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
