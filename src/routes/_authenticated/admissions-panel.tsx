import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export const Route = createFileRoute("/_authenticated/admissions-panel")({
  head: () => ({
    meta: [
      { title: "Admissions Panel — Holy Faith School" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdmissionsPanelPage,
});

function AdmissionsPanelPage() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("admission_enquiries").select("*").order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
      setRows([]);
      return;
    }
    setRows(data as Enquiry[]);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("admission_enquiries").update({ status }).eq("id", id);
    if (!error) load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this admission permanently?")) return;
    const { error } = await supabase.from("admission_enquiries").delete().eq("id", id);
    if (!error) load();
  };

  const totals = {
    total: rows?.length ?? 0,
    new: rows?.filter((row) => row.status === "new").length ?? 0,
    contacted: rows?.filter((row) => row.status === "contacted").length ?? 0,
    admitted: rows?.filter((row) => row.status === "admitted").length ?? 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container-page flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
              ← Back to school dashboard
            </Link>
            <h1 className="mt-2 font-serif text-2xl font-semibold">Admissions Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Track every application, update its progress, and prepare a report.</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-2"
          >
            Print report
          </button>
        </div>
      </header>

      <main className="container-page py-10">
        {error && (
          <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Total</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{totals.total}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">New</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{totals.new}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contacted</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{totals.contacted}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Admitted</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{totals.admitted}</p>
          </div>
        </div>

        {rows === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No admissions have been submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Parent</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-border align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{row.student_name}</td>
                    <td className="px-4 py-3">{row.parent_name}</td>
                    <td className="px-4 py-3">{row.grade}</td>
                    <td className="px-4 py-3 text-xs">
                      <div>{row.phone}</div>
                      <div className="text-muted-foreground">{row.email}</div>
                    </td>
                    <td className="px-4 py-3 max-w-xs text-xs text-muted-foreground">{row.message || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        onChange={(e) => updateStatus(row.id, e.target.value)}
                        className="rounded border border-border bg-background px-2 py-1 text-xs"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="admitted">Admitted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(row.id)} className="text-xs text-destructive hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
