import React from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import BlogHeader from 'components/BlogHeader';
import { getBlogBySlug, getAllBlogs } from 'lib/api';
import BlogContent from 'components/BlogContent';
import { urlFor } from 'lib/api';

// {
//   blog: { author, title, subtitle, date, coverImage, content },
// }

function BlogDetail({ blog }) {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog?.title}
            author={blog?.author}
            subtitle={blog?.subtitle}
            date={blog?.date}
            coverImage={urlFor(blog?.coverImage).width(920).url()}
          />
          <BlogContent content={blog?.content} />
        </Col>
      </Row>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);

  return {
    props: { blog },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map(blog => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
