<template>
  <v-container>
    <div>
      <h4 class="display-1">Rides</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
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
              <v-icon small class="ml-2" @click="goToRide(item)">
                mdi-eye
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

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
  name: "Rides",

  data: function() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" },
        { text: "Vehicle", value: "vehicleId" },
        { text: "From", value: "fromLocationId" },
        { text: "To", value: "toLocationId" },
        { text: "Action", value: "action" }
      ],
      rides: [],

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

    goToRide(item) {
      this.$router.push({ name: "ride", query: { id: `${item.id}` } });
    },

    joinRide(item) {

      this.$axios
        .post(`/rides/${item.id}`, {
          userId: this.$store.state.currentAccount.id
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            console.log(result.data.msge);
            this.accountCreated = true;
          } else {
            console.log(result.data.msge);
          }
        })
        .catch((err) => console.log(err));
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
