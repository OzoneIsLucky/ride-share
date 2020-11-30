<template>
  <v-container>
    <div>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Reset Password</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
                v-model="email"
                v-bind:rules="rules.email"
                label="Email"
                id="email"
                name="email"
                prepend-icon="mdi-email"
                type="text"
            />
            <v-text-field
                v-model="oldPassword"
                id="oldPassword"
                v-bind:rules="rules.password"
                label="Current Password"
                name="oldPassword"
                prepend-icon="mdi-lock"
                type="password"
            />
            <v-text-field
                v-model="newPassword"
                id="newPassword"
                v-bind:rules="rules.password"
                label="New Password"
                name="newPassword"
                prepend-icon="mdi-lock"
                type="password"
            />
            <v-text-field
                v-model="confPassword"
                id="confPassword"
                v-bind:rules="rules.confPassword"
                label="Confirm Password"
                name="confPassword"
                prepend-icon="mdi-lock"
                type="password"
            /> 
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-on:click="resetPassword" color="primary">Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",

      snackbar: {
        show: false,
        msge: "",
      },
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        email: [
          (val) => /\w{3,}@\w{3,}(?:.\w{3,})+$/.test(val) || "Invalid e-mail",
        ],
        password: [
          (val) => /[A-Z]/.test(val) || "Need upper case letter",
          (val) => /[a-z]/.test(val) || "Need lower case letter",
          (val) => /\d/.test(val) || "Need digit",
          (val) => val.length >= 8 || "Minimum 8 characters",
        ],
        confPassword: [
          (val) => val === document.getElementById("newPassword").value || "Passwords must match",
        ],
      },
    };
  },

  methods: {
    resetPassword() {
      this.$axios
          .update(`/accounts/${this.$axios.query().select('id').where('email', document.getElementById("email").value)}`, {
            password: this.password,
          })
          .then((result) => {
            this.showSnackbar(result.data.msge);
            if (result.data.ok) {
              this.$router.push({ name: "home-page" });
            }
          })
          .catch((err) => this.showSnackbar(err));
    },

    showSnackbar(msge) {
      this.snackbar.msge = msge;
      this.snackbar.show = true;
    },
  },
};
</script>