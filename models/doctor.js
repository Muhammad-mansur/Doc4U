import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.js";

const Doctor = sequelize.define('Doctor', {
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },

    bio: {
        type: DataTypes.TEXT,
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

Doctor.belongsTo(User, {foreignKey: 'userId' });

export default Doctor;