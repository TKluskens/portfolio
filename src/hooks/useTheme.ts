"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();
let observer: MutationObserver | null = null;

function notify() {
  listeners.forEach((listener) => listener());
}

/** Subscribes to `class`/`style` changes on <html> via one shared MutationObserver. */
export function subscribeToThemeChange(listener: Listener) {
  listeners.add(listener);
  if (!observer && typeof document !== "undefined") {
    observer = new MutationObserver(notify);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && observer) {
      observer.disconnect();
      observer = null;
    }
  };
}

function getAccentSnapshot() {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
}

function getIsLightSnapshot() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("light");
}

const getServerAccentSnapshot = () => "";
const getServerIsLightSnapshot = () => false;

export function useAccent() {
  const accent = useSyncExternalStore(subscribeToThemeChange, getAccentSnapshot, getServerAccentSnapshot);
  return accent || "var(--accent)";
}

export function useIsLight() {
  return useSyncExternalStore(subscribeToThemeChange, getIsLightSnapshot, getServerIsLightSnapshot);
}
