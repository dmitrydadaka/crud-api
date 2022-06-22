import fs from "fs";
import path from "path";
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";
import { users } from '../../store'


const getUsers = (res: ServerResponse) => {

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));

}
export { getUsers }; 
