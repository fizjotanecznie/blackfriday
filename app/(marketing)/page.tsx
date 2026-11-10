import VideoPlayer from "@/components/VideoPlayer";

/**
 * Konfiguracja treści i wideo (placeholdery gotowe do podmiany)
 */
const CONFIG = {
  logoSrc: "/logo.png",
  logoAlt: "fizjotanecznie",
  heading: "ZOBACZ, JAK WYGLĄDA TRENING DLA TANCERZY",
  ctaText: "Dołącz do platformy",
  ctaUrl: "#dolacz", // [URL_CTA]
  microcopy: "Nowy trening co tydzień · anulujesz w każdej chwili",

  // Wybierz "embed" (Wariant B: fasada YouTube/Vimeo/Bunny) lub "mp4" (Wariant A: natywny plik MP4 z CDN)
  videoVariant: "embed" as "embed" | "mp4",
  videoSourceMp4: "https://twoj-cdn.pl/trening-przykladowy.mp4", // [ŹRÓDŁO_WIDEO] dla Wariantu A
  videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // [ŹRÓDŁO_WIDEO] dla Wariantu B
  videoPoster: "/poster-placeholder.svg", // [OKŁADKA_1280x720] – docelowo ścieżka do pliku .webp / .avif

  privacyUrl: "/polityka-prywatnosci",
  termsUrl: "/regulamin",
};

function CtaButton() {
  return (
    <a
      href={CONFIG.ctaUrl}
      className="group inline-flex min-h-[60px] w-full max-w-[400px] items-center justify-center gap-3 rounded-xl bg-brand px-8 py-4 text-center text-[20px] font-extrabold uppercase tracking-wide text-white shadow-[0_0_32px_rgba(228,22,121,0.55)] ring-1 ring-inset ring-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_0_44px_rgba(228,22,121,0.8)] active:translate-y-0 active:scale-[0.98] active:bg-brand-active focus:outline-none focus-visible:ring-4 focus-visible:ring-white sm:min-h-[64px] sm:w-auto sm:min-w-[360px] sm:px-10 sm:text-[21px]"
    >
      <span>{CONFIG.ctaText}</span>
      <span
        aria-hidden="true"
        className="text-[22px] leading-none transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-[1060px] flex-col items-center justify-between px-5 pt-5 pb-6 sm:px-6 sm:pt-8 sm:pb-8">
      <div className="flex w-full flex-col items-center">
        {/* [logo – małe, opcjonalne] */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CONFIG.logoSrc}
          alt={CONFIG.logoAlt}
          width={385}
          height={63}
          loading="eager"
          decoding="async"
          className="mb-4 h-6 w-auto select-none sm:mb-6 sm:h-7"
        />

        {/* WIELKI NAGŁÓWEK (H1) */}
        <h1 className="max-w-[18ch] text-center text-[clamp(2rem,7.2vw,4.5rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.02em] text-white">
          {CONFIG.heading}
        </h1>

        {/* [ PRZYCISK CTA ] + mikrocopy */}
        <div className="mt-5 flex w-full flex-col items-center sm:mt-7">
          <CtaButton />
          {CONFIG.microcopy && (
            <p className="mt-2.5 text-center text-xs font-medium text-neutral-400 sm:text-sm">
              {CONFIG.microcopy}
            </p>
          )}
        </div>

        {/* ┌──────────── WIDEO 16:9 ────────────┐ */}
        <div className="mt-6 w-full max-w-[min(100%,calc((100svh-250px)*16/9))] sm:mt-8">
          {CONFIG.videoVariant === "mp4" ? (
            <VideoPlayer
              variant="mp4"
              src={CONFIG.videoSourceMp4}
              poster={CONFIG.videoPoster}
            />
          ) : (
            <VideoPlayer
              variant="embed"
              embedUrl={CONFIG.videoEmbedUrl}
              poster={CONFIG.videoPoster}
            />
          )}
        </div>

        {/* [ PRZYCISK CTA ] (powtórzony – dla osób, które obejrzały wideo) */}
        <div className="mt-7 flex w-full flex-col items-center sm:mt-9">
          <CtaButton />
        </div>
      </div>

      {/* stopka: Polityka prywatności · Regulamin */}
      <footer className="mt-10 pt-4 text-center text-xs text-neutral-500">
        <a
          href={CONFIG.privacyUrl}
          className=" underline-offset-4 transition-colors hover:text-neutral-300 hover:underline focus-visible:text-white focus-visible:outline-none"
        >
          Polityka prywatności
        </a>
        <span aria-hidden="true" className="mx-2">
          ·
        </span>
        <a
          href={CONFIG.termsUrl}
          className="underline-offset-4 transition-colors hover:text-neutral-300 hover:underline focus-visible:text-white focus-visible:outline-none"
        >
          Regulamin
        </a>
      </footer>
    </main>
  );
}
