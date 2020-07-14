import { IndustrySector } from "./IndustrySector";

export default interface Stock {
  tradeId: string
  tiker: string
  price: number
  count: number
  sector: IndustrySector
}
