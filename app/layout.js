import "./globals.css";

export const metadata = {
  title: "Table Waitlist Lite",
  description: "A minimal restaurant waitlist tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-lg font-bold">Table Waitlist Lite</h1>
            <div className="space-x-4">
              <a href="/waitlist" className="hover:underline">
                Waitlist
              </a>
              <a href="/seated" className="hover:underline">
                Seated
              </a>
              <a href="/stats" className="hover:underline">
                Stats
              </a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
