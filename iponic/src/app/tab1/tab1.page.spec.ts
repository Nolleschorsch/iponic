import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
    let component: Tab1Page;
    let fixture: ComponentFixture<Tab1Page>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [Tab1Page],
            imports: [FormsModule, IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();

        fixture = TestBed.createComponent(Tab1Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('givenNumber defaults to expected value', () => {
        expect(component.givenNumber).toEqual("192")
    })

    it('givenNumber sets expected value', () => {
        component.givenNumber = "1337"
        expect(component.givenNumber).toEqual("1337")
    })

    it('bases defaults to expected value', () => {
        expect(component.bases).toEqual(["2", "8", "10", "16"])
    })

    it('givenBase defaults to expected value', () => {
        expect(component.givenBase).toEqual("10")
    })

    it('givenBase sets expected value', () => {
        component.givenBase = "8"
        expect(component.givenBase).toEqual("8")
    })

    it('wantedBase defaults to expected value', () => {
        expect(component.wantedBase).toEqual("2")
    })

    it('wantedBase sets expected value', () => {
        component.wantedBase = "10"
        expect(component.wantedBase).toEqual("10")
    })

    it('steps defaults to expected value', () => {
      expect(component.steps).toEqual("")
    })

    it('steps sets expected value', () => {
        component.steps = "lalelu"
        expect(component.steps).toEqual("lalelu")
    })

    it('stepCount defaults to expected value', () => {
      expect(component.stepCount).toEqual(0)
    })

    it('_keyPress prevents invalid input', () => {
        let event = {key: "x", preventDefault: () => {}}
        expect(component._keyPress(event)).toBeFalse()
    })

    it('_keyPress allows valid input', () => {
        let event = {key: "7", preventDefault: () => {}}
        expect(component._keyPress(event)).toBeTrue()
    })

    it('convert sets expected values', () => {
        component.givenNumber = "1"
        component.wantedBase = "10"
        component.convert()
        expect(component.wantedNumber).toEqual("1")
        expect(component.steps).toEqual("dividing 1 by 10 gives 0 rest 1\nThe converted number is 1 to the base 10")
        expect(component.stepCount).toEqual(1 + 2)
    })
});
