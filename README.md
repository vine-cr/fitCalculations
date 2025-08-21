# Fit Calculations

A TypeScript library for calculating fits and tolerances of shafts and holes, supporting ISO standards IT5 to IT18. This project parses coupling designations (e.g., `90H7p8`) and returns precise EI and ES values for engineering applications.

## Features

- Calculate hole (`furo`) and shaft (`eixo`) tolerances based on nominal diameter and IT grade.
- Supports IT5 to IT18 levels.
- Returns **EI** (lower deviation) and **ES** (upper deviation) values.
- Parse coupling notation strings and automatically extract nominal, hole, shaft, and IT values.
- Works for any valid coupling according to ISO fit standards.

## Installation


bash
git clone https://github.com/vine-cr/fitCalculations.git
cd fitCalculations
npm install

## Usage

import { interpretarAcoplamento } from './src/calculos/fitCalculations.ts';

const result = interpretarAcoplamento("90H7p8");

console.log(result);
/*
{
  nominal: 90,
  furo: { EI: 0, ES: 0.4 },   // Note: values already in millimeters
  eixo: { EI: 0.37, ES: 1.02 }
}
*/
