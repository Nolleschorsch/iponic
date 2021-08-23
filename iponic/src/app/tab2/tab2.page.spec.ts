import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
    let component: Tab2Page;
    let fixture: ComponentFixture<Tab2Page>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [Tab2Page],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();

        fixture = TestBed.createComponent(Tab2Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('showBinary returns expected value', () => {
        expect(component.showBinary).toEqual(true)
    })

    it('addrOctets returns expected value', () => {
        expect(component.addrOctets).toEqual(["11000000", "10101000", "00000001", "00000000"])
    })

    it('addrDezimals returns expected value', () => {
        expect(component.addrDezimals).toEqual(["192", "168", "1", "0"])
    })

    it('cidr returns expected value', () => {
        expect(component.cidr).toEqual("24")
    })

    it('cidr sets expected value', () => {
        component.cidr = "25"
        expect(component.cidr).toEqual("25")
    })

    it('subCidr returns expected value', () => {
        expect(component.subCidr).toEqual("24")
    })

    it('subCidr sets expected value', () => {
        component.subCidr = "25"
        expect(component.subCidr).toEqual("25")
    })

    it('useSubnetmask returns expected value', () => {
        expect(component.useSubnetmask).toEqual(false)
    })

    it('submaskDezimals returns expected value', () => {
        expect(component.submaskDezimals).toEqual(["", "", "", ""])
    })

    it('submaskOctets returns expected value', () => {
        expect(component.submaskOctets).toEqual(["", "", "", ""])
    })

    it('subnetCount returns expected value', () => {
        expect(component.subnetCount).toEqual(1)
    })

    it('subnet returns expected value', () => {
        expect(component.subnets).toEqual([])
    })

    it('subnet sets expected value', () => {
        component.subnets = [{
            networkID: "192.168.1.0",
            networkRange: [
                "192.168.1.1",
                "192.168.1.254",
                "254"
            ],
            broadcast: "192.168.1.255"
        }]
        expect(component.subnets).toEqual([{
            networkID: "192.168.1.0",
            networkRange: [
                "192.168.1.1",
                "192.168.1.254",
                "254"
            ],
            broadcast: "192.168.1.255"
        }])
    })

    it('trackByFn returns expected value', () => {
        expect(component.trackByFn(1, "bla")).toEqual(1)
    })

    it('toggleShowBinary toggles showBinary', () => {
        component.toggleShowBinary()
        expect(component.showBinary).toEqual(false)
        component.toggleShowBinary()
        expect(component.showBinary).toEqual(true)
    })

    it('toggleUseSubnetmask toggles _useSubnetmask', () => {
        component.toggleUseSubnetmask()
        expect(component.useSubnetmask).toEqual(true)
        component.toggleUseSubnetmask()
        expect(component.useSubnetmask).toEqual(false)
    })

    it('_keyPressDezimal allows valid input', () => {
        const event = { key: "1", preventDefault: () => { } }
        const index = 2
        expect(component._keyPressDezimal(event, index)).toEqual(true)
    })

    it('_keyPressDezimal prevents invalid input', () => {
        const event1 = { key: "f", preventDefault: () => { } }
        const index = 0
        expect(component._keyPressDezimal(event1, index)).toEqual(false)
        const event2 = { key: "1", preventDefault: () => { } }
        expect(component._keyPressDezimal(event1, index)).toEqual(false)
    })

    it('_keyPressSubmaskDezimal allows valid input', () => {
        const event = { key: "1", preventDefault: () => { } }
        const index = 2
        expect(component._keyPressSubmaskDezimal(event, index)).toEqual(true)
    })

    it('_keyPressSubmaskDezimal prevents invalid input', () => {
        const event1 = { key: "f", preventDefault: () => { } }
        const index = 0
        expect(component._keyPressSubmaskDezimal(event1, index)).toEqual(false)
        //const event2 = { key: "1", preventDefault: () => { } }
        //expect(component._keyPressSubmaskDezimal(event1, index)).toEqual(false)
    })

    it('_keyPressBinary allows valid input', () => {
        const event1 = {target: { value: "101" }}
        component.setAddrOctet(event1, 0)
        const event2 = {key: "1", preventDefault: () => {}}
        expect(component._keyPressBinary(event2, 0)).toEqual(true)
    })

    it('_keyPressBinary prevents invalid input', () => {
        const event1 = {key: "2", preventDefault: () => {}}
        const index = 0
        expect(component._keyPressBinary(event1, index)).toEqual(false)
        const event2 = {key: "1", preventDefault: () => {}}
        expect(component._keyPressBinary(event2, index)).toEqual(false)
    })

    it('_keyPressSubmaskBinary allows valid input', () => {
        const event1 = {target: { value: "101" }}
        component.setSubmaskOctet(event1, 0)
        const event2 = {key: "1", preventDefault: () => {}}
        expect(component._keyPressSubmaskBinary(event2, 0)).toEqual(true)
    })

    it('_keyPressSubmaskBinary prevents invalid input', () => {
        const event1 = {key: "2", preventDefault: () => {}}
        const index = 0
        expect(component._keyPressSubmaskBinary(event1, index)).toEqual(false)
        //const event2 = {key: "1", preventDefault: () => {}}
        //expect(component._keyPressSubmaskBinary(event2, index)).toEqual(false)
    })

    it('_keyPressSubnetCount allows valid input', () => {
        const event = {key: "6", preventDefault: () => {}}
        expect(component._keyPressSubnetCount(event)).toEqual(true)
    })

    it('_keyPressSubnetCount prevents invalid input', () => {
        const event = {key: "x", preventDefault: () => {}}
        expect(component._keyPressSubnetCount(event)).toEqual(false)
    })

    it('setAddrDezimal sets expected value', () => {
        const event = {target: { value: "42" } }
        const index = 0
        component.setAddrDezimal(event, index)
        expect(component.addrDezimals[index]).toEqual("42")
        expect(component.addrDezimals[index + 1]).toEqual("168")
        component.setAddrDezimal(event, index + 1)
        expect(component.addrDezimals[index + 1]).toEqual("42")
    })

    it('setAddrDezimal resets to "0" if input empty', () => {
        const event = {target: {value: ""}}
        component.setAddrDezimal(event, 0)
        expect(component.addrDezimals[0]).toEqual("0")
    })

    it('setAddrOctet sets expected value', () => {
        const event = {target: { value: "101" }}
        const index = 0
        component.setAddrOctet(event, index)
        expect(component.addrOctets[index]).toEqual("101")
        expect(component.addrOctets[index + 1]).toEqual("10101000")
        component.setAddrOctet(event, index + 1)
        expect(component.addrOctets[index + 1]).toEqual("101")
    })

    it('setAddrOctet resets to "0" if input empty', () => {
        const event = {target: {value: ""}}
        component.setAddrOctet(event, 0)
        expect(component.addrOctets[0]).toEqual("0")
    })

    it('setSubmaskDezimal sets expected value', () => {
        const event = {target: { value: "42" } }
        const index = 0
        component.setSubmaskDezimal(event, index)
        expect(component.submaskDezimals[index]).toEqual("42")
        expect(component.submaskDezimals[index + 1]).toEqual("")
        component.setSubmaskDezimal(event, index + 1)
        expect(component.submaskDezimals[index + 1]).toEqual("42")
    })

    it('setSubmaskDezimal resets to "0" if input empty', () => {
        const event = {target: {value: ""}}
        component.setSubmaskDezimal(event, 0)
        expect(component.submaskDezimals[0]).toEqual("0")
    })

    it('setSubmaskOctet sets expected value', () => {
        const event = { target: { value: "101" } }
        const index = 0
        component.setSubmaskOctet(event, index)
        expect(component.submaskOctets[index]).toEqual("101")
        expect(component.submaskOctets[index + 1]).toEqual("")
        component.setSubmaskOctet(event, index + 1)
        expect(component.submaskOctets[index + 1]).toEqual("101")
    })

    it('setSubmaskOctet resets to "0" if input empty', () => {
        const event = {target: {value: ""}}
        component.setSubmaskOctet(event, 0)
        expect(component.submaskOctets[0]).toEqual("0")
    })

    it('setSubnetCount sets expected value', () => {
        expect(component.subnetCount).toEqual(1)
        const event = {target: {value: 10}}
        component.setSubnetCount(event)
        expect(component.subnetCount).toEqual(10)
    })

    it('calculateSubnets sets expected value', () => {
        let expected = [
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
        component.calculateSubnets()
        expect(component.subnets).toEqual(expected)
    })
});
