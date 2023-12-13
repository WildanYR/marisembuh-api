import { Injectable } from '@nestjs/common';
import { Patient } from 'src/entities/patient.entity';
import { IPatientMap } from './types/patient_map.type';

@Injectable()
export class PatientMapService {
  mapOne(patient: Patient): IPatientMap {
    let registeredBy = null;
    let registerClinic = null;

    if (patient.registered_by) {
      registeredBy = {
        id: patient.registered_by.id,
        name: patient.registered_by.name,
        role: patient.registered_by.role,
      };
    }

    if (patient.register_clinic) {
      registerClinic = {
        id: patient.register_clinic.id,
        name: patient.register_clinic.name,
      };
    }

    return {
      id: patient.id,
      no_rm: patient.no_rm,
      name: patient.name,
      gender: patient.gender,
      birthdate: patient.birthdate,
      address: patient.address,
      telp: patient.telp,
      created_at: patient.created_at,
      registered_by: registeredBy,
      register_clinic: registerClinic,
    };
  }

  mapMany(patients: Patient[]): IPatientMap[] {
    const patientMaps = [];
    for (const patient of patients) {
      patientMaps.push(this.mapOne(patient));
    }
    return patientMaps;
  }
}
