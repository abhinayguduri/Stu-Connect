import { Fab, Grid, Button, Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext/authContext";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import PollIcon from "@material-ui/icons/Poll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFeather } from "@fortawesome/free-solid-svg-icons";
import { PostModal } from "../Modals/PostModal";
import { PostContext } from "../../../context/postContext/postContext";
import { BlogModal } from "../Modals/BlogModal";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { PollModal } from "../Modals/PollModal";
import { API } from "../../../utils/proxy";
import { PollContext } from "../../../context/pollContext/PollContext";
import { AdsContext } from "../../../context/adsContext/AdsContext";
import { AdsModal } from "../Modals/AdsModal";
import { Flex, Text, Avatar, HStack, Input } from "@chakra-ui/react";
import { MdOutlineCreate, MdOutlinePoll } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import _ from "lodash";
export const InputBox = () => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const blogContext = useContext(BlogContext);
  const pollContext = useContext(PollContext);
  const adsContext = useContext(AdsContext);
  const [showPost, setShowPost] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const handleModalPoll = () => {
    setShowPoll(!showPoll);
  };
  const handleModalPost = () => {
    // console.log(showPost)
    setShowPost(!showPost);
  };
  const handleModalBlog = () => {
    // console.log(showBlog)
    setShowBlog(!showBlog);
  };
  const handleModalAds = () => {
    // console.log(showBlog)
    setShowAds(!showAds);
  };

  return (
    <>
      {showPost && (
        <PostModal
          show={showPost}
          handleModal={handleModalPost}
          postFunction={postContext.createPost}
          modalTitle="Create post"
          post={undefined}
        />
      )}
      {showBlog && (
        <BlogModal
          show={showBlog}
          handleModal={handleModalBlog}
          blogFunction={blogContext.createBlog}
          modalTitle="Write Blog"
          blog={undefined}
        />
      )}
      {showAds && (
        <AdsModal
          modalTitle="Create ads"
          show={showAds}
          adsFunction={adsContext.createAds}
          ads={undefined}
          handleModal={handleModalAds}
        />
      )}
      {showPoll && (
        <PollModal
          modalTitle="Create poll"
          show={showPoll}
          pollFunction={pollContext.createPoll}
          poll={undefined}
          handleModal={handleModalPoll}
        />
      )}
      <Flex
        mt="2"
        bg="white"
        // shadow={"md"}
        p="4"
        rounded={"lg"}
        direction={"column"}
        mb="4"
      >
        <HStack w="full">
          <Avatar
            alt={authContext.user.name}
            name={authContext.user.name}
            src={`${API}/pic/user/${authContext.user._id}`}
          />
          <Input
            mx="24"
            type="text"
            rounded={"full"}
            w="full"
            placeholder={`What's on your mind? ${_.capitalize(
              authContext.user.name
            )}`}
          />
        </HStack>

        <Flex mt="4" justifyContent={"center"} cursor={"pointer"}>
          <Flex onClick={handleModalPost} w="44">
            <MdOutlineCreate size={24} />
            <Text mx="2">Create Post</Text>
          </Flex>
          <Flex onClick={handleModalBlog} w="44" cursor={"pointer"}>
            <ImBlog size={20} />
            <Text mx="2"> Write Blog</Text>
          </Flex>
          <Flex onClick={handleModalAds} w="44" cursor={"pointer"}>
            <TfiAnnouncement size={24} />
            <Text mx="2"> Post Ad</Text>
          </Flex>
          <Flex onClick={handleModalPoll} w="44" cursor={"pointer"}>
            <MdOutlinePoll size={24} />
            <Text mx="2"> Polls</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
