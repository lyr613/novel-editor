type theme_name = 'word' | 'excel' | 'ppt'
class THEME {
    public get word() {
        return {
            l1: '#002050',
            l2: '#124078',
            l3: '#2b579a',
            l4: '#3c65a4',
            l5: '#4a78b0',
            l6: '#7da3c6',
            l7: '#a5b9d1',
            l8: '#e3ecfa',
        }
    }
    public get excel() {
        return {
            l1: '#004b1c',
            l2: '#0e5c2f',
            l3: '#217346',
            l4: '#3f8159',
            l5: '#4e9668',
            l6: '#6eb38a',
            l7: '#9fcdb3',
            l8: '#e9f5ee',
        }
    }
    public get ppt() {
        return {
            l1: '#740912',
            l2: '#a92b1a',
            l3: '#b7472a',
            l4: '#c75033',
            l5: '#e86e58',
            l6: '#ed9583',
            l7: '#fdc9b5',
            l8: '#fcf0ed',
        }
    }
    public get list() {
        const names = ['word', 'excel', 'ppt']
        const arr = [this.word, this.excel, this.ppt]
        return arr.map((color, i) => ({
            name: names[i] as theme_name,
            color,
        }))
    }
}

export const themes = new THEME()
