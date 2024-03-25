import patients from '../../data/patients';

import { PatientWithoutSsn } from '../types';

const getPatientsWithoutSsn = ():PatientWithoutSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation};
    });
};

export default {
    getPatientsWithoutSsn
};