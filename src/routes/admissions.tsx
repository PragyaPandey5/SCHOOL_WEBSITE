import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2026–27 — Holy Faith School, Champawat" },
      { name: "description", content: "Admissions open 2026–27 at Holy Faith School, Madli, Champawat. Procedure, required documents and online enquiry form for Nursery to Class VIII." },
      { property: "og:title", content: "Admissions 2026–27 — Holy Faith School" },
      { property: "og:description", content: "Apply for Nursery to Class VIII admission for the 2026–27 session." },
    ],
  }),
  component: AdmissionsPage,
});

const procedure = [
  { step: "01", title: "Enquiry", body: "Fill the Admission Enquiry Form online or visit the school office in Madli, Champawat." },
  { step: "02", title: "Interaction", body: "An interaction or assessment may be conducted for eligible students based on the grade applied for." },
  { step: "03", title: "Selection", body: "Selected candidates will be informed directly by the school office." },
  { step: "04", title: "Confirmation", body: "Admission is confirmed after document verification and fee submission at the office." },
];

const documents = [
  "Birth Certificate (for new admissions)",
  "Previous Class Report Card",
  "Transfer Certificate (if applicable)",
  "Aadhaar Card (Student & Parent)",
  "Recent passport-size photographs",
];

const faqs = [
  {
    question: "When do admissions open?",
    answer: "Admissions for the 2026–27 academic session are currently open. Families can submit an enquiry form at any time and our office will guide them through the next steps.",
  },
  {
    question: "What classes are available?",
    answer: "Holy Faith School currently offers admission from Nursery to Class VIII. Parents can select the preferred class while filling the enquiry form.",
  },
  {
    question: "Do you conduct an interaction or test?",
    answer: "Depending on the grade and availability, an interaction or short assessment may be arranged for the child before confirmation of admission.",
  },
  {
    question: "What documents are needed?",
    answer: "Basic documents include the birth certificate, previous report card, transfer certificate if applicable, Aadhaar cards and recent passport-size photographs.",
  },
];

const enquirySchema = z.object({
  studentName: z.string().trim().min(2, "Please enter the student's name").max(80),
  parentName: z.string().trim().min(2, "Please enter the parent's name").max(80),
  grade: z.string().min(1, "Please select a class"),
  phone: z.string().trim().regex(/^[0-9 +\-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  message: z.string().trim().max(600).optional().or(z.literal("")),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const classes = [
  "Nursery", "LKG", "UKG",
  "Class I", "Class II", "Class III", "Class IV",
  "Class V", "Class VI", "Class VII", "Class VIII",
];

function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryForm>({ resolver: zodResolver(enquirySchema) });

  const onSubmit = async (data: EnquiryForm) => {
    setSubmitError(null);
    const { error } = await supabase.from("admission_enquiries").insert({
      student_name: data.studentName,
      parent_name: data.parentName,
      grade: data.grade,
      phone: data.phone,
      email: data.email,
      message: data.message || null,
    });
    if (error) {
      setSubmitError("We couldn't submit your enquiry. Please try again or call the school office.");
      toast.error("We couldn't submit your enquiry. Please try again or call the school office.");
      return;
    }
    setSubmitted(true);
    reset();
    toast.success("Your enquiry has been received. The school office will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Admissions · Session 2026–27"
        title="Apply for admission to Holy Faith School."
        subtitle="Holy Faith School invites applications for the academic session 2026–27 for Nursery to Class VIII. Fill the enquiry form below — our office will get in touch."
      />

      {/* Procedure */}
      <section className="container-page py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">A simple path</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">Admission Procedure</h2>
          </div>
          <div className="hidden rounded-full border border-border/70 bg-white/70 px-4 py-2 text-sm text-muted-foreground shadow-sm md:block">
            Guided in four easy steps
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {procedure.map((p) => (
            <div key={p.step} className="rounded-[1.5rem] border border-border/70 bg-white/80 p-6 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.3)] backdrop-blur transition hover:-translate-y-1">
              <span className="font-serif text-2xl font-semibold text-primary">{p.step}</span>
              <h3 className="mt-2 font-serif text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents + Fee note */}
      <section className="bg-surface-2 py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-border/70 bg-white/80 p-8 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.25)] backdrop-blur">
            <h2 className="font-serif text-2xl font-semibold">Documents Required</h2>
            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              {documents.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-secondary text-[10px] text-secondary-foreground">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-border/70 bg-white/80 p-8 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.25)] backdrop-blur">
            <h2 className="font-serif text-2xl font-semibold">Fee Structure</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              For detailed information regarding the fee structure for each
              class, parents may contact the school office directly. We will
              be happy to share the current fee schedule and any applicable
              concessions.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p><span className="font-semibold text-foreground">📞</span> +91 85340 17345</p>
              <p><span className="font-semibold text-foreground">✉</span> schoolholyfaith686@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-page">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Frequently asked questions</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">Common things parents ask before applying</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="rounded-[1.35rem] border border-border/70 bg-white/80 p-5 shadow-[0_16px_46px_-24px_rgba(15,23,42,0.24)] backdrop-blur">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="text-sm font-semibold text-foreground">{faq.question}</span>
                    <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-lg text-primary">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="container-page py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,_rgba(255,255,255,1)_0%,_rgba(248,244,232,0.92)_100%)] p-8 shadow-[0_20px_80px_-34px_rgba(15,23,42,0.35)] md:p-10">
          <h2 className="font-serif text-3xl font-semibold">Admission Enquiry Form</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Submit the form below and the school office will contact you. Fields marked with <span className="font-semibold text-destructive">*</span> are required.
          </p>

          {submitted && (
            <div className="mt-6 rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
              Thank you — your enquiry has been received. The school office will get in touch with you shortly.
            </div>
          )}
          {submitError && (
            <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Student's Full Name" required error={errors.studentName?.message}>
              <input
                {...register("studentName")}
                type="text"
                maxLength={80}
                className="form-input"
                placeholder="e.g. Aarav Pandey"
              />
            </Field>
            <Field label="Parent / Guardian Name" required error={errors.parentName?.message}>
              <input
                {...register("parentName")}
                type="text"
                maxLength={80}
                className="form-input"
                placeholder="e.g. Mr. Suresh Pandey"
              />
            </Field>
            <Field label="Class Applying For" required error={errors.grade?.message}>
              <select {...register("grade")} className="form-input" defaultValue="">
                <option value="" disabled>Select a class</option>
                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Phone Number" required error={errors.phone?.message}>
              <input
                {...register("phone")}
                type="tel"
                maxLength={15}
                className="form-input"
                placeholder="e.g. 8534017345"
              />
            </Field>
            <Field label="Email" required error={errors.email?.message} className="sm:col-span-2">
              <input
                {...register("email")}
                type="email"
                maxLength={120}
                className="form-input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Message (optional)" error={errors.message?.message} className="sm:col-span-2">
              <textarea
                {...register("message")}
                rows={4}
                maxLength={600}
                className="form-input"
                placeholder="Anything we should know about your child or your enquiry."
              />
            </Field>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_42px_-16px_rgba(146,64,14,0.75)] transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Submit Enquiry"}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Your details are securely sent to the school office. We will contact you on the phone or email you provided.
              </p>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
      <Toaster position="top-right" richColors />

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid var(--color-border);
          background-color: rgba(255,255,255,0.9);
          padding: 0.8rem 0.95rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          outline: none;
          box-shadow: inset 0 1px 2px rgba(15,23,42,0.03);
          transition: all 180ms ease;
        }
        .form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 18%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
