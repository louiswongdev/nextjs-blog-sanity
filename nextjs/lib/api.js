import client from './sanity';
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

// generate image urls from Sanity image records
export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs({ offset } = { offset: 0 }) {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc){ ${blogFields}}[${offset}...${
      offset + 3
    }]`,
  );

  return results;
}

export async function getBlogBySlug(slug) {
  const query = `*[_type == "blog" && slug.current == $slug] {
    ${blogFields}
  }`;
  const params = { slug };
  const result = await client.fetch(query, params).then(res => res?.[0]);

  return result;
}
