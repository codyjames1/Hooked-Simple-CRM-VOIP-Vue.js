<template>
    <md-card class="md-card-stats">
      <md-card-header :data-background-color="dataBackgroundColor">
        <slot name="header"></slot>
      </md-card-header>
  
      <md-card-content>
        <div class="stats">
          <h4 class="title">{{ statsTitle }}</h4>
          <div class="value">{{ formattedTotalPremiumLastWeek }}</div>
        </div>
      </md-card-content>
  
      <md-card-actions md-alignment="left">
        <slot name="footer"></slot>
      </md-card-actions>
    </md-card>
  </template>
  
  <script>
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default {
  name: "total-premium-last-30",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      totalPremiumLastWeek: 0,
      formattedTotalPremiumLastWeek: "$0",
      statsTitle: "Last 30 Days",
    };
  },
  methods: {
    async fetchTotalPremiumLastWeek() {
      const usersCollection = collection(db, "Users");

      // Calculate the start date for last week
      const lastWeekStartDate = new Date();
      lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 30);

      // Create a query for documents with timestamp in the last week
      const queryLastWeekDocuments = query(
        usersCollection,
        where("timestamp", ">=", lastWeekStartDate),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(queryLastWeekDocuments);

      // Calculate the sum of the "premium" field for documents in the last week
      const sumPremiumLastWeek = querySnapshot.docs.reduce((sum, doc) => {
        const premium = parseFloat(doc.data().premium) || 0;
        return sum + premium;
      }, 0);

      // Update totalPremiumLastWeek and formattedTotalPremiumLastWeek
      this.totalPremiumLastWeek = sumPremiumLastWeek;

      // Check if sumPremiumLastWeek is a number before formatting
      if (typeof sumPremiumLastWeek === "number") {
        // Use toLocaleString to format as currency with commas and decimals
        this.formattedTotalPremiumLastWeek = sumPremiumLastWeek.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      }
    },
  },
  mounted() {
    this.fetchTotalPremiumLastWeek();
  },
};
</script>

  <style>
    .value {
        font-size: 19px; 
        font-weight: 500;
        color: rgb(42, 182, 42);
    }

</style>