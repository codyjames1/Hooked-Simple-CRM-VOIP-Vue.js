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
  import { getDocs, collection, query, where, orderBy } from "./firebaseConfig"; // Import necessary Firebase functions
  import { db } from "./firebaseConfig"; // Import db object
  
  export default {
    name: "total-premium-last-week-card",
    props: {
      dataBackgroundColor: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        totalPremiumLastWeek: 0,
        formattedTotalPremiumLastWeek: "$0", // Initialize formattedTotalPremiumLastWeek with "$0"
        statsTitle: "Last 7 Days", // You can customize the title
      };
    },
    methods: {
      async fetchTotalPremiumLastWeek() {
        const usersCollection = collection(db, "Users"); // Replace "Users" with your collection name
  
        // Calculate the start date for last week
        const lastWeekStartDate = new Date();
        lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);
  
        // Create a query for documents with timestamp in the last week
        const queryLastWeekDocuments = query(
          usersCollection,
          where("timestamp", ">=", lastWeekStartDate),
          orderBy("timestamp", "desc")
        );
  
        const querySnapshot = await getDocs(queryLastWeekDocuments);
  
        // Calculate the sum of the "premium" field for documents in the last week
        const sumPremiumLastWeek = querySnapshot.docs.reduce((sum, doc) => {
          const premium = parseFloat(doc.data().premium) || 0; // Convert premium to a number
          return sum + premium;
        }, 0);
  
        // Update totalPremiumLastWeek and formattedTotalPremiumLastWeek
        this.totalPremiumLastWeek = sumPremiumLastWeek;
  
        // Check if sumPremiumLastWeek is a number before using toFixed
        if (typeof sumPremiumLastWeek === "number") {
          this.formattedTotalPremiumLastWeek = `$${sumPremiumLastWeek.toFixed(2)}`;
        }
      },
    },
    mounted() {
      this.fetchTotalPremiumLastWeek(); // Fetch total premium for the last week when the component is mounted
    },
  };
  </script>

  <style>
    .value {
        font-size: 18px; 
        font-weight: 500;
        color: green;
    }

</style>