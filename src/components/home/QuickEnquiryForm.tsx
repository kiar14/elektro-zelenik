"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Field, Select, TextArea } from "@/components/forms/Fields";
import { enquiryOptions, type EnquiryValue } from "@/content/enquiry";

/**
 * The homepage quick enquiry.
 *
 * There is no backend yet, so nothing here pretends to have sent anything.
 * The form validates, then carries what the visitor typed to `/povprasevanje`
 * as search params, so it starts the enquiry flow rather than faking the end
 * of one.
 *
 * The service used to be a row of chips over a shortened list of five. Now that
 * the list is the full eight, chips would wrap to three rows and turn the
 * shortest form on the site into its tallest block, so the field is the same
 * native select the enquiry page uses: one tap on a phone, one keystroke on a
 * keyboard, and one row of height. The four fields sit on two rows, which is
 * what keeps this finishable in a few seconds.
 */
const VALUES = enquiryOptions.map((option) => option.value) as [
  EnquiryValue,
  ...EnquiryValue[],
];

const schema = z.object({
  ime: z.string().trim().min(2, "Vpišite svoje ime."),
  telefon: z
    .string()
    .trim()
    .min(6, "Vpišite telefonsko številko.")
    .regex(/^[0-9+()\s/-]+$/, "Uporabite le številke in znake + ( ) / -."),
  storitev: z.enum(VALUES, "Izberite vrsto storitve."),
  sporocilo: z
    .string()
    .trim()
    .max(600, "Sporočilo naj bo krajše od 600 znakov.")
    .optional(),
});

type QuickEnquiryValues = z.infer<typeof schema>;

export function QuickEnquiryForm() {
  const router = useRouter();
  const fieldId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickEnquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ime: "",
      telefon: "",
      storitev: "elektroinstalacije",
      sporocilo: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const params = new URLSearchParams(
      Object.entries(values).filter(([, value]) => Boolean(value)) as [
        string,
        string,
      ][],
    );
    router.push(`/povprasevanje?${params.toString()}`);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${fieldId}-ime`}
          label="Ime"
          error={errors.ime?.message}
          autoComplete="name"
          {...register("ime")}
        />
        <Field
          id={`${fieldId}-telefon`}
          label="Telefon"
          type="tel"
          inputMode="tel"
          error={errors.telefon?.message}
          autoComplete="tel"
          {...register("telefon")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          id={`${fieldId}-storitev`}
          label="Vrsta storitve"
          error={errors.storitev?.message}
          {...register("storitev")}
        >
          {enquiryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <TextArea
          id={`${fieldId}-sporocilo`}
          label="Sporočilo"
          rows={3}
          optional
          placeholder="Na kratko opišite, kaj potrebujete."
          error={errors.sporocilo?.message}
          {...register("sporocilo")}
        />
      </div>

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-solid inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-control px-6 font-sans text-base font-semibold tracking-[-0.005em] transition-colors duration-150 ease-standard disabled:opacity-70"
        >
          Pošlji povpraševanje
          <ArrowRight aria-hidden className="size-[18px]" />
        </button>

        <p className="max-w-[28ch] text-sm text-ink-muted">
          Podatke uporabimo samo za odgovor na vaše povpraševanje.
        </p>
      </div>
    </form>
  );
}
