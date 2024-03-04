import { useMediaQuery } from "@/hooks/use-media-query";

export function useMediaQueries() {
    const sm = useMediaQuery("(min-width: 640px)");
	const md = useMediaQuery("(min-width: 768px)");
	const lg = useMediaQuery("(min-width: 1024px)");

	return { sm, md, lg };
}
