import { ReactQueryClientProvider } from "@/lib/components/client/react-query-client-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyWork",
  description: "GarudaHacks 5.0, To be changed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <ReactQueryClientProvider>
          <body className={inter.className}>{children}</body>
        </ReactQueryClientProvider>
      </html>
    </ClerkProvider>
  );
}
