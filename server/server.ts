// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { mealhistoryRouter } from './src/routers';
// import 'dotenv/config';
// import { app } from './src/app';

// const PORT = process.env.PORT || 5000;

// app.use('/meals', mealhistoryRouter);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
// });

import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 3307;

app.listen({ host: '0.0.0.0', port: PORT }, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
