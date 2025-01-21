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
                                    <input class="form-control" type="text" style="text-align: center;" v-model="name">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Education</label>
                                    <input class="form-control" type="text" style="text-align: center;" v-model="education" >
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Years of expirience</label>
                                    <input class="form-control" type="number" style="text-align: center;" v-model="yearsOfExpirience">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Year of employment</label>
                                    <input class="form-control" type="text" style="text-align: center;" v-model="yearOfEmployment">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Specialization</label>
                                    <select class="form-select" style="text-align: center;" v-model="specializationID">
                                        <option v-for="specialization in specializations" :value="specialization._id" :key="specialization._id" :selected="specialization._id === specializationID">
                                            {{ specialization.name }}
                                        </option>
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
import { DOCTORS_ADDRESS, SPECIALIZATIONS_ADDRESS } from '../conf';

export default {
    mounted() {
        this.getSpecializations();

        if (this.doctorID) {
            this.getDoctor();
            this.formTitle = 'Edit doctor';
        } else {
            this.formTitle = 'Create doctor';
        }
    },
    data() {
        return {
            name: '',
            education: '',
            yearsOfExpirience: '',
            yearOfEmployment: '',
            specializationID: '',
            specializations: [],
            doctorID: this.$route.params.id ? this.$route.params.id : '',
            formTitle: '' 
        }
    },

    methods: {
        async getSpecializations() {
            try {
                const response = await axios.get(`${SPECIALIZATIONS_ADDRESS}/api/specializations`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.specializations = response.data;
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
            if (this.name === "" || this.education === "" || this.yearsOfExpirience === "" || this.yearOfEmployment === "" || this.specializationID === "") {
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
                if(this.doctorID) {
                    await axios.put(`${DOCTORS_ADDRESS}/api/doctors/${this.doctorID}`, 
                    {
                        name: this.name,
                        education: this.education,
                        yearsOfExpirience: this.yearsOfExpirience,
                        yearOfEmployment: this.yearOfEmployment,
                        specialization: this.specializationID
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully updated doctor!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                } else {
                    await axios.post(`${DOCTORS_ADDRESS}/api/doctors`, 
                    {
                        name: this.name,
                        education: this.education,
                        yearsOfExpirience: this.yearsOfExpirience,
                        yearOfEmployment: this.yearOfEmployment,
                        specialization: this.specializationID
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully created doctor!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                }
                

                this.$router.push('/doctors');
                
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

        async getDoctor() {
            try {
                const response = await axios.get(`${DOCTORS_ADDRESS}/api/doctors/${this.doctorID}`, 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                console.log(1, response.data);

                this.name = response.data.name;
                this.education = response.data.education;
                this.yearsOfExpirience = response.data.yearsOfExpirience;
                this.yearOfEmployment = response.data.yearOfEmployment;
                this.specializationID = response.data.specialization._id;
                
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