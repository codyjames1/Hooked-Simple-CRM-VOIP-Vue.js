<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">New Clients</h4>
            <p class="category">Just Updated</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="green"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
  
  
</template>

<script>
import { EditProfileForm } from "@/pages";
import { OrderedTable } from "@/components";

export default {
  components: {
    EditProfileForm,
    OrderedTable,
    
  },
};
</script>
