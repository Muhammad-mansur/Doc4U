import { DataTypes, Sequelize } from "sequelize";
import User from "./user";

const Patient = Sequelize.define('Patient', {
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

Patient.belongsto(User, { foreignKey: 'userId'});
export default Patient;