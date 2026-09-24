import { GraphQLError, GraphQLFormattedError } from "graphql";

export function formatError(
    formattedError: GraphQLFormattedError,
    error: unknown,
): GraphQLFormattedError {
    const originalError = error instanceof GraphQLError ? error.originalError : error;

    if (originalError instanceof GraphQLError) {
        return { message: formattedError.message };
    }

    return { message: "Internal server error" };
}
