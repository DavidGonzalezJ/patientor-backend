import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';

const getNonSensitivePatients = ():NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation};
    });
};

const getAllPatients = ():Patient[] => {
    return patients;
};

const getPatientById = (id:string):NonSensitivePatient | null => {
    const patient = patients.find(p => p.id === id);
    if(patient){
        return patient;
    }
    return null;
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

const addEntry = (patientId: string ,entry: EntryWithoutId): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry
    };
    const patient = patients.find(p => p.id === patientId);
    patient?.entries.push(newEntry);
    return newEntry;
};

export default {
    getNonSensitivePatients: getNonSensitivePatients,
    addPatient, getPatientById, getAllPatients, addEntry
};