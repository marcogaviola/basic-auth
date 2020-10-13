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
          <v-card-title> Login Page </v-card-title>
          <v-card-text>
            <v-alert v-if="alert.message" :type="alert.type">{{
              alert.message
            }}</v-alert>
            <v-form ref="userlogin">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                outlined
                required
                :error="error"
                @keyup.enter="login"
              />
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                prepend-inner-icon="mdi-lock"
                type="password"
                outlined
                required
                :error="error"
                @keyup.enter="login"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="text-center d-block pt-0">
            <v-btn
              large
              color="#15587B"
              class="mx-3 mb-7 d-inline-block px-8"
              dark
              @click="login"
              >Login</v-btn
            >
            <v-divider></v-divider>
            <span class="mx-auto my-3 d-block">No account yet?</span>
            <v-btn
              large
              color="#15587B"
              class="mx-auto mb-7 px-8 d-block"
              dark
              @click="$router.push({ name: 'register' })"
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
      dialog: false,
      message: "",
      forgotEmail: "",
      alert: {
        type: "success",
        message: "",
      },
      reset: {
        type: "",
        message: "",
      },
      error: false,
      email: "",
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      resetLoader: false,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("dashboard");
    }
  },
  mounted() {
    if (this.$route.query.error) {
      this.error = true;
      this.alert.message = this.$route.query.error;
      this.alert.type = "error";
    } else if (this.$route.query.success) {
      this.error = false;
      this.alert.message = this.$route.query.success;
      this.alert.type = "success";
    }
  },
  methods: {
    ...mapActions({
      loginApi: "user/login",
    }),
    login() {
      if (this.$refs.userlogin.validate()) {
        this.loginApi({
          username: this.email,
          password: this.password,
        })
          .then((response) => {
            this.error = false;
            const { http_status } = response;

            if (http_status === 200) {
              this.$router.push({ name: "dashboard" });
            }
          })
          .catch(() => {
            this.password = null;
            this.alert.type = "red";
            this.alert.message = "Wrong Email or Password";
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
