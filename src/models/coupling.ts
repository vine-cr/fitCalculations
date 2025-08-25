import { interpretCoupling } from "../calculations/shaftClearance.ts";

export class CouplingTable {
    couplingStr: string;
    shaft: { EI: number; ES: number };
    hole: { EI: number; ES: number };
    nominal: number;

    shaftIT: number;
    holeIT: number;
    shaftLetter: string;
    holeLetter: string;

    shaftClearance: number;
    holeClearance: number;

    upperLimitDimensionHole: number;
    lowerLimitDimensionHole: number;
    upperLimitDimensionShaft: number;
    lowerLimitDimensionShaft: number;

    maximumLimitDimensionHole: number;
    minimumLimitDimensionHole: number;
    maximumLimitDimensionShaft: number;
    minimumLimitDimensionShaft: number;

    fitType: string;
    basisSystem: string;

    constructor(couplingStr: string) {
        this.couplingStr = couplingStr;

        // Interpreta a string usando interpretCoupling
        const { shaft, hole, nominal } = interpretCoupling(couplingStr);

        // Afastamento e nominal
        this.shaft = shaft;
        this.hole = hole;
        this.nominal = nominal;

        // Letras e IT
        this.holeIT = parseInt(couplingStr.match(/[A-Z](\d+)/)![1], 10);
        this.shaftIT = parseInt(couplingStr.match(/[a-z](\d+)$/)![1], 10);
        this.holeLetter = couplingStr.match(/([A-Z])\d+/)![1];
        this.shaftLetter = couplingStr.match(/([a-z])\d+$/)![1];

        // Tolerancia
        this.shaftClearance = this.shaft.ES - this.shaft.EI;
        this.holeClearance = this.hole.ES - this.hole.EI;

        // Limites
        this.upperLimitDimensionHole = nominal + this.hole.ES;
        this.lowerLimitDimensionHole = nominal + this.hole.EI;
        this.upperLimitDimensionShaft = nominal + this.shaft.ES;
        this.lowerLimitDimensionShaft = nominal + this.shaft.EI;

        this.maximumLimitDimensionHole = Math.max(this.upperLimitDimensionHole, this.lowerLimitDimensionHole);
        this.minimumLimitDimensionHole = Math.min(this.upperLimitDimensionHole, this.lowerLimitDimensionHole);
        this.maximumLimitDimensionShaft = Math.max(this.upperLimitDimensionShaft, this.lowerLimitDimensionShaft);
        this.minimumLimitDimensionShaft = Math.min(this.upperLimitDimensionShaft, this.lowerLimitDimensionShaft);

        // Fit type
        this.fitType = this.upperLimitDimensionHole < this.lowerLimitDimensionShaft
            ? "Interference Fit"
            : this.lowerLimitDimensionHole > this.upperLimitDimensionShaft
            ? "Clearance Fit"
            : "Transition Fit";

        // Basis system
        this.basisSystem = this.holeLetter === "H" && this.shaftLetter === "h"
            ? "Both"
            : this.holeLetter === "H"
            ? "Hole Basis System"
            : this.shaftLetter === "h"
            ? "Shaft Basis System"
            : "None";
    }

  // Método para gerar a tabela formatada
    getTable(): Array<[string, string | number, string | number]> {
        return [
            [this.couplingStr, "Hole", "Shaft"],
            ["Clearance IT           ", `IT${this.holeIT}`, `IT${this.shaftIT}`],
            ["Clearance              ", this.holeClearance.toFixed(3), this.shaftClearance.toFixed(3)],
            ["Nominal                ", this.nominal, this.nominal],
            ["Fundamental Deviation  ", this.hole.EI.toFixed(3), this.shaft.ES.toFixed(3)],
            ["Upper Deviation        ", this.hole.ES.toFixed(3), this.shaft.ES.toFixed(3)],
            ["Lower Deviation        ", this.hole.EI.toFixed(3), this.shaft.EI.toFixed(3)],
            ["Maximum Limit Dimension", this.maximumLimitDimensionHole.toFixed(3), this.maximumLimitDimensionShaft.toFixed(3)],
            ["Minimum Limit Dimension", this.minimumLimitDimensionHole.toFixed(3), this.minimumLimitDimensionShaft.toFixed(3)],
            ["Fit Type               ", this.fitType, ""],
            ["Basis System           ", this.basisSystem, ""],
        ];
    }
}
