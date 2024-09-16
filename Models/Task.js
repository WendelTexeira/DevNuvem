import { Sequelize } from "sequelize";
import { DBconfig } from "../Config/db.js";

export const Task = DBconfig.define("task", {
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(200),
    allowNull: false,
  }
});
