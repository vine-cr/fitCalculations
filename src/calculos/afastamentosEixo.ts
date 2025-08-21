import tabelaAfastamentosFuro from "../dados/furo/tabelaFuros.ts";
import tabelaAfastamentosEixo from "../dados/eixo/tabelaEixos.ts";
import { getIT } from "./faixaIT.ts"

interface Intervalo {
    min: number;
    max: number;
    E: number | ((nivel: number) => number);
}

const ordemEixos = ["a","b","c","d","e","f","g","h","j","k","m","n","p","r","s","t","u","x","y","z"];
const ordemFuros = ordemEixos.map(l => l.toUpperCase());

function calcularAfastamentos(
    nominal: number,
    letra: string,
    nivelIT: number,
    tabela: Record<string, Intervalo[]>,
    ordem: string[]
) {
    const tabelaLetra: Intervalo[] | undefined = tabela[letra];
    if (!tabelaLetra) throw new Error(`Letra "${letra}" não encontrada.`);

    const faixa = tabelaLetra.find(f => nominal > f.min && nominal <= f.max);
    if (!faixa) throw new Error(`Nominal ${nominal}mm fora do intervalo.`);

    const afastamento = typeof faixa.E === "function" ? faixa.E(nivelIT) : faixa.E;
    const IT = getIT(nominal, nivelIT);

    const posicaoRef = ordem.indexOf(letra.toLowerCase() === letra ? "h" : "H"); 
    const posicaoLetra = ordem.indexOf(letra);

    let EI: number;
    let ES: number;

    if (posicaoLetra === posicaoRef) {
        EI = 0;
        ES = IT;
    } else if (posicaoLetra > posicaoRef) {
        EI = afastamento;
        ES = EI + IT;
    } else {
        ES = afastamento;
        EI = ES - IT;
    }

    return { EI: EI / 100, ES: ES / 100 };
}

export function interpretarAcoplamento(acoplamento: string) {
    const regex = /^(\d+)([A-Z])(\d+)([a-z])(\d+)$/;
    const match = acoplamento.match(regex);
    if (!match) throw new Error("Formato inválido. Exemplo válido: 90H7p8");

    const [, nominalStr, letraFuro, itFuroStr, letraEixo, itEixoStr] = match;

    const nominal = parseFloat(nominalStr);
    const itFuro = parseInt(itFuroStr, 10);
    const itEixo = parseInt(itEixoStr, 10);

    const furo = calcularAfastamentos(
        nominal,
        letraFuro,
        itFuro,
        tabelaAfastamentosFuro,
        ordemFuros
    );

    const eixo = calcularAfastamentos(
        nominal,
        letraEixo,
        itEixo,
        tabelaAfastamentosEixo,
        ordemEixos
    );

    return { nominal, furo, eixo };
}

console.log(interpretarAcoplamento("90H7p8"));
