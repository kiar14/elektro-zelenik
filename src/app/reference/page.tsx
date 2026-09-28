import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Reference";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/reference",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
