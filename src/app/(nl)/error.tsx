"use client";

import { useEffect } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = getDictionary("nl");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-site flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-extrabold">{t.error.title}</h1>
      <p className="mt-3 max-w-md text-muted">{t.error.text}</p>
      <Button className="mt-6" onClick={reset}>
        {t.error.retry}
      </Button>
    </section>
  );
}
