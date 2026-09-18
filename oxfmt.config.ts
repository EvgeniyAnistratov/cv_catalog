import { defineConfig } from "oxfmt";

export default defineConfig({
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    sortImports: {
        ignoreCase: true,
        newlinesBetween: true,
        partitionByNewline: false,
        customGroups: [
            {
                groupName: "my-project-alias-types",
                elementNamePattern: ["@/**"],
                modifiers: ["type"],
            },
            {
                groupName: "my-project-alias-values",
                elementNamePattern: ["@/**"],
                modifiers: ["value"],
            },
        ],
        groups: [
            "type-external",
            "value-external",

            "my-project-alias-types",
            "my-project-alias-values",

            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
        ],
    },
});
