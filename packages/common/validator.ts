import { IFormQuestionBase } from "./formTypes";

export function validate(
  inputValue: string | undefined,
  validations: IFormQuestionBase["validations"]
): string | undefined {
  if (validations.required && !inputValue) {
    return "This field is required";
  }
  if (
    validations.minLength &&
    inputValue &&
    inputValue.length < validations.minLength
  ) {
    return `This field must be at least ${validations.minLength} characters long`;
  }
  if (
    validations.maxLength &&
    inputValue &&
    inputValue.length > validations.maxLength
  ) {
    return `This field must be at most ${validations.maxLength} characters long`;
  }
  if (validations.regEx && inputValue) {
    const regEx = new RegExp(validations.regEx);
    if (!regEx.test(inputValue)) {
      return "This field is invalid";
    }
  }
  return undefined;
}
