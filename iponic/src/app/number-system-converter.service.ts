import { Injectable } from '@angular/core';
import * as big from "bigdecimal";
//var bigdecimal = require("bigdecimal");

@Injectable({
    providedIn: 'root'
})
export class NumberSystemConverterService {

    constructor() { }

    binaryToDezimal(binary: string) {
        let dezimal = new big.BigInteger("0");
        let base = new big.BigInteger("2");

        [...binary].reverse().forEach((digit, i) => {
            if (digit === "1") {
                let bitValue = base.pow(i)
                dezimal = dezimal.add(bitValue)
            }
        })

        return dezimal.toString()
    }

    dezimalToBinary(dezimal: string) {

        let digits: string[] = []
        let n = new big.BigInteger(dezimal);
        let r
        let base = new big.BigInteger("2");

        while (true) {
            [n, r] = n.divideAndRemainder(base)
            digits.push(r.toString())
            if (n.toString() === "0") break
        }

        digits.reverse()

        return digits.join('')

    }

    dezimalDigitToHexDigit(d: string) {
        switch (d) {
            case "15":
                return "f"
            case "14":
                return "e"
            case "13":
                return "d"
            case "12":
                return "c"
            case "11":
                return "b"
            case "10":
                return "a"
            default:
                return d
        }
    }

    hexDigitToDezimalDigit(h: string) {
        switch(h) {
            case "f":
                return "15"
            case "e":
                return "14"
            case "d":
                return "13"
            case "c":
                return "12"
            case "b":
                return "11"
            case "a":
                return "10"
            default:
                return h
        }
    }

    dezimalToHex(dezimal: string) {
        let digits = [];
        let n = new big.BigInteger(dezimal);
        let r: big.BigInteger
        let base = new big.BigInteger("16");

        while (true) {
            [n, r] = n.divideAndRemainder(base)
            let convertedR: string = this.dezimalDigitToHexDigit(r.toString())
            digits.push(convertedR);
            if (n.toString() === "0") break;
        }

        digits.reverse();

        return digits.join('');
    }

    anyNumberToDezimal = (anyNumber: string, anyBase: string) => {
        let dezi: big.BigInteger = new big.BigInteger("0");
        let base: big.BigInteger = new big.BigInteger(anyBase);


        [...anyNumber].reverse().forEach((d, i) => {
            let digit: string = this.hexDigitToDezimalDigit(d)
            let digitBig = new big.BigInteger(digit)
            let a = base.pow(i.toString())
            let b = digitBig.multiply(a)
            dezi = dezi.add(b)
        })

        return dezi.toString();
    }

    addLeadingZeroes = (value: string, size: number) => {
        let digits = [...value];
        while (digits.length < size) {
            digits.unshift("0")
        }
        let binary = digits.join('');
        return binary;
    }

    booleanANDBinary = (a: string, b: string) => {

        let sortedBinaries = [a, b].sort((i, j) => i.length > j.length ? 1 : -1);
        let [binaryA, binaryB] = sortedBinaries

        while (binaryA.length < binaryB.length) {
            binaryA = "0" + binaryA;
        }

        let binary = "";

        [...binaryA].forEach((digit, i) => {
            digit === "1" && binaryB[i] === "1" ? binary += "1" : binary += "0"
        })

        return binary
    }

    getDigits = (base: string) => {
        return base === "16"
            ? [...Array(10).keys(), ...["a", "b", "c", "d", "e", "f"]].map(x => x.toString())
            : [...Array(parseInt(base)).keys()].map(x => x.toString())
    }

    isValidNumber = (value: string, digits: string[]) => {
        return [...value].every(item => digits.includes(item))
    }

    convertAny(givenBase: string, givenNumber: string, wantedBase: string) {

        let steps: string = ""
        let deziNumber: big.BigInteger = new big.BigInteger("0");

        if (givenBase !== "10") {
            [...givenNumber].reverse().forEach((digit, i) => {
                let convertedDigit: string = this.hexDigitToDezimalDigit(digit)
                let pow = new big.BigInteger(givenBase);
                let factor = new big.BigInteger(convertedDigit);
                let deziDigit = pow.pow(i.toString()).multiply(factor);
                steps = steps + `${convertedDigit} * ${givenBase} ^ ${i} = ${deziDigit.toString()}\n`
                deziNumber = deziNumber.add(deziDigit);
            })
            return this.convert(deziNumber.toString(), wantedBase, steps)
        } else {
            return this.convert(givenNumber, wantedBase)
        }
    }

    convert(dezimalNumber: string, wantedBase: string, preSteps?: string) {
        let digits: string[] = [];
        let n: big.BigInteger = new big.BigInteger(dezimalNumber);
        let r: big.BigInteger
        let b: big.BigInteger = new big.BigInteger(wantedBase);
        //let oldN: big.BigInteger = new big.BigInteger(dezimalNumber);
        let steps = preSteps || ""

        while (true) {
            let oldN = new big.BigInteger(n.toString());

            [n, r] = oldN.divideAndRemainder(b);
            let convertedR: string = this.dezimalDigitToHexDigit(r.toString())
            digits.push(convertedR);
            steps = steps + `dividing ${oldN.toString()} by ${b.toString()} gives ${n.toString()} rest ${convertedR}\n`
            if (n.toString() === "0") break;
        }

        digits.reverse();

        let convertedNumber = digits.join('');

        steps = steps + `The converted number is ${convertedNumber} to the base ${wantedBase}`

        return [convertedNumber, steps]
    }
}
