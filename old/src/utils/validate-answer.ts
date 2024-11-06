function sanitize(inputs: string[]) {
  return inputs.map((item) =>
    item
      .replaceAll(" ", "")
      .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .toLowerCase(),
  );
}

interface ValidateAnswerInputs {
  userAnswer: string;
  answers: string[];
}

export function validateAnswer({ userAnswer, answers }: ValidateAnswerInputs): {
  isValid: boolean;
} {
  const [sanitizedInput] = sanitize([userAnswer]);
  const sanitizedAnswers = sanitize(answers);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (sanitizedAnswers.includes(sanitizedInput!)) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
}
