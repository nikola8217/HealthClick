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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Education</th>
                                <th>Years of expirience</th>
                                <th>Year of employment</th>
                                <th>Specialization</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctors, index) in this.doctors" :key="index">
                                    
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

        // deleteAlert(id) {
        //     swal.fire({
        //         title: "",
        //         text: "Are you sure you want to delete specialization!",
        //         icon: "question",
        //         showCancelButton: true,
        //         confirmButtonColor: "#398f53",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Yes, delete it!"
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.deleteSpecialization(id);
        //         }
        //     });
        // },

        // async deleteSpecialization(id) {
        //     try {
        //         await axios.delete(`${SPECIALIZATIONS_ADDRESS}/api/specializations/${id}`, {
        //             headers: { 
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${this.token}` 
        //             }
        //         });

        //         swal.fire({
        //             title: "",
        //             text: "You succesfully deleted specialization!",
        //             icon: "success",
        //             confirmButtonText: "OK",
        //             confirmButtonColor: "#398f53" 
        //         });

        //         this.getSpecializations();
        //     } catch (error) {
        //         swal.fire({
        //             title: "",
        //             text: error.response.data.errors[0].message,
        //             icon: "error",
        //             confirmButtonText: "OK",
        //             confirmButtonColor: "#398f53" 
        //         });
        //     }
        // }
    },
    
}
</script>