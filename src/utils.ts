import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
      throw new Error('Incorrect or missing string');
    }
  
    return str;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
      if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        const newEntry: NewPatientEntry = {
          name: parseString(object.name),
          dateOfBirth: parseString(object.dateOfBirth),
          ssn: parseString(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseString(object.occupation)
        };
    
        return newEntry;
      }
    
      throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;