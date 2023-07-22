import Express from "express";
import http from "http";
import cors from "cors";
import emotionDetector from "./emotion-detector";

const app = Express();

app.use(cors());

app.use("/emotion-detector", emotionDetector);

const server = http.createServer(app);

server.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:3000`);
});
