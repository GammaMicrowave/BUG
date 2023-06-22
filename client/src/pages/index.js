
import { test } from "@/API/test.api";
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

export const getServerSideProps = async ({ req, res }) => {
  const isLoggedIn = req.cookies["jwt_token"] ? true : false;
  return {
    props: {
      isLoggedIn,
    },
  };
};
