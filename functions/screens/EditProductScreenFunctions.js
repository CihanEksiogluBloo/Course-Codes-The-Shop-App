export const titleChangeHandler = (
  change,
  FORM_INPUT_UPDATE,
  dispatchFormState,
  inputIdentifier,
) => {
  let isValid = false;
  if (change.trim().length > 0) {
    isValid = true;
  }
  dispatchFormState({
    type: FORM_INPUT_UPDATE,
    payload: change,
    isValid,
    input: inputIdentifier,
  });
};
