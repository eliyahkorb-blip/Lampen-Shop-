import { shopConfig } from "./shop-config";

export function formatMoney(cents: number) {
  return new Intl.NumberFormat(shopConfig.locale, {
    style: "currency",
    currency: shopConfig.currency,
  }).format(cents / 100);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
