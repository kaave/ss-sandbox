import { render } from "@testing-library/react";
import Root from "./bootstrap";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Root />);
    expect(getByText(/Root\./i)).toBeInTheDocument();
  });
});
