<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">
    <template v-for="meta in parsedMetas">
      <div v-if="meta && meta.visible" :key="meta.key" class="inner-wrapper">
        <div v-if="meta.label">
          <b>{{ meta.label }}</b>
        </div>
        <div>
          <span class="meta-prefix">{{ blockAttrs.prefix }}</span>
          <span>{{ meta.value }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    parsedMetas: function() {
      const { metas, meta } = this.blockAttrs;
      if (typeof metas[meta] === 'string') {
        metas[meta] = [{ value: metas[meta], name: undefined }];
      }
      return Object.keys(metas[meta] || {}).map((key) => ({
        key,
        label: metas[meta][key]['name'],
        value: metas[meta][key]['value'],
        visible: metas[meta][key]['is_visible'] ? parseInt(metas[meta][key]['is_visible']) : 1,
      }));
    },
  },
};
</script>
