"use client";

import WebApp from "@twa-dev/sdk";

export function telegram() {
  const tg = WebApp;

  return { user: tg?.initDataUnsafe?.user };
}
