import { CouplingTable } from "../src/models/coupling.ts";

const table = new CouplingTable("109P9g5");
const EI = table.shaft.EI;

console.table(table.getTable());
console.log(EI);