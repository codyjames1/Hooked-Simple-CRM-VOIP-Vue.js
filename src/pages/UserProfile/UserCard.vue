<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">CEO / Co-Founder</h6>
      <h4 class="card-title">Cody Barnes</h4>
      <p class="card-description">
        I ain’t the toughest hickory that your axe has ever fell, but I’m a hickory just as well, I’m a hickory all the same.
      </p>
      <md-button class="md-round md-success">Edit</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/userprofile.jpg"),
    },
  },
  data() {
    return {};
  },
};
</script>
<style></style>
