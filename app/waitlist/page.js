import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";
import { getGuests } from "../lib/data";

export default async function WaitlistPage() {
  const guests = await getGuests();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Waitlist</h2>
      <GuestForm />
      <GuestList initialGuests={guests} />
    </div>
  );
}
