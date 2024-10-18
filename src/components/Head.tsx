import { useEffect } from 'react';
import { HeadProps } from './types';

export function Head(props: HeadProps) {
  useEffect(() => {
    document.title = `${props.title} | Trabalhos Artesanais`;

    const metaTag = document.querySelector("meta[name='description']");
    metaTag?.setAttribute(
      'content',
      `Transforme a maneira como você gerencia seus projetos com esse aplicativo de organização de trabalhos. ${props.description}`
    );
  }, [props]);

  return <></>;
}
