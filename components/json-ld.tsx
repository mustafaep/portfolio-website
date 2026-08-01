/**
 * Serialises a typed schema object into a JSON-LD script tag.
 *
 * `<` is escaped so a value containing markup can never terminate the script
 * element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
