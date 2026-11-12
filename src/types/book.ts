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
  initializers: string[];
  bodyAttrs?: Record<string, string | string[]>;
  reactExercises?: boolean;
}
