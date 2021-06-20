<template>
    <v-card   class="mx-auto" style="padding: 5px;" max-width="85%">
      <v-card-title>
        <h1  style="margin-right: 50%; font-size: 30px">منو</h1>
        <v-spacer></v-spacer>
        <v-icon>mdi-plus</v-icon>
      </v-card-title>
      <v-row>
      <v-col
        v-for="n in itemNumber"
        :key="n"
        class="d-flex child-flex"
        cols="3"
      >
        <v-hover v-slot="{ hover }">
          <v-card class="pa-2">
            <v-img
              :src="`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Anatomy_of_a_Sunset-2.jpg/220px-Anatomy_of_a_Sunset-2.jpg`"
              aspect-ratio="1"
              max-height="150px"
              class="grey lighten-2"
              @click="log()"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                  style="height: 100%;"
                >
                  food name
                </div>
              </v-expand-transition>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-text style="padding: 2px">
              <v-icon small @click="askRemoveItem()" style="margin-left: 40%;">mdi-delete-outline</v-icon>
              <v-icon small @click="editItemDialog=true" style="margin-right: 40%" >mdi-pencil-outline</v-icon>
              <v-card-title style="font-size: 14px">
                food name
              </v-card-title>
            </v-card-text>
            <v-card-subtitle style="font-size: 14px; padding-top: 0">
              food status
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
      </v-row>
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
          @click="removeItem()"
        >
          بله
        </v-btn>
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          خیر
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="editItemDialog" max-width="50%">
      <v-card>
        <v-card-title>ویرایش</v-card-title>
        <v-card-text>
          <v-text-field label="نام غذا" v-model="foodName" style="max-width: 200px">
          </v-text-field>
          <v-select
            v-model="select"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
            style="max-width: 50%"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-card>
</template>
<script>
  export default {
    layout : "bar",
    data() {
      return {
        itemNumber: null,
        menu: null,
        snackbar: false,
        timeout: 3000,
        snackText: null,
        foodName: "food name",
        items: ["فعال", "غیر قابل سفارش"],
        select: null,
        editItemDialog: false
      }
    },
    async created() {
      await this.getNumberOfMenuItems();
    },
    mounted() {
      this.$vuetify.rtl = true;
    },
    methods: {
      // get number of menu items
      async getNumberOfMenuItems() {
        this.itemNumber = 10
      },
      async getMenu() {
        // ya cache ya ba hamun api k restaurant migiri
      },
      log() {
        alert("fuck this shit")
      },
      askRemoveItem() {
        this.snackText = "آیا مورد را می خواهید حذف کنید؟"
        this.snackbar = true
      },
      async removeItem() {
        this.snackbar = false
        // remove
      },
      async editItem() {

      }
    }
  }
</script>
