<template>
  <Layout>
    <div class="contents">
      <div class="content" v-for="content in $page.allBoltContent.edges" :key="content.node.id">
        <h2>
          <g-link :to="`content/${content.node.slug}`">{{ content.node.extras.title }}</g-link>
        </h2>

        <div>
        <div class="img-wrapper">
            <g-image :src="content.node.extras.image.url" />
        </div>

          <div>{{ content.node.extras.excerpt }}</div>
        </div>

        <div class="content-footer">
          <div><small>{{ content.node.publishedAt }}</small></div>
          <div><small>By <span v-html="content.node.authorName" /></small></div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allBoltContent {
    edges {
      node {
        id
        slug
        image (width: 320, height: 240, quality: 80)
        authorName
        fieldValues {
            slug
        }
        extras {
          title
          excerpt
          image { url }
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Showcase'
  },
  methods: {
    shortenText(text) {
      return text.slice(0,300) + '...'
    }
  }
}
</script>

<style scoped>
.contents {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.content {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 0 15px 20px;
  margin: 20px 5px;
  width: 300px;
}
.img-wrapper {
  width: 100%;
  text-align: center;
}
.img-wrapper img {
  height: 200px;
  width: 100%;
}
.content-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>