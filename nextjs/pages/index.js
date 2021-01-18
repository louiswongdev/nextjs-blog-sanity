import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardListItem from 'components/CardListItem';
import CardItem from 'components/CardItem';
import { getPaginatedBlogs } from 'lib/api';
import FilterMenu from 'components/FilterMenu';
import { useGetBlogsPages } from 'actions/pagination';

export function BlogList({ data, filter }) {
  return data.map(({ title, subtitle, slug, date, coverImage, author }) =>
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
      <Col key={`${slug}-list`} md="4">
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
  );
}

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  // const { data: blogs, error } = useGetBlogs(initialData);

  if (!blogs) {
    return <h1>Loading</h1>;
  }

  const { data, size, setSize, endOfQuery } = useGetBlogsPages({ filter });
  // data returned is multiple arrays inside an array of objects. Let's merge
  // that into a single array of objects
  const swrBlogData = data ? [].concat(...data) : [];
  console.log('swrBlogData: ', swrBlogData);

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
        <BlogList data={swrBlogData || blogs} filter={filter} />
      </Row>
      <Button
        onClick={() => setSize(size + 1)}
        disabled={endOfQuery}
        size="lg"
        variant="outline-secondary"
      >
        {/* {isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More Blogs'} */}
        {!endOfQuery ? 'Load More' : 'End of Posts'}
      </Button>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getPaginatedBlogs({ offset: 0, date: 'desc' });
  return {
    props: {
      blogs,
    },
  };
}
