import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getAllDiagnosis = ():Diagnosis[] => {
    return diagnosis;
};

export default {
    getAllDiagnosis
};