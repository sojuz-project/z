/* 
  replace {{}} string from qglDate response 
*/
const regTemplate = (blocks, data) => {
  let template = JSON.stringify(blocks);
  const matches = {};
  (template.match(/\{\{([^\}]*)\}\}/gm) || []).forEach((el) => {
    const replaced = el
      .replace(/\{\{/g, '')
      .replace(/\}\}/g, '')
      .split('.');
    matches[el] = {
      path: replaced,
      value: get(replaced, data),
    };
    template = template
      .split(typeof matches[el].value === 'object' ? `"${el}"` : el)
      .join(typeof matches[el].value === 'object' ? JSON.stringify(matches[el].value) : matches[el].value);
  });
  return JSON.parse(template);
};

/* 
  deep search to replace with {{}} string 
*/
export const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

/* 
  parse url fullpath to exclude search 
*/
export const parseFilters = (r, attrs) => {
  const a =
    attrs['component-attrs'] && attrs['component-attrs'].filters
      ? attrs['component-attrs'].filters.map((el) => {
          // return { el: r.params[el] };
          return `${el}=${r.params[el]}`;
        })
      : '';
  const compAttrs = a ? a.join('&') : '';
  const url = (r.fullPath.split('?')[1] || '').replace(/(?:\/|\%2F)$/, '').replace(/([,=])[^%]*(?:\%7C|\|)/g, '$1');
  let join = '';
  if (compAttrs && url) {
    join = '&';
  }
  return compAttrs + join + url;
};

/* 
  get gqlResponse and build Gutenberg blocks 
  */
export const renderBlocksFromGqlRes = (gqlRes, blockAttrs, innerBlocks, r) => {
  return (Array.isArray(gqlRes) ? gqlRes : gqlRes ? [gqlRes] : []).map((dataPart) => {
    // console.log('log', blockAttrs.componentParentName);
    let blocks = {
      blockName: blockAttrs.componentItemName ? blockAttrs.componentItemName : 'coregroup',
      attrs: {
        align: blockAttrs.align,
        // className: this.blockAttrs.className,
        ...blockAttrs['component-attrs'],
      },
      innerBlocks: regTemplate(innerBlocks, { ...r.params, ...dataPart }),
    };

    return blocks;
  });
};

/* 
  render custom Gutenberg parent block 
  */
export const renderParentBlock = (blockAttrs, innerBlocks) => {
  return [
    {
      blockName: blockAttrs.componentParentName ? blockAttrs.componentParentName : 'coregroup',
      attrs: {
        align: blockAttrs.align,
        ...blockAttrs['component-attrs'],
      },
      innerBlocks: innerBlocks || [],
    },
  ];
};
