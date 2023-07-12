import { Box, CircularProgress, Container } from "@mui/material";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import { getUserData, getUserPosts } from "@/API/public.api";
import { dehydrate, QueryClient, useQueries } from "react-query";

import React from "react";

export async function getServerSideProps({ req, res, query }) {
  const userId = query.userId;
  const queryClient = new QueryClient();
  const token = req.cookies["jwt_token"];
  const promises = [];

  promises.push(
    queryClient.prefetchQuery(["userData", userId], () =>
      getUserData({ id: userId, token })
    )
  );
  promises.push(
    queryClient.prefetchQuery(["userPosts", userId], () =>
      getUserPosts({ id: userId, token })
    )
  );
  await Promise.all(promises);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      token,
      userId,
    },
  };
}

function home({ token, userId }) {
  const [userDataQuery, postListQuery] = useQueries([
    {
      queryKey: ["userData", userId],
      queryFn: () => getUserData({ id: userId, token }),
    },
    {
      queryKey: ["userPosts", userId],
      queryFn: () => getUserPosts({ id: userId, token }),
    },
  ]);

  if (userDataQuery.isLoading || postListQuery.isLoading) {
    return (
      <Container
        maxWidth={false}
        className="flex justify-center items-center"
        sx={{ height: "calc(100vh-64px)" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Container
        maxWidth={false}
        className="flex flex-col md:flex-row flex-nowrap gap-8 justify-center"
      >
        <Box className=" justify-start lg:hidden flex basis-2/5  flex-col flex-nowrap gap-4">
          <Box
            className="flex justify-center items-center p-4 rounded-md"
            sx={{ bgcolor: "background.alt" }}
          >
            <Profile
              selfDataQuery={userDataQuery}
              isMine={userDataQuery.data.isMine}
            />
          </Box>
        </Box>
        <Box
          className="hidden lg:flex basis-1/4 justify-center items-start p-4 rounded-md h-fit sticky top-20"
          sx={{ bgcolor: "background.alt" }}
        >
          <Profile
            selfDataQuery={userDataQuery}
            isMine={userDataQuery.data.isMine}
          />
        </Box>
        <Box className="flex-grow md:flex-grow-0 basis-1/2 flex flex-col gap-4">
          {postListQuery.data.map((post) => (
            <Post key={post.id} author={post.author} post={post} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default home;
