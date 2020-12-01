<template>
  <v-container>
    <div>
      <h4 class="display-1">Add a Ride</h4>

      <instructions details="Please fill in all fields." />

      <v-form v-model="valid">

        <v-text-field
          v-model="newRide.date"
          v-bind:rules="rules.required"
          label="Date"
        ></v-text-field>

        <v-text-field
          v-model="newRide.time"
          v-bind:rules="rules.required"
          label="Time"
        ></v-text-field>

        <v-text-field
          v-model="newRide.distance"
          v-bind:rules="rules.required"
          label="Distance"
        ></v-text-field>

        <v-text-field
          v-model="newRide.fuelPrice"
          v-bind:rules="rules.required"
          label="fuelPrice"
        ></v-text-field>

        <v-text-field
          v-model="newRide.fee"
          v-bind:rules="rules.required"
          label="Fee"
        ></v-text-field>

        <v-text-field
          v-model="newRide.vehicleId"
          v-bind:rules="rules.required"
          label="Vehicle ID"
        ></v-text-field>

        <v-text-field
          v-model="newRide.fromLocationId"
          v-bind:rules="rules.required"
          label="From Location ID"
        ></v-text-field>

        <v-text-field
          v-model="newRide.toLocationId"
          v-bind:rules="rules.required"
          label="To Locaiton ID"
        ></v-text-field>       
        
        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
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
    Instructions,// Use the Instructions component we just imported
  },
  data: function () {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect driver data
      newRide: {
        date: "",
        time: "",
        distance: "",
        fuelPrice: "",
        fee: "",
        vehicleId: "",
        fromLocationId: "",
        toLocationId: "",
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
      },
    };
  },
  methods: {
    // Invoked when the user clicks the 'Submit' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      console.log("got here");
      this.rideCreated = false;

      // Post the content of the form to the Hapi server.
      this.$axios
        .post("/rides", {
          date: this.newRide.date,
          time: this.newRide.time,
          distance: this.newRide.distance,
          fuelPrice: this.newRide.fuelPrice,
          fee: this.newRide.fee,
          vehicleId: this.newRide.vehicleId,
          fromLocationId: this.newRide.fromLocationId,
          toLocationId: this.newRide.toLocationId,
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
      if (this.driverCreated) {
        // Only navigate away from the become driver page if we were successful.
        this.$router.push({ name: "home-page" });
      }
    },
  },
};
</script>
