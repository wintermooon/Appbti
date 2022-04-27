import React, { useEffect, useContext, useState } from "react";
import { Grid, Container, Button, Card, CardContent, Typography } from "@mui/material";

function FreeboardCard() {
  const [freeboard, setFreeboard] = useState([]);

  return (
    <Container>
      {freeboard.map((freeboard) => (
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
    </Container>
  );
}

export default FreeboardCard;
