<template>
  <div>
    <ul class="nav-v-list closed">
      <li v-for="(item, i) in get_orders" :key="i" class="flex">
        <div class="pad-15">{{ item.number }}</div>
        <div class="pad-15">{{ item.status }}</div>
        <div class="pad-15">{{ item.date_created }}</div>
        <div class="pad-15">{{ item.total }}</div>
        <div class="pad-15">
          <ul>
            <li v-for="(line, j) in item.line_items" :key="j" class="pad-05">
              {{ line.name }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      blocks: [],
    };
  },
  // computed: {
  //   items() {
  //     return this.get_orders && JSON.parse(this.get_orders);
  //   },
  // },
  apollo: {
    get_orders: {
      query: require('./getOrders.gql'),
      fetchPolicy: 'network-only',
    },
  },
};
</script>
<style></style>
