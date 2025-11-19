// Utility functions for parsing PGN (Portable Game Notation) files.

// Expects strings of form [Key "Value"] before a blank line. Based on Chess.com PGN format. TODO: handle other PGN variants.

export type PgnHeaders = Record<string, string>;

export function parsePgnHeaders(pgn: string): PgnHeaders {
  const headers: PgnHeaders = {};

  // Isolate header section
  const [headerSection] = pgn.split(/\r?\n\r?\n/);

  if (!headerSection) return headers;

  const headerRegex = /^\[(\w+)\s+"([^"]*)"\]$/gm;

  let match: RegExpExecArray | null;
  while ((match = headerRegex.exec(headerSection)) !== null) {
    const [, key, value] = match;
    headers[key] = value;
  }

  return headers;
}
