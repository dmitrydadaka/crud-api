import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { User } from "./IUser";

const getUsers = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(
        path.join(__dirname, "store.json"),
        "utf8",
        (err, data) => {

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
                        message: JSON.parse(data),
                    })
                );
            }
        }
    );
};

const addUser = (req: IncomingMessage, res: ServerResponse) => {

    let data = "";

    req.on("data", (chunk) => {
        data += chunk.toString();
    });

    req.on("end", () => {
        let user = JSON.parse(data);

        fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, data) => {

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
                let latest_id = users.reduce(
                    (max = 0, user: User) => (user.id > max ? user.id : max),
                    0
                );
                user.id = latest_id + 1;
                users.push(user);
                fs.writeFile(
                    path.join(__dirname, "store.json"),
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

const updateUser = (req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk.toString();
    });

    req.on("end", () => {

        let user: User = JSON.parse(data);

        fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, data) => {

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
                let index = users.findIndex((e) => e.id == user.id);
                users[index] = user;
                fs.writeFile(
                    path.join(__dirname, "store.json"),
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

const deleteUser = (req: IncomingMessage, res: ServerResponse) => {

    let data = "";
    req.on("data", (chunk) => {
        data += chunk.toString();
    });

    req.on("end", () => {

        let user: User = JSON.parse(data);

        fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, data) => {

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
                let index = users.findIndex((e) => e.id == user.id);

                users.splice(index, 1);

                fs.writeFile(
                    path.join(__dirname, "store.json"),
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

export { getUsers, addUser, updateUser, deleteUser };
