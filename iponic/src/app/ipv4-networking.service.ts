import { Injectable } from '@angular/core';
import * as big from "bigdecimal"
import { NumberSystemConverterService } from "./number-system-converter.service"

@Injectable({
    providedIn: 'root'
})
export class Ipv4NetworkingService {

    constructor(private converterService: NumberSystemConverterService) { }

    getNetworkIncrementBig = (subnetOctets) => {
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

    getSubnetworks(addr: string[], subnetmask: string[], fuckmask: string[]) {

        const totalSize: number = 32
        const regExp = new RegExp(/.{1,8}/, 'g')

        const networkIncrement = this.getNetworkIncrementBig(subnetmask.join('').split('')) // blyat
        const baseNetwork: string[] = addr.map((item,i) => this.converterService.booleanANDBinary(item, subnetmask[i]))
        //console.log({baseNetwork}, networkIncrement.toString())
        const firstSubnet = [...baseNetwork]

        let bla = 0
        let subnets = []
        let z = '.'
        let blaAdd = new big.BigInteger(bla.toString());
    
        for (var i = 0; i < this.getSubnetCountStupid(subnetmask, fuckmask); i++) {
            // FML!!!
            let networkID
            let broadcast
            let rangeStart
            let rangeEnd
    
            let addRange = new big.BigInteger("1");
            let subRange = new big.BigInteger("-1");
            let addBroadcast = networkIncrement.add(subRange);
    
            let networkDezimalBig = new big.BigInteger(this.converterService.binaryToDezimal([...firstSubnet].join('')))
            networkDezimalBig = networkDezimalBig.add(blaAdd)
            //let networkDezimalBig = this.converterService.binaryToDezimal([...firstSubnet].join('')).add(blaAdd)
            let broadcastDezimalBig = networkDezimalBig.add(addBroadcast);
            let rangeStartDezimalBig = networkDezimalBig.add(addRange);
            let rangeEndDezimalBig = broadcastDezimalBig.add(subRange);
    
            let networkBinaryBig = this.addLeadingZeroes(this.converterService.dezimalToBinary(networkDezimalBig.toString()), totalSize)
            let broadcastBinaryBig = this.addLeadingZeroes(this.converterService.dezimalToBinary(broadcastDezimalBig.toString()), totalSize)
            let rangeStartBinaryBig = this.addLeadingZeroes(this.converterService.dezimalToBinary(rangeStartDezimalBig.toString()), totalSize)
            let rangeEndBinaryBig = this.addLeadingZeroes(this.converterService.dezimalToBinary(rangeEndDezimalBig.toString()), totalSize)

    
            networkID = networkBinaryBig.match(regExp).map(x => this.converterService.binaryToDezimal(x)).join(z)
            broadcast = broadcastBinaryBig.match(regExp).map(x => this.converterService.binaryToDezimal(x)).join(z)
            rangeStart = rangeStartBinaryBig.match(regExp).map(x => this.converterService.binaryToDezimal(x)).join(z)
            rangeEnd = rangeEndBinaryBig.match(regExp).map(x => this.converterService.binaryToDezimal(x)).join(z)
    
    
            let reservedHosts = new big.BigInteger("-2")
    
            subnets.push({ networkID, networkRange: [rangeStart, rangeEnd, networkIncrement.add(reservedHosts).toString()], broadcast })
            blaAdd = blaAdd.add(networkIncrement)
        }

        return subnets
    }

    /* export const getNetworkIDs = (addr, subnetMask, fuckMask, ipV6) => {

        let totalSize = ipV6 ? 128 : 32
        let regExp = ipV6 ? new RegExp(/.{1,16}/, 'g') : new RegExp(/.{1,8}/, 'g')
    
        const networkIncrement = getNetworkIncrementBig(subnetMask.flat().join('').split('')) // blyat
        const baseNetwork = addr.map((octet, i) => booleanANDBinary(octet, subnetMask[i]))
    
        const firstSubnet = [...baseNetwork]
    
    
        let bla = 0
        let subnets = []
        let z = ipV6 ? ':' : '.'
        let blaAdd = new bigdecimal.BigInteger(bla.toString());
    
        for (var i = 0; i < getSubnetCountStupid(subnetMask, fuckMask); i++) {
            // FML!!!
            let networkID
            let broadcast
            let rangeStart
            let rangeEnd
    
            let addRange = new bigdecimal.BigInteger("1");
            let subRange = new bigdecimal.BigInteger("-1");
            let addBroadcast = networkIncrement.add(subRange);
    
            let networkDezimalBig = binaryToDezimalBig([...firstSubnet].join('')).add(blaAdd)
            let broadcastDezimalBig = networkDezimalBig.add(addBroadcast);
            let rangeStartDezimalBig = networkDezimalBig.add(addRange);
            let rangeEndDezimalBig = broadcastDezimalBig.add(subRange);
    
            let networkBinaryBig = addLeadingZeroes(dezimalToBinaryBig(networkDezimalBig.toString()), totalSize)
            let broadcastBinaryBig = addLeadingZeroes(dezimalToBinaryBig(broadcastDezimalBig.toString()), totalSize)
            let rangeStartBinaryBig = addLeadingZeroes(dezimalToBinaryBig(rangeStartDezimalBig.toString()), totalSize)
            let rangeEndBinaryBig = addLeadingZeroes(dezimalToBinaryBig(rangeEndDezimalBig.toString()), totalSize)
    
            if (ipV6) {
    
                networkID = networkBinaryBig.match(regExp).map(x => addLeadingZeroes(binaryToHexBig(x), 4)).join(z)
                broadcast = broadcastBinaryBig.match(regExp).map(x => addLeadingZeroes(binaryToHexBig(x), 4)).join(z)
                rangeStart = rangeStartBinaryBig.match(regExp).map(x => addLeadingZeroes(binaryToHexBig(x), 4)).join(z)
                rangeEnd = rangeEndBinaryBig.match(regExp).map(x => addLeadingZeroes(binaryToHexBig(x), 4)).join(z)
    
    
            }
            else {
    
                networkID = networkBinaryBig.match(regExp).map(x => binaryToDezimalBig(x)).join(z)
                broadcast = broadcastBinaryBig.match(regExp).map(x => binaryToDezimalBig(x)).join(z)
                rangeStart = rangeStartBinaryBig.match(regExp).map(x => binaryToDezimalBig(x)).join(z)
                rangeEnd = rangeEndBinaryBig.match(regExp).map(x => binaryToDezimalBig(x)).join(z)
    
            }
    
            let reservedHosts = new bigdecimal.BigInteger("-2")
    
            subnets.push({ networkID, networkRange: [rangeStart, rangeEnd, networkIncrement.add(reservedHosts).toString()], broadcast })
            blaAdd = blaAdd.add(networkIncrement)
        }
    
        return subnets */
}
