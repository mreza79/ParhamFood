<template>
  <div>
    <v-card class="mx-auto" max-width="60%" mn-height="100%">
      <v-card-title class="justify-center">
        نام رستوارن
      </v-card-title>
      <v-container fluid>
        <v-row  class="fill-height">
          <v-hover v-slot="{ hover }">
            <v-card style="margin-right: 10%" :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }" @click="openMenu()">
              <img
                src="../../assets/menu.jpg"
                class="white--text"
                height="100px"
              >
              <v-card-title class="justify-center">منو</v-card-title>
            </v-card>
          </v-hover>
          <v-spacer></v-spacer>
          <v-hover v-slot="{ hover }">
            <v-card style="margin-left: 10%" :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }">
              <img
                src="../../assets/menu.jpg"
                class="white--text"
                height="100px"
              >
              <v-card-title class="justify-center">اطلاعات</v-card-title>
            </v-card>
          </v-hover>
        </v-row>
        <v-row justify="center" style="margin-top: 30px">
          <v-hover v-slot="{ hover }">
            <v-card class="justify-center; " :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }">
              <img
                src="../../assets/menu.jpg"
                class="white--text"
                height="100px"
              >
              <v-card-title class="justify-center">سفارشات</v-card-title>
            </v-card>
          </v-hover>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    layout: "noNav",
    data(){
      return{
        id : null,
        snackbar : false,
        snackText : null,
        timeout : 3000
      }
    },
    mounted() {
      this.$vuetify.rtl = true;
    },
    computed: {
      user_id() {
        return this.$store.state.user_id
      },
      user_token() {
        return this.$store.state.user_token
      }
    },
    async created(){
      this.id = this.$route.params.id
      if( this.id == null){
        this.snackText ="لطفا ابتدا وارد شوید"
        this.snackbar = true
        await this.$router.push("/")
      }
      const token = this.user_token
      console.log("token is: ", token)
      await this.$axios.$get(`${this.$config.baseURL}/restaurants/${this.id}` , {
        headers: { authorization : token },
      }).then((response)=>{
        console.log("response is: " , response)
      }).catch((err)=>{
        console.log(err)
      })
    },
    methods : {
      openMenu(){
        this.$route.push("")
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 5px;
  }
  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }
</style>
