import express, {
  Response as ExResponse,
  Request as ExRequest,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import morgan from 'morgan';

// Init App
export const app = express();
const V1BASEPATH = '/api/v1';

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

// Swagger Documentation for the Api
app.use(
  `${V1BASEPATH}/swagger`,
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(
        await import('../api/dist/swagger.json'),
      ),
    );
  },
);

RegisterRoutes(app);
