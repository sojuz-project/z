<template>
 <div>
    <div 
      v-if="!blocks.isSlider"  
      :class="['grid-section-wrapper']">
      <GridSection
        v-for="(section, i) in blocks.content"
        :key="i"
        :attrs="bocks"
        :section="section"
      />
    </div>
    <!-- <SliderWrapper v-if="blocks.isSlider" :attrs="attrs"/> -->
  </div>

</template>

<script>
import gql from 'graphql-tag';
export default {
  components: {
    GridSection: () => import(/* webpackChunkName: "gridcomponent" */'~/components/customBlocks/GridSection'),
    SliderWrapper: () => import(/* webpackChunkName: "slider" */'~/components/customBlocks/SliderWrapper'),
  },
  props: {
    blocks: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    skip() {
      // return this.attrs && !this.attrs.query
      return true
    }
  },
  // watch: {
  //   attrs: {
  //     deep: true,
  //     immediate: true,
  //     handler() {
  //       console.log("asaaasdasdsdsad")
  //       if (
  //         this.attrs && !this.attrs.query
  //       ) {

  //         console.log("sadsada")
  //       } else {
  //         // this.$apollo.queries.nonImportantValue.skip = false
  //                   // this.$apollo.queries.nonImportantValue.skip = false

  //       }
  //     }
  //   }
  // },
  apollo: {
    nonImportantValue: {
      skip() {
        return this.skip;
      },
      query() {
        return gql`
          ${this.attrs.query}
        `;
      },
      update(data) {
        // update content if is defined mapQL key
        this.attrs.template.map((section, i) => {
          section.map((component, j) => {
            if (component.mapQL.length) {
              if (data[Object.keys(data)[0]][i][component.mapQL[1]]) {
                // check if have key name to build arrts
                if (component.mapQL[0]) {
                  this.$set(
                    this.attrs.template[i][j].attrs,
                    component.mapQL[0],
                    data[Object.keys(data)[0]][i][component.mapQL[1]]
                  );
                } else {
                  this.$set(this.attrs.template[i][j], 'attrs', data[Object.keys(data)[0]][i][component.mapQL[1]]);
                }
                this.$set(this.attrs.template[i][j].attrs, 'mapQL', component.mapQL);
              } else {
                console.log(
                  `%c [${component.mapQL[1]}] key don't exist in datasource`,
                  'color: orange; font-weight: bold;'
                );
              }
            }
          });
        });
      },
    },
  },
};
</script>
<style src="styleBase/custom-blocks/grid-container.css"></style>

