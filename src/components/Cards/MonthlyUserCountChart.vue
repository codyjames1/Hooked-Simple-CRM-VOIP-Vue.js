<!-- MonthlyUserCountChart.vue -->
<template>
    <div class="monthcard">
      <canvas class="monthinner" ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  import { getDocs, collection } from "./firebaseConfig";
  import { db } from "./firebaseConfig";
  
  export default {
    name: 'MonthlyUserCountChart',
    props: {
      chartId: {
        type: String,
        required: true,
      },
      dataBackgroundColor: {
        type: String,
        default: '',
      },
    },
    mounted() {
      this.fetchMonthlyUserData();
    },
    methods: {
      async fetchMonthlyUserData() {
        const usersCollection = collection(db, "Users");
        const querySnapshot = await getDocs(usersCollection);
  
        // Calculate monthly user counts
        const monthlyUserCounts = Array(12).fill(0);
  
        querySnapshot.docs.forEach((doc) => {
          const timestamp = doc.data().timestamp;
          const month = new Date(timestamp.seconds * 1000).getMonth();
          monthlyUserCounts[month]++;
        });
  
        // Create the chart
        this.createChart(monthlyUserCounts);
      },
      createChart(monthlyUserCounts) {
        const ctx = this.$refs.chartCanvas.getContext('2d');
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [
              {
                label: 'Monthly Client Count',
                data: monthlyUserCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }
            ]
          },
          options: {
            scales: {
              x: {
                ticks: {
                  color: 'white',
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  color: 'white',
                }
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Make .monthcard responsive */
  .monthcard {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #2c2c2c;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  </style>