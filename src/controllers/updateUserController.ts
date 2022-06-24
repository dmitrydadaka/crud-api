import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";
import { users } from "../../store";
import { uuidValidateV4 } from "../utils";

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    const user: User = JSON.parse(data);
    const index = users.findIndex((u) => u.id === id);
    const newUser = { ...users[index], ...user };
    users[index] = newUser;
    
      if (!uuidValidateV4(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Id is not valid!' }));
        return;
      }
      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Id doesn\'t exist!' }));
        return;
      }
      try {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(users[index])
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: 'Error! Operation failed' }));
    }
  })
};

export { updateUser };
