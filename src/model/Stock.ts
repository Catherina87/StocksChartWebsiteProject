import { IndustrySector } from "./IndustrySector";

export default interface Stock {
  id: string
  tiker: string
  buyPrice: number
  numShares: number
  sector: IndustrySector
}
