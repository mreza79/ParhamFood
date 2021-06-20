<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8" style="max-width: 60%">
        <v-card justify-center style="margin-top: 10%">
          <v-card-title class="headline justify-center"> ثبت نام </v-card-title>
          <v-card-text> </v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-form ref="form">
                  <v-text-field
                    label="ایمیل"
                    required
                    v-model="manager.email"
                  ></v-text-field>
                </v-form>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="رمز"
                  type="password"
                  required
                  v-model="manager.password"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="نام رستوران"
                  required
                  v-model="restaurant.name"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="منطقه رستوران"
                  required
                  v-model="restaurant.region"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="آدرس"
                  required
                  v-model="restaurant.address"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="منطقه سویس دهی"
                  required
                  v-model="restaurant.serviceRegion"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="ساعات کاری"
                  required
                  v-model="restaurant.workingHours"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="زمان ارسال غذا"
                  required
                  v-model="restaurant.deliveryTime"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="هزینه ارسال غذا"
                  required
                  v-model="restaurant.deliveryFee"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="justify-center">
            <v-btn color="blue darken-1" @click="authenticate()"> ورود </v-btn>
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
export default {
  layout: "noNav",
  data() {
    return {
      manager: {
        email: null,
        password: null,
      },
      restaurant: {
        name: null,
        region: null,
        address: null,
        serviceRegion: null,
        workingHours: null,
        deliveryTime: null,
        deliveryFee: null,
      },
      token: null,
      snackbar: false,
      snackText: null,
      timeout: 2000,
    };
  },
  mounted() {
    this.$vuetify.rtl = true;
  },
  methods: {
    async authenticate() {
      if (this.manager.email == null || this.manager.password == null || this.restaurant.name == null || this.restaurant.address == null  || this.restaurant.region == null ||
       this.restaurant.serviceRegion == null || this.restaurant.workingHours == null || this.restaurant.deliveryTime == null || this.restaurant.deliveryFee == null) {
        this.snackText = "لطفا، همه فیلد ها را پر کنید!";
        this.snackbar = true;
        return;
      }
      console.log("data: ", this.manager, this.restaurant);

      // this.manager.restaurant = this.restaurant
      await this.$axios.post(`${this.$config.baseURL}/managers`, { email : this.manager.email , password : this.manager.password , restaurant : this.restaurant})
        .then((response) => {
          this.id = response.data.manager.id
          console.log("id: ", this.id)
          this.token = response.data.token
          console.log("response is: ", response);
          this.$router.push(`/restaurants/${this.id}`)
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
