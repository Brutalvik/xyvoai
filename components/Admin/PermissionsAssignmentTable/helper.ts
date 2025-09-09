/**
 * Add dashes back to a 32-character UUID string.
 * Example: "68e9f4d60c264410a87f7063f2390058"
 * → "68e9f4d6-0c26-4410-a87f-7063f2390058"
 */
export function addDashes(uuid: string): string {
  if (uuid.length !== 32) {
    throw new Error("Invalid UUID length for addDashes. Expected 32 chars.");
  }
  return (
    uuid.slice(0, 8) +
    "-" +
    uuid.slice(8, 12) +
    "-" +
    uuid.slice(12, 16) +
    "-" +
    uuid.slice(16, 20) +
    "-" +
    uuid.slice(20)
  );
}

// Helper: check if all children of a parent are selected
export const allChildrenSelected = (
  children: string[],
  selected: Set<string>
) => children.every((child) => selected.has(child));
