<template>
  <Layout>
    <div class="book">
      <h2>
        <a>{{ $page.boltContent.extras.title }}</a>
      </h2>
      <p>contentType: {{ $page.boltContent.contentType}}</p>
        <div><small>{{ $page.boltContent.publishedAt }}</small></div>
        <div><small>By <span v-html="$page.boltContent.authorName" /></small></div>

      <div>
        <div class="img-wrapper">
            <g-image :src="$page.boltContent.extras.image.path" />
        </div>
    </div>

      <p>{{ $page.boltContent.extras.excerpt }}</p>
      <p>{{ $page.boltContent.body }}</p>

    </div>
  </Layout>
</template>

<page-query>
query Content ($id: String!){
  boltContent (id: $id) {
    id
    image (width: 720, height: 500, quality: 90)
    slug
    contentType
    status
    createdAt
    modifiedAt
    publishedAt
    depublishedAt
    authorName
    fieldValues {
        slug
        body
    }
    extras {
        title
        excerpt
        link
        image { alt, title, path, url }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Details'
  }
}
</script>

<style>
.book {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 0 15px 20px;
  margin: 20px 5px;
}
.img-wrapper {
  text-align: center;
}

.g-image {
    width: 100%;
}

.book-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>