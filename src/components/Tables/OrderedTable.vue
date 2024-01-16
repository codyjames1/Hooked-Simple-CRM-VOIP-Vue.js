<template>
  <div>
    <!-- Filter options -->
    <div>
      <label>Filter by:</label>
      <select v-model="filterOption" @change="updateQuery">
        <option value="timestamp">Date Added</option>
        <option value="name">Name</option>
        <option value="premium">Premium</option>
        <option value="dob">DOB</option>
        <option value="city">City</option>
        <!-- Add other filter options based on your data fields -->
      </select>
    </div>

    <!-- Table -->
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="First Name">{{ item.firstname }}</md-table-cell>
        <md-table-cell md-label="Last Name">{{ item.lastname }}</md-table-cell>
        <md-table-cell md-label="Phone Number">{{ item.phonenumber }}</md-table-cell>
        <md-table-cell md-label="Product Sold">{{ item.product }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ formatDOB(item.dob) }}</md-table-cell>
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
      default: "green",
    },
  },
  data() {
    return {
      users: [],
      filterOption: "timestamp", // Default filter option
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
  // Check if timestamp is a valid object with seconds property
  if (timestamp && timestamp.seconds !== undefined) {
    // Convert timestamp to a JavaScript Date object
    const date = new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6);

    if (format === 'datetime') {
      // Format as date and time
      return date.toLocaleString();
    }
  }

  return ''; // Default to an empty string if timestamp is null, undefined, or in an unexpected format
},
    updateQuery() {
      // Reference to the "Users" collection
      const usersCollection = collection(db, "Users");

      // Update the query based on the selected filter option
      let orderByField = this.filterOption === 'timestamp' ? 'timestamp' : this.filterOption;
      const queryLatestDocuments = query(usersCollection, orderBy(orderByField, "desc"));

      // Listen for real-time updates on the updated query
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
  },
  mounted() {
    // Initial query based on the default filter option
    this.updateQuery();
  },
};
</script>