export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: {type: "author"}
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{type: "reference", to: {type: "category"}}]
    },
    {
      name: "mainfeaturedhome",
      title: "Main Featured on Home",
      type: "boolean",
      initialValue: false
    },
    {
      name: "subfeaturedhome",
      title: "Sub-Featured on Home",
      type: "boolean",
      initialValue: false
    },
    {
      name: "mainfeaturedcategory",
      title: "Main Featured on Category",
      type: "boolean",
      initialValue: false
    },
    {
      name: "subfeaturedcategory",
      title: "Sub Featured on Category",
      type: "boolean",
      initialValue: false
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "summary",
      title: "Summary",
      type: "string"
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'Quote', value: 'blockquote'}
          ],
        }
      ]
    },
    {
      name: "hook",
      title: "Short Hook",
      type: "string"
    },
    {
      name: "likes",
      title: "Likes",
      type: "number"
    }
  ],
  initialValue: {
    likes: 0
  },

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const {author} = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};
