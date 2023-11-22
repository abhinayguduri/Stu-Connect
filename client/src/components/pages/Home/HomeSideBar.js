import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext/authContext";
import { useHistory } from "react-router-dom";
import { NoticeCard } from "./Notice/NoticeCard";
import { API } from "../../../utils/proxy";
import { Flex, HStack, Text, VStack, Avatar, Divider } from "@chakra-ui/react";
import { BsPeople, BsBookmarkCheck } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { AiOutlineNotification } from "react-icons/ai";
import _ from "lodash";
export const HomeSideBar = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  return (
    <div>
      <Flex
        direction={"column"}
        bg="white"
        px={"4"}
        py="6"
        rounded={"lg"}
        mt="2"
        w="96"
      >
        <HStack mb="4">
          <Avatar
            name={authContext.user.name}
            src={`${API}/pic/user/${authContext.user._id}`}
            style={{ height: "75px", width: "75px" }}
          />
          <Flex direction="column" py="2">
            <Text textColor="purple.800" fontWeight="semibold" fontSize="xl">
              {_.capitalize(authContext.user.name)}
            </Text>
            <Text mt="1">
              {authContext.user.role === 0 && "Student"}
              {authContext.user.role === 1 && "Faculty"}
              {authContext.user.role === 2 && "Admin"}
            </Text>
          </Flex>
        </HStack>
        <Divider />
        <VStack align={"start"} gap={3} ml="4">
          <Flex
            mt="4"
            mx="1"
            onClick={() => {
              history.push("/fellows");
            }}
            direction="row"
            align-items="center"
            cursor="pointer"
            _hover={{
              fontWeight: "semibold",
              textColor: "purple.800",
            }}
          >
            <BsPeople size={24} />
            <Text mx="3" fontSize="lg">
              Fellows
            </Text>
          </Flex>
          <Flex
            mt="4"
            mx="4"
            direction="row"
            align-items="center"
            cursor="pointer"
            _hover={{
              fontWeight: "semibold",
              textColor: "purple.800",
            }}
          >
            <GrGroup size={24} />
            <Text mx="3" fontSize="lg">
              Groups
            </Text>
          </Flex>
          {/* <Flex>
            <EventNoteRoundedIcon />
            <Text>Events</Text>
          </Flex> */}
          <Flex
            onClick={() => {
              history.push("/notices");
            }}
            mt="4"
            mx="4"
            direction="row"
            align-items="center"
            cursor="pointer"
            _hover={{
              fontWeight: "semibold",
              textColor: "purple.800",
            }}
          >
            <AiOutlineNotification size={24} />
            <Text mx="3" fontSize="lg">
              Notices
            </Text>
          </Flex>
          <Flex
            onClick={() => {
              history.push("/bookmarks");
            }}
            mt="4"
            mx="4"
            direction="row"
            align-items="center"
            cursor="pointer"
            _hover={{
              fontWeight: "semibold",
              textColor: "purple.800",
            }}
          >
            <BsBookmarkCheck size={24} />
            <Text mx="3" fontSize="lg">
              Bookmarks
            </Text>
          </Flex>
        </VStack>
      </Flex>
      <NoticeCard />
    </div>
  );
};
