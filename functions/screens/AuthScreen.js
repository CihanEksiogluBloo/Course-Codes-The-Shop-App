export const inputChangeHandler = (
  change,
  FORM_INPUT_UPDATE,
  dispatchFormState,
  inputIdentifier,
  required,
  min,
  minLength,
  max
) => {
  let isValid = false;
  if (change.trim().length > 0) {
    isValid = true;
  } else if (
    required != null &&
    required == true &&
    change.trim().length === 0
  ) {
    isValid = false;
  } else if (required == null || required == undefined || required == false) {
    isValid = true;
  }
  if (minLength != null && change.length < minLength) {
    isValid = false;
  }
  if (min != null && +change < min) {
    isValid = false;
  }

  if (max != null && +change > max) {
    isValid = false;
  }

  if (inputIdentifier === "email") {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (inputIdentifier === "email" && !emailRegex.test(change.toLowerCase())) {
      isValid = false;
    }
  }

  dispatchFormState({
    type: FORM_INPUT_UPDATE,
    payload: change,
    isValid,
    input: inputIdentifier,
  });
};
