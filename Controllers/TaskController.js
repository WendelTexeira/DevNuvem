import { Task } from "../Models/Task.js";
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gerenciar tarefas
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro no servidor
 */
export const getAllTask = async (request, response) => {
  try {
    const task = await Task.findAll();
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro no servidor
 */
export const getTaskById = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByPk(id);
    if (task) {
      response.status(200).json(task);
    } else {
      response.status(404).json({ message: 'Task não encontrada' });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro no servidor
 */
export const createTask = async (request, response) => {
  try {
    const task = await Task.create(request.body);
    response.status(201).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro no servidor
 */
export const updateTask = async (request, response) => {
  try {
    const { id } = request.params;
    const [updated] = await Task.update(request.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      response.status(200).json(updatedTask);
    } else {
      response.status(404).json({ message: 'Task não encontrada' });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro no servidor
 */
export const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Task.destroy({
      where: { id: id }
    });
    if (deleted) {
      response.status(204).send();
    } else {
      response.status(404).json({ message: 'Task não encontrada' });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Definição do esquema de tarefa
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *       example:
 *         id: 1
 *         title: "Aprender Swagger"
 *         description: "Entender como gerar documentação de APIs com Swagger"
 */
