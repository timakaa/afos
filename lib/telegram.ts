"use client";

export function telegram() {
  const tg = (window as any).Telegram?.WebApp;

  return { user: tg?.initDataUnsafe?.user };
}
