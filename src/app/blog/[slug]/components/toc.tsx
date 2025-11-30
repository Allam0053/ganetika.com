'use client';

import React from 'react';

import useScrollSpy from '@/hooks/useScrollspy';

import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';

import { BlogFrontmatter } from '@/types/frontmatters';


export default function TOC({ frontmatter }: { frontmatter: BlogFrontmatter }) {
  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  return <TableOfContents
    toc={toc}
    minLevel={minLevel}
    activeSection={activeSection}
  />
}