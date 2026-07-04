import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { clearLocalAdminSession, getLocalAdminSession, supabase } from "@/integrations/supabase/client";

type Enquiry = {
  id: string;
  student_name: string;
  parent_name: string;
  grade: string;
  phone: string;
  email: string;
  message: string | null;
  status: string;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  created_at: string;
};

type Teacher = {
  id: string;
  name: string;
  subject: string;
  phone: string;
  email: string;
  status: "Active" | "On Leave" | "Resigned";
  created_at: string;
};

const schoolFacilities = [
  { title: "Nursery to Class VIII", body: "A full school pathway for young learners and growing students." },
  { title: "Library & Lab", body: "Reading spaces and science activities that support hands-on learning." },
  { title: "Playground", body: "Open space for sports, games, and healthy physical development." },
  { title: "Safe Campus", body: "A disciplined and secure environment for children and families." },
];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Admission Enquiries" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [contactRows, setContactRows] = useState<ContactMessage[] | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [teacherForm, setTeacherForm] = useState({ name: "", subject: "", phone: "", email: "", status: "Active" as Teacher["status"] });
  const [teacherMessage, setTeacherMessage] = useState<string | null>(null);

  const readTeachers = () => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("holyfaith-teachers");
    if (!saved) return [];

    try {
      return JSON.parse(saved) as Teacher[];
    } catch {
      return [];
    }
  };

  const writeTeachers = (nextTeachers: Teacher[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("holyfaith-teachers", JSON.stringify(nextTeachers));
  };

  const load = async () => {
    const [enquiryResult, contactResult] = await Promise.all([
      supabase.from("admission_enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);

    if (enquiryResult.error || contactResult.error) {
      const errorMessage = enquiryResult.error?.message || contactResult.error?.message || 'An unexpected error occurred.';
      setError(
        errorMessage.includes('policy') || errorMessage.includes('42501')
          ? 'Only authorised school staff can access this portal. Use the school-issued access key and try again.'
          : errorMessage,
      );
      setRows([]);
      setContactRows([]);
      return;
    }

    setRows(enquiryResult.data as Enquiry[]);
    setContactRows(contactResult.data as ContactMessage[]);
    setTeachers(readTeachers());
  };

  useEffect(() => {
    const localSession = getLocalAdminSession();
    if (localSession) {
      setEmail(localSession.email);
    } else {
      supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
    }
    load();
  }, []);

  const signOut = async () => {
    clearLocalAdminSession();
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("admission_enquiries").update({ status }).eq("id", id);
    if (!error) load();
  };

  const handleTeacherSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = teacherForm.name.trim();
    const trimmedSubject = teacherForm.subject.trim();
    const trimmedPhone = teacherForm.phone.trim();
    const trimmedEmail = teacherForm.email.trim();

    if (!trimmedName || !trimmedSubject || !trimmedPhone || !trimmedEmail) {
      setTeacherMessage("Please fill all teacher details before saving.");
      return;
    }

    const nextTeacher: Teacher = {
      id: `${Date.now()}`,
      name: trimmedName,
      subject: trimmedSubject,
      phone: trimmedPhone,
      email: trimmedEmail,
      status: teacherForm.status,
      created_at: new Date().toISOString(),
    };

    const nextTeachers = [nextTeacher, ...teachers];
    writeTeachers(nextTeachers);
    setTeachers(nextTeachers);
    setTeacherForm({ name: "", subject: "", phone: "", email: "", status: "Active" });
    setTeacherMessage("Teacher added to the school list.");
  };

  const removeTeacher = (id: string) => {
    const nextTeachers = teachers.filter((teacher) => teacher.id !== id);
    writeTeachers(nextTeachers);
    setTeachers(nextTeachers);
    setTeacherMessage("Teacher removed from the list.");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from("admission_enquiries").delete().eq("id", id);
    if (!error) load();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container-page flex items-center justify-between py-4">
          <div>
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
              Holy Faith School
            </Link>
            <h1 className="font-serif text-2xl font-semibold">School Admin Portal</h1>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <div>{email}</div>
            <button onClick={signOut} className="mt-1 text-foreground underline underline-offset-4">Sign out</button>
          </div>
        </div>
      </header>

      <main className="container-page py-10">
        {error && (
          <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <section className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-background p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.18em] text-primary">School management</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">Welcome to the Holy Faith School dashboard</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            View every admission application, all contact inquiries, and the main features the school offers from one secure place.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Classes offered</p>
              <p className="mt-2 text-xl font-semibold text-foreground">Nursery – Class VIII</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Campus location</p>
              <p className="mt-2 text-xl font-semibold text-foreground">Madli, Champawat</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Support contact</p>
              <p className="mt-2 text-xl font-semibold text-foreground">+91 85340 17345</p>
            </div>
          </div>
        </section>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Admission enquiries</p>
            <p className="mt-4 text-4xl font-semibold text-foreground">{rows?.length ?? 0}</p>
            <p className="mt-2 text-sm text-muted-foreground">Total submitted admissions forms.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Contact messages</p>
            <p className="mt-4 text-4xl font-semibold text-foreground">{contactRows?.length ?? 0}</p>
            <p className="mt-2 text-sm text-muted-foreground">Messages from the public contact form.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Facilities</p>
            <p className="mt-4 text-4xl font-semibold text-foreground">{schoolFacilities.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Highlights shown on the school portal.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Portal access</p>
            <p className="mt-4 text-4xl font-semibold text-foreground">Secure</p>
            <p className="mt-2 text-sm text-muted-foreground">Only verified school staff can view data.</p>
          </div>
        </div>

        <section className="mb-10 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-semibold">School facilities & highlights</h3>
              <p className="mt-1 text-sm text-muted-foreground">A quick view of what the school offers to students and parents.</p>
            </div>
            <Link
              to="/_authenticated/admissions-panel"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-2"
            >
              Open admissions panel
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {schoolFacilities.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-4">
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-semibold">Teacher list</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add new teachers or remove teachers who have left the school.</p>
            </div>
          </div>

          <form onSubmit={handleTeacherSubmit} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="block xl:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Teacher Name</span>
              <input
                type="text"
                value={teacherForm.name}
                onChange={(event) => setTeacherForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="e.g. Mr. Ravi Sharma"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Subject</span>
              <input
                type="text"
                value={teacherForm.subject}
                onChange={(event) => setTeacherForm((current) => ({ ...current, subject: event.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Math"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Phone</span>
              <input
                type="tel"
                value={teacherForm.phone}
                onChange={(event) => setTeacherForm((current) => ({ ...current, phone: event.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="8534017345"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Status</span>
              <select
                value={teacherForm.status}
                onChange={(event) => setTeacherForm((current) => ({ ...current, status: event.target.value as Teacher["status"] }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Resigned">Resigned</option>
              </select>
            </label>
            <label className="block xl:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Email</span>
              <input
                type="email"
                value={teacherForm.email}
                onChange={(event) => setTeacherForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="teacher@example.com"
              />
            </label>
            <div className="flex items-end xl:col-span-3">
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Add teacher
              </button>
            </div>
          </form>

          {teacherMessage && (
            <div className="mt-4 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-sm text-secondary">
              {teacherMessage}
            </div>
          )}

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background">
            {teachers.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No teachers added yet. Use the form above to add the first teacher.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-t border-border align-top">
                      <td className="px-4 py-3 font-medium">{teacher.name}</td>
                      <td className="px-4 py-3">{teacher.subject}</td>
                      <td className="px-4 py-3 text-xs">
                        <div>{teacher.phone}</div>
                        <div className="text-muted-foreground break-all">{teacher.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-xs font-medium text-secondary">
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => removeTeacher(teacher.id)} className="text-xs text-destructive hover:underline">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-2xl font-semibold">Admission Enquiries</h2>
          {rows === null ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No admission enquiries yet. Submissions from the public Admissions form will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Parent</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border align-top">
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium">{r.student_name}</td>
                      <td className="px-4 py-3">{r.grade}</td>
                      <td className="px-4 py-3">{r.parent_name}</td>
                      <td className="px-4 py-3 text-xs">
                        <div>{r.phone}</div>
                        <div className="text-muted-foreground">{r.email}</div>
                      </td>
                      <td className="px-4 py-3 max-w-xs text-xs text-muted-foreground">{r.message || "—"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="rounded border border-border bg-background px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="admitted">Admitted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => remove(r.id)} className="text-xs text-destructive hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold">Contact Form Messages</h2>
          {contactRows === null ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : contactRows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No contact messages yet. Submissions from the public contact form will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {contactRows.map((message) => (
                    <tr key={message.id} className="border-t border-border align-top">
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium">{message.name}</td>
                      <td className="px-4 py-3 text-xs">
                        <div>{message.phone}</div>
                        <div className="text-muted-foreground break-all">{message.email}</div>
                      </td>
                      <td className="px-4 py-3 max-w-xs text-xs text-muted-foreground">{message.message || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={async () => {
                            if (!confirm("Delete this contact message permanently?")) return;
                            const { error } = await supabase.from("contact_messages").delete().eq("id", message.id);
                            if (!error) load();
                          }}
                          className="text-xs text-destructive hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
