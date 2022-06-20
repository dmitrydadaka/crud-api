import http from "http";

import { getUsers, addUser, updateUser, deleteUser } from "./controller";

const server = http.createServer((req, res) => {
   if (req.method == "GET" && req.url == "/api/users") {
     return getUsers(req, res);
   }

   if (req.method == "POST" && req.url == "/api/users") {
     return addUser(req, res);
   }

   if (req.method == "PUT" && req.url == "/api/users") {
     return updateUser(req, res);
   }

   // Deleting a task
   if (req.method == "DELETE" && req.url == "/api/users") {
     return deleteUser(req, res);
   }
});

// set up the server port and listen for connections
server.listen(3000, () => {
   console.log("Server is running on port 3000");
});
