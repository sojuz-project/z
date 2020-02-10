<template>
  <div :class="attrs.className">
    <!-- {{ formData()[attrs.fieldName] }} -->
    <label class="has-ultrasmall-font-size">
      {{ attrs.label }}
    </label>
    <input
      :value="formData()[attrs.fieldName]"
      @input="(e) => updateData(e.target.value, attrs.fieldName)"
      :placeholder="attrs.label"
      class="has-ultrasmall-font-size"
      required="required"
    />
  </div>
</template>
<script>
export default {
  inject: ['formData', 'updateData'],
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  // mounted() {
  //   // this.formData[this.attrs.fieldName];
  //   // this.waitForData();
  // },
  // methods: {
  //   waitForData(data) {
  //     this.count++;
  //     if (this.count < 5 && this.formData[this.attrs.fieldName] === undefined) {
  //       console.log(this.formData.value);
  //       this.waitForData();
  //     }
  //   },
  // },
  // computed: {
  //   form() {
  //     // const data = Object.assign({}, this.formData());
  //     // console.log(d/ata.email);
  //     const x = ;
  //     console.log('x1', x);
  //     this.$forceUpdate();
  //     console.log('x2', x);
  //     return x;
  //   },
  // },
};
</script>
