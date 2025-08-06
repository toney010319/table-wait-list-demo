"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addGuestAction } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <form action={handleSubmit} className="space-y-4 p-4   rounded">
      <Card>
        <CardContent className="space-y-4">
          <div className="grid w-full  items-center gap-3">
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" required className="w-full p-2 border rounded" />
          </div>

          <div className="grid w-full  items-center gap-3">
            <Label htmlFor="partySize">Party Size</Label>
            <Input
              type="number"
              name="partySize"
              placeholder="Party Size"
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
          <div className="grid w-full  items-center gap-3">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input type="tel" name="phone" placeholder="Phone Number" className="w-full p-2 border rounded" />
          </div>
          <div className="flex   gap-2">
            <Label className="">
              <Input type="checkbox" name="priority" className="mr-2" /> Priority
            </Label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Guest
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
