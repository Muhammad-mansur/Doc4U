import { DataTypes, Sequelize } from "sequelize";
import Doctor from "./doctor";
import Patient from "./patient";

const Appointment = Sequelize.define('Appointment', {
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'canceled'),
        allowNull: false,
        defaultValue: 'scheduled'
    },

    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Doctor,
            key: 'id'
        }
    },

    patientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: 'id'
        }
    }
});

Appointment.belongsto(Doctor, { foreignKey: 'doctorId'});
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
export default Appointment;