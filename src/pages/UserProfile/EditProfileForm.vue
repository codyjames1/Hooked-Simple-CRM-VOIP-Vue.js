<template>
  <form ref="subform" @submit.prevent="submitForm">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Hook Client</h4>
        <p class="category">
          Fill In Your Client Information To Start Drip Campaign
        </p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Title</label>
              <md-input v-model="title" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone Number</label>
              <md-input v-model="phonenumber" type="number" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="firstname" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lastname" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="address" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>City</label>
              <md-input v-model="city" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Country</label>
              <md-input v-model="country" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Postal Code</label>
              <md-input v-model="code" type="number" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
  <md-field>
    <label class="dateob">Date of Birth</label>
    <md-input v-model="dob" type="date"></md-input>
  </md-field>
</div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Product Sold</label>
              <md-input v-model="product" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Monthly Premium</label>
              <md-input v-model="premium" type="number" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Notes</label>
              <md-textarea v-model="notes"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button type="submit" class="md-raised md-success"
              >Set The Hook</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { serverTimestamp } from "firebase/firestore";
import { db, collection, addDoc } from "./firebaseConfig";
import moment from "moment";

export default {
  data() {
    return {
      
    };
  },
  methods: {

    data: {
      dob: moment().format("MM/DD/YYYY"),

    },

    formatDOB(dob) {
    // Ensure the input value is not empty
    if (dob) {
      // Split the input into parts based on "/"
      const parts = dob.split('/');

      // Ensure there are three parts (MM, DD, YYYY)
      if (parts.length === 3) {
        const [month, day, year] = parts;

        // Ensure each part is a valid number
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          // Format the date as MM/DD/YYYY
          return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year.padStart(4, '0')}`;
        }
      }
    }

    // Return the original input if the format is not valid
    return dob;
  },
    async submitForm() {
      
      await this.addToFirestore();

      
      this.clearForm();
    },
    async addToFirestore() {
     
      const numericPremium = parseFloat(this.premium);
      const numericCode = parseInt(this.code);
      const numericPhonenumber = parseFloat(this.phonenumber);

      const usersCollection = collection(db, "Users");
      await addDoc(usersCollection, {
        title: this.title,
        phonenumber: numericPhonenumber,
        emailadress: this.emailadress,
        lastname: this.lastname,
        firstname: this.firstname,
        address: this.address,
        city: this.city,
        country: this.country,
        code: numericCode,
        dob: this.dob, 
        product: this.product,
        premium: numericPremium,
        notes: this.notes,
        timestamp: serverTimestamp(),
      }).then(() => {
        
        this.$refs.subform.reset(); // Reset the form

      });
    },
    clearForm() {
      // Clear the form by resetting all the values
      this.title = "";
      this.phonenumber = "";
      this.emailadress = "";
      this.lastname = "";
      this.firstname = "";
      this.address = "";
      this.city = "";
      this.country = "";
      this.code = "";
      this.dob = "";
      this.product = "";
      this.premium = "";
      this.notes = "";
    },
  },
};

</script>


<style>
.dateob {
  /*keep label above input*/
  margin-top: -1.5em;
  margin-bottom: 1em;
  
}
</style>
