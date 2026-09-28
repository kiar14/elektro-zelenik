import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Kontakt";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/kontakt",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
