import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import { addToUsers } from '../../store';
import { User } from "../IUser";

const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let data = "";
  let newUser;

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on('end', () => {
    newUser = JSON.parse(data);

    const user: User = { id: uuidv4(), ...newUser };
    addToUsers(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: user
      })
    )
  })
}

export {addUser};
