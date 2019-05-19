// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async store => {
    const path = require('path')
    const { imageType } = require('gridsome/lib/graphql/types/image')
    const { data } = await axios.get('http://bolt-four.localhost/api/contents/')

    const contentType = store.addContentType({
      typeName: 'BoltContent',
      route: 'content/:slug'
    })

    contentType.addSchemaField('image', () => ({
      type: imageType.type,
      args: imageType.args,
      async resolve (node, args, context, info) {
        const value = path.join(__dirname, 'static', 'files', node.extras.image.filename)

        // console.log('value = ', value);

        try {
          result = await context.assets.add(value, args)
        } catch (err) {
          return null
        }

        if (result.isUrl) {
          return result.src
        }

        return {
          type: result.type,
          mimeType: result.mimeType,
          src: result.src,
          size: result.size,
          sizes: result.sizes,
          srcset: result.srcset,
          dataUri: result.dataUri
        }
      }
    }));

    for (const item of data['hydra:member']) {
      contentType.addNode({
        ...item,
        id: '' + item.id,
        slug: item.fieldValues.slug
      })
    }
  })
}
