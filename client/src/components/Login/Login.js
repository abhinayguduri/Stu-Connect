import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/authContext";
import "./Login.css";
import {
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  FormLabel,
} from "@chakra-ui/react";
export const Login = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  // console.log(inputValues)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const formData = {
    email: inputValues.email,
    password: inputValues.password,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await authContext.signinUser(formData);
  };

  return (
    <>
      {/* <div className="login">
        <div className="container">
          <Grid
            container
            alignItems="center"
            justify="space-around"
            direction="row"
          >
            <Grid item className="text-center">
              <h1 id="header-name" style={{ fontSize: "40px" }}>
                StuConnect
              </h1>
              <Paper elevation={3}>
                <Box py={6} px={3} width="400px">
                  <form onSubmit={handleFormSubmit}>
                    <Grid
                      spacing={1}
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item container>
                        <TextField
                          type="email"
                          name="email"
                          fullWidth
                          value={inputValues.email}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                          label="Email"
                        />
                      </Grid>
                      <Grid item container>
                        <TextField
                          fullWidth
                          name="password"
                          value={inputValues.password}
                          onChange={handleChange}
                          type="password"
                          size="small"
                          variant="outlined"
                          label="Password"
                        />
                      </Grid>
                      <Grid item container>
                        <Button
                          color="primary"
                          fullWidth
                          size="large"
                          variant="contained"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Box my={2}>
                    <Grid
                      alignItems="center"
                      justify="space-between"
                      spacing={1}
                      container
                      direction="row"
                    >
                      <Grid item>
                        <Button
                          variant="text"
                          style={{
                            textTransform: "none",
                          }}
                        >
                          Forgot password
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => {
                            history.push("/signup");
                          }}
                          variant="contained"
                          style={{
                            color: "#fff",
                            background: "rgb(35 75 167)",
                          }}
                        >
                          Create Account
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div> */}
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
            Login page
          </Text>
          <form onSubmit={handleFormSubmit}>
            <FormControl mt="2">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                // fullWidth
                value={inputValues.email}
                onChange={handleChange}
                // variant="outlined"
                // size="small"
                // label="Email"
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
                Login
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
                  history.push("/signup");
                }}
                colorScheme="gray"
                w={"full"}
                cursor={"pointer"}
              >
                Create Account
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </>
  );
};
