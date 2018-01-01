// App imports
import { Association, Symbol } from './core.data'
import { Utils } from './utils'

export class Core {
    // Symbol contextualization algorithm
    static contextualize(symbol: Symbol, context: Association[]): Symbol {
        if (!symbol) { return null }

        symbol.associations = [];

        (context || []).forEach((associationFromContext: Association) => {
            symbol.associations.push({
                strength: associationFromContext.strength,
                symbol: associationFromContext.symbol
            })
        })

        return symbol
    }

    // Interaction between memory layers
    static merge(sourceMemory: Association[], targetMemory: Association[], mergeFactor: number = 1): Association[] {
        let mergedMemory: Association[] = [];

        (sourceMemory || []).forEach((sourceAssociation: Association) => {
            let targetAssociation: Association = (targetMemory || []).find((targetAssociation: Association) => {
                return targetAssociation.symbol === sourceAssociation.symbol
            })

            let targetStrength: number = targetAssociation ? targetAssociation.strength : 0
            let strength: number = ((1 - mergeFactor) * targetStrength) + (mergeFactor * sourceAssociation.strength)

            mergedMemory.push({
                strength: strength,
                symbol: sourceAssociation.symbol
            })
        })

        mergedMemory = mergedMemory.concat((targetMemory || []).filter((targetAssociation: Association) => {
            return !sourceMemory.find((sourceAssociation: Association) => {
                return targetAssociation.symbol === sourceAssociation.symbol
            })
        }))

        return mergedMemory
        // TODO - think in general about exponential decay of associations in memory and re-normalizing strengths
    }

    // Introduction of a new symbol into memory
    static push(symbol: Symbol, memory: Association[], memoryLimit?: number): Association[] {
        if (!symbol) { return memory }

        memory = (memory || []).filter((association: Association) => {
            return association.symbol !== symbol
        })

        if (memoryLimit) { memory = memory.slice(0, memoryLimit - 1) }

        memory.unshift({
            strength: 1,
            symbol: symbol
        })

        return memory
    }

    // Pattern recognition algorithm
    static recognize(pattern: Association[], memory: Association[]): Association {
        if (!pattern || !pattern.length) { return null }
        if (!memory || !memory.length) { return null }

        // Naive initial implementation - take first association and match name
        let symbolName: string = pattern[0].symbol.name

        return memory.find((association: Association) => {
            return association.symbol.name === symbolName
        })
    }
}