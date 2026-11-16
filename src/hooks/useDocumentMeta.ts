import { useEffect } from 'react';
import { notFoundMeta, pageMeta, type PageMeta } from '../content/seo';

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Keeps <title> and description in sync during client-side navigation. */
export function useDocumentMeta(path: string) {
  useEffect(() => {
    const meta: PageMeta = pageMeta.find((m) => m.path === path) ?? notFoundMeta;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
  }, [path]);
}
