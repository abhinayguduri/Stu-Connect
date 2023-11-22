import { Grid } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../context/authContext/authContext";
import { UserContext } from "../../../context/userContext/UserContext";
import { HomeRightBar } from "../../pages/Home/HomeRightBar";
import { HomeSideBar } from "../../pages/Home/HomeSideBar";
import { InputBox } from "../../pages/Home/InputBox";
import Header from "../Header/Header";
import {
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import "./Home.css";

export const Home = ({ children }) => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    userContext.getUserById(authContext.user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" w="100%">
      <Header />
      <div style={{ padding: "0 20px", margin: "10px 0" }}>
        <Grid container spacing={3} justify="center">
          <Grid item md={3}>
            <HomeSideBar />
          </Grid>
          <Grid item md={6}>
            <div>
              <InputBox />
              {children}
            </div>
          </Grid>
          <Grid item md={3}>
            <HomeRightBar />
          </Grid>
        </Grid>
      </div>
    </Flex>
  );
};
