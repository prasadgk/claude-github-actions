import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A beautiful todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
