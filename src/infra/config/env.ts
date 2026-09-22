import { z } from "zod";

import { envSchema } from "./env-schema";

export function validateEnv(config: Record<string, unknown>) {
    const parsed = envSchema.safeParse(config);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);

        const message = [
            ...flattened.formErrors,
            ...Object.entries(flattened.fieldErrors).flatMap(([field, errors]) =>
                errors.map((e) => `  - ${field}: ${e}`),
            ),
        ].join("\n");

        throw new Error(`Invalid environment variables:\n${message}\n`);
    }

    return parsed.data;
}
