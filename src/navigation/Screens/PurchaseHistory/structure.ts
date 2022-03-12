import { HistoryResponse, Product } from "../../../@types/types";

export interface OutputProps {
  details: {
    purchase_id: number;
    date: string;
    status: string;
  };
  product: Product;
}

export function structureOutput(input: HistoryResponse): OutputProps[][] {
  const output: OutputProps[][] = [];

  if (typeof input.results === "undefined") return [];

  for (let i = 0; i < input.results.length; i++) {
    const { details, product } = input.results[i];
    if (output.length === 0) {
      output.push([{ details, product }]);
    } else {
      if (output[output.length - 1][0]?.details.date === details.date) {
        output[output.length - 1].push({ details, product });
      } else {
        output.push([{ details, product }]);
      }
    }
  }

  return output;
}
