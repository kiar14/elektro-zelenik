"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Field } from "@/components/forms/Fields";
import { enquiryCategories } from "@/content/homepage";

/**
 * The homepage quick enquiry.
 *
 * There is no backend yet, so nothing here pretends to have sent anything.
 * The form validates, then carries what the visitor typed to `/povprasevanje`
 * as search params, so it starts the enquiry flow rather than faking the end
 * of one.
 */
const CATEGORY_VALUES = enquiryCategories.map((category) => category.value) as [
  (typeof enquiryCategories)[number]["value"],
  ...(typeof enquiryCategories)[number]["value"][],
];

const schema = z.object({
  ime: z.string().trim().min(2, "Vpišite svoje ime."),
  telefon: z
    .string()
    .trim()
    .min(6, "Vpišite telefonsko številko.")
    .regex(/^[0-9+()\s/-]+$/, "Uporabite le številke in znake + ( ) / -."),
  storitev: z.enum(CATEGORY_VALUES, "Izberite vrsto storitve."),
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
    <form noValidate onSubmit={onSubmit} className="grid gap-7">
      <div className="grid gap-6 sm:grid-cols-2">
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

      <fieldset>
        <legend className="text-base font-medium text-ink">
          Vrsta storitve
        </legend>

        <div className="mt-3 flex flex-wrap gap-2">
          {enquiryCategories.map((category) => (
            <label key={category.value} className="cursor-pointer">
              <input
                type="radio"
                value={category.value}
                className="peer sr-only"
                {...register("storitev")}
              />
              <span className="inline-flex min-h-11 items-center rounded-sm border border-border-strong bg-ground px-4 text-base text-ink-muted transition-colors duration-150 ease-standard peer-checked:border-brand-strong peer-checked:bg-brand-tint peer-checked:font-semibold peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-strong hover:border-ink-muted">
                {category.label}
              </span>
            </label>
          ))}
        </div>

        {errors.storitev?.message ? (
          <p role="alert" className="mt-2 text-base text-ink">
            {errors.storitev.message}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label
          htmlFor={`${fieldId}-sporocilo`}
          className="block text-base font-medium text-ink"
        >
          Sporočilo
        </label>
        <textarea
          id={`${fieldId}-sporocilo`}
          rows={4}
          placeholder="Na kratko opišite, kaj potrebujete."
          aria-invalid={errors.sporocilo ? true : undefined}
          aria-describedby={
            errors.sporocilo ? `${fieldId}-sporocilo-napaka` : undefined
          }
          className="mt-2.5 block w-full resize-y rounded-sm border border-border-strong bg-ground px-3.5 py-3 text-base text-ink transition-colors duration-150 ease-standard placeholder:text-ink-muted hover:border-ink-muted aria-invalid:border-ink"
          {...register("sporocilo")}
        />
        {errors.sporocilo?.message ? (
          <p
            id={`${fieldId}-sporocilo-napaka`}
            role="alert"
            className="mt-2 text-base text-ink"
          >
            {errors.sporocilo.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-solid inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm px-6 font-sans text-base font-semibold tracking-[-0.005em] transition-colors duration-150 ease-standard disabled:opacity-70 sm:justify-self-start"
      >
        Pošlji povpraševanje
        <ArrowRight aria-hidden className="size-[18px]" />
      </button>

      <p className="text-sm text-ink-muted">
        Podatke uporabimo samo za odgovor na vaše povpraševanje.
      </p>
    </form>
  );
}
