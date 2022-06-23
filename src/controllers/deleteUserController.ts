import { deleteFromUsers, users } from '../../store'
import { ServerResponse, IncomingMessage } from "http";
import { User } from "../IUser";
import { uuidValidateV4 } from '../utils';

const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const index = users.findIndex((u) => u.id === id);

    try {
        if (!uuidValidateV4(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: 'Id is not valid!' }));
        }
        if (index === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: 'Id doesn\'t exist!' }));
        }
        deleteFromUsers(id);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            message: 'User was deleted!',
          })
        );
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Error! Operation failed' }));
      }
}

export { deleteUser };
