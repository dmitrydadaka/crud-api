import dotenv from 'dotenv';
import { server } from './index';
dotenv.config();

const runServer = () => {
    const PORT = process.env.PORT;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} `);
    })
}
runServer();

export { runServer };
