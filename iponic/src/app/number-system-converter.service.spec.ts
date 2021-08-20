import { TestBed } from '@angular/core/testing';

import { NumberSystemConverterService } from './number-system-converter.service';

describe('NumberSystemConverterService', () => {
    let service: NumberSystemConverterService;
    let converter

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NumberSystemConverterService);
        converter = new NumberSystemConverterService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('binaryToDezimal returns expected value', () => {
        let values = ["0001", "1111", "11000000"]
        let expected = ["1", "15", "192"]
        values.forEach((v,i) => expect(
            converter.binaryToDezimal(v)).toEqual(expected[i])
        )  
    })

    it('dezimalToBinary returns expected value', () => {
        let values = ["1", "15", "192"]
        let expected = ["1", "1111", "11000000"]
        values.forEach((v,i) => expect(
            converter.dezimalToBinary(v)).toEqual(expected[i])
        )
    })

    it('dezimalDigitToHexDigit returns expected value', () => {
        let values = ["15", "14", "13", "12", "11", "10", "9"]
        let expected = ["f", "e", "d", "c", "b", "a", "9"]
        values.forEach((v,i) => {
            expect(converter.dezimalDigitToHexDigit(v)).toEqual(expected[i])
        })
    })

    it('hexDigitToDezimalDigit returns expected value', () => {
        let values = ["f", "e", "d", "c", "b", "a", "9"]
        let expected = ["15", "14", "13", "12", "11", "10", "9"]
        values.forEach((v,i) => {
            expect(converter.hexDigitToDezimalDigit(v)).toEqual(expected[i])
        })
    })

    it('dezimalToHex returns expected value', () => {
        let values = ["1", "15", "45054", "28036591"]
        let expected = ["1", "f", "affe", "1abcdef"]
        values.forEach((v,i) => expect(
            converter.dezimalToHex(v)).toEqual(expected[i])
        )
    })

    it('anyNumberToDezimal returns expected value', () => {
        let valueTuples = [["0011", "2"], ["775", "8"], ["affe", "16"], ["1abcdef", "16"]]
        let expected = ["3", "509", "45054", "28036591"]
        valueTuples.forEach((v,i) => {
            let [anyNumber, anyBase] = v
            expect(
                converter.anyNumberToDezimal(anyNumber, anyBase)
            ).toEqual(expected[i])
        })
    })

    it('addLeadingZeroes returns expected value', () => {
        let valueTuples = [["11", "4"], ["7affe", "7"], ["123456789", "10"]]
        let expected = ["0011", "007affe", "0123456789"]
        valueTuples.forEach((v,i) => {
            let [value, size] = v
            expect(converter.addLeadingZeroes(value, size)).toEqual(expected[i])
        })
    })

    it('booleanANDBinary returns expected value', () => {
        let valueTuples = [["10", "11"], ["1", "1000"], ["001", "000001"]]
        let expected = ["10", "0000", "000001"]
        valueTuples.forEach((v,i) => {
            let [binaryA, binaryB] = v
            expect(converter.booleanANDBinary(binaryA, binaryB)).toEqual(expected[i])
        })
    })

    it('getDigits returns expected value', () => {
        let values = ["2", "8", "10", "16"]
        let expected = [
            ["0", "1"],
            ["0", "1", "2", "3", "4", "5", "6", "7"],
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
        ]
        values.forEach((v,i) => expect(converter.getDigits(v)).toEqual(expected[i]))
    })

    it('isValidNumber returns expected value', () => {
        let valueTuples = [
            ["10001", converter.getDigits("2")],
            ["567123", converter.getDigits("8")],
            ["1234567890", converter.getDigits("10")],
            ["affe", converter.getDigits("16")],
            ["102", converter.getDigits("2")],
            ["345678", converter.getDigits("8")],
            ["123abc", converter.getDigits("10")],
            ["hexe", converter.getDigits("16")],
        ]
        let expected = [true, true, true, true, false, false, false, false]
        valueTuples.forEach((v,i) => {
            let [value, digits] = v
            expect(converter.isValidNumber(value, digits)).toEqual(expected[i])
        })
    })

    it('convertAny returns expected value', () => {
        let valueTriplets = [
            ["10", "15", "2"],
            ["2", "1", "10"]
        ]
        let expected = [
            converter.convert("15", "2"),
            converter.convert("1", "10",
            "1 * 2 ^ 0 = 1\n")
        ]
        valueTriplets.forEach((v,i) => {
            let [givenBase, givenNumber, wantedBase] = v
            expect(converter.convertAny(givenBase, givenNumber, wantedBase)).toEqual(
                expected[i]
            )
        })
    })

    it('convert returns expected value', () => {
        let valueTriplets = [
            ["15", "2", undefined],
            ["1", "10", "1 * 2 ^ 0 = 1\n"]
        ]
        let expected = [
            ["1111", "dividing 15 by 2 gives 7 rest 1\ndividing 7 by 2 gives 3 rest 1\ndividing 3 by 2 gives 1 rest 1\ndividing 1 by 2 gives 0 rest 1\nThe converted number is 1111 to the base 2"],
            ["1", "1 * 2 ^ 0 = 1\ndividing 1 by 10 gives 0 rest 1\nThe converted number is 1 to the base 10"]
        ]
        valueTriplets.forEach((v,i) => {
            let [ dezimalNumber, wantedBase, preSteps ] = v
            expect(converter.convert(dezimalNumber, wantedBase, preSteps)).toEqual(expected[i])
        })
    })
});
