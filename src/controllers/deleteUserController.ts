import { store,users } from '../../store'
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";

 const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      let user: User = JSON.parse(data);
      store(user, 'delete');

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: user
      }))        
 });
}

export { deleteUser };
