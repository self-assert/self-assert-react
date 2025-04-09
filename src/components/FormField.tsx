import React from "react";
import type { FormFieldCompletionAssistant } from "@self-assert/self-assert";
import { ErrorMessage } from "./ErrorMessage";

interface FormFieldProps {
  inputName: string;
  formCompletionAssistant: FormFieldCompletionAssistant<string, unknown>;
  labelText?: string;
  /** Defaults to true */
  showErrorMessage?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const FormField: React.FC<FormFieldProps> = ({
  labelText,
  inputName,
  formCompletionAssistant,
  showErrorMessage = true,
  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formCompletionAssistant.setModel(e.target.value);
  };

  return (
    <div className="field" {...otherProps.containerProps}>
      {labelText && <label htmlFor={inputName}>{labelText}</label>}
      <input
        type="text"
        id={inputName}
        name={inputName}
        value={formCompletionAssistant.getModel()}
        onChange={handleChange}
        {...otherProps.inputProps}
      />
      {showErrorMessage && <ErrorMessage formCompletionAssistant={formCompletionAssistant} />}
    </div>
  );
};
