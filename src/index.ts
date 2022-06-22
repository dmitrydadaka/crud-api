import http from "http";

import { getUsers } from "./controllers/getUsersController";
import { addUser } from "./controllers/addUserController";
import { updateUser } from "./controllers/updateUserController";
import { deleteUser } from "./controllers/deleteUserController";
//import { getUser } from "./controllers/getUserController";

const server = http.createServer((req, res) => {

    /* if (req.method === "GET" && req.url!.match(/\/api\/users\/\w+/)) {
        const id = req.url!.split("/")[3];
        return getUser(req, res, id);
    } */
    if (req.method == "GET" && req.url == "/api/users") {
        getUsers(res);
    }

    if (req.method == "POST" && req.url == "/api/users") {
        return addUser(req, res);
    }

    if (req.method === "PUT" && req.url!.match(/\/api\/users\/\w+/)) {
        const id = req.url!.split("/")[3];
        return updateUser(req, res, id);    
    }

    if (req.method == "DELETE" && req.url!.match(/\/api\/users\/\w+/)) {
        const id = req.url!.split("/")[3];
        return deleteUser(req, res, id);
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});