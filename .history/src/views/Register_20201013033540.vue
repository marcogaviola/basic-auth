<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid style="background: #15587b">
        <v-fade-transition mode="out-in">
          <v-card
            color="#FCFCFC"
            style="padding: 50px"
            class="my-0 mx-auto"
            width="600"
          >
            <v-card flat color="#FCFCFC">
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
            </v-card>
          </v-card>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>


<style lang="scss">
html {
  overflow-y: auto !important;
}
</style>
