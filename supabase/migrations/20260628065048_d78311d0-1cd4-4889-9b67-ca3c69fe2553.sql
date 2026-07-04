
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admission enquiries
CREATE TABLE public.admission_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  parent_name text NOT NULL,
  grade text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.admission_enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.admission_enquiries TO authenticated;
GRANT ALL ON public.admission_enquiries TO service_role;

ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) may submit an enquiry.
CREATE POLICY "Anyone can submit an enquiry"
ON public.admission_enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(student_name) BETWEEN 2 AND 120
  AND length(parent_name) BETWEEN 2 AND 120
  AND length(grade) BETWEEN 1 AND 40
  AND length(phone) BETWEEN 7 AND 20
  AND length(email) BETWEEN 5 AND 200
  AND (message IS NULL OR length(message) <= 1000)
);

-- Only admins can read / manage submissions.
CREATE POLICY "Admins can view enquiries"
ON public.admission_enquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enquiries"
ON public.admission_enquiries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete enquiries"
ON public.admission_enquiries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
