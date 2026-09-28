import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Politika zasebnosti";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/politika-zasebnosti",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
