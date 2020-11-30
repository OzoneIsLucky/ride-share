<template>
  <v-container>
    <div>
      <h4 class="display-1">Become a Driver</h4>

      <instructions details="Input Information on Your Vehicle and Licensure." />

      <v-form v-model="valid">
        <v-text-field
          v-model="newDriver.licenseNumber"
          v-bind:rules="rules.required"
          label="License Number"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.licenseState"
          v-bind:rules="rules.required"
          label="License State"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.vehicleType"
          v-bind:rules="rules.required"
          label="Vehicle Type"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.vehicleMake"
          v-bind:rules="rules.required"
          label="Vehicle Make"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.vehicleModel"
          v-bind:rules="rules.required"
          label="Vehicle Model"
        ></v-text-field>
        <v-text-field
          v-model="newDriver.vehicleColor"
          v-bind:rules="rules.required"
          label="Vehicle Color"
        ></v-text-field>
        <number-input
          v-model="newDriver.vehcileCapacity"
          v-bind:rules="rules.required"
          label="Vehicle Capacity"
        ></number-input>
        <number-input
          v-model="newDriver.mpg"
          v-bind:rules="rules.required"
          label="Vehicle Gas Mileage (mpg)"
        ></number-input>
        <v-text-field
          v-model="newDriver.licensePlate"
          v-bind:rules="rules.required"
          label="Vehicle License Plate"
        ></v-text-field>        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
          >Submit
        </v-btn>
      </v-form>

      <div class="text-xs-center">
        <v-dialog v-model="dialogVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogHeader }}
            </v-card-title>

            <v-card-text>
              {{ dialogText }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>


<script>
import Instructions from "../components/Instructions.vue";

export default {
  name: "DriverPage",
  components: {
    Instructions, // Use the Instructions component we just imported
  },
  data: function () {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect driver data
      newDriver: {
        licenseNumber: "",
        licenseState: "",
        vehicleType: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleColor: "",
        vehicleCapacity: 0,
        mpg: 0,
        licensePlate: "",
      },

      // Was a driver created successfully?
      driverCreated: false,

      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,

      // Validation rules for the form fields. This functionality is an extension
      // that's part of the Vuetify package. Each rule is a list of functions
      // (note the fat arrows). Vuetify invokes all functions in the list,
      // passing it the content of the associated form field. Functions should
      // return either true (the field passes that validation) or a string
      // containing an error message indicating why the field doesn't pass validation.
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        vehicleCapacity: [
          (val) => val > 0 || "Vehicle capacity must be greater than 0",
        ],
        mpg: [
          (val) => val > 0 || "mpg must be greater than 0",
        ],
      },
    };
  },
  methods: {
    // Invoked when the user clicks the 'Submit' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.driverCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/driver", {
          userId: this.$store.state.currentAccount.id,
          licenseNumber: this.newDriver.licenseNumber,
          licenseState: this.newDriver.licenseState,
        })
        .post("/vehicle", {
            type: this.newDriver.vehicleType,
            make: this.newDriver.vehicleMake,
            model: this.newDriver.vehicleModel,
            color: this.newDriver.vehicleColor,
            capacity: this.newDriver.vehicleCapacity,
            mpg: this.newDriver.mpg,
            licenseState: this.newDriver.licenseState,
            licensePlate: this.newDriver.licensePlate,
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            this.driverCreated = true;
          } else {
            this.showDialog("Sorry", result.data.msge);
          }
        })
        .catch((err) => this.showDialog("Failed", err));
    },

    // Helper method to display the dialog box with the appropriate content.
    showDialog: function (header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },

    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function () {
      this.dialogVisible = false;
      if (this.accountCreated) {
        // Only navigate away from the become driver page if we were successful.
        this.$router.push({ name: "home-page" });
      }
    },
  },
};
</script>
