import http from "http";

import { getUsers } from "./controllers/getUsersController";
import { addUser } from "./controllers/addUserController";
import { updateUser } from "./controllers/updateUserController";
import { deleteUser } from "./controllers/deleteUserController";
import { getUser } from "./controllers/getUserController";


const server = http.createServer((req, res) => {
    
        if (req.method === "GET" && req.url!.match(/\/api\/users\/\w+/)) {
            const id = req.url!.split("/")[3];
            return getUser(res, id);
        }
        if (req.method == "GET" && (req.url == "/api/users" || req.url == "/api/users/")) {
            return getUsers(res);
        }
    
        if (req.method == "POST" && (req.url == "/api/users" || req.url == "/api/users/")) {
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
    
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Resource doesn\'t exist!' }));
    
});

export { server };
