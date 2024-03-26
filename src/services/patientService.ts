import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientWithoutSsn, Patient, NewPatientEntry } from '../types';

const getPatientsWithoutSsn = ():PatientWithoutSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation};
    });
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ...entry
    };

    patients.push(newEntry);
    return newEntry;
};

export default {
    getPatientsWithoutSsn,
    addPatient
};