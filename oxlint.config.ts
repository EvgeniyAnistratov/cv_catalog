import { defineConfig } from "oxlint";

export default defineConfig({
    ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/.data/**"],
    options: {
        typeAware: true,
        typeCheck: true,
    },
    rules: {
        "typescript/no-explicit-any": "error",
        "sort-imports": [
            "error",
            {
                ignoreDeclarationSort: true,
                ignoreMemberSort: true,
            },
        ],
    },
});
