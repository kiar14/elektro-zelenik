import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";

const TITLE = "Subvencije";

export const metadata: Metadata = { title: TITLE };

export default function Page() {
  return <PageStub title={TITLE} />;
}
