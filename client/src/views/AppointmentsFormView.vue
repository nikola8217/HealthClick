<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>{{ formTitle }}</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Patient</label>
                                    <select class="form-select" style="text-align: center;" v-model="patientID">
                                        <option v-for="patient in patients" :value="patient._id" :key="patient._id" :selected="patient._id === patientID">
                                            {{ patient.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Doctor</label>
                                    <select class="form-select" style="text-align: center;" v-model="doctorID">
                                        <option v-for="doctor in doctors" :value="doctor._id" :key="doctor._id" :selected="doctor._id === doctorID">
                                            {{ doctor.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Appointment date</label>
                                    <input id="appointmentDate" class="datepicker-here form-control digits" type="text" style="text-align: center;" data-language="en">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Appointment time</label>
                                    <div class="input-group clockpicker" data-placement="top" data-align="left" data-donetext="Done">
                                        <input id="appointmentTime" class="form-control" type="text" style="text-align: center;"><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="appointmentID">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5>Update status</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="updateStatus">
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Appointment status</label>
                                    <select class="form-select" style="text-align: center;" v-model="status">
                                        <option value="pending">Pending</option>
                                        <option value="fulfilled">Fulfilled</option>
                                        <option value="canceled">Canceled</option>     
                                    </select>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import { APPOINTMENTS_ADDRESS, DOCTORS_ADDRESS, PATIENTS_ADDRESS } from '../conf';
import moment from 'moment';

export default {
    mounted() {
        this.getPatients();
        this.getDoctors();
        this.loadDatePickerScripts();

        if (this.appointmentID) {
            this.getAppointment();
            this.formTitle = 'Edit appointment';
        } else {
            this.formTitle = 'Create appointment';
        }
    },
    data() {
        return {
            patientID: '',
            patients: [],
            doctorID: '',
            doctors: [],
            appointmentDate: '',
            appointmentTime: '',
            status: '',
            appointmentID: this.$route.params.id ? this.$route.params.id : '',
            formTitle: '' 
        }
    },

    methods: {
        async getPatients() {
            try {
                const response = await axios.get(`${PATIENTS_ADDRESS}/api/patients`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.patients = response.data;
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

        async getDoctors() {
            try {
                const response = await axios.get(`${DOCTORS_ADDRESS}/api/doctors`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.doctors = response.data;
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

        async handleSubmit() {
            this.appointmentDate = document.getElementById('appointmentDate').value;
            this.appointmentTime = document.getElementById('appointmentTime').value;

            if (this.patientID === "" || this.doctorID === "" || this.appointmentDate === "" || this.appointmentTime === "") {
                swal.fire({
                    title: "",
                    text: "Please fill in all fields!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            try {
                if(this.appointmentID) {
                    await axios.put(`${APPOINTMENTS_ADDRESS}/api/appointments/${this.appointmentID}`, 
                    {
                        doctor: this.doctorID,
                        patient: this.patientID,
                        time: `${this.appointmentDate} ${this.appointmentTime}`,
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully updated appointment!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                } else {
                    await axios.post(`${APPOINTMENTS_ADDRESS}/api/appointments`, 
                    {
                        doctor: this.doctorID,
                        patient: this.patientID,
                        time: `${this.appointmentDate} ${this.appointmentTime}`,
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully created appointment!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                }
                

                this.$router.push('/appointments');
                
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

        async getAppointment() {
            try {
                const response = await axios.get(`${APPOINTMENTS_ADDRESS}/api/appointments/${this.appointmentID}`, 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.patientID = response.data.patient._id;
                this.doctorID = response.data.doctor._id;
                document.getElementById('appointmentDate').value = moment.utc(response.data.time).format('YYYY-MM-DD');
                document.getElementById('appointmentTime').value = moment.utc(response.data.time).format('HH:mm');
                this.status = response.data.status;
                
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

        async updateStatus() {
            await axios.patch(`${APPOINTMENTS_ADDRESS}/api/appointments/updateStatus/${this.appointmentID}`, 
            {
                status: this.status
            }, 
            {
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            swal.fire({
                title: "",
                text: "You succesfully updated status!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#398f53" 
            });

            this.$router.push('/appointments');
        },

        loadDatePickerScripts() {
            this.loadScript('./js/datepicker/date-picker/datepicker.js', () => {
                console.log('datepicker.js loaded');
            });

            this.loadScript('./js/time-picker/jquery-clockpicker.min.js', () => {
                console.log('jquery-clockpicker.min.js loaded');
            });

            this.loadScript('./js/time-picker/highlight.min.js', () => {
                console.log('highlight.min.js');
            });

            this.loadScript('./js/time-picker/clockpicker.js', () => {
                console.log('clockpicker.js loaded');
            });
        },

        loadScript(src, callback) {
            const script = document.createElement('script');
            script.src = src;
            script.type = 'text/javascript';
            script.onload = callback;
            document.body.appendChild(script);
        },
    }
}
</script>