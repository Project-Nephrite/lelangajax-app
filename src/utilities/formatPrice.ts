export function formatPrice(value: number, withSymbol = true): string {
  if (!value) return "NA";
  const formatted = value.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return withSymbol ? `Rp${formatted}` : formatted;
}
