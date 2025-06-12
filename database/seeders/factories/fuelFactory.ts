import { Fuel } from "@/models/Fuel";

export function createFuelSeed(overrides: Partial<Fuel> = {}): Fuel {
    return {
        name: 'Benzín',
        code: 'BA 95',
        trademark: 'Natural 95',
        unit: 'l',
        ...overrides,
    };
}

export async function getFuelSeeds() {
    return [
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 90',
            trademark: 'Natural 90',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 94',
            trademark: 'Natural 94',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 95',
            trademark: 'Natural 95',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 96',
            trademark: 'Natural 96',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 98',
            trademark: 'Natural 98',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Benzín',
            code: 'BA 100',
            trademark: 'Natural 100',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Nafta',
            code: 'NM',
            trademark: 'Diesel',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Nafta',
            code: 'NM+',
            trademark: 'Diesel Plus',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Nafta (zimní)',
            code: 'NMZ',
            trademark: 'Diesel Arctic',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'LPG',
            code: 'LPG',
            trademark: 'LPG',
            unit: 'kg',
        }),
        createFuelSeed({
            name: 'CNG',
            code: 'CNG',
            trademark: 'CNG',
            unit: 'kg',
        }),
        createFuelSeed({
            name: 'LNG',
            code: 'LNG',
            trademark: 'Liquefied Natural Gas',
            unit: 'kg',
        }),
        createFuelSeed({
            name: 'Ethanol',
            code: 'E85',
            trademark: 'Bioethanol E85',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Biodiesel',
            code: 'B100',
            trademark: 'Methylester',
            unit: 'l',
        }),
        createFuelSeed({
            name: 'Vodík',
            code: 'H2',
            trademark: 'Hydrogen',
            unit: 'kg',
        }),
        createFuelSeed({
            name: 'Elektřina',
            code: 'ELEC',
            trademark: 'Electric',
            unit: 'kWh',
        }),
    ];
}