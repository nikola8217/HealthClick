<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; text-align: left;">
                        <h5>Specializations</h5>
                        <router-link to="specializationsForm" class="btn btn-success">Create specialization</router-link>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(specialization, index) in this.specializations" :key="index">
                                    <td>{{ specialization._id }}</td>
                                    <td>{{ specialization.name }}</td>
                                    <td>
                                        <div class="">
                                            <router-link :to="{ name: 'specializationsForm', params: { id: specialization._id } }" class="btn btn-primary" style="margin-right: 5px">Edit</router-link>
                                            <button @click="deleteAlert(specialization._id)" class="btn btn-danger">Delete</button>
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
import { SPECIALIZATIONS_ADDRESS } from '../conf';

export default {
    mounted() {
        this.getSpecializations();
    },

    data() {
        return {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
            specializations: []
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

        deleteAlert(id) {
            swal.fire({
                title: "",
                text: "Are you sure you want to delete specialization!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#398f53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteSpecialization(id);
                }
            });
        },

        async deleteSpecialization(id) {
            try {
                await axios.delete(`${SPECIALIZATIONS_ADDRESS}/api/specializations/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}` 
                    }
                });

                swal.fire({
                    title: "",
                    text: "You succesfully deleted specialization!",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#398f53" 
                });

                this.getSpecializations();
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