import { deleteFromUsers } from '../../store'
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";

const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
 
    deleteFromUsers(id);
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();

}

export { deleteUser };
