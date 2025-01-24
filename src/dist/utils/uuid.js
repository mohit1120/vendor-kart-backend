"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePrefixedUUID = GeneratePrefixedUUID;
const uuid_1 = require("uuid");
function GeneratePrefixedUUID(prefix) {
    if (prefix == "") {
        const prefixedUUID = (0, uuid_1.v4)();
        return prefixedUUID;
    }
    // Generate a UUID (v4)
    const uuid = (0, uuid_1.v4)();
    // Remove hyphens from the generated UUID
    const uuidWithoutHyphens = uuid.replace(/-/g, "");
    // Concatenate the prefix and truncated UUID
    const prefixedUUID = prefix + "_" + uuidWithoutHyphens;
    return prefixedUUID;
}
