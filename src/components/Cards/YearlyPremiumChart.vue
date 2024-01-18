<!-- YearlyPremiumChart.vue -->
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
  name: 'YearlyPremiumChart',
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
    this.fetchYearlyPremiumData();
  },
  methods: {
    async fetchYearlyPremiumData() {
      const usersCollection = collection(db, "Users");
      const querySnapshot = await getDocs(usersCollection);

      // Calculate monthly premium sums
      const monthlyPremiumSums = Array(12).fill(0);

      querySnapshot.docs.forEach((doc) => {
        const premium = parseFloat(doc.data().premium) || 0;
        const timestamp = doc.data().timestamp;
        const month = new Date(timestamp.seconds * 1000).getMonth();
        monthlyPremiumSums[month] += premium;
      });

      // Create the chart
      this.createChart(monthlyPremiumSums);
    },
    createChart(monthlyPremiumSums) {
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
              label: 'Monthly Premium',
              data: monthlyPremiumSums,
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
                callback: function (value) {
                  return '$' + value.toFixed(2);
                }
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
    /*make .monthcare responsive*/
    .monthcard {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #2c2c2c;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }


    
  </style>