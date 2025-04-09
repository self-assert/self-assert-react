import React from "react";
import type { FormCompletionAssistant } from "@self-assert/self-assert";

interface ErrorMessageProps {
  formCompletionAssistant: FormCompletionAssistant<unknown, unknown>;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ formCompletionAssistant }) => {
  if (!formCompletionAssistant.hasFailedAssertions()) return null;

  return (
    <div className="ui bottom attached negative message" role="alert" aria-live="polite">
      <ul>
        {formCompletionAssistant.failedAssertionsDescriptions().map((desc, key) => (
          <li key={key}>{desc}</li>
        ))}
      </ul>
    </div>
  );
};
