import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NumberSystemConverterService } from '../number-system-converter.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    private _givenNumber: string = "192"
    private _wantedNumber: string = ""
    private _bases: string[] = ["2", "8", "10", "16"]
    private _givenBase: string = "10"
    private _wantedBase: string = "2"
    private _steps: string = ""
    private _stepCount: number = 0

    constructor(
        public toastController: ToastController,
        private converterService: NumberSystemConverterService
    ) { }

    get givenNumber(): string {
        return this._givenNumber
    }

    set givenNumber(number: string) {
        this._givenNumber = number
    }

    get bases(): string[] {
        return this._bases
    }

    get givenBase(): string {
        return this._givenBase
    }

    set givenBase(base: string) {
        this._givenBase = base
    }

    get wantedBase(): string {
        return this._wantedBase
    }

    set wantedBase(base: string) {
        this._wantedBase = base
    }

    get wantedNumber(): string {
        return this._wantedNumber
    }

    set wantedNumber(number: string) {
        this._wantedNumber = number
    }

    get steps(): string {
        return this._steps
    }

    set steps(steps: string) {
        this._steps = steps
    }

    get stepCount(): number {
        return this._stepCount
    }

    _keyPress(event: any) {

        const digits: string[] = this.converterService.getDigits(this._givenBase)
        const valid: boolean = this.converterService.isValidNumber(event.key, digits)

        if (!valid) {
            event.preventDefault();
        }
        return valid
    }

    convert() {
        let [wantedNumber, steps] = this.converterService.convertAny(this._givenBase, this._givenNumber, this._wantedBase)
        this._wantedNumber = wantedNumber
        this._steps = steps
        this._stepCount = [...steps].reduce((a, v) => v === "\n" ? a + 1 : a, 0) + 2
    }

    copyToClipboard() {
        if (!navigator.clipboard) {
            this.presentToast("Not supported on your system.")
            return;
        }
        navigator.clipboard.writeText(this._wantedNumber).then(
            () => {
                this.presentToast("Copied to clipboard.")
            },
            (err) => {
                this.presentToast("Something went wrong.")
                console.log({err})
            }
        )
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

}
