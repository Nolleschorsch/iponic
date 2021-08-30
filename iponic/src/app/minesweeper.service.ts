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


export const cellStyleDefault = {
    width: "50px",
    height: "50px",
    border: "solid black 1px",
    textAlign: "center",
    display: "table-cell",
    verticalAlign: "middle",
    backgroundColor: '#aaa',
    color: "#aaa",
    fontWeight: "bold",
}

export const cellStyleMine = Object.assign({}, cellStyleDefault, {
    backgroundColor: "red"
})

export const cellStyle0 = Object.assign({}, cellStyleDefault, {
    color: "#ccc",
    backgroundColor: "#ccc"
})

export const cellStyle1 = Object.assign({}, cellStyleDefault, {
    color: "blue",
    backgroundColor: "#ccc"
})

export const cellStyle2 = Object.assign({}, cellStyleDefault, {
    color: "green",
    backgroundColor: "#ccc"
})

export const cellStyle3 = Object.assign({}, cellStyleDefault, {
    color: "red",
    backgroundColor: "#ccc"
})

export const cellStyle4 = Object.assign({}, cellStyleDefault, {
    color: "purple",
    backgroundColor: "#ccc"
})

export const cellStyle5 = Object.assign({}, cellStyleDefault, {
    color: "maroon",
    backgroundColor: "#ccc"
})

export const cellStyle6 = Object.assign({}, cellStyleDefault, {
    color: "turqoise",
    backgroundColor: "#ccc"
})

export const cellStyle7 = Object.assign({}, cellStyleDefault, {
    color: "black",
    backgroundColor: "#ccc"
})

export const cellStyle8 = Object.assign({}, cellStyleDefault, {
    color: "gray",
    backgroundColor: "#ccc"
})

export const cs = {
    cellStyleDefault, cellStyleMine, cellStyle0, cellStyle1, cellStyle2, cellStyle3,
    cellStyle4, cellStyle5, cellStyle6, cellStyle7, cellStyle8
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

    getCellStyle = (revealed: boolean, isMine: boolean, adjMines: number) => {

        if (!revealed) {
            return cs.cellStyleDefault
        }
        if (isMine) {
            return cs.cellStyleMine
        }
        switch (adjMines) {
            case 1:
                return cs.cellStyle1
            case 2:
                return cs.cellStyle2
            case 3:
                return cs.cellStyle3
            case 4:
                return cs.cellStyle4
            case 5:
                return cs.cellStyle5
            case 6:
                return cs.cellStyle6
            case 7:
                return cs.cellStyle7
            case 8:
                return cs.cellStyle8
            default:
                return cs.cellStyle0
        }
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
