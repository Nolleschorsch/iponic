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

    it('trackByFn returns expected value', () => {
        expect(component.trackByFn(1, "bla")).toEqual(1)
    })

    it('toggleShowBinary toggles showBinary', () => {
        component.toggleShowBinary()
        expect(component.showBinary).toEqual(false)
        component.toggleShowBinary()
        expect(component.showBinary).toEqual(true)
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

    it('_keyPressBinary allows valid input', () => {
        const event1 = new CustomEvent("", { detail: { value: "101" } })
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

    it('setAddrDezimal sets expected value', () => {
        const event = new CustomEvent("", { detail: { value: "42" } })
        const index = 0
        component.setAddrDezimal(event, index)
        expect(component.addrDezimals[index]).toEqual("42")
        expect(component.addrDezimals[index + 1]).toEqual("168")
        component.setAddrDezimal(event, index + 1)
        expect(component.addrDezimals[index + 1]).toEqual("42")
    })

    it('setAddrOctet sets expected value', () => {
        const event = new CustomEvent("", { detail: { value: "101" } })
        const index = 0
        component.setAddrOctet(event, index)
        expect(component.addrOctets[index]).toEqual("101")
        expect(component.addrOctets[index + 1]).toEqual("10101000")
        component.setAddrOctet(event, index + 1)
        expect(component.addrOctets[index + 1]).toEqual("101")
    })
});
