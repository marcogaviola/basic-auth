<template>
  <v-container class="fill-height" fluid>
    <v-fade-transition mode="out-in">
      <v-card
        color="#FCFCFC"
        style="padding: 50px"
        class="my-0 mx-auto"
        width="600"
      >
        <v-card flat color="#FCFCFC">
          <v-card-title> Register Page </v-card-title>
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
              />
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                outlined
                :disabled="loading"
                :error="error"
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
              />
              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                :rules="confirm"
                :disabled="loading"
                prepend-inner-icon="mdi-lock"
                type="password"
                outlined
                :error="error"
              />
            </v-form>
          </v-card-text>
          <v-card-actions v-if="!success" class="text-center d-block pt-0">
            <v-btn
              large
              dark
              color="#15587B"
              class="mx-3 mb-7 px-8 d-inline-block"
              :loading="loading"
              :disabled="loading"
              @click="register"
              >Sign Up</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card>
    </v-fade-transition>
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
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("dashboard");
    }
  },
  methods: {
    ...mapActions({
      registerApi: "user/register",
    }),
    register() {
      if (this.$refs.userreg.validate()) {
        this.loading = true;
        this.registerApi({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
          .then((register) => {
            this.error = false;
            const { http_status } = register;
            if (http_status === 200) {
              this.alert.type = "success";
              this.alert.message = "Success!";
              this.$refs.userreg.reset();
              this.loading = false;
              let _ = this;
              setTimeout(() => {
                _.$router.push({ name: "dashboard" });
              }, 1500);
            }
          })
          .catch(() => {
            this.email = this.password = "";
            this.error = true;
            this.alert.type = "error";
            this.alert.message = "Error!";
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style lang="scss">
html {
  overflow-y: auto !important;
}
</style>
