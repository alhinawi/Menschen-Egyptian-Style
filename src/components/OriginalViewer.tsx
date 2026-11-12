import type {ReactNode} from 'react';

/** The standalone scan routes share a frame, independent of reader styles. */
export function OriginalViewer({children}: {children: ReactNode}) {
  return <section className="originalViewer" aria-label="Originalbuch">{children}</section>;
}
