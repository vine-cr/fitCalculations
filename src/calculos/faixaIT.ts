interface FaixaIT {
    min: number;
    max: number;
    IT: number[]; // IT1 a IT18
}

export const tabelaIT: FaixaIT[] = [
    { min: 0, max: 3, IT: [4, 6, 10, 14, 25, 40, 60] },
    { min: 3, max: 6, IT: [5, 8, 12, 18, 30, 48, 75]},
    { min: 6, max: 10, IT: [6, 9, 12, 18, 30, 48, 75]},
    { min: 10, max: 18, IT: [8, 11, 18, 27, 43, 70, 110]},
    { min: 18, max: 30, IT: [9, 13, 21, 33, 52, 84, 130]},
    { min: 30, max: 50, IT: [11, 16, 25, 39, 62, 100, 160]},
    { min: 50, max: 80, IT: [13, 19, 30, 46, 74, 120, 190]},
    { min: 80, max: 120, IT: [15, 22, 35, 54, 87, 140, 220]},
    { min: 120, max: 180, IT: [18, 25, 40, 63, 100, 160, 250]},
    { min: 180, max: 250, IT: [20, 29, 46, 72, 115, 185, 290]},
    { min: 250, max: 315, IT: [23, 32, 52, 81, 130, 210, 320]},
    { min: 315, max: 400, IT: [25, 36, 57, 89, 140, 230, 360]},
    { min: 400, max: 500, IT: [27, 40, 63, 97, 155, 250, 400]},
];

export function getIT(nominal: number, nivel: number): number {
    if (nivel < 5 || nivel > 11) throw new Error("Nível IT inválido (1 a 18).");

    const faixa = tabelaIT.find(f => nominal > f.min && nominal <= f.max);
    if (!faixa) throw new Error(`Nominal ${nominal}mm fora do intervalo da tabela IT.`);

    return faixa.IT[nivel - 5];
}

export function getITIndex(nivel: number): number {
    if (nivel < 5 || nivel > 11) throw new Error("Nível IT não é suportado (1 a 18).");
    return nivel - 5;
}



