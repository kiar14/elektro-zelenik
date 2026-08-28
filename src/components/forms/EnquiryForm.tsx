"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  CheckboxChips,
  Consent,
  Field,
  TextArea,
} from "@/components/forms/Fields";
import { company } from "@/content/company";
import {
  conditionalQuestion,
  enquiryOptions,
  type EnquiryValue,
} from "@/content/enquiry";

/**
 * The site's enquiry form.
 *
 * Two shapes, one implementation, and they are now genuinely different jobs
 * rather than one form with a field hidden.
 *
 * `variant="kontakt"` is a message, not a brief: name, phone, email, message.
 * It carried a service dropdown, which asked a visitor to classify their own
 * question before they were allowed to ask it. That has gone.
 *
 * `variant="povprasevanje"` is the brief, and a real job is often more than one
 * of the seven: an objekt that needs elektroinštalacije usually also needs the
 * omrežje pulled at the same time. The service field is therefore a set of
 * checkboxes, so a visitor can say so in one pass instead of sending two
 * enquiries or picking whichever one felt most important.
 *
 * IMPORTANT: there is no backend yet, and nothing here pretends otherwise.
 * A valid submission does not claim to have sent anything. It hands the visitor
 * the two paths that do work today: the phone, and a mail client opened with
 * everything they typed already in it. Wiring this to a route handler is the
 * next phase; when that happens, only `onSubmit` changes.
 */

const VALUES = enquiryOptions.map((option) => option.value) as [
  EnquiryValue,
  ...EnquiryValue[],
];

/**
 * One shape, two rule sets.
 *
 * Both schemas declare exactly the same keys, so they infer the same type and
 * the form needs no cast to switch between them. The only difference is that
 * the brief requires at least one service and the contact form does not ask for
 * any, which is a validation rule rather than a different set of fields.
 */
const contactSchema = z.object({
  storitve: z.array(z.enum(VALUES)),
  kraj: z.string().trim().max(80, "Kraj naj bo krajši od 80 znakov.").optional(),
  podrobnost: z
    .string()
    .trim()
    .max(300, "Odgovor naj bo krajši od 300 znakov.")
    .optional(),
  ime: z.string().trim().min(2, "Vpišite svoje ime."),
  telefon: z
    .string()
    .trim()
    .min(6, "Vpišite telefonsko številko.")
    .regex(/^[0-9+()\s/-]+$/, "Uporabite le številke in znake + ( ) / -."),
  email: z
    .union([z.literal(""), z.email("Vpišite veljaven e-naslov.")])
    .optional(),
  sporocilo: z
    .string()
    .trim()
    .max(1200, "Sporočilo naj bo krajše od 1200 znakov.")
    .optional(),
  soglasje: z.literal(true, "Za oddajo potrebujemo vaše soglasje."),
});

