import dynamic from 'next/dynamic';
import React from 'react';

import BlogPostContent from '@/components/blog/post/BlogPostContent';
import BlogPostHeader from '@/components/blog/post/BlogPostHeader';
import RelatedPosts from '@/components/blog/post/RelatedPosts';
import UserInfo from '@/components/blog/post/UserInfo';
import { BlogPostPageProps } from '@/types/blog/common';

const BlogPostActions = dynamic(() => import('@/components/blog/post/BlogPostActions'), {
  ssr: false,
});

const BlogPostComments = dynamic(() => import('@/components/blog/post/BlogPostComments'), {
  ssr: false,
});

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  const postId = parseInt(params.postSlug, 10);

  const postData = {
    category: { primary: '디자인&아트', secondary: '3D 모델링' },
    title: '서류 합격률을 높인 단 한가지 비법 : 현직 인터뷰',
    author: '짱구',
    date: '2024.06.16. 05:25',
    views: '252.2k',
    content: `
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules

___

---

***

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar

## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

## Images

![Minion](https://picsum.photos/seed/sh5era/519/519)
![Stormtroopocat](https://picsum.photos/seed/adsasda/519/519 "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://picsum.photos/seed/asgasf/519/519  "The Dojocat"

## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O

### [<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++

### [<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
    `,
    likes: 243,
  };

  const relatedPosts = [
    { id: '1', title: '천방지축 얼렁뚱땅 짱구의 하루1', date: '2024.07.01' },
    { id: '2', title: '천방지축 얼렁뚱땅 짱구의 하루2', date: '2024.07.02' },
    { id: '3', title: '천방지축 얼렁뚱땅 짱구의 하루3', date: '2024.07.03' },
    { id: '4', title: '천방지축 얼렁뚱땅 짱구의 하루4', date: '2024.07.04' },
  ];
  const userData = {
    name: '짱구',
    description:
      '열정적인 데브옵스 엔지니어로, 클라우드 인프라와 자동화에 깊은 관심을 가지고 있습니다. AWS, Google Cloud Platform, Azure 등 다양한 클라우드 플랫폼에서의 경험을 바탕으로, 효율적이고 확장 가능한 시스템 구축에 전문성을 갖추고 있습니다. 주요 기술 스택으로는 Kubernetes, Docker, Terraform, Ansible 등이 있으며, CI/CD 파이프라인 최적화와 마이크로서비스 아키텍처 설계에도 강점을 가지고 있습니다. 백엔드 개발에는 Spring과 Node.js를, 프론트엔드에는 React와 Next.js를 주로 사용합니다. 새로운 기술 습득과 지속적인 학습을 통해 더 나은 개발 문화와 시스템 운영 방식을 만들어가는 것이 목표입니다.',
    email: 'example123@gmail.com',
    profileImage: 'https://picsum.photos/seed/user/116/116',
  };

  return (
    <div className="mx-auto my-16 max-w-4xl px-4">
      <BlogPostHeader postData={postData} />
      <BlogPostContent content={postData.content} />
      <div className="mt-8">
        <BlogPostActions likes={postData.likes} />
      </div>
      <BlogPostComments postId={postId} />
      <RelatedPosts userName={userData.name} posts={relatedPosts} />
      <UserInfo {...userData} />
    </div>
  );
};

export default BlogPostPage;
