function sanitize(input: string | string[]) {
  if (typeof input === "string") {
    return input
      .replaceAll(" ", "")
      .replaceAll(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
      .toLowerCase();
  } else {
    return input.map((item) =>
      item
        .replaceAll(" ", "")
        .replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
    );
  }
}

export function checkAnswer(input: string, answers: string[]) {
  const sanitizedInput = sanitize(input);
  const sanitizedAnswers = sanitize(answers);

  console.log("The answer input was: ", sanitizedInput);
  console.log("The posible answers were: ", sanitizedAnswers);

  if (typeof sanitizedInput === "string") {
    if (sanitizedAnswers.includes(sanitizedInput)) {
      console.log("✅ An answer was correct");
      return true;
    } else {
      console.log("❌ An answer was incorrect");
      return false;
    }
  }
}
