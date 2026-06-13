const keywords = [
  "help",
  "stalking",
  "harassment",
  "unsafe",
  "assault",
  "kidnap",
  "rape",
  "followed",
  "threat",
];

export const womenSafetyBoost = (description) => {
  const text = description.toLowerCase();

  return keywords.some((word) =>
    text.includes(word)
  );
};