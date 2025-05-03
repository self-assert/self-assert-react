import React from "react";
import type { DraftAssistant } from "self-assert";

export interface ErrorMessageProps {
  draftAssistant: DraftAssistant;
  className?: string;
  renderErrors?: (messages: string[]) => React.ReactNode;
  as?: React.ElementType;
}

export function ErrorMessage({
  draftAssistant,
  className,
  renderErrors,
  as: Wrapper = "div",
}: ErrorMessageProps) {
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    draftAssistant.accept({
      onFailure: () => setErrors(draftAssistant.brokenRulesDescriptions()),
      onFailuresReset: () => setErrors([]),
    });
  }, [draftAssistant]);

  if (errors.length === 0) return null;

  return (
    <Wrapper className={className}>
      {renderErrors ? (
        renderErrors(errors)
      ) : (
        <ul>
          {errors.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}
