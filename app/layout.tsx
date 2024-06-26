import Modal from "@/components/modals/Modal";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/modals/RegisterModal";

import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <Toaster />
        <RegisterModal />
        <SearchModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {/* </ClientOnly> */}

        <div className="pb-20 pt-28">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
{
  /* <Modal isOpen={true} actionLabel="Submit" /> */
}
