// Contracts between the React shell and the legacy lesson services.
export interface QuizOptions {
  rejectBlank?: boolean;
  radioTargets?: boolean;
  lessonOne?: boolean;
  speakerAnswers?: number[];
  verbState?: Record<string, boolean>;
  beforeVerbToggle?: (el: HTMLElement) => boolean;
  saveVerbSelection?: (index: number, selected: boolean) => void;
}

export interface ExerciseRuntime {
  options: QuizOptions;
  commitResult: (host: {dataset: {key?: string}}, ok: boolean) => void;
}

export interface PersistenceRuntime {
  getState(): Record<string, unknown>;
  update(updates: Record<string, unknown>, clearKey?: string): void;
}

export interface LessonMountResult {
  exercise?: ExerciseRuntime;
  persistence?: PersistenceRuntime;
  dispose?: () => void;
}

export type LessonInitializer = () => LessonMountResult | (() => void) | void;

// mountLesson returns a disposer annotated with the runtimes the mounted
// services exposed, so the React stores can connect to them.
export interface LessonDispose {
  (): void;
  exercise?: ExerciseRuntime;
  persistence?: PersistenceRuntime;
}
