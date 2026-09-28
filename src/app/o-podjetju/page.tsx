import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "O podjetju";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/o-podjetju",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
