import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { get } from "../../../api";
import { useNavigate } from "react-router";

const Lists = ({ setViewType }) => {
  const navigate = useNavigate();
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function loadFreeboardList() {
      const res = await get(`freeboardlist`);
      setLists(res.data);
      setIsFetchCompleted(true);
    }
    loadFreeboardList();
  }, []);

  // * * Skeleton Code 작성할 것
  if (!isFetchCompleted) {
    return "Loading...";
  }

  return (
    <div id="FreeboardLists">
      {lists.map((freeboard) => (
        <Card sx={{ minWidth: 275 }} key={freeboard._id} onClick={() => navigate(`freeboards/${freeboard._id}`)}>
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
