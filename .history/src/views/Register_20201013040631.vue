<template>
  <v-container class="fill-height" fluid style="background: #15587b">
    <v-row>
      <v-col> </v-col>
      <v-col>
        <v-card flat color="#FCFCFC" height="100%">
          <v-card-text>
            <v-alert v-if="alert.message" :type="alert.type">{{
              alert.message
            }}</v-alert>
            <v-form ref="userreg" v-if="!success">
              <v-text-field
                v-model="name"
                label="Full Name"
                :rules="[(v) => !!v || 'Fullname is required']"
                prepend-inner-icon="mdi-account"
                outlined
                :disabled="loading"
                :error="error"
                @keyup.enter="preRegister"
              />
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                outlined
                :disabled="loading"
                :error="error"
                @keyup.enter="preRegister"
              />
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                prepend-inner-icon="mdi-lock"
                type="password"
                outlined
                :disabled="loading"
                :error="error"
                @keyup.enter="preRegister"
              />
              <v-text-field
                v-model="password_confirmation"
                label="Password"
                :rules="confirm"
                :disabled="loading"
                prepend-inner-icon="mdi-lock"
                type="password"
                outlined
                :error="error"
                @keyup.enter="preRegister"
              />
              <!-- <v-select v-model="tier" :rules="[v => !!v || 'Please select subscription']" label="Tiers" outlined :items="tiers" item-text="text" item-value="value"></v-select> -->
            </v-form>
          </v-card-text>
          <v-card-actions v-if="!success" class="text-center d-block pt-0">
            <v-btn
              x-large
              color="primary"
              class="mx-3 mb-7 d-inline-block"
              :loading="loading"
              :disabled="loading"
              @click="register"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-fade-transition mode="out-in">
          <v-card
            color="#FCFCFC"
            style="padding: 50px"
            class="my-0 mx-auto"
            width="600"
          >

          </v-card>
        </v-fade-transition> -->
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      error: false,
      alert: {
        type: "error",
        message: "",
      },
      confirm: [(v) => v === this.password || "Password not match"],
      passwordRules: [(v) => !!v || "Password is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      success: false,
    };
  },
  methods: {
    ...mapActions({
      registerApi: "user/register",
    }),
    register() {
      this.loading = true;
      this.registerApi({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then((register) => {
          this.error = false;
          if (register.status === 200) {
            this.alert.type = "success";
            this.alert.message = "Success!! " + register.data.success.message;
            this.$refs.userreg.reset();
            this.loading = false;
          }
          // localStorage.setItem("token", login.token);
          // this.$router.push("/user/" + login.id + "/dashboard");
        })
        .catch((e) => {
          console.log(e);
          this.email = this.password = "";
          this.error = true;
          this.alert.type = "error";
          this.alert.message = "Error!";
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
html {
  overflow-y: auto !important;
}
</style>
