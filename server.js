// App server
import express from 'express';
import cookieParser from 'cookie-parser';
import routesLoader from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
routesLoader(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
