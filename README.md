# Hooked Simple CRM

This repository contains the source code for Hooked Simple CRM, a Vue.js-based CRM application designed for life insurance sales agents. The CRM helps agents track their clients, monitor earnings, and automate drip campaigns for SMS and email to nurture leads.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Data Fetching and Display](#data-fetching-and-display)
- [Next Steps](#next-steps)
- [License](#license)

## Overview

Hooked Simple CRM is built using Vue.js and the Material UI library to provide a user-friendly software solution for life insurance sales agents. The main functionalities include client tracking, earnings monitoring, and automated drip campaigns. The backend is powered by Firebase, utilizing Firestore for the database and Firebase Authentication for user management.

## Features

- Multi-step client tracking
- Earnings tracking for all time, last 30 days, and last week
- Automated SMS and email drip campaigns
- Real-time data display using JavaScript graphs
- User authentication and data storage with Firebase

## Technologies Used

- **Frontend**: Vue.js, Material UI
- **Backend**: Firebase (Firestore, Firebase Authentication)
- **Additional Libraries**: Vue Router for routing

## Key Components
Dashboard.vue
The dashboard displays key metrics and charts, including total premium earnings and client acquisition data. The data is fetched from Firestore and visualized using JavaScript graphs.

## UserProfile.vue
Handles user profile management, allowing users to update their information and view their performance metrics.

## Login.vue
Provides authentication functionality using Firebase Authentication.

## Maps.vue
Displays geographical data and client locations using interactive maps.

## Notifications.vue
Manages and displays notifications for users.

## TableList.vue
Shows a list of all clients with details and options for managing their information.

## Total Premium Card Component
The Total Premium card component displays the total earnings from premiums sold. It shows data for all time, the last 30 days, and the last week, and can be filtered by year.

## Example Code
```vue 
<template>
  <md-card class="md-card-stats">
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <div class="stats">
        <h4 class="title">{{ statsTitle }}</h4>
        <div class="value">{{ formattedTotalPremium }}</div>
      </div>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default {
  name: "total-premium",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      totalPremium: 0,
      formattedTotalPremium: "$0",
      statsTitle: "Total Premium",
    };
  },
  methods: {
    async fetchTotalPremium() {
      const usersCollection = collection(db, "Users");
      const querySnapshot = await getDocs(usersCollection);

      const sumPremium = querySnapshot.docs.reduce((sum, doc) => {
        const premium = parseFloat(doc.data().premium) || 0;
        return sum + premium;
      }, 0);

      this.totalPremium = sumPremium;

      if (typeof sumPremium === "number") {
        this.formattedTotalPremium = sumPremium.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      }
    },
  },
  mounted() {
    this.fetchTotalPremium();
  },
};
</script>

<style>
.md-card-stats {
  background-color: #2c2c2c !important;
}

.md-card-stats .stats .title {
  color: #fff !important;
}
</style>
```
## Data Fetching and Display
Data is fetched from Firestore using Firebase's JavaScript SDK. The Total Premium component, for instance, fetches the total premium earnings for all clients and formats the result as a currency string for display.

## Example Data Fetching
```javascript
Copy code
async fetchTotalPremium() {
  const usersCollection = collection(db, "Users");
  const querySnapshot = await getDocs(usersCollection);

  const sumPremium = querySnapshot.docs.reduce((sum, doc) => {
    const premium = parseFloat(doc.data().premium) || 0;
    return sum + premium;
  }, 0);

  this.totalPremium = sumPremium;

  if (typeof sumPremium === "number") {
    this.formattedTotalPremium = sumPremium.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }
}
```
# Next Steps
The next feature currently in development is integrating a complete VOIP system. This will allow users to place and receive phone calls directly within the Hooked CRM application, further enhancing its functionality and usability for sales agents.

License
This project is licensed under the MIT License - see the LICENSE file for details.
