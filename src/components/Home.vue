<template>
  <div>
    <h1 v-if="!message">Welcome {{user.name}}</h1>
    <h1 v-else> {{message}} </h1>
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
    getUser () {
      axios.get('/api/1')
        .then(response => {
          // console.log(response.data[0]);
          this.user = response.data[0];
          this.message = '';
        })
        .catch(err => {
          this.message = 'Uh oh! Bad news!'
          console.log(err)
        });
    }
  },
  created () {
    this.getUser()
  }

}
</script>

<style>

</style>
