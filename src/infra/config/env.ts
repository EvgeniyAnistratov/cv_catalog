import { z } from "zod";

import { envSchema } from "./env-schema";

const parsed = envSchema.safeParse(process.env);

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

export const env = parsed.data;
