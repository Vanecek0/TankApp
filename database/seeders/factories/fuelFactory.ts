import { Fuel } from "@/models/Fuel";

export async function getFuelSeeds(): Promise<Fuel[]> {
    return [
        { name: 'Benzín', code: 'BA 90', trademark: 'Natural 90', unit: 'l', category: 1 },
        { name: 'Benzín', code: 'BA 94', trademark: 'Natural 94', unit: 'l', category: 1 },
        { name: 'Benzín', code: 'BA 95', trademark: 'Natural 95', unit: 'l', category: 1 },
        { name: 'Benzín', code: 'BA 96', trademark: 'Natural 96', unit: 'l', category: 1 },
        { name: 'Benzín', code: 'BA 98', trademark: 'Natural 98', unit: 'l', category: 1 },
        { name: 'Benzín', code: 'BA 100', trademark: 'Natural 100', unit: 'l', category: 1 },

        { name: 'Nafta', code: 'NM', trademark: 'Diesel', unit: 'l', category: 2 },
        { name: 'Nafta', code: 'NM+', trademark: 'Diesel Plus', unit: 'l', category: 2 },
        { name: 'Nafta (zimní)', code: 'NMZ', trademark: 'Diesel Arctic', unit: 'l', category: 2 },

        { name: 'LPG', code: 'LPG', trademark: 'LPG', unit: 'kg', category: 3 },
        { name: 'CNG', code: 'CNG', trademark: 'CNG', unit: 'kg', category: 4 },
        { name: 'LNG', code: 'LNG', trademark: 'Liquefied Natural Gas', unit: 'kg', category: 5 },

        { name: 'Ethanol', code: 'E85', trademark: 'Bioethanol E85', unit: 'l', category: 6 },
        { name: 'Biodiesel', code: 'B100', trademark: 'Methylester', unit: 'l', category: 7 },
        { name: 'Vodík', code: 'H2', trademark: 'Hydrogen', unit: 'kg', category: 7 },
        { name: 'Elektřina', code: 'ELEC', trademark: 'Electric', unit: 'kWh', category: 8 },
    ];
}