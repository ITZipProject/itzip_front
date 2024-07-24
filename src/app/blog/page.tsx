import Link from 'next/link';
import React from 'react';

const BlogPage = () => {
  return (
    <div>
      <h1>BlogPage</h1>
      <Link href={'/blog/userblog'}>개인 블로그 가기</Link> <br />
      <Link href={'/blog/postwrite'}>블로그 작성하기</Link>
    </div>
  );
};

export default BlogPage;
