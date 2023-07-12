import { Box, CircularProgress, Container } from "@mui/material";
import Profile from "@/components/Profile";
import UploadPost from "@/components/home/UploadPost";
import Post from "@/components/Post";
import ListOfUsers from "@/components/home/ListOfUsers";
import { getSelfData } from "@/API/user.api";
import { getFollowersList, getFollowingList } from "@/API/follow.api.js";
import { getAllPosts } from "@/API/post.api";
import { dehydrate, QueryClient, useQuery, useQueries } from "react-query";

import React from "react";

export async function getServerSideProps({ req, res }) {
  // const time = new Date().getTime();
  const queryClient = new QueryClient();
  const token = req.cookies["jwt_token"];
  // const promises = [];
  // promises.push(
  //   queryClient.prefetchQuery(["selfData"], () => getSelfData(token), {
  //     staleTime: 1000 * 60 * 30,
  //   })
  // );
  // promises.push(
  //   queryClient.prefetchQuery(
  //     ["followersList"],
  //     () => getFollowersList(token),
  //     {
  //       staleTime: 1000 * 60 * 30,
  //     }
  //   )
  // );
  // promises.push(
  //   queryClient.prefetchQuery(
  //     ["followingList"],
  //     () => getFollowingList(token),
  //     {
  //       staleTime: 1000 * 60 * 30,
  //     }
  //   )
  // );

  // await Promise.all(promises);
  // console.log("time taken", new Date().getTime() - time + "ms");

  await queryClient.prefetchQuery(["posts"], () => getAllPosts(token));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      token,
    },
  };
}

function home({ token }) {
  const [selfDataQuery, followersListQuery, followingListQuery, postListQuery] =
    useQueries([
      {
        queryKey: ["selfData"],
        queryFn: () => getSelfData(token),
      },
      {
        queryKey: ["followersList"],
        queryFn: () => getFollowersList(token),
      },
      {
        queryKey: ["followingList"],
        queryFn: () => getFollowingList(token),
      },
      {
        queryKey: ["posts"],
        queryFn: () => getAllPosts(token),
      },
    ]);

  if (
    selfDataQuery.isLoading ||
    followersListQuery.isLoading ||
    followingListQuery.isLoading ||
    postListQuery.isLoading
  ) {
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
      <Container maxWidth={false} className="flex flex-row flex-nowrap gap-8">
        <Box className=" justify-start lg:hidden md:flex hidden basis-2/5  flex-col flex-nowrap gap-4">
          <Box
            className="flex justify-center items-center p-4 rounded-md"
            sx={{ bgcolor: "background.alt" }}
          >
            <Profile selfDataQuery={selfDataQuery} isMine={true} />
          </Box>
          <Box className="justify-start items-center flex flex-col w-full gap-4">
            <ListOfUsers
              heading="Following"
              followingListQuery={followingListQuery}
            />
            <ListOfUsers
              heading="Followers"
              followersListQuery={followersListQuery}
            />
          </Box>
        </Box>
        <Box
          className="hidden lg:flex basis-1/4 justify-center items-start p-4 rounded-md h-fit sticky top-20"
          sx={{ bgcolor: "background.alt" }}
        >
          <Profile selfDataQuery={selfDataQuery} isMine={true} />
        </Box>
        <Box className="flex-grow basis-1/2 flex flex-col gap-4">
          <UploadPost />
          {/* <Post />
          <Post /> */}
          {postListQuery.data.map((post) => (
            <Post key={post.id} author={post.author} post={post} />
          ))}
        </Box>
        <Box className="hidden lg:flex basis-1/4 justify-start items-center flex-col w-full gap-4">
          <ListOfUsers
            heading="Following"
            followingListQuery={followingListQuery}
          />
          <ListOfUsers
            heading="Followers"
            followersListQuery={followersListQuery}
          />
        </Box>
      </Container>
    </>
  );
}

export default home;
