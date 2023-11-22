/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Verify.css";
import axios from "axios";
import { Flex } from "@chakra-ui/react";
import { API } from "../../../utils/proxy";
export const Verify = (props) => {
  const [isVerified, setIsVerified] = useState(false);
  const { email, code } = props.match.params;

  useEffect(() => {
    if (email && code) {
      axios
        .post(`${API}/verify`, { email, code })
        .then((response) => {
          // Check the response structure
          if (response.data && response.data.status) {
            console.log(response.data.status);
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        })
        .catch((error) => {
          // Log the error for debugging
          console.error(error);
          setIsVerified(false);
        });
    } else {
      setIsVerified(false);
    }
  }, [email, code]);

  return (
    <Flex direction={"column"}>
      <Flex direction={"column"} mt="3">
        <Grid container justify="center">
          <Grid item xs={10}>
            <Card variant="elevation" elevation={3}>
              <Grid
                container
                justify="flex-start"
                className="p-3 "
              >
                <h1>{isVerified ? "Your Account is successfully verified" : "Invalid Verification Link"}</h1>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Flex>
    </Flex>
  );
};
