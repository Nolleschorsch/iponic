import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Ipv4NetworkingService } from '../ipv4-networking.service';
import { NumberSystemConverterService } from "../number-system-converter.service"

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    private _showBinary: boolean = false//true
    private _addrOctets: string[] = ["11000000", "10101000", "00000001", "00000000"]
    private _addrDezimals: string[] = ["192", "168", "1", "0"]
    private _cidr: string = "24"
    private _subCidr: string = "24"
    private _submaskDezimals: string[] = ["", "", "", ""]
    private _submaskOctets: string[] = ["", "", "", ""]
    private _subnetCount: number = 1
    private _useSubnetmask: boolean = false
    private _subnets = [] //TODO: interface
    public cidrRange: number[] = [...Array(33).keys()].map((v, i) => i)
    public subCidrRange: number[] = [...Array(33).keys()].map((v, i) => i)

    constructor(
        private converterService: NumberSystemConverterService,
        private fooService: Ipv4NetworkingService,
        public toastController: ToastController) { }

    get showBinary(): boolean {
        return this._showBinary
    }

    get addrOctets(): string[] {
        return this._addrOctets
    }

    get addrDezimals(): string[] {
        return this._addrDezimals
    }

    get cidr(): string {
        return this._cidr
    }

    set cidr(cidr: string) {
        this._cidr = cidr
        this._subnets = []
    }

    get subCidr(): string {
        return this._subCidr
    }

    set subCidr(subCidr: string) {
        this._subCidr = subCidr
        let bits = parseInt(subCidr) - parseInt(this._cidr)
        this._subnetCount = Math.pow(2, bits)
        this._subnets = []
    }

    get useSubnetmask(): boolean {
        return this._useSubnetmask
    }

    get submaskDezimals(): string[] {
        return this._submaskDezimals
    }

    get submaskOctets(): string[] {
        return this._submaskOctets
    }

    get subnetCount(): number {
        return this._subnetCount
    }

    set subnetCount(count: number) {
        this._subnetCount = count
        this._subnets = []
    }

    get subnets(): any[] {
        return this._subnets
    }

    set subnets(subnets: any[]) {
        this._subnets = subnets
    }

    trackByFn(index, item) {
        return index;
    }

    toggleShowBinary() {
        this._showBinary = !this._showBinary
    }

    toggleUseSubnetmask() {
        this._useSubnetmask = !this._useSubnetmask
    }

    _keyPressDezimal(event: any, index: number) {
        // prevent user from inserting invalid input
        const digits: string[] = this.converterService.getDigits("10")
        const validDigits: boolean = this.converterService.isValidNumber(event.key, digits)
        const value = parseInt(this.addrDezimals[index] + event.key)
        const validRange: boolean = value >= 0 && value <= 255
        const valid = validDigits && validRange

        if (!valid) {
            event.preventDefault();
        }
        return valid
    }

    _keyPressSubmaskDezimal(event: any, index: number) {
        // prevent user from inserting invalid input
        const digits: string[] = this.converterService.getDigits("10")
        const validDigits: boolean = this.converterService.isValidNumber(event.key, digits)
        const value = parseInt(this.submaskDezimals[index] + event.key)
        const validRange: boolean = value >= 0 && value <= 255
        const valid = validDigits && validRange

        if (!valid) {
            event.preventDefault();
        }
        return valid
    }

    _keyPressBinary(event: any, index: number) {
        // prevent user from inserting invalid input
        const digits: string[] = this.converterService.getDigits("2")
        const validDigits: boolean = this.converterService.isValidNumber(event.key, digits)
        const value = this.addrOctets[index] + event.key
        const validRange: boolean = value.length <= 8
        const valid = validDigits && validRange

        if (!valid) {
            event.preventDefault();
        }
        return valid
    }

    _keyPressSubmaskBinary(event: any, index: number) {
        // prevent user from inserting invalid input
        const digits: string[] = this.converterService.getDigits("2")
        const validDigits: boolean = this.converterService.isValidNumber(event.key, digits)
        const value = this.submaskOctets[index] + event.key
        const validRange: boolean = value.length <= 8
        const valid = validDigits && validRange

        if (!valid) {
            event.preventDefault();
        }
        return valid
    }

    _keyPressSubnetCount(event: any) {
        const digits: string[] = this.converterService.getDigits("10")
        const validDigits: boolean = this.converterService.isValidNumber(event.key, digits)

        if (!validDigits) {
            event.preventDefault();
        }
        return validDigits
    }

    setAddrDezimal(event, index: number) {
        const value = event.target.value === "" ? "0" : event.target.value
        this._addrDezimals[index] = value
        this._subnets = []
    }

    setAddrOctet(event, index: number) {
        const value = event.target.value === "" ? "0" : event.target.value
        this._addrOctets[index] = value
        this._subnets = []
    }

    setSubmaskDezimal(event, index: number) {
        const value = event.target.value === "" ? "0" : event.target.value
        this._submaskDezimals[index] = value
        this._submaskOctets[index] = this.converterService.dezimalToBinary(value)
    }

    setSubmaskOctet(event, index: number) {
        const value = event.target.value === "" ? "0" : event.target.value
        this._submaskOctets[index] = value
        this._submaskDezimals[index] = this.converterService.binaryToDezimal(value)
    }

    calculateSubnets() {
        const subnetmask = this.useSubnetmask
            ? this.fooService.getSubnetmaskFromCidr(this.subCidr)
            : this.fooService.getSubnetmaskFromSubnetCount(this.subnetCount, this.cidr)

        const highermask = this.fooService.getSubnetmaskFromCidr(this.cidr)
        if (subnetmask) {
            this._subnets = this.fooService.getSubnetworks(this.addrOctets, subnetmask, highermask)
            this._subCidr = subnetmask.reduce((a,octet) => [...octet].reduce((x,v) => v === "1" ? x+1 : x, a),0).toString()
            this._submaskDezimals = subnetmask.map(x => this.converterService.binaryToDezimal(x))
            this._submaskOctets = subnetmask
        }
        else {
            this.presentToast("Not possible!")
        }
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
}
