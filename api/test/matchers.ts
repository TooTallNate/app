declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveValidationError(path: string, message?: string): R;
    }
  }
}

expect.extend({
  toHaveValidationError(recieved, path, expected = expect.any(String)) {
    let pass;
    const error = ((recieved.validateSync() || {}).errors || {})[path] || {};
    try {
      expect(error).toMatchObject({ message: expected });
      pass = true;
    } catch (_) {
      pass = false;
    }

    const options = {
      isNot: this.isNot,
      promise: this.promise
    };
    const errorMessage = pass
      ? () =>
          this.utils.matcherHint(
            "toHaveValidationError",
            undefined,
            undefined,
            options
          ) +
          "\n\n" +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(error.message)}`
      : () => {
          return (
            this.utils.matcherHint(
              "toHaveValidationError",
              undefined,
              undefined,
              options
            ) +
            "\n\n" +
            `Expected: ${this.utils.printExpected(expected)}\n` +
            `Received: ${this.utils.printReceived(error.message)}`
          );
        };
    return {
      pass,
      message: errorMessage
    };
  }
});

// This is required in order to augment Expect
export default null;
