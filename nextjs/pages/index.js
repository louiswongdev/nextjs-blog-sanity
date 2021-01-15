import { Row, Col } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardListItem from 'components/CardListItem';
import CardItem from 'components/CardItem';
import { getAllBlogs } from 'lib/api';

export default function Home({ blogs }) {
  console.log({ blogs });
  return (
    <PageLayout>
      <AuthorIntro />
      <hr />
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}

        {blogs.map(({ title, subtitle, slug, date, coverImage, author }) => (
          <Col key={slug} md="4">
            <CardItem
              title={title}
              subtitle={subtitle}
              date={date}
              image={coverImage}
              author={author}
              // slug={slug}
              link={{
                href: '/blogs/[slug]',
                as: `/blogs/${slug}`,
              }}
            />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs,
    },
  };
}
