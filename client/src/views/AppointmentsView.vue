<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; text-align: left;">
                        <h5>Appointments</h5>
                        <router-link to="appointmentsForm" class="btn btn-success">Create appointment</router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Sheduled for</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(appointment, index) in this.appointments" :key="index">
                                    <td>{{ appointment.patient.name }}</td>
                                    <td>{{ appointment.doctor.name }}</td>
                                    <td>{{ appointment.time }}</td>
                                    <td>{{ appointment.status }}</td>
                                    <td>
                                        <div class="">
                                            <router-link :to="{ name: 'appointmentsForm', params: { id: appointment._id } }" class="btn btn-primary" style="margin-right: 5px">Edit</router-link>
                                            <button @click="deleteAlert(appointment._id)" class="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import { APPOINTMENTS_ADDRESS } from '../conf';
import moment from 'moment';

export default {
    mounted() {
        this.getAppointments();
    },

    data() {
        return {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
            appointments: []
        }
    },

    methods: {
        async getAppointments() {
            try {
                const response = await axios.get(`${APPOINTMENTS_ADDRESS}/api/appointments`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.appointments = response.data;

                this.appointments = response.data.map(appointment => {
                    const formattedDate = moment.utc(appointment.time).format('YYYY-MM-DD HH:mm'); 

                    return {
                        ...appointment, 
                        time: formattedDate 
                    };
                });
            } catch (error) {
                swal.fire({
                    title: "",
                    text: error.response.data.errors[0].message,
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });
            }
        },

        deleteAlert(id) {
            swal.fire({
                title: "",
                text: "Are you sure you want to delete appointment!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#398f53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteAppointment(id);
                }
            });
        },

        async deleteAppointment(id) {
            try {
                await axios.delete(`${APPOINTMENTS_ADDRESS}/api/appointments/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                swal.fire({
                    title: "",
                    text: "You succesfully deleted appointment!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                this.getAppointments();
            } catch (error) {
                swal.fire({
                    title: "",
                    text: error.response.data.errors[0].message,
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });
            }
        }
    },
    
}
</script>