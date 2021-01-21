import client, { previewClient } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
  title, 
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  coverImage,
  content[]{..., "asset": asset->}
`;

const builder = imageUrlBuilder(client);

// check which client to call depending on if we're in draft mode or not
const getClient = preview => (preview ? previewClient : client);

// generate image urls from Sanity image records
export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc){ ${blogFields}}`,
  );

  return results;
}

export async function getPaginatedBlogs(
  { offset = 0, date = 'desc' } = { offset: 0, date: 'desc' },
) {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date ${date}){ ${blogFields}}[${offset}...${
      offset + 3
    }]`,
  );

  return results;
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const query = `*[_type == "blog" && slug.current == $slug] {
    ${blogFields}
  }`;
  const params = { slug };
  const result = await currentClient
    .fetch(query, params)
    .then(res => (preview ? (res?.[1] ? res?.[1] : res[0]) : res?.[0]));

  return result;
}
