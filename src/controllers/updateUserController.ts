import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";
import { users } from "../../store";

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    const user: User = JSON.parse(data);
    const index = users.findIndex((u) => u.id === id);
    const newUser = { id: id, ...user };
    users[index] = newUser;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: users[index],
      })
    );
  })

};

export { updateUser };
