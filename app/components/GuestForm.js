"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addGuestAction } from "../lib/action";

export default function GuestForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(formData) {
    const result = await addGuestAction(formData);
    if (result.success) {
      router.refresh();
      setError(null);
    } else {
      setError(result.error);
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
        <input type="number" name="partySize" required min="1" className="w-full p-2 border rounded" />
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
