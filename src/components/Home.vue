<template>
  <div>
    <h1 v-if="!message">Welcome {{user.name}}</h1>
    <h1 v-else> {{message}} </h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  data () {
    return {
      user: {},
      message: ''
    }
  },
  methods: {
    login () {
      axios.get('/api/auth/google')
        .then(response => {
          console.log(response);
          
        })
        .catch(err => {
          console.log(err);
          
        })
    }
  },



}
</script>

<style>

</style>
