<template>
  <b-container class="mt-5">
    <div v-if="step === 0">
      <h1>step 1</h1>
      <b-form-input
        v-model="email"
        class="mb-3"
        placeholder="Enter your email"
      />
      <b-form-input
        v-model="password"
        class="mb-3"
        placeholder="Enter your password"
      />
    </div>
    <div v-else-if="step === 1">
      <h1>step 2</h1>
      <b-form-input v-model="name" class="mb-3" placeholder="Enter your name" />
      <b-form-input
        v-model="address"
        class="mb-3"
        placeholder="Enter your address"
      />
    </div>
    <b-button @click="onSend">send</b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      address: '',
      step: 0,
    }
  },
  methods: {
    onSend() {
      if (this.step === 0) {
        this.step = 1
      } else if (this.step === 1) {
        console.log('send to server')
      }
    },
  },
}
</script>

<style></style>
