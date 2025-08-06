import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Table Waitlist Lite</h1>
      <Link href="/waitlist" className="text-blue-500 hover:underline">
        Go to Waitlist
      </Link>
    </div>
  );
}
