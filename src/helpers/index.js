const DEFAULT_IMAGE = 'https://via.placeholder.com/300'

const mapMetas = (metas = []) => metas.reduce((acc, curr) => {
  acc[curr.meta_key] = curr.meta_value
  return acc
}, {})

export {
  mapMetas,
  DEFAULT_IMAGE
}
