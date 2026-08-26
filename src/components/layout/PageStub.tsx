import { Container } from "@/components/layout/Container";

/**
 * A phase-1 placeholder so every header destination resolves.
 *
 * Deliberately unstyled beyond the type system, it must never be mistaken for
 * a finished page.
 */
export function PageStub({ title }: { title: string }) {
  return (
    <Container className="py-20 lg:py-28">
      <p className="text-eyebrow font-semibold uppercase text-ink-muted">
        Stran v pripravi
      </p>
      <h1 className="mt-4 text-heading text-ink">{title}</h1>
      <p className="mt-4 max-w-prose text-ink-muted">
        Ta stran bo zgrajena v naslednji fazi.
      </p>
    </Container>
  );
}
