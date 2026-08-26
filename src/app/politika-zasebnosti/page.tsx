import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";

const TITLE = "Politika zasebnosti";

export const metadata: Metadata = { title: TITLE };

export default function Page() {
  return <PageStub title={TITLE} />;
}
