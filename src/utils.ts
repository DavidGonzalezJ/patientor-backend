import { NewPatientEntry, Gender, EntryWithoutId, SickLeave,
  EntryType, HealthCheckRating, Discharge, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
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

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
      const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
      };
  
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  const value = Object.values(HealthCheckRating).find(v => Number(v) === param);
  if (value) return true;
  return false;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!rating || !isNumber(rating) || !isHealthCheckRating(rating)){
    throw new Error('Incorrect or missing health rating: ' + rating);
  }
  return rating;
};

const isDischarge = (param: object): param is Discharge => {
  return 'date' in param && isString(param.date) && 'criteria' in param && isString(param.criteria);
};

const parseDischarge = (object:unknown): Discharge => {
  if(!object || !isDischarge(object)){
    throw new Error('Incorrect or missing discharge: ' + object);
  }
  return object;
};

const isSickLeave = (param: object): param is SickLeave => {
  return 'startDate' in param && isString(param.startDate) && 'endDate' in param && isString(param.endDate);
};

const parseSickLeave = (object:unknown): SickLeave => {
  if(!object || !isSickLeave(object)){
    throw new Error('Incorrect or missing sick leave: ' + object);
  }
  return object;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object'|| !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object)  {
    if('healthCheckRating' in object && object.type === EntryType.HealthCheck){
      const newEntry: EntryWithoutId = {
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      if('diagnosisCodes' in object)
        newEntry.diagnosisCodes = parseDiagnosisCodes(object);
      return newEntry;
    }
    else if('employerName' in object && object.type === EntryType.OccupationalHealthcare){
      const newEntry: EntryWithoutId = {
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: EntryType.OccupationalHealthcare,
        employerName: parseString(object.employerName)
      };
      if('sickLeave' in object)
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      if('diagnosisCodes' in object)
        newEntry.diagnosisCodes = parseDiagnosisCodes(object);
      return newEntry;
    }
    else if('discharge' in object && object.type === EntryType.Hospital){
      const newEntry: EntryWithoutId = {
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        type: EntryType.Hospital,
        discharge: parseDischarge(object.discharge)
      };
      if('diagnosisCodes' in object)
        newEntry.diagnosisCodes = parseDiagnosisCodes(object);
      return newEntry;
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};