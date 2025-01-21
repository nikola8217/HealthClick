<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; text-align: left;">
                        <h5>Patients</h5>
                        <router-link to="patientsForm" class="btn btn-success">Create patient</router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of birth</th>
                                <th style="width: 200px">Address</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(patient, index) in this.patients" :key="index">
                                    <td>{{ patient.name }}</td>
                                    <td>{{ patient.dateOfBirth }}</td>
                                    <td>{{ patient.address }}</td>                                  
                                    <td>
                                        <div class="">
                                            <router-link :to="{ name: 'patientsForm', params: { id: patient._id } }" class="btn btn-primary" style="margin-right: 5px">Edit</router-link>
                                            <button @click="deleteAlert(patient._id)" class="btn btn-danger">Delete</button>
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
import { PATIENTS_ADDRESS } from '../conf';

export default {
    mounted() {
        this.getPatients();
    },

    data() {
        return {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
            patients: []
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

                this.patients = response.data.map(patient => {
                    const dateOfBirth = new Date(patient.dateOfBirth);
                    const formattedDate = dateOfBirth.toISOString().split('T')[0]; 

                    return {
                        ...patient,
                        dateOfBirth: formattedDate
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
                text: "Are you sure you want to delete patient!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#398f53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deletePatient(id);
                }
            });
        },

        async deletePatient(id) {
            try {
                await axios.delete(`${PATIENTS_ADDRESS}/api/patients/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                swal.fire({
                    title: "",
                    text: "You succesfully deleted patient!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                this.getPatients();
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