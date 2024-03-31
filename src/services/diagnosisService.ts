import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getAllDiagnosis = ():Diagnosis[] => {
    return diagnosis;
};

const addDiagnosis = (entry: Diagnosis): void => {
    diagnosis.push(entry);
};

export default {
    getAllDiagnosis, addDiagnosis
};