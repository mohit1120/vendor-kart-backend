"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionBlock = sectionBlock;
exports.contextBlock = contextBlock;
exports.dividerBlock = dividerBlock;
exports.headerBlock = headerBlock;
function headerBlock(text) {
    return {
        type: "header",
        text: {
            type: "plain_text",
            text: text,
            emoji: true,
        },
    };
}
/* -------------------------------------------------------------------------- */
/*                                Divider Block                               */
/* -------------------------------------------------------------------------- */
function dividerBlock() {
    return {
        type: "divider",
    };
}
/* -------------------------------------------------------------------------- */
/*                                Context Block                               */
/* -------------------------------------------------------------------------- */
function contextBlock(label, value) {
    return {
        type: "context",
        elements: [
            {
                type: "plain_text",
                text: `${label} : ${value}`,
                emoji: true,
            },
        ],
    };
}
/* -------------------------------------------------------------------------- */
/*                               Section Block                                */
/* -------------------------------------------------------------------------- */
function sectionBlock(text, accessory) {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: text,
        },
        accessory: accessory,
    };
}
