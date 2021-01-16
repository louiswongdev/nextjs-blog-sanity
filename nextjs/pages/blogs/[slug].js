import React from 'react';
import PageLayout from 'components/PageLayout';
import BlogHeader from 'components/BlogHeader';
import { getBlogBySlug, getAllBlogs } from 'lib/api';
import { Col, Row } from 'react-bootstrap';
import BlogContent from 'components/BlogContent';
import { urlFor } from 'lib/api';

function BlogDetail({
  blog,
  blog: { author, title, subtitle, date, coverImage, content },
}) {
  console.log({ blog });
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={title}
            author={author}
            subtitle={subtitle}
            date={date}
            coverImage={urlFor(coverImage).width(920).url()}
          />
          <BlogContent content={content} />
        </Col>
      </Row>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);

  return {
    props: { blog },
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map(blog => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BlogDetail;
