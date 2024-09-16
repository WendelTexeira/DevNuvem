import { DBconfig } from "../Config/db.js";
import { Task } from "../Models/Task.js";

export const createTables = async () => {
    try {
        await DBconfig.authenticate();
        console.log('\nConexão com DB estabelecida com sucesso.\n');

        await DBconfig.sync({ alter: true });
        console.log('\nTabelas sincronizadas com sucesso.\n');

    } catch (error) {
        console.error('\nErro ao sincronizar as tabelas:\n', error);
    };
};

