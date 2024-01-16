<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ formatDOB(item.dob) }}</md-table-cell>
        <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="Date Added">{{ formatTimestamp(item.timestamp, 'datetime') }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
// Import necessary functions from Firebase
import { db, collection, onSnapshot, query, orderBy, limit } from "./firebaseConfig";

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    formatDOB(dob) {
      // Parse the string into a JavaScript Date object
      const date = new Date(dob);

      // Format as a string in the desired date format
      return date.toLocaleDateString();
    },
    formatTimestamp(timestamp, format) {
      // Convert timestamp to a JavaScript Date object
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

      if (format === 'datetime') {
        // Format as date and time
        return date.toLocaleString();
      }

      return ''; // Default to an empty string if format is not recognized
    },
  },
  mounted() {
    // Reference to the "Users" collection
    const usersCollection = collection(db, "Users");

    // Create a query to get the latest 5 documents ordered by a timestamp or any other field
    const queryLatestDocuments = query(usersCollection, orderBy("timestamp", "desc"), limit(5));

    // Listen for real-time updates on the query
    const unsubscribe = onSnapshot(
      queryLatestDocuments,
      (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Set the users data in your component
        this.users = users;
      },
      (error) => {
        console.error("Error getting data: ", error);
      }
    );

    // Save the unsubscribe function to stop listening when the component is destroyed
    this.$once("hook:beforeDestroy", unsubscribe);
  },
};
</script>