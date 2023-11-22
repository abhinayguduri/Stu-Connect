import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { NoticeContext } from "../../../../context/noticeContext/NoticeContext";
import { Divider, Flex, Text } from "@chakra-ui/react";
export const NoticeCard = () => {
  const noticeContext = useContext(NoticeContext);
  useEffect(() => {
    noticeContext.getNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex w="full" bg="white" rounded="lg" mt="4" px="4" py="2">
      <div className="mt-3">
        <Text fontSize="lg" fontWeight={"semibold"} textColor="purple.800">
          Updates
        </Text>
        <Carousel style={{ height: "150px", margin: "auto" }}>
          {noticeContext.loading ? (
            <div>loading</div>
          ) : (
            noticeContext.notice.map((not, index) => {
              return (
                <Carousel.Item key={index}>
                  <Grid
                    container
                    className="mt-3"
                    justify="space-between"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item xs={10}>
                      <Typography
                        align="center"
                        color="primary"
                        variant="caption"
                      >
                        {not.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography align="center" variant="subtitle1">
                        {not.description.slice(0, 50)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <Button size="small">Link</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Carousel.Item>
              );
            })
          )}
        </Carousel>
      </div>
    </Flex>
  );
};
