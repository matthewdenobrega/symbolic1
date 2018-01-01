export class Association {
    strength: number
    symbol: Symbol
}

export class Symbol {
    associations?: Association[] = []
    name: string
}
