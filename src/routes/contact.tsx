import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Toaster } from "@/components/ui/sonner";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().regex(/^[0-9 +\-]{7,15}$/, "Enter a valid phone number"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type ContactForm = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Holy Faith School, Champawat" },
      { name: "description", content: "Contact Holy Faith School, Madli, Champawat, Uttarakhand. Phone, email and school office address for admission and general enquiries." },
      { property: "og:title", content: "Contact Holy Faith School" },
      { property: "og:description", content: "Reach the school office in Madli, Champawat, Uttarakhand." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setSubmitError(null);

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || null,
    });

    if (error) {
      setSubmitError("We couldn't submit your message. Please try again or contact us directly via phone or email.");
      toast.error("We couldn't submit your message. Please try again or contact us directly via phone or email.");
      return;
    }

    setSubmitted(true);
    reset();
    toast.success("Your message has been sent. The school office will reply shortly.");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Contact us"
        title="We'd love to hear from you."
        subtitle="For admission queries, school visits or any other questions, reach out through any of the channels below — or visit our office in Madli, Champawat."
      />

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon="📍" title="Address">
            Holy Faith School<br />
            Madli, Champawat<br />
            Uttarakhand, India
          </Card>
          <Card icon="📞" title="Phone">
            <a className="hover:text-primary" href="tel:+918534017345">+91 85340 17345</a><br />
            <span className="text-xs text-muted-foreground">Mon – Sat, 9 AM – 3 PM</span>
          </Card>
          <Card icon="✉" title="Email">
            <a className="break-all hover:text-primary" href="mailto:schoolholyfaith686@gmail.com">
              schoolholyfaith686@gmail.com
            </a>
          </Card>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-[1.75rem] border border-border/70 bg-white/80 p-8 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.25)] backdrop-blur">
            <h2 className="font-serif text-3xl font-semibold">Send us a message</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Use this form for general enquiries, admission questions, or school visit requests. Our team will reply shortly.
            </p>

            {submitted && (
              <div className="mt-6 rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
                Thank you — your message has been submitted. The school will contact you soon.
              </div>
            )}
            {submitError && (
              <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
              <Field label="Your name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  type="text"
                  maxLength={80}
                  className="form-input"
                  placeholder="e.g. Anjali Sharma"
                />
              </Field>
              <Field label="Email address" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  maxLength={120}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  maxLength={15}
                  className="form-input"
                  placeholder="e.g. 8534017345"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  maxLength={1000}
                  className="form-input"
                  placeholder="Write your question or comment here."
                />
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <a
              href="mailto:schoolholyfaith686@gmail.com?subject=General%20Enquiry"
              className="rounded-[1.5rem] border border-border bg-primary p-8 text-primary-foreground shadow-[0_16px_40px_-18px_rgba(146,64,14,0.8)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              <h3 className="font-serif text-2xl font-semibold">Email the office</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Drop us a message for admission queries, fee structure, or anything else.
              </p>
              <span className="mt-6 inline-flex text-sm font-semibold">Open mail app →</span>
            </a>
            <a
              href="tel:+918534017345"
              className="rounded-[1.5rem] border border-border bg-surface p-8 transition hover:-translate-y-0.5 hover:bg-surface-2"
            >
              <h3 className="font-serif text-2xl font-semibold">Call the school</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Speak directly to our office between 9 AM and 3 PM, Monday to Saturday.
              </p>
              <span className="mt-6 inline-flex text-sm font-semibold text-primary">+91 85340 17345 →</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="container-page">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <iframe
              title="Holy Faith School location, Champawat"
              src="https://www.google.com/maps?q=Champawat,+Uttarakhand&output=embed"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
      <Toaster position="top-right" richColors />

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid var(--color-border);
          background-color: rgba(255,255,255,0.92);
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

function Card({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-white/80 p-6 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.25)] backdrop-blur">
      <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-2xl">{icon}</div>
      <h3 className="mt-5 font-serif text-lg font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
