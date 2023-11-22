import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from "../../../context/userContext/UserContext";
import { AuthContext } from "../../../context/authContext/authContext";
import { useHistory } from "react-router-dom";
import { Divider, Flex, Text } from "@chakra-ui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faUserFriends } from "@fortawesome/free-solid-svg-icons"
import { Skeleton } from "@material-ui/lab";
import { API } from "../../../utils/proxy";

const ListFriendLoading = () => {
  return (
    <List variant="outlined">
      <ListItem>
        <ListItemIcon>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Skeleton
              animation="wave"
              height={10}
              width="100px"
              style={{ marginBottom: 6 }}
            />
          }
          secondary={
            <Skeleton
              animation="wave"
              height={10}
              width="60px"
              style={{ marginBottom: 6 }}
            />
          }
        />
      </ListItem>
    </List>
  );
};

export const Contacts = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    userContext.getUserById(authContext.user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user._id]);

  // if (userContext.loading) {
  //   return (
  // <Grid container>
  //   <ListFriendLoading />
  // </Grid>
  //   )
  // }

  return (
    <>
      <Flex
        bg="white"
        rounded="lg"
        p="4"
        // shadow={"lg"}
        direction={"column"}
        mt="4"
      >
        <Text
          fontSize={"xl"}
          fontWeight={"semibold"}
          textColor={"purple.800"}
          mb="3"
        >
          Contacts
        </Text>
        <Divider />
        {userContext.loading ? (
          <Grid container>
            <ListFriendLoading />
          </Grid>
        ) : (
          <CardContent>
            <List component="nav">
              {userContext.user.friendList.map((user, i) => {
                return (
                  <ListItem
                    button
                    key={i}
                    onClick={() => {
                      history.push(`/profile/${user._id}`);
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        alt={user.name}
                        src={`${API}/pic/user/${user._id}`}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          <b>{user.name}</b>
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        )}
      </Flex>
    </>
  );
};

// : (
//   <Grid
//     container
//     justify="center"
//     direction="column"
//     alignItems="center"
//     className="my-3"
//   >
//     <FontAwesomeIcon color="grey" icon={faUserFriends} />
//     <Typography variant="body2" color="textSecondary">
//       Your friend list is empty!
//     </Typography>
//   </Grid>
// )}