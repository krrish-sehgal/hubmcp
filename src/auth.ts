export function getTokenFromBearerAuth(
  authorizationHeader: string | undefined
): string | undefined {
  const authParts = authorizationHeader?.split(" ");
  if (authParts?.length !== 2 || authParts[0] !== "Bearer") {
    return undefined;
  }
  return authParts[1];
}

export function getTokenFromQueryParam(
  tokenParam: string | undefined
): string | undefined {
  if (!tokenParam || tokenParam.trim().length === 0) {
    return undefined;
  }
  return tokenParam;
}

export function getApiToken(
  authorizationHeader: string | undefined,
  tokenQueryParam: string | undefined
): string | undefined {
  // Try query parameter first, then fall back to bearer auth
  return (
    getTokenFromQueryParam(tokenQueryParam) ||
    getTokenFromBearerAuth(authorizationHeader)
  );
}
