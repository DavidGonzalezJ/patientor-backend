import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getAllDiagnosis = ():Diagnosis[] => {
    return diagnosis;
};

const getDiagnosisByCode = (code: string):Diagnosis | undefined => {
    const d = diagnosis.find(diag => diag.code === code);
    return d; 
};

const addDiagnosis = (entry: Diagnosis): void => {
    diagnosis.push(entry);
};

export default {
    getAllDiagnosis, addDiagnosis, getDiagnosisByCode
};