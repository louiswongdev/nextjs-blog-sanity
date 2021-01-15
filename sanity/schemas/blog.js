export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule =>
        Rule.required().min(5).error('Title must be more than 5 characters'),
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Description',
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Description',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        {
          type: 'code',
          options: {
            withFilename: true,
          },
        },
      ],
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: Rule => Rule.required(),
    },
  ],
};
