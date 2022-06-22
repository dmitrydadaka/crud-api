import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      let user: User = JSON.parse(data);
      fs.readFile(path.join("store.json"), "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          let users: [User] = JSON.parse(data);
          let index = users.findIndex((t) => t.id == user.id);
          users[index] = user;
          fs.writeFile(
            path.join("store.json"),
            JSON.stringify(users),
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: user,
                  })
                );
              }
            }
          );
        }
      });
    });
 };

export { updateUser };
