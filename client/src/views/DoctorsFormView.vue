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
                                    <label class="form-label">Doctor name</label>
                                    <input class="form-control" type="text" v-model="name">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Education</label>
                                    <input class="form-control" type="text" v-model="eduction">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Years of expirience</label>
                                    <input class="form-control" type="number" v-model="yearsOfExpirience">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Year of employment</label>
                                    <input class="form-control" type="text" v-model="yearOfEmployment">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Specialization</label>
                                    <select class="form-select">
                                        <option selected="" disabled="" value="">Choose...</option>
                                        <option>...</option>
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
import { DOCTORS_ADDRESS } from '../conf';

export default {
    mounted() {
        if (this.doctos) {
            this.getDoctor();
            this.formTitle = 'Edit doctor';
        } else {
            this.formTitle = 'Create doctor';
        }
    },
    data() {
        return {
            name: '',
            eduction: '',
            yearsOfExpirience: '',
            yearOfEmployment: '',
            specialization: '',
            doctorID: this.$route.params.id ? this.$route.params.id : '',
            formTitle: '' 
        }
    },

    methods: {
        async handleSubmit() {
            if (this.name === "") {
                swal.fire({
                    title: "",
                    text: "Please fill in all fields!",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                return false;
            }

            // try {
            //     if(this.specializationID) {
            //         await axios.put(`${SPECIALIZATIONS_ADDRESS}/api/specializations/${this.specializationID}`, 
            //         {
            //             name: this.name,
            //         }, 
            //         {
            //             headers: { 
            //                 'Content-Type': 'application/json' ,
            //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
            //             }
            //         });

            //         swal.fire({
            //             title: "",
            //             text: "You succesfully updated specialization!",
            //             icon: "success",
            //             confirmButtonText: "OK",
            //             confirmButtonColor: "#398f53" 
            //         });
            //     } else {
            //         await axios.post(`${SPECIALIZATIONS_ADDRESS}/api/specializations`, 
            //         {
            //             name: this.name,
            //         }, 
            //         {
            //             headers: { 
            //                 'Content-Type': 'application/json' ,
            //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
            //             }
            //         });

            //         swal.fire({
            //             title: "",
            //             text: "You succesfully created specialization!",
            //             icon: "success",
            //             confirmButtonText: "OK",
            //             confirmButtonColor: "#398f53" 
            //         });
            //     }
                

            //     this.$router.push('/specializations');
                
            // } catch (error) {
            //     swal.fire({
            //         title: "",
            //         text: error.response.data.errors[0].message,
            //         icon: "error",
            //         confirmButtonText: "OK",
            //         confirmButtonColor: "#398f53" 
            //     });
            // }

            
        },

        async getDoctor() {
            try {
                const response = await axios.get(`${DOCTORS_ADDRESS}/api/doctors/${this.doctorID}`, 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                // this.name = response.data.name;
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
    }
}
</script>