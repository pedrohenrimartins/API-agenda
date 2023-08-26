import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import contatoController from './controller/contatoController.js';

let servidor = express ();
servidor.use(cors());
servidor.use(express.json());

servidor.use(contatoController);

servidor.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`));

