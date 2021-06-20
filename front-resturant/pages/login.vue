<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8" style="max-width: 60%">
        <v-card justify-center style="margin-top: 10%">
          <v-card-title class="headline justify-center"> ورود</v-card-title>
          <v-card-text></v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-form ref="form">
                  <v-text-field
                    label="ایمیل"
                    required
                    v-model="email"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="رمز"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="justify-center">
            <v-btn color="blue darken-1" @click="authenticate()"> ورود</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    layout: "noNav",
    data() {
      return {
        id: null,
        token: null,
        email: null,
        password: null,
        snackbar: false,
        snackText: null,
        timeout: 2000,
      };
    },
    computed: {
      user_id() {
        return this.$store.state.user_id
      },
      user_token() {
        return this.$store.state.user_token
      }
    },
    mounted() {
      this.$vuetify.rtl = true;
    },
    methods: {
      ...mapMutations({
        set_user: 'set_user',
        set_token: 'set_token',
        set_id: 'set_id'
      }),
      async authenticate() {
        if (this.email == null || this.password == null) {
          this.snackText = "لطفا، همه فیلد ها را پر کنید!";
          this.snackbar = true;
          return;
        }
        await this.$axios.$post(`${this.$config.baseURL}/managers/login`, {email: this.email, password: this.password})
          .then((response) => {
            console.log("response is: ", response);
            console.log("logged in")
            this.id = response.manager._id
            console.log("id: ", this.id)
            this.token = response.token
            this.set_id(this.id)
            this.set_token(this.token)
            this.$router.push(`/restaurants/${this.id}`)
            // this.$router.push("/");
            // manager object
            //token string
          })
          .catch((reason) => {
            console.log(reason);
            this.snackText = "خطا، لطفا از صحت اطلاعات اطمینان حاصل کنید";
            this.snackbar = true;
          });
      },
    },
  };
</script>
