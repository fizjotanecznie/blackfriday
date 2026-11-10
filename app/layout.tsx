import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "800"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fizjotanecznie – Treningi wideo dla tancerzy",
  description:
    "Platforma z treningami wideo dla tancerzy w subskrypcji online. Mobilność, siła i przygotowanie motoryczne prowadzone przez fizjoterapeutkę i tancerkę.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={montserrat.variable}>
      <body className="min-h-[100svh] bg-bg font-sans font-medium text-white antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
