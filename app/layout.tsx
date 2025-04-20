import "./globals.css";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Arshan Kaudinya',
  description: 'clean & consistent',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
