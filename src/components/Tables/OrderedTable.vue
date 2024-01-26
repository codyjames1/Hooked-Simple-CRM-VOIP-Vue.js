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
        <md-table-cell md-label="Annual Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ item.dob }}</md-table-cell>
        <md-table-cell md-label="Date Added">{{ formatTimestamp(item.timestamp, 'datetime') }}</md-table-cell>
        <md-table-cell>
          <md-button @click="openEditDialog(item)" class="md-icon-button md-accent" id="editbtn">
            <md-icon class="edit">edit</md-icon>
          </md-button>
          <md-button @click="deleteUser(item.id)" class="md-icon-button md-accent" id="trashbtn">
            <md-icon class="trash">delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- Edit Dialog -->
    <md-dialog v-model="editDialog" :md-fullscreen="false" @md-closed="closeEditDialog">
  <md-dialog-title>Edit User</md-dialog-title>
  <md-dialog-content>
    <md-field>
      <label>First Name</label>
      <md-input v-model="editedUser.firstname"></md-input>
    </md-field>
    <md-field>
      <label>Last Name</label>
      <md-input v-model="editedUser.lastname"></md-input>
    </md-field>
    <!-- Add other fields as needed -->
  </md-dialog-content>
  <md-dialog-actions>
    <md-button class="md-primary" @click="saveEditedUser">Save Changes</md-button>
    <md-button @click="closeEditDialog">Cancel</md-button>
  </md-dialog-actions>
</md-dialog>
  </div>
</template>

<script>
// Import necessary functions from Firebase
import { 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  doc, 
  deleteDoc, 
  updateDoc 
} from "./firebaseConfig";
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
      editDialog: false,
      editedUser: {
        id: null,
        firstname: "",
        lastname: "",
        // Add other fields as needed
      },
    };
  },
  methods: {
    formatTimestamp(timestamp, format) {
      if (timestamp && timestamp.seconds !== undefined) {
        const date = new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6);

        if (format === 'datetime') {
          return date.toLocaleString();
        }
      }

      return '';
    },
    deleteUser(userId) {
      this.userIdToDelete = userId;
      this.showConfirmation = true;
    },
    confirmDeletion() {
      const usersCollection = collection(db, "Users");
      const userDoc = doc(usersCollection, this.userIdToDelete);

      deleteDoc(userDoc)
        .then(() => {})
        .catch((error) => {});

      this.userIdToDelete = null;
      this.showConfirmation = false;
    },
    cancelDeletion() {
      this.userIdToDelete = null;
      this.showConfirmation = false;
    },
    updateQuery() {
      const usersCollection = collection(db, "Users");
      let orderByField = this.filterOption === 'timestamp' ? 'timestamp' : this.filterOption;
      const queryLatestDocuments = query(usersCollection, orderBy(orderByField, "desc"), limit(5));

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

          this.users = users;
        },
        (error) => {}
      );

      this.$once("hook:beforeDestroy", unsubscribe);
    },
    openEditDialog(user) {
      this.editDialog = true;
      this.editedUser = { ...user };
    },
    closeEditDialog() {
      this.editDialog = false;
      this.editedUser = {
        id: null,
        firstname: "",
        lastname: "",
        // Reset other fields as needed
      };
    },
    saveEditedUser() {
      if (!this.editedUser.id) {
        return;
      }

      const usersCollection = collection(db, "Users");
      const userDoc = doc(usersCollection, this.editedUser.id);

      updateDoc(userDoc, this.editedUser)
        .then(() => {
          this.closeEditDialog();
        })
        .catch((error) => {
        });
    },
  },
  mounted() {
    this.updateQuery();
  },
};
</script>

<style>
 #trashbtn {
  background-color: rgb(182, 15, 15) !important;
}


</style>