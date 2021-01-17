import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardListItem from 'components/CardListItem';
import CardItem from 'components/CardItem';
import { getAllBlogs } from 'lib/api';
import FilterMenu from 'components/FilterMenu';
import { useGetBlogs, useGetHello } from 'actions';

export default function Home({ blogs: initialData }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  });

  const { data: blogs, error } = useGetBlogs(initialData);

  if (!blogs) {
    return 'loading';
  }

  return (
    <PageLayout>
      <AuthorIntro />
      <FilterMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <Row className="mb-5">
        {blogs.map(({ title, subtitle, slug, date, coverImage, author }) =>
          filter.view.list ? (
            <Col key={`${slug}-list`} md="8">
              <CardListItem
                title={title}
                subtitle={subtitle}
                date={date}
                author={author}
                // slug={slug}
                link={{
                  href: '/blogs/[slug]',
                  as: `/blogs/${slug}`,
                }}
              />
            </Col>
          ) : (
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
          ),
        )}
      </Row>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs({ offset: 0 });
  return {
    props: {
      blogs,
    },
  };
}
