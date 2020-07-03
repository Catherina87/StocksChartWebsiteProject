enum IndustrySectorEnum {
  Tech = "Tech", 
  Finance = "Finance",
  Bonds = "Bonds",
  'Real Estate' = "Real Estate",
  Energy = "Energy",
  Unknown = "Unknown"
}

export type IndustrySector = keyof typeof IndustrySectorEnum;

export const AllIndustrySectors: IndustrySector[] = Object.keys(IndustrySectorEnum) as IndustrySector[];
