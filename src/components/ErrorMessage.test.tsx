import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";
import { FieldDraftAssistant, RuleLabel } from "self-assert";

const firstHandledRule = new RuleLabel("handled.error", "An error description");
const secondHandledRule = new RuleLabel(
  "handled.error2",
  "Another error description"
);

const fieldAssistant = FieldDraftAssistant.handlingAll(
  [firstHandledRule.getId(), secondHandledRule.getId()],
  () => ""
);

describe("ErrorMessage", () => {
  beforeEach(() => {
    fieldAssistant.removeBrokenRules();
  });

  test("it should be empty if there are no errors", () => {
    const { container } = render(
      <ErrorMessage draftAssistant={fieldAssistant} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("it should render the error description when the draft has a broken rule", () => {
    render(<ErrorMessage draftAssistant={fieldAssistant} />);

    act(() => {
      fieldAssistant.addBrokenRule(firstHandledRule);
    });

    expect(screen.getByText("An error description")).toBeInTheDocument();
  });

  test("it should render the error descriptions when the draft has multiple broken rules", () => {
    render(<ErrorMessage draftAssistant={fieldAssistant} />);

    act(() => {
      fieldAssistant.addBrokenRules([firstHandledRule, secondHandledRule]);
    });

    expect(screen.getByText("An error description")).toBeInTheDocument();
    expect(screen.getByText("Another error description")).toBeInTheDocument();
  });
});
