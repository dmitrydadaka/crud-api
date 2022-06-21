import http from "http";

import { getUsers, addUser, updateUser, deleteUser, getUser } from "./controller";


let userId: number;

const server = http.createServer((req, res) => {

   if (req.method == "GET" && req.url == "/api/users") {
     return getUsers(req, res);
   }

   if (req.method == "GET" && req.url == `api/users/${userId}`) {
    return getUsers(req, res);
  }

   if (req.method == "POST" && req.url == "/api/users") {
     return addUser(req, res);
   }

   if (req.method == "PUT" && req.url == "/api/users") {
     return updateUser(req, res);
   }

   if (req.method == "DELETE" && req.url == "/api/users") {
     return deleteUser(req, res);
   }
});

server.listen(3000, () => {
   console.log("Server is running on port 3000");
});
