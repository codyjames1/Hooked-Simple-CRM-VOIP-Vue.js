<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <yearly-premium-chart
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily SMS Sent</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 25%
              </span>
              increase in today's clients.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </yearly-premium-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <monthly-user-count-chart
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily SMS Sent</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 25%
              </span>
              increase in today's clients.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </monthly-user-count-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <yearly-premium-chart
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily SMS Sent</h4>
            <p class="category">
              <span class="text-success"
                ><i class="fas fa-long-arrow-alt-up"></i> 25%
              </span>
              increase in today's clients.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </yearly-premium-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>groups</md-icon>
          </template>

          <template slot="content">
            <p class="category">Clients</p>
            <h3 class="title">245/500</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <total-premium data-background-color="blue">
          <template slot="header">
            <md-icon>paid</md-icon>
          </template>

          

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated
            </div>
          </template>
        </total-premium>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <total-premium-last-week-card data-background-color="blue">
          <template slot="header">
            <md-icon>date_range</md-icon>
          </template>

          

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated
            </div>
          </template>
        </total-premium-last-week-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <total-premium-last30 data-background-color="blue">
          <template slot="header">
            <md-icon>trending_up</md-icon>
          </template>

          

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Updated
            </div>
          </template>
        </total-premium-last30>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Newest Clients</h4>
            <p class="category">Just Updated</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
import TotalPremium from "@/components/Cards/TotalPremium.vue";
import YearlyPremiumChart from "@/components/Cards/YearlyPremiumChart.vue";
import TotalPremiumLastWeekCard from "@/components/Cards/TotalPremiumLastWeekCard.vue";  
import MonthlyUserCountChart from "../components/Cards/MonthlyUserCountChart.vue";
import {
  StatsCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable,
} from "@/components";
import TotalPremiumLast30 from "../components/Cards/TotalPremiumLast30.vue";

export default {
  components: {
    StatsCard,
    OrderedTable,
    TotalPremium,
    TotalPremiumLastWeekCard,
    YearlyPremiumChart,
    MonthlyUserCountChart,
    TotalPremiumLast30
},
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
};
</script>
<style>
/*create small amount of space between yearly premium chart and monthly-user-count-chart on mobile devices */
@media (max-width: 768px) {
  yearly-premium-chart {
    margin-bottom: 50px !important;
  }
}





</style>
