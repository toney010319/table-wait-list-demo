import { getGuests } from "@/app/lib/data";

export async function GET() {
  const guests = await getGuests();
  return Response.json({ guests });
}
