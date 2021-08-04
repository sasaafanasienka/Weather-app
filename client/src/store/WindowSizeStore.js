import { get, makeAutoObservable, toJS } from "mobx"

class WindowSizeStore {

    width = 0

    constructor() {
        makeAutoObservable(this)
    }

    changeWidth(width) {
        this.width = width
    }
       
}

export default new WindowSizeStore()