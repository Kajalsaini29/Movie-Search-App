import "./globals.css";

export const metadata = {
  title: "Movie Search App",
  description: "Search movies ..........",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black-600 text-gray-900">
        {/* Header */}

        <header className="w-full py-6">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            Movie Search App
          </h1>
        </header>

        {/* Page Content */}

        <main className=" max-w-9xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
