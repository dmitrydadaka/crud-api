import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import { addToUsers } from '../../store';
import { User } from "../IUser";

const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on('end', () => {
    const user = JSON.parse(data);

    const newUser: User = { id: uuidv4(), ...user };
    if (
      user &&
      user.name &&
      user.age &&
      user.hobbies &&
      Array.isArray(user.hobbies)
    ) {
      addToUsers(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          newUser
        )
      )
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          name: "required",
          age: "required",
          hobbies: "required",
        })
      );
    }
  })
}

export { addUser };
