<template>
  <div class="container">
    <form @submit.prevent="submit()">
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button :disabled="loading" class="wp-block-button" type="submit">
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  middleware: 'isAuth',
  provide() {
    return {
      formData: () => ({ ...this.my_profile, ...this.updatedForm }),
      updateData: this.updateData,
    };
  },
  data() {
    return {
      updatedForm: {},
      loading: false,
      blocks: [
        {
          blockName: 'custominput',
          attrs: { fieldName: 'first_name', label: 'First name', required: 'true' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'last_name', label: 'Last name' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'email', label: 'Email address', required: 'true' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'avatar_url', label: 'Avatar url' },
        },
      ],
    };
  },
  apollo: {
    my_profile: {
      query: require('~/modules/forms/gql/myProfile.gql'),
    },
  },
  methods: {
    updateData(value, fieldName) {
      Object.assign(this.updatedForm, { [fieldName]: value });
    },
    submit() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: require('~/modules/forms/gql/updateProfile.gql'),
          variables: {
            user: {
              first_name: this.my_profile.first_name,
              last_name: this.my_profile.last_name,
              email: this.my_profile.email,
              // avatar_url: this.my_profile.avatar_url,
              ...this.updatedForm,
            },
          },
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
