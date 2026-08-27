import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { processSteps } from "@/content/homepage";

/**
 * The homepage process band.
 *
 * The treatment itself now lives in `sections/ProcessSteps`, which every other
 * multi-step page on the site also renders through. This file supplies only the
 * homepage's own copy, so the design cannot drift between here and the service
 * pages: there is one implementation, used seven ways.
 */
export function ProcessSection() {
  return (
    <ProcessSteps
      id="postopek-naslov"
      eyebrow="Postopek"
      title="Kako poteka sodelovanje"
      steps={processSteps}
      surface="surface"
    />
  );
}
