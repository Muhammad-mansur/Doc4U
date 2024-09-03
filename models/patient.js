import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.js";

const Patient = sequelize.define('Patient', {
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

Patient.belongsTo(User, { foreignKey: 'userId'});

export default Patient;