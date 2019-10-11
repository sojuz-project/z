<template>
  <div>
    {{
      (Array.isArray(attrs.meta) ? attrs.meta : [])
        .filter((obj) => obj.meta_key === '_price')
        .map((obj) => obj.meta_value)
        .join()
    }}
  </div>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style>
/* https://raw.githubusercontent.com/danklammer/bytesize-icons/master/dist/icons/folder.svg */
</style>
