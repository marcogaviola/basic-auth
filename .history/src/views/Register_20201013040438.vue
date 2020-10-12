<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid style="background: #15587b">
        <v-row>
          <v-col> </v-col>
          <v-col>
            <v-card flat color="#FCFCFC">
              <v-card-text>
                <v-alert v-if="alert.message" :type="alert.type">{{
                  alert.message
                }}</v-alert>
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
      </v-container>
    </v-content>
  </v-app>
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
