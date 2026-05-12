"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeToConsent
} from "@/lib/consent";

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const visible = consent !== "accepted";

  function acceptCookies() {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!visible) {
    return null;
  }

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-lg border border-ink/10 bg-white/95 p-4 shadow-soft backdrop-blur sm:bottom-6 sm:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-ink/70">
          Usamos cookies e tecnologias semelhantes para melhorar sua experiência
          e entender como o site é utilizado.
        </p>
        <div className="grid grid-cols-2 items-center gap-2 sm:flex sm:shrink-0">
          <Link
            className="rounded-md border border-ink/10 px-4 py-2 text-center text-sm font-black text-ink/70 transition hover:border-coral/40 hover:text-coral"
            href="/politica-de-privacidade"
          >
            Saiba mais
          </Link>
          <button
            className="rounded-md bg-ink px-4 py-2 text-sm font-black text-white transition hover:bg-coral"
            onClick={acceptCookies}
            type="button"
          >
            Aceitar
          </button>
        </div>
      </div>
    </aside>
  );
}
