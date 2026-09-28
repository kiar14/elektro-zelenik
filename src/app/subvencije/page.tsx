import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Subvencije";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/subvencije",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
