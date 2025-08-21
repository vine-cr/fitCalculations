import { getITIndex } from '../../calculos/faixaIT.ts';

interface Intervalo {
    min: number;
    max: number;
    E: number | ((nivel: number) => number); // Valor de afastamento em mm
}

interface TabelaPorLetra {
    [letra: string]: Intervalo[];
}

const tabelaAfastamentosFuro: TabelaPorLetra = {

    d: [
        { min: 0, max: 3, E: 20 },
        { min: 3, max: 6, E: 30 },
        { min: 6, max: 10, E: 40 },
        { min: 10, max: 18, E: 50 },
        { min: 18, max: 30, E: 65 },
        { min: 30, max: 50, E: 80 },
        { min: 50, max: 80, E: 100 },
        { min: 80, max: 120, E: 120 },
        { min: 120, max: 180, E: 145 },
        { min: 180, max: 250, E: 170 },
        { min: 250, max: 315, E: 190 },
        { min: 315, max: 400, E: 210 },
        { min: 400, max: 500, E: 230 }
    ],
    E: [
        { min: 0, max: 3, E: 14 },
        { min: 3, max: 6, E: 20 },
        { min: 6, max: 10, E: 25 },
        { min: 10, max: 18, E: 32 },
        { min: 18, max: 30, E: 40 },
        { min: 30, max: 50, E: 50 },
        { min: 50, max: 80, E: 60 },
        { min: 80, max: 120, E: 72 },
        { min: 120, max: 180, E: 85 },
        { min: 180, max: 250, E: 100 },
        { min: 250, max: 315, E: 110 },
        { min: 315, max: 400, E: 125 },
        { min: 400, max: 500, E: 135 }
    ],
    EF: [
        { min: 0, max: 3, E: 10 },
        { min: 3, max: 6, E: 14 },
        { min: 6, max: 10, E: 18 }
    ],
    F: [
        { min: 0, max: 3, E: 6 },
        { min: 3, max: 6, E: 10 },
        { min: 6, max: 10, E: 13 },
        { min: 10, max: 18, E: 16 },
        { min: 18, max: 30, E: 20 },
        { min: 30, max: 50, E: 25 },
        { min: 50, max: 80, E: 30 },
        { min: 80, max: 120, E: 36 },
        { min: 120, max: 180, E: 43 },
        { min: 180, max: 250, E: 50 },
        { min: 250, max: 315, E: 56 },
        { min: 315, max: 400, E: 62 },
        { min: 400, max: 500, E: 68 }
    ],
    FG: [
        { min: 0, max: 3, E: 4 },
        { min: 3, max: 6, E: 6 },
        { min: 6, max: 10, E: 8 }
    ],
    G: [
        { min: 0, max: 3, E: 2 },
        { min: 3, max: 6, E: 4 },
        { min: 6, max: 10, E: 5 },
        { min: 10, max: 18, E: 6 },
        { min: 18, max: 30, E: 7 },
        { min: 30, max: 50, E: 9 },
        { min: 50, max: 80, E: 10 },
        { min: 80, max: 120, E: 12 },
        { min: 120, max: 180, E: 14 },
        { min: 180, max: 250, E: 15 },
        { min: 250, max: 315, E: 17 },
        { min: 315, max: 400, E: 18 },
        { min: 400, max: 500, E: 20 }
    ],
    H: [
        { min: 0, max: 500, E: 0 }
    ],
    J: [
        { min: 0, max: 3, E: nivel => getITIndex(nivel) > 6 ? 4 : 2 },
        { min: 3, max: 6, E: nivel => getITIndex(nivel) > 6 ? 6 : 3 },
        { min: 6, max: 10, E: nivel => getITIndex(nivel) > 6 ? 8 : 5 }
    ],
    K: [
        { min: 0, max: 3, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? 0 : 0 },
        { min: 3, max: 6, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -1 : 0 },
        { min: 6, max: 10, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -1 : 0 },
        { min: 10, max: 18, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -1 : 0 },
        { min: 18, max: 30, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -2 : 0 },
        { min: 30, max: 50, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -2 : 0 },
        { min: 50, max: 80, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -2 : 0 },
        { min: 80, max: 120, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -3 : 0 },
        { min: 120, max: 180, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -3 : 0 },
        { min: 180, max: 250, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -4 : 0 },
        { min: 250, max: 315, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -4 : 0 },
        { min: 315, max: 400, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -4 : 0 },
        { min: 400, max: 500, E: nivel => getITIndex(nivel) > 4 && getITIndex(nivel) < 7 ? -5 : 0 }
    ],
    M: [
        { min: 0, max: 3, E: -2 },
        { min: 3, max: 6, E: -4 },
        { min: 6, max: 10, E: -6 },
        { min: 10, max: 18, E: -7 },
        { min: 18, max: 30, E: -8 },
        { min: 30, max: 50, E: -9 },
        { min: 50, max: 80, E: -11 },
        { min: 80, max: 120, E: -13 },
        { min: 120, max: 180, E: -15 },
        { min: 180, max: 250, E: -17 },
        { min: 250, max: 315, E: -20 },
        { min: 315, max: 400, E: -21 },
        { min: 400, max: 500, E: -23 }
    ],
    N: [
        { min: 0, max: 3, E: -4 },
        { min: 3, max: 6, E: -8 },
        { min: 6, max: 10, E: -10 },
        { min: 10, max: 18, E: -12 },
        { min: 18, max: 30, E: -15 },
        { min: 30, max: 50, E: -17 },
        { min: 50, max: 80, E: -20 },
        { min: 80, max: 120, E: -23 },
        { min: 120, max: 180, E: -27 },
        { min: 180, max: 250, E: -31 },
        { min: 250, max: 315, E: -34 },
        { min: 315, max: 400, E: -37 },
        { min: 400, max: 500, E: -40 }
    ],
    P: [
        { min: 0, max: 3, E: -6 },
        { min: 3, max: 6, E: -12 },
        { min: 6, max: 10, E: -15 },
        { min: 10, max: 18, E: -18 },
        { min: 18, max: 30, E: -22 },
        { min: 30, max: 50, E: -26 },
        { min: 50, max: 80, E: -32 },
        { min: 80, max: 120, E: -37 },
        { min: 120, max: 180, E: -43 },
        { min: 180, max: 250, E: -50 },
        { min: 250, max: 315, E: -56 },
        { min: 315, max: 400, E: -62 },
        { min: 400, max: 500, E: -68 }
    ],
    R: [
        { min: 0, max: 3, E: -10 },
        { min: 3, max: 6, E: -15 },
        { min: 6, max: 10, E: -19 },
        { min: 10, max: 18, E: -23 },
        { min: 18, max: 30, E: -28 },
        { min: 30, max: 50, E: -34 },
        { min: 50, max: 65, E: -41 },
        { min: 65, max: 80, E: -43 },
        { min: 80, max: 100, E: -51 },
        { min: 100, max: 120, E: -54 },
        { min: 120, max: 140, E: -63 },
        { min: 140, max: 160, E: -65 },
        { min: 160, max: 180, E: -68 },
        { min: 180, max: 200, E: -77 },
        { min: 200, max: 225, E: -80 },
        { min: 225, max: 250, E: -84 },
        { min: 250, max: 280, E: -94 },
        { min: 280, max: 315, E: -98 },
        { min: 315, max: 355, E: -108 },
        { min: 350, max: 400, E: -114 },
        { min: 400, max: 450, E: -126 },
        { min: 450, max: 500, E: -132 }
    ],
    S: [
        { min: 0, max: 3, E: -14 },
        { min: 3, max: 6, E: -19 },
        { min: 6, max: 10, E: -23 },
        { min: 10, max: 18, E: -28 },
        { min: 18, max: 30, E: -35 },
        { min: 30, max: 50, E: -43 },
        { min: 50, max: 65, E: -53 },
        { min: 65, max: 80, E: -59 },
        { min: 80, max: 100, E: -71 },
        { min: 100, max: 120, E: -79 },
        { min: 120, max: 140, E: -92 },
        { min: 140, max: 160, E: -100 },
        { min: 160, max: 180, E: -108 },
        { min: 180, max: 200, E: -122 },
        { min: 200, max: 225, E: -130 },
        { min: 225, max: 250, E: -140 },
        { min: 250, max: 280, E: -158 },
        { min: 280, max: 315, E: -170 },
        { min: 315, max: 355, E: -190 },
        { min: 350, max: 400, E: -208 },
        { min: 400, max: 450, E: -232 },
        { min: 450, max: 500, E: -252 }
    ],
    T: [
        { min: 18, max: 24, E: -63 },
        { min: 24, max: 30, E: -75 },
        { min: 30, max: 40, E: -94 },
        { min: 40, max: 50, E: -114 },
        { min: 50, max: 65, E: -144 },
        { min: 65, max: 80, E: -174 },
        { min: 80, max: 100, E: -214 },
        { min: 100, max: 120, E: -254 },
        { min: 120, max: 140, E: -300 },
        { min: 140, max: 160, E: -340 },
        { min: 160, max: 180, E: -380 },
        { min: 180, max: 200, E: -425 },
        { min: 200, max: 225, E: -470 },
        { min: 225, max: 250, E: -520 },
        { min: 250, max: 280, E: -580 },
        { min: 280, max: 315, E: -650 },
        { min: 315, max: 355, E: -730 },
        { min: 350, max: 400, E: -820 },
        { min: 400, max: 450, E: -920 },
        { min: 450, max: 500, E: -1000 }
    ] 
};

export default tabelaAfastamentosFuro;
