import Image from "next/image";
import { Inter } from "next/font/google";
import {
  setCookie,
  getCookie,
  getCookies,
  hasCookie,
  deleteCookie,
} from "cookies-next";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ isLoggedIn }) {
  return (
    <>
      <div className="h-24 w-24 bg-red-500">index</div>

      <div className="text-white">
        user is logged in = {isLoggedIn ? "true" : "false"}
      </div>
    </>
  );
}

export const getServerSideProps = ({ req, res }) => {
  const isLoggedIn = req.cookies["jwt_token"] ? true : false;
  return {
    props: {
      isLoggedIn,
    },
  };
};
