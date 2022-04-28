import React, { useEffect, useContext, useState } from "react";
import { Grid, Box, Container, Button, Card, CardContent, Typography } from "@mui/material";
import * as Api from "../../../api";

const Lists = (setViewType) => {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function loadFreeboardList() {
      const res = await Api.get(`freeboardlist`);
      setLists(res.data);
      setIsFetchCompleted(true);
    }
    loadFreeboardList();
  }, [setViewType]);

  // * * Skeleton Code 작성할 것
  if (!isFetchCompleted) {
    return "Loading...";
  }

  return (
    <div id="FreeboardLists">
      {lists.map((freeboard) => (
        <Card sx={{ minWidth: 275 }} key={freeboard._id} onClick={() => setViewType("post")}>
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
