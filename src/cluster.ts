import * as Cluster from 'cluster';
import { cpus } from 'os';
import { server } from './index';
import dotenv from 'dotenv';
dotenv.config();

const numCPUs = cpus().length;
const cluster = Cluster as unknown as Cluster.Cluster;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.PORT;
  server.listen(PORT, () => {
    console.log(`Server works on port ${PORT}`);
  });
  console.log(`Worker ${process.pid} started`);
}
