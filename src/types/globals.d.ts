export {};

declare global {
  interface Window {
    // Legacy lesson services publish their registries on `window`
    // (phrase glossaries, pronunciation indexes, audio maps, the page-flip
    // book controller). Typed per-service declarations replace this index
    // signature as each service is ported to React.
    [key: string]: any;
  }
}
