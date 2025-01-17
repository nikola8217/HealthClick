import { BadRequestError, ServerError } from '@healthclickapp/shared';
import axios from 'axios';

export class SpecializationHandler {
    static async getSpecialization(token: string, specializationId: string) {
        try {
            const response = await axios.get(`http://${process.env.SPECIALIZATION_ADDRESS}/api/specializations/${specializationId}`, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            return response;
        } catch (error: any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                console.log(error);
                throw new BadRequestError('Specialization does not exist');
            } else {
                console.error('Error message:', error.message); 
                throw new ServerError('Failed to connect to specialization service');
            }
        }
    }
}