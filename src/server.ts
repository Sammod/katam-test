import { app } from './index';
import * as fs from 'fs';
import * as https from 'https';

const PORT = process.env.PORT || 8000;

const privateKey = fs.readFileSync('cert/server.key');
const certificate = fs.readFileSync('cert/server.cert');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${PORT}/api/v1/`,
  );
});
