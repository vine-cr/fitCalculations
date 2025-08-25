import holeClearanceTable from "../data/hole/holeTable.ts";
import shaftClearanceTable from "../data/shaft/shaftTable.ts";
import { getIT } from "./rangeIT.ts"

interface interval {
    min: number;
    max: number;
    E: number | ((level: number) => number);
}

const shaftOrder = ["d","e","f","g","h","j","k","m","n","p","r","s","t"];
const holeOrder = shaftOrder.map(l => l.toUpperCase());

function calculateClearances(
    nominal: number,
    letter: string,
    itLevel: number,
    table: Record<string, interval[]>,
    order: string[]
) {
    const tableLetter: interval[] | undefined = table[letter];
    if (!tableLetter) throw new Error(`Letter "${letter}" not found.`);

    const interval = tableLetter.find(r => nominal > r.min && nominal <= r.max);
    if (!interval) throw new Error(`Nominal ${nominal}mm out of interval.`);

    const clearance = typeof interval.E === "function" ? interval.E(itLevel) : interval.E;
    const IT = getIT(nominal, itLevel);

    const refPosition = order.indexOf(letter.toLowerCase() === letter ? "h" : "H"); 
    const letterPosition = order.indexOf(letter);

    let EI: number;
    let ES: number;

    if (letterPosition === refPosition) {
        EI = 0;
        ES = IT;
    } else if (letterPosition > refPosition) {
        EI = clearance;
        ES = EI + IT;
    } else {
        ES = clearance;
        EI = ES - IT;
    }

    return { EI: EI / 1000, ES: ES / 1000 };
}

export function interpretCoupling(coupling: string) {
    const regex = /^(\d+)([A-Z])(\d+)([a-z])(\d+)$/;
    const match = coupling.match(regex);
    if (!match) throw new Error("Invalid format. Valid example: 90H7p8");

    const [, nominalStr, holeLetter, itHoleStr, shaftLetter, itShaftStr] = match;

    const nominal = parseFloat(nominalStr);
    const holeLevel = parseInt(itHoleStr, 10);
    const shaftLevel = parseInt(itShaftStr, 10);

    const hole = calculateClearances(
        nominal,
        holeLetter,
        holeLevel,
        holeClearanceTable,
        holeOrder
    );

    const shaft = calculateClearances(
        nominal,
        shaftLetter,
        shaftLevel,
        shaftClearanceTable,
        shaftOrder
    );

    return { shaft, hole, nominal};
}
