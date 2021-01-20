import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardListItem from 'components/CardListItem';
import CardItem from 'components/CardItem';
import { getPaginatedBlogs } from 'lib/api';
import FilterMenu from 'components/FilterMenu';
import { useSwrPagination } from 'actions/pagination';
import CardItemBlank from 'components/CardItemBlank';
import CardListItemBlank from 'components/CardListItemBlank';

export function BlogList({ data, filter, isLoadingMore, initialLoad }) {
  return data.map(({ title, subtitle, slug, date, coverImage, author }) =>
    filter.view.list ? (
      <Col key={`${slug}-list`} md="8">
        {isLoadingMore ? (
          <CardListItemBlank />
        ) : (
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
        )}
      </Col>
    ) : (
      <Col key={`${slug}-list`} md="4">
        {!initialLoad && isLoadingMore ? (
          <CardItemBlank />
        ) : (
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
        )}
      </Col>
    ),
  );
}

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  // flag to prevent useSWR data from overwriting SSG data when page first loads
  // otherwise, it may affect SEO (blog content won't be part of initial crawl page)
  const [initialLoad, setInitialLoad] = useState(true);

  const { data, size, setSize, endOfQuery, error } = useSwrPagination({
    filter,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  // data returned is multiple arrays inside an array of objects. Let's merge
  // that into a single array of objects
  const swrBlogData = data ? [].concat(...data) : [];

  function loadMorePages() {
    setSize(size + 1);
    setInitialLoad(false);
  }

  return (
    <PageLayout>
      <AuthorIntro />
      <FilterMenu
        filter={filter}
        setFlag={setInitialLoad}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <Row className="mb-5">
        <BlogList
          data={initialLoad ? blogs : swrBlogData}
          filter={filter}
          initialLoad={initialLoad}
          isLoadingMore={isLoadingMore}
        />
        {/* <BlogList data={swrBlogData || blogs} filter={filter} /> */}
      </Row>
      <Button
        // onClick={() => setSize(size + 1)}
        onClick={loadMorePages}
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
