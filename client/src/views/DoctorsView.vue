<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; text-align: left;">
                        <h5>Doctors</h5>
                        <router-link to="doctorsForm" class="btn btn-success">Create doctor</router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th style="width: 200px">Education</th>
                                <th>Year of employment</th>
                                <th>Specialization</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctor, index) in this.doctors" :key="index">
                                    <td>{{ doctor.name }}</td>
                                    <td>{{ doctor.education }}</td>
                                    <td>{{ doctor.yearOfEmployment }}</td>
                                    <td>{{ doctor.specialization.name }}</td>
                                    <td>
                                        <div class="">
                                            <router-link :to="{ name: 'doctorsForm', params: { id: doctor._id } }" class="btn btn-primary" style="margin-right: 5px">Edit</router-link>
                                            <button @click="deleteAlert(doctor._id)" class="btn btn-danger">Delete</button>
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
import { DOCTORS_ADDRESS } from '../conf';

export default {
    mounted() {
        this.getDoctors();
    },

    data() {
        return {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
            doctors: []
        }
    },

    methods: {
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

        deleteAlert(id) {
            swal.fire({
                title: "",
                text: "Are you sure you want to delete doctor!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#398f53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteDoctor(id);
                }
            });
        },

        async deleteDoctor(id) {
            try {
                await axios.delete(`${DOCTORS_ADDRESS}/api/doctors/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                swal.fire({
                    title: "",
                    text: "You succesfully deleted doctor!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                this.getDoctors();
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