const enquirySchema = contactSchema.extend({
  storitve: z.array(z.enum(VALUES)).min(1, "Izberite vsaj eno storitev."),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

export interface EnquiryDefaults {
  storitve?: readonly EnquiryValue[];
  ime?: string;
  telefon?: string;
  sporocilo?: string;
}

export function EnquiryForm({
  variant = "povprasevanje",
  defaults,
}: {
  variant?: "kontakt" | "povprasevanje";
  defaults?: EnquiryDefaults;
}) {
  const fieldId = useId();
  const detailed = variant === "povprasevanje";
  const [submitted, setSubmitted] = useState<EnquiryValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(detailed ? enquirySchema : contactSchema),
    defaultValues: {
      storitve: defaults?.storitve ? [...defaults.storitve] : [],
      ime: defaults?.ime ?? "",
      telefon: defaults?.telefon ?? "",
      email: "",
      kraj: "",
      podrobnost: "",
      sporocilo: defaults?.sporocilo ?? "",
      soglasje: false as unknown as true,
    },
  });

  // `useWatch` rather than the `watch()` function: it subscribes this one
  // component to this one field, and unlike `watch()` it returns a value the
  // React Compiler can reason about.
  const selected = useWatch({ control, name: "storitve" });

  /**
   * The follow-up question survives multi-select, but only where it still has
   * one unambiguous answer. Asking "gre za novogradnjo ali obstoječi objekt"
   * makes sense for a single service and becomes a guess the moment three are
   * ticked, so it appears only when exactly one is chosen.
   */
  const followUp =
    detailed && selected?.length === 1
      ? conditionalQuestion[selected[0]]
      : undefined;

  const onSubmit = handleSubmit((values) => setSubmitted(values));

  if (submitted) {
    return (
      <PendingDelivery
        values={submitted}
        followUp={followUp}
        detailed={detailed}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6">
      {detailed ? (
        <CheckboxChips
          id={`${fieldId}-storitve`}
          legend="Katere storitve vas zanimajo?"
          hint="Izberete lahko več storitev."
          options={enquiryOptions}
          error={errors.storitve?.message}
          {...register("storitve")}
        />
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${fieldId}-ime`}
          label="Ime"
          autoComplete="name"
          error={errors.ime?.message}
          {...register("ime")}
        />
        <Field
          id={`${fieldId}-telefon`}
          label="Telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.telefon?.message}
          {...register("telefon")}
        />
      </div>

      <div className={detailed ? "grid gap-6 sm:grid-cols-2" : undefined}>
        <Field
          id={`${fieldId}-email`}
          label="E-pošta"
          type="email"
          inputMode="email"
          autoComplete="email"
          optional
          error={errors.email?.message}
          {...register("email")}
        />

        {detailed ? (
          <Field
            id={`${fieldId}-kraj`}
            label="Kraj"
            autoComplete="address-level2"
            optional
            error={errors.kraj?.message}
            {...register("kraj")}
          />
        ) : null}
      </div>

      {followUp ? (
        <Field
          id={`${fieldId}-podrobnost`}
          label={followUp}
          optional
          error={errors.podrobnost?.message}
          {...register("podrobnost")}
        />
      ) : null}

      <TextArea
        id={`${fieldId}-sporocilo`}
        label="Sporočilo"
        rows={detailed ? 6 : 5}
        optional
        placeholder="Na kratko opišite, kaj potrebujete."
        error={errors.sporocilo?.message}
        {...register("sporocilo")}
      />

      <Consent
        id={`${fieldId}-soglasje`}
        error={errors.soglasje?.message}
        {...register("soglasje")}
      >
        Strinjam se, da podatke uporabite za odgovor na to povpraševanje. Več v{" "}
        <Link
          href="/politika-zasebnosti"
          className="font-medium text-brand-strong underline underline-offset-4"
        >
          politiki zasebnosti
        </Link>
        .
      </Consent>

      {/* The label names what is actually being sent. Kontakt is a message,
          /povprasevanje is a brief, and calling both of them the same thing
          would tell the visitor on Kontakt that they are committing to more
          than they are. */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-solid inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-control px-7 font-sans text-base font-semibold tracking-[-0.005em] transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:-translate-y-px active:translate-y-0 disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:justify-self-start"
      >
        {detailed ? "Pošlji povpraševanje" : "Pošlji sporočilo"}
        <ArrowRight aria-hidden className="size-[18px]" />
      </button>
    </form>
  );
}

/**
 * What happens after a valid submission, today.
 *
 * Automatic delivery is not connected yet, so this says so plainly instead of
 * showing a confirmation that would not be true. The two routes offered here
 * both genuinely work: the phone, and a prefilled mail draft carrying every
 * answer the visitor gave, so nothing they typed is lost.
 */
function PendingDelivery({
  values,
  followUp,
  detailed,
}: {
  values: EnquiryValues;
  followUp?: string;
  detailed: boolean;
}) {
  const labels = (values.storitve ?? []).map(
    (value) =>
      enquiryOptions.find((option) => option.value === value)?.label ?? value,
  );

  const subject = detailed
    ? `Povpraševanje: ${labels.join(", ") || "splošno"}`
    : `Sporočilo s spletne strani, ${values.ime}`;

  const lines = [
    detailed && labels.length ? `Storitve: ${labels.join(", ")}` : null,
    `Ime: ${values.ime}`,
    `Telefon: ${values.telefon}`,
    values.email ? `E-pošta: ${values.email}` : null,
    values.kraj ? `Kraj: ${values.kraj}` : null,
    followUp && values.podrobnost ? `${followUp} ${values.podrobnost}` : null,
    values.sporocilo ? `\nSporočilo:\n${values.sporocilo}` : null,
  ].filter(Boolean) as string[];

  const mailto = `mailto:${company.email.primary}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;

  return (
    <div role="status" className="grid gap-5">
      <div>
        <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
          Povzetek je pripravljen
        </h3>
        <p className="mt-3 max-w-prose text-base text-ink-muted">
          Samodejno pošiljanje s te strani še ni vzpostavljeno, zato vašega
          sporočila nismo prejeli. Da vaš vnos ne bi bil izgubljen, ga lahko
          takoj pošljete po e-pošti ali nas pokličete.
        </p>
      </div>

      <dl className="grid gap-2 rounded-md border border-border bg-surface px-4 py-4 text-base">
        {lines.map((line) => (
          <dd key={line} className="whitespace-pre-line text-ink-muted">
            {line}
          </dd>
        ))}
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={mailto}
          className="btn-solid inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-control px-7 font-sans text-base font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:-translate-y-px active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Mail aria-hidden className="size-[18px]" />
          Pošlji po e-pošti
        </a>
        <a
          href={company.phone.href}
          className="btn-outline inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-control px-7 font-sans text-base font-semibold transition-[background-color,border-color,box-shadow,transform] duration-200 ease-smooth hover:-translate-y-px active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Phone aria-hidden className="size-[18px] text-brand-strong" />
          {company.phone.display}
        </a>
      </div>
    </div>
  );
}
