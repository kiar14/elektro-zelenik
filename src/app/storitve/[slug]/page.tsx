import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageStub } from "@/components/layout/PageStub";
import { services } from "@/content/navigation";

/**
 * Phase-1 stubs for every service route the header can reach, generated from
 * the same content module the navigation is built from. Anything not in that
 * module is a 404 rather than an empty page.
 */
const SERVICE_ROUTES = services.filter((service) =>
  service.href.startsWith("/storitve/"),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_ROUTES.map((service) => ({
    slug: service.href.replace("/storitve/", ""),
  }));
}

function findService(slug: string) {
  return SERVICE_ROUTES.find(
    (service) => service.href === `/storitve/${slug}`,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: findService(slug)?.label ?? "Storitev" };
}

export default async function ServiceStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return <PageStub title={service.label} />;
}
