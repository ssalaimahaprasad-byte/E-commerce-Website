export const inr = (minor: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(minor / 100);

export const FREE_DELIVERY_MINOR = 49900;
export const DELIVERY_FEE_MINOR = 4900;
export const GST_PERCENT = 18;

export function computeTotals(subtotal: number, percentOff: number) {
  const discount = Math.floor((subtotal * percentOff) / 100);
  const taxable = subtotal - discount;
  const delivery = subtotal >= FREE_DELIVERY_MINOR || subtotal === 0 ? 0 : DELIVERY_FEE_MINOR;
  const tax = Math.round((taxable * GST_PERCENT) / 100);
  return { subtotal, discount, delivery, tax, total: taxable + tax + delivery };
}
