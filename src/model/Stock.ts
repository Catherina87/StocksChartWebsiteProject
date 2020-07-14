import { IndustrySector } from "./IndustrySector";

export default interface Stock {
  tradeId: string
  ticker: string
  price: number
  count: number
  sector: IndustrySector
}
