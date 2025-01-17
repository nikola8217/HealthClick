import { BadRequestError, ServerError } from "@healthclickapp/shared";
import axios from 'axios';

export class DoctorHandler {
    static async getDoctor(token: string, doctorId: string) {
        try {
            const response = await axios.get(`http://${process.env.DOCTOR_ADDRESS}/api/doctors/${doctorId}`, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            });

            return response;
        } catch (error: any) {
            console.error('GRESKA: ', error);
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                throw new BadRequestError('Doctor does not exist');
            } else {
                console.error('Error message:', error.message); 
                throw new ServerError('Failed to connect to doctor service');
            }
        }
    }
}