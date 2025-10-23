import { MANUFACTURERS } from "../../../data/sales-portal/products/manufactures.js";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
