<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Policy">{{ item.policy }}</md-table-cell>
        <md-table-cell md-label="Premium">{{ item.premium }}</md-table-cell>
        <md-table-cell md-label="Messages Sent">{{ item.sent }}</md-table-cell>
        <md-table-cell md-label="Date Hook Was Set">{{ item.hook }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
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
          name: "Dakota Rice",
          policy: "Americo",
          premium: "$245.67",
          sent: "5",
          hook: "01/12/2023",
        },
        {
          name: "Minerva Hooper",
          policy: "Mutual of Omaha",
          premium: "$$75.50",
          sent: "1",
          hook: "05/2/2022",
        },
        {
          name: "Sage Rodriguez",
          policy: "AIG",
          premium: "$123.33",
          sent: "10",
          hook: "12/23/2023",
        },
        {
          name: "Philip Chaney",
          policy: "Americo",
          premium: "$44.22",
          sent: "1",
          hook: "01/01/2024",
        },
        {
          name: "Doris Greene",
          policy: "Americo",
          premium: "$166.27",
          sent: "34",
          hook: "08/22/2023",
        },
        {
          name: "Mason Porter",
          policy: "Lumico",
          premium: "$333.21",
          sent: "44",
          hook: "03/11/2023",
        },
      ],
    };
  },
};
</script>
