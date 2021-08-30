import { Injectable } from '@angular/core';

interface Cell {
    col: number
    flag: boolean
    index: number
    mine: boolean
    neighbours: Cell[]
    row: number
    toggled: boolean
}

@Injectable({
    providedIn: 'root'
})
export class MinesweeperService {

    constructor() { }


    getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    seedMines = (fieldsize: number, minecount: number) => {
        let mineIndices = new Array()
        while (mineIndices.length != minecount) {
            let mine = this.getRandomInt(0, fieldsize - 1)
            if (mineIndices.indexOf(mine) == -1) {
                mineIndices.push(mine)
            }
        }
        return mineIndices
    }

    getAdjectantCells = (field: object, width: number) => {
        let cells = []
        let size = Object.keys(field).length
        Object.keys(field).forEach((row, i) => {
            field[row].forEach((cell, j) => {
                cells.push(cell)
            })
        })
        cells.forEach((cell, i) => {
            let neighbours = []
            // left
            if (cell.col > 0) {
                neighbours.push(cells[cell.index - 1])
            }
            // right
            if (cell.col < size - 1) {
                neighbours.push(cells[cell.index + 1])
            }
            // top
            if (cell.row > 0) {
                neighbours.push(cells[cell.index - size])
                // top left
                if (cells[cell.index - size].col > 0) {
                    neighbours.push(cells[cell.index - size - 1])
                }
                // top right
                if (cells[cell.index - size].col < size - 1) {
                    neighbours.push(cells[cell.index - size + 1])
                }
            }
            // bottom
            if (cell.row < size - 1) {
                neighbours.push(cells[cell.index + size])
                // bottom left
                if (cells[cell.index + size].col > 0) {
                    neighbours.push(cells[cell.index + size - 1])
                }
                // bottom right
                if (cells[cell.index + size].col < size - 1) {
                    neighbours.push(cells[cell.index + size + 1])
                }
            }
            cell.neighbours = neighbours
        })
        /* let adjectantCells = {}
        for (var i = 0; i < size * width; i++) {
            let row = Math.floor(i / width)
            if (!(row in adjectantCells)) {
                adjectantCells[row] = []
            }
            adjectantCells[row][i % width] = cells[i]
        } */
        let adjectantCells = []
        for (var i = 0; i < size * width; i++) {
            let row = Math.floor(i / width)
            if (!adjectantCells[row]) {
                adjectantCells[row] = []
            }
            adjectantCells[row][i % width] = cells[i]
        }
        return adjectantCells

    }

    createField = (height: number, width: number, mines: number) => {

        const size = height * width
        let cells = {}
        const mineIndices = this.seedMines(size, mines)
        for (var i = 0; i < size; i++) {
            let isMine = mineIndices.indexOf(i) != -1 ? true : false
            let row = Math.floor(i / width)
            if (!(row in cells)) {
                cells[row] = []
            }
            cells[row].push({ mine: isMine, index: i, toggled: false, flag: false, row: Math.floor(i / width), col: i % width })
        }
        let adjectantCells = this.getAdjectantCells(cells, width)
        return adjectantCells
    }

    handleToggleCell = (cell, done, field) => {

        // HEADS UP: THIS MIGHT CAUSE TROUBLE!!!!

        if (!cell.toggled) {
            //done.push(cell.index)
            cell.toggled = true
            done.push(cell)
            //dispatch(toggleCell(cell))
        }
        cell.neighbours.forEach(neighbour => {
            if (!neighbour.mine && !neighbour.toggled && done.indexOf(neighbour.index) == -1) {
                //dispatch(toggleCell(neighbour))
                neighbour.toggled = true
                done.push(neighbour)
                let adjMines = neighbour.neighbours.filter(cell => cell.mine == true).length
                if (adjMines == 0) {
                    //dispatch(handleToggleCell(neighbour, done))
                    this.handleToggleCell(neighbour, done, field)
                }
            }
        })

        let doneSet = new Set(done)
        let fuckyou = [...doneSet]
        fuckyou.forEach((cell: Cell) => field[cell.row][cell.col] = cell)

        return field
    }

    /*  handleSettingChange = setting => {
       return dispatch => {
         switch (setting.type) {
           case "size":
             //dispatch(setHeight(setting.value))
             //dispatch(setWidth(setting.value))
           case "mines":
             //dispatch(setMines(setting.value))
         }
       }
     } */

}
