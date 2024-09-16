import { createTables } from "./Script/createTables.js";
import { runServer } from "./Script/runServer.js";

const main = async () => {
  try {
    console.log('Testando importação');
    await createTables();
    console.log('Importação bem-sucedida!');
    await runServer();
  } catch (error) {
    console.error('Erro ao importar:', error);
  }
};

main();
