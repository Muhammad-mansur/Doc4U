import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Doctor from "./doctor.js";
import Patient from "./patient.js";

const Appointment = sequelize.define('Appointment', {
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

Appointment.belongsTo(Doctor, { foreignKey: 'doctorId'});
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

export default Appointment;