import { join } from "path";
import express, { static } from "express";
import { json, urlencoded } from "body-parser";
import { connect } from "mongoose";

import postsRoutes from "./routes/posts";
import userRoutes from "./routes/user";

const app = express();

connect(
    "mongodb+srv://sandy2221:68d0SdYbcBxImo9V@cluster0.vfnh3.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/images", static(join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

export default app;
