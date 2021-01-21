import { getBlogBySlug } from 'lib/api';

export default async function enablePreview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const blog = await getBlogBySlug(req.query.slug, true);
  if (!blog) {
    return res.status(401).json({ message: 'Invalid Slug' });
  }

  // setPreviewData will set cookies into you browsert
  // __prerender_bypass __next_preview_data
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/blogs/${blog.slug}` });
  res.end();
}
