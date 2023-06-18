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

export default function Home() {
  return (
    <>
      <div>index</div>
    </>
  );
}

export const getServerSideProps = ({ req, res }) => {
  // console.log(req, res);
  // console.log(req.cookies);
  // setCookie("test", JSON.stringify(req.cookies), {
  //   req,
  //   res,
  //   maxAge: 60 * 6 * 24,
  // });
  // getCookie("test", { req, res });
  // getCookies({ req, res });
  // console.log(getCookies({ req, res }));
  // console.log(getCookie("test", { req, res }));
  // deleteCookie("test", { req, res });

  return { props: {} };
};
