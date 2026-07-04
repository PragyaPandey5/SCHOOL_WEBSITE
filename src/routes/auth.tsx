import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getLocalAdminSession, setLocalAdminSession, supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Staff Sign In — Holy Faith School' },
      { name: 'robots', content: 'noindex,nofollow' },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getLocalAdminSession()) {
      navigate({ to: '/admin' });
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: '/admin' });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: accessKey });
      if (!error) {
        setLocalAdminSession(email);
        navigate({ to: '/admin' });
        return;
      }

      throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid staff access key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background grid place-items-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <Link to="/" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-semibold">School Staff Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only authorised school staff can access the dashboard. Use the school-issued access key to view admissions, contact messages, and school updates.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Staff Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80">Staff Access Key</span>
            <input
              type="password"
              required
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>

          {error && <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? 'Please wait…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          Parents and other visitors cannot access the dashboard. If you are a teacher or staff member, use the issued key.
        </p>
      </div>
    </div>
  );
}
