<template>
  <md-card class="md-card-stats">
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <div class="stats">
        <h4 class="title">{{ statsTitle }}</h4>
        <div class="value">{{ totalUsers }}</div>
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
  name: "stats-card",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      totalUsers: 0,
      statsTitle: "Total Clients", // You can customize the title
    };
  },
  methods: {
    async fetchTotalUsers() {
      const usersCollection = collection(db, "Users"); // Replace "Users" with your collection name
      const querySnapshot = await getDocs(usersCollection);
      this.totalUsers = querySnapshot.docs.length; // Update totalUsers with the count of documents
    },
  },
  mounted() {
    this.fetchTotalUsers(); // Fetch total users when the component is mounted
  },
};
</script>