declare global {
  interface String {
    trimQuotes(): string;
  }
}

String.prototype.trimQuotes = function () {
  if (
    (this.startsWith('"') && this.endsWith('"')) ||
    (this.startsWith("'") && this.endsWith("'"))
  ) {
    // Remove the quotes
    return this.slice(1, -1) as string;
  }
  return this as string;
};

export const unEscapeJson = (text: string): string => {
  return text.trimQuotes().replace(/\\"/g, '"').replace(/\\\\/g, "\\");
};
