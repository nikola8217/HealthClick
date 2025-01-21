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
                                    <label class="form-label">Patient name</label>
                                    <input class="form-control" type="text" style="text-align: center;" v-model="name">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Date of birth</label>
                                    <input id="dateOfBirth" class="datepicker-here form-control digits" type="text" style="text-align: center;" data-language="en">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <label class="form-label">Address</label>
                                    <input class="form-control" type="text" style="text-align: center;" v-model="address" >
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
import { PATIENTS_ADDRESS } from '../conf';

export default {
    mounted() {
        this.loadDatePickerScripts();

        if (this.patientID) {
            this.getPatient();
            this.formTitle = 'Edit patient';
        } else {
            this.formTitle = 'Create patient';
        }
    },

    data() {
        return {
            name: '',
            address: '',
            dateOfBirth: '',
            patientID: this.$route.params.id ? this.$route.params.id : '',
            formTitle: '' 
        }
    },

    methods: {
        async handleSubmit() {
            this.dateOfBirth = document.getElementById('dateOfBirth').value;
            
            if (this.name === "" || this.address === "" || this.dateOfBirth === "") {
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
                if(this.patientID) {
                    await axios.put(`${PATIENTS_ADDRESS}/api/patients/${this.patientID}`, 
                    {
                        name: this.name,
                        address: this.address,
                        dateOfBirth: this.dateOfBirth
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully updated patient!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                } else {
                    await axios.post(`${PATIENTS_ADDRESS}/api/patients`, 
                    {
                        name: this.name,
                        address: this.address,
                        dateOfBirth: this.dateOfBirth
                    }, 
                    {
                        headers: { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    swal.fire({
                        title: "",
                        text: "You succesfully created patient!",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#398f53" 
                    });
                }
                

                this.$router.push('/patients');
                
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

        async getPatient() {
            try {
                const response = await axios.get(`${PATIENTS_ADDRESS}/api/patients/${this.patientID}`, 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                this.name = response.data.name;
                this.address = response.data.address;

                const dateOfBirth = new Date(response.data.dateOfBirth);
                const formattedDate = dateOfBirth.toISOString().split('T')[0]; 

                document.getElementById('dateOfBirth').value = formattedDate;
                
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

        loadDatePickerScripts() {
            this.loadScript('./js/datepicker/date-picker/datepicker.js', () => {
                console.log('datepicker.js loaded');
            });
            // this.loadScript('./js/datepicker/date-picker/datepicker.en.js', () => {
            //     console.log('datepicker.en.js loaded');
            // });
            // this.loadScript('./js/datepicker/date-picker/datepicker.custom.js', () => {
            //     console.log('datepicker.custom.js loaded');
            // });
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