import { Injectable } from '@angular/core';
import * as big from "bigdecimal"
import { NumberSystemConverterService } from "./number-system-converter.service"

@Injectable({
    providedIn: 'root'
})
export class Ipv4NetworkingService {

    constructor(private converterService: NumberSystemConverterService) { }

    getNetworkIncrement = (subnetOctets: string[]) => {
        let base = new big.BigInteger("2");
        return base.pow(subnetOctets.filter(item => item === "0").length.toString())
    }

    getSubnetCountStupid = (mask1: string[], mask2: string[]) => {
        let subnetBits = 0
        mask1.forEach((item, i) => {
            [...item].forEach((x, j) => {
                if (x !== mask2[i][j]) {
                    subnetBits++
                }
            })
        })
        return Math.pow(2, subnetBits)
    }

    addLeadingZeroes = (value: string, binarySize?: number) => {
        let size = binarySize ? binarySize : 8;
        let digits = [...value];
        while (digits.length < size) {
            digits.unshift("0")
        }
        let binary = digits.join('');
        return binary;
    }

    getIPv4BinaryFromDezimal(dezimal: string) {
        return this.addLeadingZeroes(this.converterService.dezimalToBinary(dezimal), 32)
    }

    getIPv4fromBinary(binary: string) {
        const regExp = new RegExp(/.{1,8}/, 'g')
        return binary.match(regExp).map(x => this.converterService.binaryToDezimal(x)).join('.')
    }

    getSubnetmaskFromCidr(cidr: string) {
        const j = parseInt(cidr)
        const regExp = new RegExp(/.{1,8}/, 'g')
        const mask = [...Array(32).keys()].map((v, i) => i < j ? "1" : "0").join('')
        return mask.match(regExp)
    }

    getSubnetworks(addr: string[], subnetmask: string[], highermask: string[]) {

        const networkIncrement = this.getNetworkIncrement(subnetmask.join('').split('')) // blyat
        const baseNetwork: string[] = addr.map((item,i) => this.converterService.booleanANDBinary(item, subnetmask[i]))
        const firstSubnetDezimal = new big.BigInteger(this.converterService.binaryToDezimal([...baseNetwork].join('')))

        const subnetCount = this.getSubnetCountStupid(subnetmask, highermask)
        let subnets = []
        let networkAdd = new big.BigInteger("0");
    

        for (var i = 0; i < subnetCount; i++) {
    
            let addRange = new big.BigInteger("1");
            let subRange = new big.BigInteger("-1");
            let addBroadcast = networkIncrement.add(subRange);

            let networkDezimal = firstSubnetDezimal.add(networkAdd)
            let broadcastDezimal = networkDezimal.add(addBroadcast);
            let rangeStartDezimal= networkDezimal.add(addRange);
            let rangeEndDezimal = broadcastDezimal.add(subRange);
    
            let [networkBinary, broadcastBinary, rangeStartBinary, rangeEndBinary] = [networkDezimal, broadcastDezimal, rangeStartDezimal, rangeEndDezimal].map(
                x => this.getIPv4BinaryFromDezimal(x.toString())
            )

            let [networkID, broadcast, rangeStart, rangeEnd] = [networkBinary, broadcastBinary, rangeStartBinary, rangeEndBinary].map(
                x => this.getIPv4fromBinary(x)
            )

            let reservedHosts = new big.BigInteger("-2")
    
            subnets.push({ networkID, networkRange: [rangeStart, rangeEnd, networkIncrement.add(reservedHosts).toString()], broadcast })
            networkAdd = networkAdd.add(networkIncrement)
        }

        return subnets
    }
}
