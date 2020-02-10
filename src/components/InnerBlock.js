/* eslint-disable complexity */
import { modules } from 'sojuzProject/nuxt.modules.js';

export default {
  functional: true,
  name: 'InnerBlock',
  props: {
    blocks: {
      type: Object,
      default: () => ({}),
    },
  },
  // eslint-disable-next-line react/display-name
  render: function(
    h,
    {
      props: {
        blocks: {
          blockName: initialBlockName = '',
          blockAttrs = {},
          attrs = blockAttrs,
          innerBlocks = [],
          innerHTML = null,
        } = {},
      },
    }
  ) {
    const isWrapper = initialBlockName.includes('wrapper');
    const blockName = attrs.wrapperType
      ? 'query'
      : isWrapper && attrs.tagName && modules[attrs.tagName]
      ? attrs.tagName
      : initialBlockName.replace(/[\/-]/g, '');

    // if (blockName === 'sojuzacfform') {
    //   console.log(blockName, attrs, blockAttrs);
    // }

    const BlockComponent = modules[blockName];

    return BlockComponent ? (
      <BlockComponent
        class={`block ${blockName}`}
        innerHtml={isWrapper ? null : innerHTML}
        blockAttrs={Object.assign({ style: '', className: '' }, attrs, blockAttrs)}
        innerBlocks={blockName == 'sojuzgraphquery' ? innerBlocks : null}
        scopedSlots={{
          default: () => innerBlocks.map((block, i) => <InnerBlock key={i} blocks={block} />),
        }}
      />
    ) : null;
  },
};
