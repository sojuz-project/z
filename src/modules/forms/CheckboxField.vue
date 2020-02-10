<template>
  <div :class="attrs.class">
    <label class="checkbox has-small-font-size">
      <input
        v-model="(formData[dataIndex] || {}).value"
        :placeholder="attrs.label"
        type="checkbox"
        class="has-ultrasmall-font-size"
        required="required"
      />
      {{ attrs.label }}
      <span class="checkmark"> </span>
    </label>
  </div>
</template>
<script>
export default {
  inject: ['formData'],
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    dataIndex() {
      return this.formData.findIndex(({ id }) => id === this.attrs.fieldName);
    },
  },
};
</script>
<style>
/* Customize the label (the container) */
.checkbox {
  display: block;
  position: relative;
  padding-left: 3vw;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 2.4vw;
}

/* Hide the browser's default checkbox */
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  left: 0;
  height: 2vw;
  width: 2vw;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #0073a8;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox .checkmark:after {
  left: 0.55vw;
  top: 0.2vw;
  width: 0.5vw;
  height: 0.8vw;
  border: solid white;
  border-width: 0 0.3vw 0.3vw 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
