function headerBlock(text: string) {
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
function contextBlock(label: string, value: string) {
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
function sectionBlock(text: string, accessory: any) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: text,
    },
    accessory: accessory,
  };
}
export { sectionBlock, contextBlock, dividerBlock, headerBlock };
