"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Filters from "./Filters";
import { callGuestAction, seatGuestAction, removeGuestAction } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
          <div
            key={guest.id}
            className={`p-2 sm:p-4 border rounded grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-2 sm:gap-4 ${
              {
                WAITING: "bg-blue-100 text-blue-800",
                CALLED: "bg-yellow-100 text-yellow-800",
                SEATED: "bg-green-100 text-green-800",
                REMOVED: "bg-red-100 text-red-800",
              }[guest.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            <div>
              <Badge
                className={`ml-2 rounded-none ${
                  {
                    WAITING: "",
                    CALLED: "bg-yellow-500",
                    SEATED: "bg-green-500",
                    REMOVED: "bg-red-500",
                  }[guest.status] || ""
                }`}
              >
                {guest.status}
              </Badge>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">
                {guest.name} ( {guest.partySize} Person)
              </p>
              <p className="text-sm text-gray-500">
                Added {Math.floor((Date.now() - new Date(guest.createdAt).getTime()) / (1000 * 60))}mins ago
                {guest.priority && <Badge className="ml-2 bg-red-500">Priority</Badge>}
              </p>
              <p className="text-sm">Quoted Wait: {guest.quotedWait} min</p>
              {guest.status === "CALLED" && guest.calledAt && (
                <p className="text-sm text-red-500">
                  Grace: {Math.max(0, Math.round((120000 - (Date.now() - new Date(guest.calledAt))) / 1000))}s
                </p>
              )}
            </div>
            {/* <StatusBadge status={guest.status} /> */}
            <div className="flex flex-col justify-end item-center text-center sm:flex-row  space-x-2 space-y-2 sm:space-y-0">
              {guest.status === "WAITING" && (
                <Button
                  onClick={() => handleAction(callGuestAction, guest.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Call
                </Button>
              )}
              {guest.status !== "SEATED" && (
                <Button
                  onClick={() => handleAction(seatGuestAction, guest.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Seat
                </Button>
              )}
              {guest.status !== "REMOVED" && (
                <Button
                  onClick={() => handleAction(removeGuestAction, guest.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
