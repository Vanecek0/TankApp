import { Fuel } from "@/models/Fuel";

export async function getFuelSeeds(): Promise<Fuel[]> {
    return [
        { name: 'Benzín', code: 'BA 90', trademark: 'Natural 90', unit: 'l' },
        { name: 'Benzín', code: 'BA 94', trademark: 'Natural 94', unit: 'l' },
        { name: 'Benzín', code: 'BA 95', trademark: 'Natural 95', unit: 'l' },
        { name: 'Benzín', code: 'BA 96', trademark: 'Natural 96', unit: 'l' },
        { name: 'Benzín', code: 'BA 98', trademark: 'Natural 98', unit: 'l' },
        { name: 'Benzín', code: 'BA 100', trademark: 'Natural 100', unit: 'l' },

        { name: 'Nafta', code: 'NM', trademark: 'Diesel', unit: 'l' },
        { name: 'Nafta', code: 'NM+', trademark: 'Diesel Plus', unit: 'l' },
        { name: 'Nafta (zimní)', code: 'NMZ', trademark: 'Diesel Arctic', unit: 'l' },

        { name: 'LPG', code: 'LPG', trademark: 'LPG', unit: 'kg' },
        { name: 'CNG', code: 'CNG', trademark: 'CNG', unit: 'kg' },
        { name: 'LNG', code: 'LNG', trademark: 'Liquefied Natural Gas', unit: 'kg' },

        { name: 'Ethanol', code: 'E85', trademark: 'Bioethanol E85', unit: 'l' },
        { name: 'Biodiesel', code: 'B100', trademark: 'Methylester', unit: 'l' },
        { name: 'Vodík', code: 'H2', trademark: 'Hydrogen', unit: 'kg' },
        { name: 'Elektřina', code: 'ELEC', trademark: 'Electric', unit: 'kWh' },
    ];
}