import { BadRequestError, ServerError } from '@healthclickapp/shared';
import axios from 'axios';

export class DoctorHandler {
    static async deleteDoctors(token: string, specializationId: string) {
        try {
            const response = await axios.delete(`http://${process.env.DOCTOR_ADDRESS}/api/doctors/specialization/${specializationId}`, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            });

            return response;
        } catch (error: any) {
            console.log('ERROR: ', error.response);
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                throw new BadRequestError('Something went wrong');
            } else {
                console.error('Error message:', error.message); 
                throw new ServerError('Failed to connect to doctor service');
            }
        }
    }
}