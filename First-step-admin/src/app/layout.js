import "./globals.css";
import { Epilogue } from "next/font/google";
import { LayoutProvider } from "@/lib/LayoutProvider";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "First Step Admin Dashboard",
  description: "First Step",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
