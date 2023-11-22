import { Grid, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
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
  Flex,
  Button,
} from "@chakra-ui/react";
import _ from "lodash";
import { BsSendCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
export const PostModal = ({
  show,
  handleModal,
  postFunction,
  modalTitle,
  post,
}) => {
  const authContext = useContext(AuthContext);
  const [uploadFile, setUploadFile] = useState(null);
  const [preview, setPreview] = useState(
    post === undefined ? "" : post.picture[0]
  );
  const [content, setContent] = useState(
    post === undefined ? "" : post.content
  );
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", authContext.user._id);
    formData.append("content", content);
    formData.append("picture", uploadFile);
    post
      ? postFunction(formData, authContext.user._id, post._id)
      : postFunction(formData, authContext.user._id);
    handleModal();
  };

  return (
    <>
      <Modal isOpen={show} onClose={handleModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"2xl"}>{_.capitalize(modalTitle)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />

          <ModalBody>
            <form onSubmit={handleForm}>
              <Grid
                container
                justify="space-between"
                direction="row"
                spacing={3}
              >
                <Grid item container direction="column" md={6}>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={5}
                      placeholder="Write a caption..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ margin: "14px 0" }}>
                    <Form.File
                      type="file"
                      onChange={(e) => {
                        setUploadFile(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                      label="Upload file here"
                      multiple
                    />
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  {uploadFile || preview ? (
                    <img src={preview} alt="input file" width="100%" />
                  ) : (
                    <Flex
                      minW={"52"}
                      h={"32"}
                      rounded={"sm"}
                      border={"1px solid"}
                      borderStyle={"dashed"}
                      borderColor={"gray.400"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <AiOutlinePlus />
                      <Text mx="2">Image Preview</Text>
                    </Flex>
                  )}
                </Grid>
              </Grid>
            </form>
          </ModalBody>
          <Divider />

          <ModalFooter>
            <Button
              colorScheme="gray"
              onClick={handleModal}
              leftIcon={<RxCross2 />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              onClick={handleForm}
              mx="4"
              leftIcon={<BsSendCheck />}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
