<template>
  <md-card class="md-card-stats">
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <div class="stats">
        <h4 class="title">{{ statsTitle }}</h4>
        <div class="value">{{ formattedTotalPremium }}</div>
      </div>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
import { getDocs, collection } from "./firebaseConfig";
import { db } from "./firebaseConfig";

export default {
  name: "total-premium",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      totalPremium: 0,
      formattedTotalPremium: "$0",
      statsTitle: "Total Premium",
      
    };
  },
  methods: {
    async fetchTotalPremium() {
      const usersCollection = collection(db, "Users");
      const querySnapshot = await getDocs(usersCollection);

      // Calculate the sum of the "premium" field for every document
      const sumPremium = querySnapshot.docs.reduce((sum, doc) => {
        const premium = parseFloat(doc.data().premium) || 0;
        return sum + premium;
      }, 0);

      // Update totalPremium and formattedTotalPremium
      this.totalPremium = sumPremium;

      // Check if sumPremium is a number before formatting
      if (typeof sumPremium === "number") {
        // Use toLocaleString to format as currency with commas and decimals
        this.formattedTotalPremium = sumPremium.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      }
    },
  },
  mounted() {
    this.fetchTotalPremium();
  },
};
</script>

<style>
.md-card-stats {
  background-color: #2c2c2c !Important;
}

/*stats title color to white*/
.md-card-stats .stats .title {
  color: #fff !Important;
}



</style>