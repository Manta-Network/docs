/**
 * "createChunkDecoder" from Vercel AI package. Supports only so-called "simple" streams. Dk what complex streams are for.
 * @see https://github.com/vercel/ai/blob/fb799f1dc40b1d685395676b24561bbb21dd8b9d/packages/core/shared/utils.ts#L27
 */
function createChunkDecoder(): (chunk: Uint8Array | undefined) => string;
function createChunkDecoder(
  complex: false
): (chunk: Uint8Array | undefined) => string;
function createChunkDecoder() {
  const decoder = new TextDecoder();

  return function (chunk: Uint8Array | undefined): string {
    if (!chunk) return "";
    return decoder.decode(chunk, { stream: true });
  };
}

export { createChunkDecoder };
