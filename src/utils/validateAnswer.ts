function sanitize(inputs: string[]) {
  return inputs.map((item) =>
    item
      .replaceAll(" ", "")
      .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .toLowerCase(),
  );
}

interface ValidateAnswerProps {
  userAnswer: string;
  answers: string[];
}

export function validateAnswer({ userAnswer, answers }: ValidateAnswerProps): {
  valid: boolean;
} {
  const [sanitizedInput] = sanitize([userAnswer]);
  const sanitizedAnswers = sanitize(answers);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (sanitizedAnswers.includes(sanitizedInput!)) {
    console.log("true");
    return { valid: true };
  }

  console.log("false");
  return { valid: false };
}
