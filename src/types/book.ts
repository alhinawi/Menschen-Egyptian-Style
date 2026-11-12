// Serialized book markup: the printed pages are stored as JSON triples
// [tag, attrs, children] (or plain strings) and rendered by BookMarkup.
export type MarkupAttrs = Record<string, string>;
export type MarkupNode = string | [string, MarkupAttrs, MarkupNode[]];

// One entry of src/lessons/manifest.json.
export interface LessonConfig {
  slug: string;
  title: string;
  reader?: boolean;
  themes?: boolean;
  styles: string[];
  /** Route used to load book.css; activates the absorbed book rules. */
  bookcss?: boolean;
  /** Route used to load batch.css; activates the absorbed batch rules. */
  batchcss?: boolean;
  /** Route used to load batch-l10-12.css; activates the absorbed rules. */
  l1012css?: boolean;
  /** Route used to load batch79.css; activates the absorbed rules. */
  l79css?: boolean;
  /** Route used to load l4-6.css; activates the absorbed rules. */
  l46css?: boolean;
  initializers: string[];
  bodyAttrs?: Record<string, string | string[]>;
  reactExercises?: boolean;
}
