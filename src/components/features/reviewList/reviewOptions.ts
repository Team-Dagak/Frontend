export const REVIEW_OPTIONS = [
  { label: "뿌듯해요", value: "PROUD" },
  { label: "여유로웠어요", value: "RELAXED" },
  { label: "도전적이었어요", value: "CHALLENGING" },
] as const;

export type ReviewValue = typeof REVIEW_OPTIONS[number]["value"];

export const REVIEW_LABEL_MAP: Record<ReviewValue, string> = {
  PROUD: "뿌듯해요",
  RELAXED: "여유로웠어요",
  CHALLENGING: "도전적이었어요",
};