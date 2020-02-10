<template>
  <form v-if="form && form.fields" @submit.prevent="submit()">
    <h1>{{ form.title }}</h1>
    <!-- <pre>{{ form }}</pre> -->
    <inner-block v-for="(block, i) in form.fields" :key="i" :blocks="block" />
    <div class="button wp-block-button aligncenter">
      <button
        :disabled="loading"
        class="wp-block-button has-text-color has-white-color has-background has-dark-gray-background-color"
        type="submit"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AcfForm',
  provide() {
    return {
      formData: () => this.updatedForm,
      updateData: this.updateData,
    };
  },
  data() {
    return {
      updatedForm: {},
      loading: false,
    };
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  // computed: {
  //   provideData() {
  //     return {};
  //   },
  // },
  methods: {
    updateData(value, fieldName) {
      this.updatedForm = { ...this.updatedForm, [fieldName]: value };
    },
    makeFields(fields) {
      //  {
      //   "key": "field_5e2ad15ecd49c",
      //   "label": "email",
      //   "name": "email",
      //   "type": "email",
      //   "instructions": "",
      //   "required": 1,
      //   "conditional_logic": 0,
      //   "wrapper": {
      //     "width": "",
      //     "class": "",
      //     "id": ""
      //   },
      //   "default_value": "",
      //   "placeholder": "",
      //   "prepend": "",
      //   "append": ""
      // };

      return fields.map((attrs) => ({
        blockName: ['text', 'select'].includes(attrs.type) ? `sojuzacf${attrs.type}` : 'sojuzacftext',
        attrs,
      }));
    },
    // submit() {
    //   this.$router.push({ query: this.updatedForm });
    // },
    async submit() {
      if (!this.form.active) {
        // this.$router.push({ query: this.updatedForm });
        return;
      }

      try {
        this.loading = true;

        const { data, errors } = await this.$apollo.mutate({
          mutation: require('./formSubmit.gql'),
          variables: {
            action: this.form.action,
            fields: JSON.stringify(this.updatedForm),
          },
        });

        if (errors) {
          throw errors;
        }

        if (['login', 'register'].includes(data.form.cb)) {
          this.$loginHelpers.onLogin(data.form.data.token);
        }
      } catch (e) {
        // this.$updateToast({ msg: e, type: 'error' });
      } finally {
        // this.$updateToast({ msg: 'asdasdsad', type: 'error' });
        // TODO maybe clean form?
        this.loading = false;
      }
    },
  },
  apollo: {
    form: {
      query: require('./formGet.gql'),
      // TODO: hardcoded
      variables: { name: 'group_5e346c6a0dd36' },
      // variables: { name: 'group_5e2ad1559d459' },
      update({ form = { fields: [] } }) {
        return {
          ...form,
          fields: this.makeFields(form.fields || []),
        };
      },
    },
  },
};
</script>
