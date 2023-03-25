function sanitize(input: string | string[]) {
  if (typeof input === 'string') {
    return input
      .replaceAll(' ', '')
      .replaceAll(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
      .toLowerCase();
  } else {
    return input.map((item) =>
      item
        .replaceAll(' ', '')
        .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .toLowerCase(),
    );
  }
}

export function checkAnswer(input: string, answers: string[]) {
  const sanitizedInput = sanitize(input);
  const sanitizedAnswers = sanitize(answers);

  if (typeof sanitizedInput === 'string') {
    if (sanitizedAnswers.includes(sanitizedInput)) {
      return true;
    } else {
      return false;
    }
  }
}
