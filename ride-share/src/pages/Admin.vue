<template>
  <v-container>
    <div>
      <h4 class="display-1">Accounts</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="accountHeaders"
        v-bind:items="accounts"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.email }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>
              <v-icon small @click="deleteAccount(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <br>
      <br>
      <h4 class="display-1">Rides</h4>
      <v-data-table
        class="elevation-1"
        v-bind:headers="rideHeaders"
        v-bind:items="rides"
        :hide-default-footer="true"
      >
      <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.date | moment("MM-DD-YY") }}</td>
            <td>{{ item.time | moment("h:mm a") }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.fuelPrice }}</td>
            <td>{{ item.fee }}</td>
            <td>{{ item.vehicleId }}</td>
            <td>{{ item.fromLocationId }}</td>
            <td>{{ item.toLocationId }}</td>
            <td>
              <v-icon small @click="deleteRide(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <br>
      <v-btn v-on:click="addRide">Add Ride</v-btn>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Ride",

  data: function() {
    return {
      rideHeaders: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" },
        { text: "Vehicle", value: "vehicleId" },
        { text: "From", value: "fromLocationId" },
        { text: "To", value: "toLocationId" },
        { text: "Action", value: "action" },
      ],
      accountHeaders: [
        { text: "Email", value: "email" },
        { text: "First", value: "firstName" },
        { text: "Last", value: "lastName" },
        { text: "Action", value: "action" }
      ],
      rides: [],
      accounts: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    console.log("got here");
    this.$axios.get("/rides").then(response => {
      
      this.rides = response.data.map(ride => ({
        id: ride.id,
        date: ride.date,
        time: ride.time,
        distance: ride.distance,
        fuelPrice: ride.fuelPrice,
        fee: ride.fee,
        vehicleId: ride.vehicleId,
        fromLocationId: ride.fromLocationId,
        toLocationId: ride.toLocationId,
      }));
    });
    
    this.$axios.get("/accounts").then(response => {
      this.accounts = response.data.map(account => ({
        id: account.id,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass() {
      //pass
    },

    addRide() {
      this.$router.push({ name: "add-ride" });
    },

    // Delete an account.
    deleteAccount(item) {
      this.$axios.delete(`/accounts/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local account
          // by filtering the deleted account from the list of accounts.
          this.accounts = this.accounts.filter(
            account => account.id !== item.id
          );
        }
      });
    },

    // Delete a ride.
    deleteRide(item) {
      this.$axios.delete(`/rides/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local ride
          // by filtering the deleted account from the list of rides.
          this.rides = this.rides.filter(
            ride => ride.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentRide {
  background: rgb(226, 197, 197);
}
</style>
