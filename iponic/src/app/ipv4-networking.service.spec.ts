import { TestBed } from '@angular/core/testing';
import * as big from "bigdecimal"

import { Ipv4NetworkingService } from './ipv4-networking.service';

describe('Ipv4NetworkingService', () => {
    let service: Ipv4NetworkingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Ipv4NetworkingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getNetworkIncrement returns expected value', () => {
        let subnetmask1 = "11111111111111111111111100000000".split("")
        let subnetmask2 = "11111111111111111111111111111111".split("")
        expect(service.getNetworkIncrement(subnetmask1).toString()).toEqual("256")
        expect(service.getNetworkIncrement(subnetmask2).toString()).toEqual("1")
    })

    it('getSubnetCountStupid returns expected value', () => {
        let mask1 = ["11111111", "11111111", "111111111", "00000000"]
        let mask2 = ["11111111", "11111111", "111111111", "11000000"]
        expect(service.getSubnetCountStupid(mask1, mask2)).toEqual(4)
    })

    it('addLeadingZeroes returns expected value', () => {
        expect(service.addLeadingZeroes("1111", 8)).toEqual("00001111")
        expect(service.addLeadingZeroes("1111")).toEqual("00001111")
        expect(service.addLeadingZeroes("1111", 4)).toEqual("1111")
    })

    it('getIPv4BinaryFromDezimal returns expected value', () => {
        expect(service.getIPv4BinaryFromDezimal("64")).toEqual("00000000000000000000000001000000")
    })

    it('getIPv4fromBinary returns expected value', () => {
        expect(service.getIPv4fromBinary("00000000000000000000000001000000")).toEqual("0.0.0.64")
    })

    it('getSubnetworks returns expected value', () => {
        let addr = ["11000000", "10101000", "00000001", "00000000"]
        let subnetmask1 = ["11111111", "11111111", "11111111", "00000000"]
        let subnetmask2 = ["11111111", "11111111", "11111111", "10000000"]
        let highermask = ["11111111", "11111111", "11111111", "00000000"]
        

        let expected1 = [
            {
                networkID: "192.168.1.0",
                networkRange: [
                    "192.168.1.1",
                    "192.168.1.254",
                    "254"
                ],
                broadcast: "192.168.1.255"
            }
        ]
        let expected2 = [
            {
                networkID: "192.168.1.0",
                networkRange: [
                    "192.168.1.1",
                    "192.168.1.126",
                    "126"
                ],
                broadcast: "192.168.1.127"
            },
            {
                networkID: "192.168.1.128",
                networkRange: [
                    "192.168.1.129",
                    "192.168.1.254",
                    "126"
                ],
                broadcast: "192.168.1.255"
            },
        ]

        expect(service.getSubnetworks(addr, subnetmask1, highermask)).toEqual(expected1)
        expect(service.getSubnetworks(addr, subnetmask2, highermask)).toEqual(expected2)
    })
});
