import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { AuthContext } from "../../../../context/authContext/authContext";
import { PollContext } from "../../../../context/pollContext/PollContext";
import { LoadingPoll } from "./LoadingPoll";
import {
  Divider,
  Flex,
  HStack,
  Text,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { BsSkipForward } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import _ from "lodash";
export const PollCard = () => {
  const authContext = useContext(AuthContext);
  const pollContext = useContext(PollContext);
  const [index, setIndex] = useState(0);
  const [responseValue, setResponseValue] = useState({
    loading: false,
    error: "",
  });
  const [pollResult, setPollResult] = useState({
    total: "",
    yes: "",
    no: "",
    skip: "",
  });
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    pollContext.getAllPolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(pollContext.polls)

  const handlePollClick = async (e, typeOf, pollId) => {
    setResponseValue({
      ...responseValue,
      loading: true,
    });
    try {
      let response;
      if (typeOf === "yes") {
        response = await pollContext.markPollYes(authContext.user._id, pollId);
      }
      if (typeOf === "no") {
        response = await pollContext.markPollNo(authContext.user._id, pollId);
      }
      if (typeOf === "skip") {
        response = await pollContext.skipPoll(authContext.user._id, pollId);
      }
      if (response._id === pollId) {
        setPollResult({
          total:
            response.yes.length + response.no.length + response.skip.length,
          yes: response.yes.length,
          no: response.no.length,
          skip: response.skip.length,
        });
        setResponseValue({
          ...responseValue,
          loading: false,
        });
        setShowResult(true);
      }
      console.log(response);
    } catch (error) {
      setResponseValue({
        ...setResponseValue,
        // error: error.response.data.errorMsg,
        loading: false,
      });
    }
  };
  return (
    <div>
      {pollContext.loading ? (
        LoadingPoll()
      ) : (
        <>
          <Flex
            direction={"column"}
            bg="white"
            rounded={"lg"}
            py="4"
            px="4"
            mt="2"
          >
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              mb="3"
              textColor={"purple.800"}
            >
              Polls
            </Text>
            <Divider />
            <Carousel
              indicators={false}
              controls={false}
              interval={null}
              activeIndex={index}
            >
              {pollContext.polls.map((poll, index) => {
                return (
                  <Carousel.Item key={index}>
                    <CardContent
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0",
                        margin: "10px 0",
                      }}
                    >
                      <Text
                        fontSize={"lg"}
                        fontWeight={"semibold"}
                        textColor={"purple.800"}
                      >
                        {_.capitalize(poll.title)}
                      </Text>
                      <Text mt="2">{poll.poll}</Text>
                    </CardContent>
                    <CardActions>
                      {responseValue.loading && (
                        <Button
                          variant="outlined"
                          size="small"
                          isDisabled={true}
                        >
                          Loading
                        </Button>
                      )}
                      {responseValue.loading ? null : !showResult ? (
                        <ButtonGroup gap="1" w="full">
                          <Button
                            colorScheme="red"
                            onClick={(e) => handlePollClick(e, "no", poll._id)}
                            w="40"
                            leftIcon={<MdOutlineCancel />}
                          >
                            No
                          </Button>
                          <Button
                            colorScheme="green"
                            onClick={(e) => handlePollClick(e, "yes", poll._id)}
                            leftIcon={<AiOutlineCheck />}
                            w="40"
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <Flex direction={"column"} w={"100%"} mx="2">
                          <Text
                            textColor={"gray.700"}
                            fontStyle={"italic"}
                            fontSize={"xs"}
                          >
                            Result:
                          </Text>
                          <Flex mt="2">
                            <Flex
                              h={"10"}
                              bg="green.500"
                              w={`${
                                (pollResult.yes / pollResult.total) * 100
                              }%`}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Text>
                                {" "}
                                {Math.round(
                                  (pollResult.yes / pollResult.total) * 100
                                )}
                                %
                              </Text>
                            </Flex>
                            <Flex
                              h={"10"}
                              bg="gray.300"
                              w={`${
                                (pollResult.skip / pollResult.total) * 100
                              }%`}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Text>
                                {Math.round(
                                  (pollResult.skip / pollResult.total) * 100
                                )}
                                %
                              </Text>
                            </Flex>
                            <Flex
                              h={"10"}
                              bg="red.500"
                              w={`${(pollResult.no / pollResult.total) * 100}%`}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Text>
                                {Math.round(
                                  (pollResult.no / pollResult.total) * 100
                                )}
                                %
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      )}
                    </CardActions>
                    <Divider my="2" />
                    <Flex direction={"row-reverse"}>
                      {!showResult ? (
                        <HStack mx="4">
                          <BsSkipForward />
                          <Text
                            onClick={(e) =>
                              handlePollClick(e, "skip", poll._id)
                            }
                            fontWeight={"semibold"}
                            textColor={"purple.800"}
                            cursor={"pointer"}
                          >
                            Skip
                          </Text>
                        </HStack>
                      ) : (
                        <HStack mx="4">
                          <BsSkipForward />
                          <Text
                            onClick={() => {
                              if (index < pollContext.polls.length) {
                                setIndex(index + 1);
                              }
                              setShowResult(false);
                            }}
                            fontWeight={"semibold"}
                            textColor={"purple.800"}
                            cursor={"pointer"}
                          >
                            Next
                          </Text>
                        </HStack>
                      )}
                    </Flex>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Flex>
        </>
      )}
    </div>
  );
};
