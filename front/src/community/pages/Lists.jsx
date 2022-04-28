import React, { useEffect, useContext, useState } from "react";
import { Grid, Box, Container, Button, Card, CardContent, Typography } from "@mui/material";
import * as Api from "../../api";

const Lists = (setFreeboards, freeboards) => {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [Lists, setLists] = useState([]);

  const fetchPostsInfo = async () => {
    try {
      const { data: tempAllPosts } = await Api.get("freeboardlist");
      setFreeboards(tempAllPosts);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  // * * Skeleton Code 작성할 것
  if (!isFetchCompleted) {
    return "Loading...";
  }

  return (
    <div id="FreeboardLists">
      {freeboards.map((freeboard) => (
        <Card sx={{ minWidth: 275 }} key={freeboard._id}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {freeboard.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {freeboard.title}
            </Typography>
            <Typography variant="body2">{freeboard.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Lists;
