<template>
    <div v-if="showModal" class="confirmation-modal">
      <div class="modal-content">
        <p class="textalert">Are you sure you want to delete this client?</p>
        <md-button id="btn1" class="md-raised md accent" @click="confirmDeletion">Yes</md-button>
        <md-button id="btn2" class="md-accent" @click="cancelDeletion">Cancel</md-button>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(value) {
        if (!value) {
          this.onCancel();
        }
      },
    },
  },
  methods: {
    confirmDeletion() {
      this.onConfirm();
      this.showModal = false;
    },
    cancelDeletion() {
      this.onCancel();
      this.showModal = false;
    },
  },
};
</script>
  
  <style scoped>
  /* Add your modal styles here */
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;;
    align-content: center;
    text-align: center;
  }
  .textalert {
    font-size: 16px;

  }

  .modal-content #btn1 {
    width: 50%;
    background-color: red !important;
    margin-left: auto;
    margin-right: auto;
  }
  .modal-content #btn2 {
    width: 50%;
    background-color: rgb(116, 196, 136) !important;
    margin-left: auto;
    margin-right: auto;
  }

  .confirmation-modal {
    display: flex;
    justify-content: end;
    transition: .05s;
  }
  </style>