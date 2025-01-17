import { BadRequestError, ServerError } from '@healthclickapp/shared';
import axios from 'axios';

export class AppointmentsHandler {
    static async deleteAppointments(token: string, doctorId: string) {
        try {
            const response = await axios.delete(`http://${process.env.APPOINTMENT_ADDRESS}/api/appointments/doctor/${doctorId}`, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            });

            return response;
        } catch (error: any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                throw new BadRequestError('Something went wrong');
            } else {
                console.error('Error message:', error.message); 
                throw new ServerError('Failed to connect to appointment service');
            }
        }
    }
}