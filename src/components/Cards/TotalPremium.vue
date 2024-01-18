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
import { getDocs, collection } from "./firebaseConfig"; // Import necessary Firebase functions
import { db } from "./firebaseConfig"; // Import db object

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
      formattedTotalPremium: "$0", // Initialize formattedTotalPremium with "$0"
      statsTitle: "Total Premium", // You can customize the title
    };
  },
  methods: {
    async fetchTotalPremium() {
      const usersCollection = collection(db, "Users"); // Replace "Users" with your collection name
      const querySnapshot = await getDocs(usersCollection);

      // Calculate the sum of the "premium" field for every document
      const sumPremium = querySnapshot.docs.reduce((sum, doc) => {
        const premium = parseFloat(doc.data().premium) || 0; // Parse premium as a number, default to 0 if not a number
        return sum + premium;
      }, 0);

      // Update totalPremium and formattedTotalPremium
      this.totalPremium = sumPremium;

      // Check if sumPremium is a number before using toFixed
      if (typeof sumPremium === "number") {
        this.formattedTotalPremium = `$${sumPremium.toFixed(2)}`;
      }
    },
  },
  mounted() {
    this.fetchTotalPremium(); // Fetch total premium when the component is mounted
  },
};
</script>