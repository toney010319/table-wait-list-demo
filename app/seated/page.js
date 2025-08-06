import { getGuests } from "../lib/data";

export default async function SeatedPage() {
  const guests = await getGuests();
  const seatedGuests = guests
    .filter((g) => g.status === "SEATED")
    .sort((a, b) => new Date(a.seatedAt) - new Date(b.seatedAt));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Seated Guests</h2>
      {seatedGuests.length === 0 ? (
        <p className="text-gray-500">No seated guests yet</p>
      ) : (
        <div className="space-y-2">
          {seatedGuests.map((guest) => {
            const waitTime = Math.round((new Date(guest.seatedAt) - new Date(guest.createdAt)) / (1000 * 60));
            return (
              <div key={guest.id} className="p-2 bg-white border rounded">
                <p className="font-medium">
                  {guest.name} (Party of {guest.partySize})
                </p>
                <p className="text-sm text-gray-500">Seated at {new Date(guest.seatedAt).toLocaleTimeString()}</p>
                <p className="text-sm">Actual Wait: {waitTime} min</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
