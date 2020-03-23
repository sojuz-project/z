<template>
  <div
    v-if="loginGuard"
    :class="['group', blockAttrs.className, blockAttrs.align ? `align-${blockAttrs.align}` : 'align-default']"
  >
    <!-- <pre>{{ form.fields }}</pre> -->
    <form v-if="form && form.fields" @submit.prevent="submit()">
      <h2 v-if="blockAttrs.title" class="form-title">{{ form.title }}</h2>
      <inner-block v-for="(block, i) in form.fields" :key="i" :blocks="block" />
      <div class="block wp-block-button aligncenter corebutton">
        <button :disabled="loading" class="has-text-color has-white-color has-default-background-color" type="submit">
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AcfForm',
  provide() {
    return {
      formData: () => this.updatedForm,
      updateData: this.updateData,
      getConditional: this.getConditionalShow,
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
  data() {
    return {
      fieldKeyNameMap: {},
      updatedForm: this.parseInitialFormdata(),
      loading: false,
    };
  },
  computed: {
    loginGuard() {
      let out = true;
      if (this.blockAttrs.loginOnly) {
        out = this.blockAttrs.loginOnly == this.isLogged ? true : false;
      }
      if (this.blockAttrs.logoutOnly) {
        out = this.blockAttrs.logoutOnly != this.isLogged ? true : false;
      }
      return out;
    },
  },
  methods: {
    filterReadOnly(formValues) {
      return this.form.fields
        .filter((field) => Boolean(field.attrs.readonly))
        .reduce((acc, curr) => {
          const { [curr.attrs.name]: readOnly, ...withoutReadOnly } = acc;
          return withoutReadOnly;
        }, formValues);
    },
    // pass formValues to make this function base on reactive data inside computed - to be also reactive on change any form value
    getConditionalShow(conditionals = [[]], formValues) {
      const operation = {
        '!=': (v1, v2) => v1 != v2,
        '==': (v1, v2) => v1 == v2,
      };

      return conditionals.some((
        conditionalOrs // conditional ors
      ) =>
        conditionalOrs.every(
          (
            conditional // conditional ands
          ) =>
            operation[conditional.operator] && // TODO - currenlty we dont handle all possible operators
            operation[conditional.operator](formValues[this.fieldKeyNameMap[conditional.field]], conditional.value)
        )
      );
    },
    parseInitialFormdata() {
      return this.$route.query.term
        ? {
            ...this.$route.query,
            term: this.$route.query.term.split(',').reduce((acc, curr) => {
              const [k, v] = curr.split('|');
              acc[k] = v;
              return acc;
            }, {}),
          }
        : this.$route.query;
    },
    updateData(value, fieldName, fieldNameInner) {
      this.updatedForm = {
        ...this.updatedForm,
        [fieldName]: fieldNameInner ? { ...this.updatedForm[fieldName], [fieldNameInner]: value } : value,
      };
    },
    makeFields(fields, name /* name for group 0 nested names*/) {
      return fields
        .filter((field) => !Boolean(field.hidden))
        .map((attrs) => ({
          blockName: [
            'text',
            'textarea',
            'select',
            'group',
            'date_time_picker',
            'taxonomy',
            'true_false',
            'repeater',
            'search',
          ].includes(attrs.type)
            ? `sojuzacf${attrs.type}`
            : 'sojuzacftext',
          attrs: { ...attrs, form: this.blockAttrs, ...(name && { name: `${name}_${attrs.name}` }) },
          innerBlocks: attrs.sub_fields ? this.makeFields(attrs.sub_fields, attrs.name) : [],
        }));
    },
    // submit() {
    //   this.$router.push({ query: this.updatedForm });
    // },
    async submit() {
      const formValuesToSend = this.updatedForm.term
        ? {
            ...this.updatedForm,
            term: Object.entries(this.updatedForm.term)
              .map(([k, v]) => `${k}|${v}`)
              .join(','),
          }
        : this.updatedForm;

      if (this.form.action === 'false') {
        const query = this.filterReadOnly(formValuesToSend);
        this.$router.push({
          query,
          path: this.blockAttrs.endpoint ? `/search/${this.blockAttrs.endpoint}` : '/search',
        });
        return;
      }

      try {
        this.loading = true;

        const { data, errors } = await this.$apollo.mutate({
          mutation: require('./formSubmit.gql'),
          variables: {
            action: this.form.action,
            fields: JSON.stringify(formValuesToSend),
          },
        });

        if (['login', 'register'].includes(data.form.cb)) {
          this.$loginHelpers.onLogin(data.form.data.token);
        } else {
          this.$updateToast({ msg: data.form.data.messages ?data.form.data.messages[0]:  data.form.messages[0], type: 'success' });
        }

        if (this.blockAttrs.endpoint) {
          this.$router.push({
            path: `/${this.blockAttrs.endpoint}`,
          });
        }
      } catch (e) {
        this.$updateToast({ msg: e.message, type: 'error' });
      } finally {
        // this.$updateToast({ msg: 'asdasdsad', type: 'error' });
        // TODO maybe clean form?
        this.loading = false;
      }
    },
  },

  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
    form: {
      query: require('./formGet.gql'),
      variables() {
        return { name: this.blockAttrs.form };
      },
      update({ form = { fields: [] } }) {
        this.fieldKeyNameMap = (form.fields || []).reduce((acc, curr) => {
          acc[curr.key] = curr.name;
          return acc;
        }, {});

        return {
          ...form,
          fields: this.makeFields(form.fields || []),
        };
      },
    },
  },
};
</script>
