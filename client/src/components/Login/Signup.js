// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from "@material-ui/core";
import {
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/authContext";
import "./Login.css";

export const Signup = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const defaultdob =
    new Date().getFullYear() +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getDate();

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    dob: defaultdob,
    rollno: "",
    age: "",
    collegeId: "",
  });

  // console.log(inputValues)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
      age:
        parseInt(new Date().getFullYear()) -
        parseInt(inputValues.dob.slice(0, 4)),
    });
  };

  const formData = {
    name: inputValues.name,
    email: inputValues.email,
    dob: inputValues.dob,
    password: inputValues.password,
    rollno: inputValues.rollno,
    collegeId: inputValues.collegeId,
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await authContext.signupUser(formData);
    if (response) {
      history.push("/signin");
    }
  };
  const styleTheme1 =
    authContext.theme === "dark"
      ? { background: "black", color: "white" }
      : { background: "white", color: "black" };

  return (
    // <div className="login" style={styleTheme1}>
    //   <div className="container text-center">
    //     <Grid
    //       container
    //       alignItems="center"
    //       justify="space-around"
    //       direction="row"
    //     >
    //       <Grid item>
    //         <img src="logo1.png" alt="logo" />
    //       </Grid>
    //       <Grid item>
    //         <h1 id="header-name" style={{ fontSize: "40px" }}>
    //           StuConnect
    //         </h1>
    //         <Paper elevation={9} variant="elevation">
    //           <Box pt={5} pb={3} px={3} width="400px">
    //             <form onSubmit={handleOnSubmit}>
    //               <Grid
    //                 spacing={1}
    //                 container
    //                 direction="column"
    //                 justify="center"
    //                 alignItems="center"
    //               >
    //                 <Grid item container>
    //                   <TextField
    //                     type="text"
    //                     name="name"
    //                     fullWidth
    //                     variant="outlined"
    //                     size="small"
    //                     value={inputValues.name}
    //                     onChange={handleChange}
    //                     label="Name"
    //                   />
    //                 </Grid>
    //                 <Grid item container>
    //                   <TextField
    //                     type="text"
    //                     name="email"
    //                     value={inputValues.email}
    //                     onChange={handleChange}
    //                     fullWidth
    //                     variant="outlined"
    //                     size="small"
    //                     label="Email"
    //                   />
    //                 </Grid>
    //                 <Grid
    //                   item
    //                   container
    //                   direction="row"
    //                   alignItems="center"
    //                   justify="space-between"
    //                   spacing={3}
    //                 >
    //                   <Grid item xs={6}>
    //                     <TextField
    //                       name="rollno"
    //                       variant="outlined"
    //                       label="Roll no"
    //                       size="small"
    //                       value={inputValues.rollno}
    //                       onChange={handleChange}
    //                     />
    //                   </Grid>
    //                   <Grid item xs={6}>
    //                     <TextField
    //                       name="collegeId"
    //                       label="College Id"
    //                       type="text"
    //                       variant="outlined"
    //                       size="small"
    //                       value={inputValues.collegeId}
    //                       onChange={handleChange}
    //                     />
    //                   </Grid>
    //                 </Grid>

    //                 <Grid
    //                   item
    //                   container
    //                   direction="row"
    //                   alignItems="center"
    //                   justify="space-between"
    //                 >
    //                   <Grid item xs={6}>
    //                     <TextField
    //                       name="dob"
    //                       variant="outlined"
    //                       label="Birthday"
    //                       size="small"
    //                       value={inputValues.dob}
    //                       onChange={handleChange}
    //                       type="date"
    //                       InputLabelProps={{
    //                         shrink: true,
    //                       }}
    //                     />
    //                   </Grid>
    //                   <Grid item xs={3}>
    //                     <TextField
    //                       age="age"
    //                       label="Age"
    //                       disabled
    //                       type="number"
    //                       variant="outlined"
    //                       size="small"
    //                       value={inputValues.age}
    //                       onChange={handleChange}
    //                       style={{ width: "auto" }}
    //                     />
    //                   </Grid>
    //                 </Grid>
    //                 <Grid item container>
    //                   <TextField
    //                     fullWidth
    //                     name="password"
    //                     type="password"
    //                     size="small"
    //                     variant="outlined"
    //                     value={inputValues.password}
    //                     onChange={handleChange}
    //                     label="Create password"
    //                   />
    //                 </Grid>
    //                 <Grid item container>
    //                   <Button
    //                     type="submit"
    //                     color="primary"
    //                     fullWidth
    //                     size="large"
    //                     variant="contained"
    //                   >
    //                     Signup
    //                   </Button>
    //                 </Grid>
    //               </Grid>
    //             </form>
    //             <Box my={2}>
    //               <Grid
    //                 alignItems="center"
    //                 justify="space-between"
    //                 spacing={1}
    //                 container
    //                 direction="row"
    //               >
    //                 <Grid item>
    //                   <Button
    //                     disabled
    //                     variant="text"
    //                     style={{
    //                       textTransform: "none",
    //                     }}
    //                   >
    //                     Already have an account!
    //                   </Button>
    //                 </Grid>
    //                 <Grid item>
    //                   <Button
    //                     onClick={() => {
    //                       history.push("/signin");
    //                     }}
    //                     variant="contained"
    //                     style={{
    //                       color: "white",
    //                       background: "#1712c5",
    //                     }}
    //                   >
    //                     Login
    //                   </Button>
    //                 </Grid>
    //               </Grid>
    //             </Box>
    //           </Box>
    //         </Paper>
    //         <Grid container className="mt-1" justify="center">
    //           <Button
    //             size="small"
    //             onClick={() => {
    //               history.push("/signup-campus");
    //             }}
    //           >
    //             <Typography variant="button" color="textSecondary">
    //               Signup as{" "}
    //               <Typography variant="button" color="textPrimary">
    //                 Campus Admin
    //               </Typography>
    //             </Typography>
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </div>
    <Flex
    w="100%"
    h="100vh"
    bg="gray.50"
    alignItems={"center"}
    justifyContent={"center"}
  >
    <Flex
      direction={"column"}
      width={"50%"}
      bg="white"
      p="10"
      rounded={"md"}
      shadow={"lg"}
    >
      <Text fontSize={"3xl"} fontWeight={"semibold"} mb="4">
        {" "}
        Signup Student page
      </Text>
      <form onSubmit={handleOnSubmit}>
        <FormControl mt="2">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            // fullWidth
            value={inputValues.name}
            onChange={handleChange}
            // variant="outlined"
            // size="small"
            // label="Email"
          />
        </FormControl>

        <FormControl mt="2">
          <FormLabel>Email</FormLabel>

          <Input
            // fullWidth
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            type="email"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Roll No</FormLabel>

          <Input
            // fullWidth
            name="rollno"
            value={inputValues.rollno}
            onChange={handleChange}
            type="text"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>College Name</FormLabel>

          <Input
            // fullWidth
            name="collegeId"
            value={inputValues.collegeId}
            onChange={handleChange}
            type="text"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Birthday</FormLabel>

          <Input
            // fullWidth
            name="dob"
            value={inputValues.dob}
            onChange={handleChange}
            type="date"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Age</FormLabel>

          <Input
            // fullWidth
            name="age"
            value={inputValues.age}
            onChange={handleChange}
            type="number"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Password</FormLabel>

          <Input
            // fullWidth
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            type="password"
            // size="small"
            // variant="outlined"
            // label="Password"
          />
        </FormControl>
        <FormControl>
          <Button
            mt="3"
            bg={"purple.800"}
            _hover={{
              bg: "purple.700",
            }}
            color={"white"}
            type="submit"
            w={"full"}
            cursor={"pointer"}
          >
            Create Account
          </Button>
        </FormControl>

        <VStack>
          {/* <Button
            variant="text"
            style={{
              textTransform: "none",
            }}
          >
            Forgot password
          </Button> */}

          <Button
            mt="2"
            onClick={() => {
              history.push("/signin");
            }}
            colorScheme="gray"
            w={"full"}
            cursor={"pointer"}
          >
            Login
          </Button>
          <Button
            mt="2"
            onClick={() => {
              history.push("/signup-campus");
            }}
            colorScheme="gray"
            w={"full"}
            cursor={"pointer"}
          >
            Signup As Campus Admin
          </Button>
        </VStack>
      </form>
    </Flex>
  </Flex>
  );
};
