<template>
  <b-container class="mt-5">
    <b-modal v-model="showAddFoodModal">
      <h1>add food</h1>
      <b-form-input v-model="name" class="mb-3" placeholder="Enter food name" />
      <b-form-input
        v-model="price"
        class="mb-3"
        placeholder="Enter food price"
      />
      <b-form-checkbox v-model="orderable"> orderable </b-form-checkbox>
      <template #modal-footer>
        <b-button @click="addFood">add</b-button>
      </template>
    </b-modal>
    <b-table v-if="foodList.length" striped hover :items="foodList"></b-table>
    <b-button @click="showAddFoodModal = true">add food</b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      foodList: [],
      name: '',
      price: '',
      showAddFoodModal: false,
      orderable: false,
    }
  },
  created() {
    this.$axios({
      method: 'POST',
      url: 'http://localhost:3001/restaurants/',
      data: {
        abc: 'dsafasdf',
      },
    })
    // this.$axios({
    //   method: 'GET',
    //   url: 'http://localhost:3001/restaurants/',
    // })
    // api call
    this.foodList = [
      {
        name: 'asf',
        price: 1111,
        orderable: false,
      },
    ]
  },
  methods: {
    addFood() {
      if (this.price && this.name) {
        this.foodList = [
          ...this.foodList,
          {
            name: this.name,
            price: this.price,
            orderable: this.orderable,
          },
        ]
        this.showAddFoodModal = false
        this.resetForm()
      } else {
        console.error('error')
      }
    },
    resetForm() {
      this.name = ''
      this.price = ''
      this.orderable = false
    },
  },
}
</script>

<style></style>
