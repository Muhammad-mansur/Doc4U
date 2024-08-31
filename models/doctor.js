import { DataTypes, Sequelize } from "sequelize";
import User from "./user";

const Doctor = Sequelize.define('Doctor', {
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

Doctor.belongsto(User, {foreignKey: 'userId' });
export default Doctor;