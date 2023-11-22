import { Grid, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext/authContext";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import _ from "lodash";
import { BsSendCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
export const PollModal = ({
  show,
  handleModal,
  modalTitle,
  pollFunction,
  poll,
}) => {
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [pollBody, setPollBody] = useState("");

  const pollData = {
    user: authContext.user._id,
    title,
    poll: pollBody,
  };
  const handleBtnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await pollFunction(authContext.user._id, pollData);
      console.log(response);
      handleModal();
    } catch (error) {
      console.log(error.response.data.errorMsg);
    }
  };

  return (
    <>
      <Modal isOpen={show} onClose={handleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"2xl"}>{_.capitalize(modalTitle)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />

          <ModalBody>
            <form onSubmit={handleBtnSubmit}>
              <Grid container justify="space-between" direction="row">
                <Grid item container direction="column">
                  <Grid item>
                    <TextField
                      className="mb-3"
                      variant="outlined"
                      placeholder="Title"
                      size="small"
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      multiline
                      fullWidth
                      className="mb-3"
                      variant="outlined"
                      rows={4}
                      placeholder="Poll"
                      size="small"
                      value={pollBody}
                      onChange={(e) => setPollBody(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </ModalBody>
          <Divider />

          <ModalFooter>
            <Button
              onClick={handleModal}
              colorScheme="gray"
              leftIcon={<RxCross2 />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleBtnSubmit}
              colorScheme="green"
              ml="4"
              leftIcon={<BsSendCheck />}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
