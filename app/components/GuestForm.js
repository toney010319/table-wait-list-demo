"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addGuestAction } from "../lib/action";

export default function GuestForm({ onGuestAdded }) {
  const [error, setError] = useState(null);
  const [partySizeNotice, setPartySizeNotice] = useState("");
  async function handleSubmit(formData) {
    try {
      const partySizeRaw = formData.get("partySize");
      if (!/^\d+$/.test(partySizeRaw)) {
        setError("Party Size must be a number.");
        return;
      }
      const partySize = parseInt(partySizeRaw, 10);
      if (isNaN(partySize) || partySize < 1) {
        setError("Party Size must be a positive number.");
        return;
      }

      const result = await addGuestAction(formData);
      if (result.success) {
        setError(null);
        setPartySizeNotice("");
        if (onGuestAdded) await onGuestAdded();
      } else {
        setError(result.error || "Failed to add guest.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded">
      <div>
        <label className="block text-sm font-medium ">Name</label>
        <input type="text" name="name" required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Party Size</label>
        <input
          type="number"
          name="partySize"
          required
          min="1"
          className="w-full p-2 border rounded"
          onInput={(e) => {
            const value = e.target.value;
            if (/[^0-9]/.test(value)) {
              setPartySizeNotice("Number only");
            } else {
              setPartySizeNotice("");
            }
            e.target.value = value.replace(/[^0-9]/g, "");
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone (Optional)</label>
        <input type="tel" name="phone" className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="flex items-center">
          <input type="checkbox" name="priority" className="mr-2" />
          Priority
        </label>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Guest
      </button>
    </form>
  );
}
