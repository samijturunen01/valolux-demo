import { Fragment, useRef } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = { text: string; className?: string; as?: 'h2' | 'p' };

/**
 * Headline whose letters switch on one after another like sign lettering when
 * it scrolls into view. Screen readers get the plain text.
 */
export function SignHeadline({ text, className = '', as: Tag = 'h2' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const on = useInView(ref, { threshold: 0.5 });
  let n = 0;
  return (
    <Tag ref={ref} className={`sign-headline ${on ? 'is-on' : ''} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && ' '}
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((ch) => {
                const i = n++;
                // a couple of letters take longer to "catch", like real tubes
                const stubborn = i === 3 || i === 13;
                return (
                  <span key={i} className={`sh-ch ${stubborn ? 'sh-stubborn' : ''}`} style={{ ['--i' as string]: i }}>
                    {ch}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
