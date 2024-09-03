import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('doctor', 'patient'),
        allowNull: false
    }
});

export default User;