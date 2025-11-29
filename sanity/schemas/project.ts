// Sanity schema (TypeScript/JS file for Sanity studio)
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'mainImage', title: 'Main image', type: 'image' },
  ]
}
