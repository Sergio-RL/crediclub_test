import Express from "express";
import http from "http";
import cors from "cors";
import cognitive from "./cognitive/cognitive.controller";

const app = Express();

app.use(cors());

app.use("/cognitive", cognitive);

const server = http.createServer(app);

server.listen({ port: 3000 }, () => {
  console.log(`🚀 Server ready at http://localhost:3000`);
});
