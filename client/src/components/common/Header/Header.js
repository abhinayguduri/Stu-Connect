import React, { useContext, useState } from "react";
import "./Header.css";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AuthContext } from "../../../context/authContext/authContext";
import { Link, useHistory, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faHome,
  faBookReader,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import { FeedbackModal } from "../../pages/Modals/FeedbackModal";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#03DAC6", fontSize: "28px" };
  } else {
    return { color: "grey", fontSize: "24px" };
  }
};
const Links = ["Home", "Blogs", "Ads", "Placements"];

const NavLink = (props) => {
  const navigate = useHistory();

  const { click, children } = props;
  const getPath = (name) => {
    console.log("worth of checking path", name);
    if (name === "Home") {
      return "/";
    } else if (name === "Blogs") {
      return "/blogs";
    } else if (name === "Ads") {
      return "/ads";
    } else {
      return "/jobs-and-placements";
    }
  };

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      textColor="white"
      href={"#"}
      onClick={() => {
        navigate.push(getPath(children));
      }}
    >
      {children}
    </Box>
  );
};
const Header = ({ history }) => {
  const usehistory = useHistory();
  const authContext = useContext(AuthContext);
  const [showFeedback, setShowFeedback] = useState(false);
  const [moreOption, setMoreOption] = useState(null);
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget);
  };
  const open = Boolean(moreOption);
  const handleClose = () => {
    setMoreOption(null);
  };

  const handleFeedback = () => {
    setShowFeedback(!showFeedback);
  };
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#212121", textColor: "white" }
      : { background: "white" };

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(authContext)
  return (
    <div className="header" style={{ width: "100%" }}>
      {showFeedback ? (
        <FeedbackModal show={showFeedback} onhide={handleFeedback} />
      ) : null}
      {/* <AppBar style={styleTheme} elevation={3}>
        <Toolbar className="header">
          <div className="header-part-1">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => {
                usehistory.push("/");
              }}
            >
              <Typography variant="h6" id="header-name">
                StuConnect
              </Typography>
            </Button>
          </div>
          <div className="header-part-2">
            <Grid container justify="space-around" direcection="row">
              <Grid item>
                <Link to="/">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faHome}
                      style={currentTab(history, "/")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/blogs">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faBookReader}
                      style={currentTab(history, "/blogs")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/ads">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      style={currentTab(history, "/ads")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/jobs-and-placements">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      style={currentTab(history, "/jobs-and-placements")}
                    />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </div>

          <div className="header-part-3">
            <TextField
              id="outlined-password-input"
              label="Search"
              type="text"
              size="small"
              variant="outlined"
            />
            <IconButton onClick={handleMoreOption}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={moreOption}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                // onClick={handleClose}
                onClick={() => {
                  history.push(`/profile/${authContext.user._id}`);
                }}
              >
                View Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  usehistory.push("/about-university");
                }}
              >
                About University
              </MenuItem>
             
              <MenuItem
                onClick={() => {
                  usehistory.push("/settings-privacy");
                }}
              >
                Settings & Privacy
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleFeedback();
                  handleClose();
                }}
              >
                Give Feedback
              </MenuItem>
              <MenuItem
                onClick={() => {
                  authContext.signoutUser();
                }}
              >
                Signout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar> */}
      <>
        <Box
          bg={useColorModeValue("purple.800", "gray.200")}
          px={4}
          w="100%"
          shadow="lg"
        >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <RxCross1 /> : <GiHamburgerMenu />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box textColor="white" fontSize="2xl" fontWeight={"bold"}>
                Stuconnect.
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} name={authContext.user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      history.push(`/profile/${authContext.user._id}`);
                    }}
                  >
                    View Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      usehistory.push("/settings-privacy");
                    }}
                  >
                    {" "}
                    Settings & Privacy
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleFeedback();
                      handleClose();
                    }}
                  >
                    Give Feedback
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      authContext.signoutUser();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link} click={currentTab(history, "/blogs")}>
                    {link}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    </div>
  );
};
export default withRouter(Header);
