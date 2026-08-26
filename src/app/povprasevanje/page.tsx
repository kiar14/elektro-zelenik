import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";

const TITLE = "Brezplačna ponudba";

export const metadata: Metadata = { title: TITLE };

export default function Page() {
  return <PageStub title={TITLE} />;
}
