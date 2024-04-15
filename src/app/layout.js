import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Julien Suel - Formulaire",
  description: "Formulaire de renseignement pour vos coachings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-bg`}>
        <div className="bgMain">
          <Navbar />
          {children}
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
