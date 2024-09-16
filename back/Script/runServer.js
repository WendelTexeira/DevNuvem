import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "../Routes/index.js";
import { swaggerUI, specs } from '../Config/swagger.js';

export const runServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json());
  dotenv.config();
  
  const port = 3000;
  
  app.use('/api', router);
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
  
  app.listen(port, () => {
    try{
      console.log(`\nO servidor está rodando em: http://localhost:${port}\n`);
  
    } catch (error) {
      console.error(error);
    }
  });
};

