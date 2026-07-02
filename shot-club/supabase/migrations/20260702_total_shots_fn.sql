-- Public aggregate function for the landing page shot counter
CREATE OR REPLACE FUNCTION public.get_total_shots()
RETURNS bigint
LANGUAGE sql
SECURITY INVOKER
STABLE
AS $$
  SELECT COALESCE(SUM(total_shots), 0) FROM sessions WHERE is_flagged = false;
$$;
