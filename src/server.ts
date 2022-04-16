import { app } from "./app";
import express from "express";

const port = process.env.PORT || 3012;

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('minimaLists-frontend/dist'));
}

app.listen(port, () => {
  console.log(`listening at port ${port}`);
  console.log(`environment is ${process.env.NODE_ENV}`);
});
