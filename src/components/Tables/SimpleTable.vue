<template>

  <!--Table-->
  <div>
    <confirmation-modal
  :show="showConfirmation"
  :on-confirm="confirmDeletion"
  :on-cancel="cancelDeletion"
></confirmation-modal>

    <md-table class="tblhead" v-model="users" :table-header-color="tableHeaderColor" @md-selected="onSelect">
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="First Name">{{ item.firstname }}</md-table-cell>
        <md-table-cell md-label="Last Name">{{ item.lastname }}</md-table-cell>
        <md-table-cell md-label="Phone Number">{{ item.phonenumber }}</md-table-cell>
        <md-table-cell md-label="Product Sold">{{ item.product }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ formatDOB(item.dob) }}</md-table-cell>
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
import ConfirmationModal from "./ConfirmationModal";

export default {
  name: "ordered-table",
  components: {
    ConfirmationModal,
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
      filterOption: "timestamp",
      showConfirmation: false,
      userIdToDelete: null,
      selected: [],
    };
  },
  methods: {
    
    formatDOB(dob) {
      const date = new Date(dob);
      return date.toLocaleDateString();
    },
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
      const queryLatestDocuments = query(usersCollection, orderBy(orderByField, "desc"));

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
  },
  mounted() {
    this.updateQuery();
  },
};
</script>
