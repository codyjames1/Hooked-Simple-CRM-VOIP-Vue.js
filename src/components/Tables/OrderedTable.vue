<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="DOB">{{ item.dob }}</md-table-cell>
        <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
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
      selected: [],
      users: [
        {
          id: 1,
          name: "Dakota Rice",
          premium : "$245.67",
          dob: "10/02/1967",
          city: "Cleveland",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          premium: "$75.50",
          dob: "04/21/1967",
          city: "Columbia",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          premium: "$123.33",
          dob: "09/23/1977",
          city: "Nashville",
        },
        {
          id: 4,
          name: "Philip Chaney",
          premium: "$44.22",
          dob: "01/01/1955",
          city: "Miami",
        },
      ],
    };
  },
};
</script>
