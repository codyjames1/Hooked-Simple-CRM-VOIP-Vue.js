<template>
  <form @submit.prevent="submitForm">
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
              <md-input v-model="title" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone Number</label>
              <md-input v-model="phonenumber" type="number"></md-input>
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
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>City</label>
              <md-input v-model="city" type="text"></md-input>
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
              <md-input v-model="code" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Date of Birth</label>
              <md-input v-model="dob" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Product Sold</label>
              <md-input v-model="product" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Monthly Premium</label>
              <md-input v-model="premium" type="number"></md-input>
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
// Adjust the import path based on the location of your firebaseConfig.js file
import { serverTimestamp } from "firebase/firestore";
import { db, collection, addDoc,  } from "./firebaseConfig";

export default {
  // ... your existing component options ...

  methods: {
    submitForm() {
      // Log the form data to the console (replace with your desired logic)
      console.log("Form Data:", {
        title: this.title,
        phonenumber: this.phonenumber,
        emailadress: this.emailadress,
        lastname: this.lastname,
        firstname: this.firstname,
        address: this.address,
        city: this.city,
        country: this.country,
        code: this.code,
        dob: this.dob,
        product: this.product,
        premium: this.premium,
        notes: this.notes,
        timestamp: serverTimestamp(),
        // ... include other form data as needed ...
      });

      // Add the form data to the Firestore collection
      this.addToFirestore();

      // Optionally, you can clear the form after submission
      this.clearForm();

      // You can add additional logic here, such as sending data to the server
    },

    clearForm() {
      // Clear the form data
      this.title = null;
      this.phonenumber = null;
      this.emailadress = null;
      this.lastname = null;
      this.firstname = null;
      this.address = null;
      this.city = null;
      this.country = null;
      this.code = null;
      this.dob = null;
      this.product = null;
      this.premium = null;
      this.notes = null;
      // ... clear other form fields ...
    },

    async addToFirestore() {
  // Example: Add form data to the "Users" collection
  const usersCollection = collection(db, "Users");
  await addDoc(usersCollection, {
    title: this.title,
    phonenumber: this.phonenumber,
    emailadress: this.emailadress,
    lastname: this.lastname,
    firstname: this.firstname,
    address: this.address,
    city: this.city,
    country: this.country,
    code: this.code,
    dob: this.dob,
    product: this.product,
    premium: this.premium,
    notes: this.notes,
    timestamp: serverTimestamp(),
        // ... include other form data as needed ...
      });

      console.log("Form data added to Firestore");
    },
  },
};
</script>


<style></style>
