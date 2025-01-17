import { BadRequestError, ServerError } from "@healthclickapp/shared";
import axios from 'axios';

export class PatientHandler {
    static async getPatient(token: String, patientId: string) {
        try {
            const response = await axios.get(`http://${process.env.PATIENT_ADDRESS}/api/patients/${patientId}`, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            });

            return response;
        } catch (error: any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                throw new BadRequestError('Patient does not exist');
            } else {
                console.error('Error message:', error.message); 
                throw new ServerError('Failed to connect to patient service');
            }
        }
    }
}