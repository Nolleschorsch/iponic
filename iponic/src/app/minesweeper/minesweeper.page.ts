import { Component, OnInit } from '@angular/core';
import { MinesweeperService } from '../minesweeper.service';


@Component({
    selector: 'app-minesweeper',
    templateUrl: 'minesweeper.page.html',
    styleUrls: ['minesweeper.page.scss'],
})
export class MinesweeperPage implements OnInit {

    private _height: number = 10
    private _width: number = 10
    private _mines: number = 10
    private _field: any[]
    public fieldRow: string

    constructor(private msService: MinesweeperService) { }

    ngOnInit() {
        this._field = this.msService.createField(this._height, this._width, this._mines)
        console.log(this._field)
    }

    get height(): number {
        return this._height
    }

    set height(height: number) {
        this._height = height
    }

    get width(): number {
        return this._width
    }

    set width(width: number) {
        this._width = width
    }

    get mines(): number {
        return this._mines
    }

    set mines(mines: number) {
        this._mines = mines
    }

    get field(): any[] {
        return this._field
    }

    newGame() {
        this._field = this.msService.createField(this._height, this._width, this._mines)
    }

    getMaxMines() {
        return this._height * this._width
    }

    getStyle(cell) {
        const adjMines = cell.neighbours.filter(cell => cell.mine == true).length
        //const style = getCellStyle(cell.toggled, cell.mine, adjMines)
        if (!cell.toggled) {
            return "cell cellStyleDefault"
          }
          if (cell.mine) {
            return "cell cellStyleMine"
          }
          switch (adjMines) {
            case 1:
              return "cell cellStyle1"
            case 2:
              return "cell cellStyle2"
            case 3:
              return "cell cellStyle3"
            case 4:
              return "cell cellStyle4"
            case 5:
              return "cell cellStyle5"
            case 6:
              return "cell cellStyle6"
            case 7:
              return "cell cellStyle7"
            case 8:
              return "cell cellStyle8"
            default:
              return "cell cellStyle0"
          }
    }

    getAdjMines(cell) {
        return cell.neighbours.filter(cell => cell.mine == true).length
    }

    handleToggleCell(cell: object, done: [], field: any[]) {
        const foo = this.msService.handleToggleCell(cell, done, field)
        this._field = foo
    }

}
