import express from "express";
import { connectToDB } from "./config/database.config";

const app = express();
const PORT = 3001;

const startServer = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
};

startServer();
