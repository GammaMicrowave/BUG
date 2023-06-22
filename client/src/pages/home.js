import { Box, Container } from "@mui/material";
import Profile from "@/components/home/Profile";
import UploadPost from "@/components/home/UploadPost";
import Post from "@/components/home/Post";
import ListOfUsers from "@/components/home/ListOfUsers";
import {
  getSelfData,
  getFollowersList,
  getFollowingList,
} from "@/API/user.api";
import { dehydrate, QueryClient, useQuery } from "react-query";

import React from "react";

export async function getServerSideProps({ req, res }) {
  const queryClient = new QueryClient();
  const token = req.cookies["jwt_token"];
  const promises = [];
  promises.push(
    queryClient.prefetchQuery(["selfData"], () => getSelfData(token), {
      staleTime: 1000 * 60 * 30,
    })
  );
  promises.push(
    queryClient.prefetchQuery(
      ["followersList"],
      () => getFollowersList(token),
      {
        staleTime: 1000 * 60 * 30,
      }
    )
  );
  promises.push(
    queryClient.prefetchQuery(
      ["followingList"],
      () => getFollowingList(token),
      {
        staleTime: 1000 * 60 * 30,
      }
    )
  );

  await Promise.all(promises);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageProps: {
        token,
      },
    },
  };
}

function home({ pageProps: { token } }) {
  const selfDataQuery = useQuery(["selfData"], () => getSelfData(token));

  const followersListQuery = useQuery(["followersList"], () =>
    getFollowersList(token)
  );

  const followingListQuery = useQuery(["followingList"], () =>
    getFollowingList(token)
  );

  return (
    <>
      <Container maxWidth={false} className="flex flex-row flex-nowrap gap-8">
        <Box className=" justify-start lg:hidden md:flex hidden basis-2/5  flex-col flex-nowrap gap-4">
          <Box
            className="flex justify-center items-center p-4 rounded-md"
            sx={{ bgcolor: "background.alt" }}
          >
            <Profile selfDataQuery={selfDataQuery} />
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
          className="hidden lg:flex basis-1/4 justify-center items-start p-4 rounded-md h-fit sticky top-4"
          sx={{ bgcolor: "background.alt" }}
        >
          <Profile selfDataQuery={selfDataQuery} />
        </Box>
        <Box className="flex-grow basis-1/2 flex flex-col gap-4">
          <UploadPost />
          <Post />
          <Post />
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
