import { v4 as uuidv4 } from "uuid";

function GeneratePrefixedUUID(prefix: string): string {
  if (prefix == "") {
    const prefixedUUID: string = uuidv4();
    return prefixedUUID;
  }
  // Generate a UUID (v4)
  const uuid: string = uuidv4();

  // Remove hyphens from the generated UUID
  const uuidWithoutHyphens: string = uuid.replace(/-/g, "");

  // Concatenate the prefix and truncated UUID
  const prefixedUUID: string = prefix + "_" + uuidWithoutHyphens;

  return prefixedUUID;
}

export { GeneratePrefixedUUID };
