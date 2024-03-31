import express from 'express';
import diagnosisService from '../services/diagnosisService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getAllDiagnosis());
});

router.post('/', (req, res) => {
  try{
    const newDiagnosis = req.body as Diagnosis;
    diagnosisService.addDiagnosis(newDiagnosis);
    res.json(newDiagnosis);
  } catch (error: unknown) {
    let errorMessage = 'Something went worng';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;