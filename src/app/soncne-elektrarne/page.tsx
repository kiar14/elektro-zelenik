import type { Metadata } from "next";

import { PageStub } from "@/components/layout/PageStub";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Sončne elektrarne";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  path: "/soncne-elektrarne",
});

export default function Page() {
  return <PageStub title={TITLE} />;
}
