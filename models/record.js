import { DataTypes } from 'sequelize';
import sequelize from "../db.js";
import Patient from "./patient.js";
import Appointment from "./appointment.js";

const MedicalRecord = sequelize.define('MedicalRecord', {
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    prescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    appointmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Appointment,
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

MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId' });
MedicalRecord.belongsTo(Appointment, { foreignKey: 'appointmentId' });

export default MedicalRecord;