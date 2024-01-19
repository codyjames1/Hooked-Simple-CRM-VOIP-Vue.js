<template>
  <div>
    <confirmation-modal
  :show="showConfirmation"
  :on-confirm="confirmDeletion"
  :on-cancel="cancelDeletion"
></confirmation-modal>
    <!-- Filter options -->
    <div>
      <label>Filter by:</label>
      <select v-model="filterOption" @change="updateQuery">
        <option value="timestamp">Date Added</option>
        <option value="name">Name</option>
        <option value="premium">Premium</option>
        <!-- Add other filter options based on your data fields -->
      </select>
    </div>

    <!-- Table -->
    <md-table class="tblhead" v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="First Name">{{ item.firstname }}</md-table-cell>
        <md-table-cell md-label="Last Name">{{ item.lastname }}</md-table-cell>
        <md-table-cell md-label="Phone Number">{{ item.phonenumber }}</md-table-cell>
        <md-table-cell md-label="Product Sold">{{ item.product }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ item.dob }}</md-table-cell>
        <md-table-cell md-label="Date Added">{{ formatTimestamp(item.timestamp, 'datetime') }}</md-table-cell>
        <md-table-cell>
          <md-button @click="deleteUser(item.id)" class="md-icon-button md-accent" id="trashbtn">
            <md-icon class="trash">delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    
  </div>
</template>

<script>
// Import necessary functions from Firebase
import { db, collection, onSnapshot, query, orderBy, limit, doc, deleteDoc } from "./firebaseConfig";
import ConfirmationModal from "./ConfirmationModal"; // Adjust the import path


export default {
  name: "ordered-table",
  components: {
    ConfirmationModal, // Register the ConfirmationModal component
  },
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
      showConfirmation: false,
      userIdToDelete: null,
    };
  },
  methods: {
    
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
    deleteUser(userId) {
      this.userIdToDelete = userId;
      this.showConfirmation = true;
    },
    confirmDeletion() {
      const usersCollection = collection(db, "Users");
      const userDoc = doc(usersCollection, this.userIdToDelete);

      // Delete the user document
      deleteDoc(userDoc)
        .then(() => {
          
        })
        .catch((error) => {
        });

      this.userIdToDelete = null; // Reset the userIdToDelete
      this.showConfirmation = false;
    },
    cancelDeletion() {
      this.userIdToDelete = null;
      this.showConfirmation = false;
    },
    updateQuery() {
      // Reference to the "Users" collection
      const usersCollection = collection(db, "Users");

      // Update the query based on the selected filter option
      let orderByField = this.filterOption === 'timestamp' ? 'timestamp' : this.filterOption;
      const queryLatestDocuments = query(usersCollection, orderBy(orderByField, "desc"), limit(5) );

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

          // Set the users data in component
          this.users = users;
        },
        (error) => {
          
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

<style>
 #trashbtn {
  background-color: rgb(182, 15, 15) !important;
}


</style>