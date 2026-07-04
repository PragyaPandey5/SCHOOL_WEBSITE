import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getLocalAdminSession, supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const localSession = getLocalAdminSession();
    if (localSession?.email) {
      return { user: { email: localSession.email } };
    }

    throw redirect({ to: "/auth" });
  },
  component: () => <Outlet />,
});
