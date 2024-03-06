import { useMemo, useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const isClient = typeof window === "object";

  const mediaQuery = useMemo(() => {
    return isClient ? window.matchMedia(query) : null;
  }, [query, isClient]);

  const [match, setMatch] = useState<boolean>(!!mediaQuery?.matches);

  useEffect(() => {
    if (!isClient || !mediaQuery) {
      return;
    }

    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mediaQuery, isClient]);

  return match;
}
