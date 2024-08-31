import { DataTypes } from 'sequelize';
import sequelize from './path_to_your_sequelize_instance';
import Patient from "./patient";
import Appointment from "./appointment";

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