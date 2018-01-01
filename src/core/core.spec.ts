// App imports
import { Association, Symbol } from './core.data'
import { Core } from './core'

describe('Core', () => {
    describe('contextualize', () => {
        it('should do nothing for empty input', () => {
            expect(Core.contextualize(null, null)).toBe(null)
        })

        it('should return the symbol if there is no context', () => {
            let symbol: Symbol = { name: 'test' }

            expect(Core.contextualize(symbol, null)).toEqual(symbol)
        })

        it('should add the context as associations to the symbol', () => {
            let symbol: Symbol = { name: 'test' }

            let contextSymbol: Symbol = { name: 'symbol' }
            let context: Association[] = [{ strength: 0.5, symbol: contextSymbol }]

            symbol = Core.contextualize(symbol, context)

            expect(symbol.associations.length).toEqual(1)
            expect(symbol.associations[0].strength).toEqual(0.5)
            expect(symbol.associations[0].symbol).toEqual(contextSymbol)
        })
    })

    describe('merge', () => {
        it('should do nothing for empty source and empty target', () => {
            expect(Core.merge(null, null)).toEqual([])
        })

        it('should do nothing for empty source', () => {
            expect(Core.merge(null, [])).toEqual([])
        })

        it('should do nothing for empty target', () => {
            expect(Core.merge([], null)).toEqual([])
        })

        it('should merge in a source association if the target memory is empty', () => {
            let source: Association[] = [{ strength: 1, symbol: { name: 'test' } }]

            expect(Core.merge(source, [])).toEqual([{ strength: 1, symbol: source[0].symbol }])
        })

        it('should keep target associations even if they do not appear in the source', () => {
            let target: Association[] = [{ strength: 1, symbol: { name: 'test' } }]

            expect(Core.merge([], target)).toEqual([{ strength: 1, symbol: target[0].symbol }])
        })

        it('should control the strength based on the merge factor', () => {
            let source: Association[] = [{ strength: 1, symbol: { name: 'test' } }]

            expect(Core.merge(source, [], 0.5)).toEqual([{ strength: 0.5, symbol: source[0].symbol }])
        })

        it('should merge associations if the underlying symbol exists in both memories', () => {
            let symbol: Symbol = { name: 'test' }
            let source: Association[] = [{ strength: 1, symbol: symbol }]
            let target: Association[] = [{ strength: 0.5, symbol: symbol }]

            expect(Core.merge(source, target, 0.5)).toEqual([{ strength: 0.75, symbol: symbol }])
        })
    })

    describe('push', () => {
        it('should do nothing for empty input and empty memory', () => {
            expect(Core.push(null, null)).toBe(null)
        })

        it('should do nothing for empty input', () => {
            expect(Core.push(null, [])).toEqual([])
        })

        it('should add the input as the only entry in memory for empty memory', () => {
            let symbol: Symbol = { name: 'test' }

            expect(Core.push(symbol, null)).toEqual([{ strength: 1, symbol: symbol }])
        })

        it('should add the input as the first entry in memory if there are already memory associations', () => {
            let symbol: Symbol = { name: 'test' }
            let memory: Association[] = [{ strength: 0.5, symbol: { name: 'symbol' } }]

            memory = Core.push(symbol, memory)

            expect(memory.length).toEqual(2)
            expect(memory[0].strength).toEqual(1)
            expect(memory[0].symbol.name).toEqual('test')
            expect(memory[1].strength).toEqual(0.5)
            expect(memory[1].symbol.name).toEqual('symbol')
        })

        it('should limit the size of memory at the memory limit', () => {
            let symbol: Symbol = { name: 'test' }
            let memory: Association[] = [{ strength: 0.5, symbol: { name: 'symbol' } }]

            memory = Core.push(symbol, memory, 1)

            expect(memory.length).toEqual(1)
            expect(memory[0].symbol.name).toEqual('test')
        })

        it('should promote the symbol if it is already in memory', () => {
            let symbol: Symbol = { name: 'test' }
            let memory: Association[] = [{ strength: 0.5, symbol: symbol }]

            memory = Core.push(symbol, memory)

            expect(memory.length).toEqual(1)
            expect(memory[0].strength).toEqual(1)
            expect(memory[0].symbol.name).toEqual('test')
        })
    })

    describe('recognise', () => {
        it('should not recognise an empty input if there is no memory', () => {
            expect(Core.recognize(null, null)).toBe(null)
        })

        it('should not recognise an empty input if there is memory', () => {
            expect(Core.recognize(null, [{ strength: 1, symbol: { name: 'test' } }])).toBe(null)
        })

        it('should not recognise an input if there is no memory', () => {
            expect(Core.recognize([{ strength: 1, symbol: { name: 'test' } }], null)).toBe(null)
        })

        it('should not recognise an input if there is memory but no match in memory', () => {
            expect(Core.recognize([{ strength: 1, symbol: { name: 'test' } }, { strength: 1, symbol: { name: 'cat' } }], null)).toBe(null)
        })

        it('should recognise an input if there is memory and a match in memory', () => {
            let pattern: Association[] = [{ strength: 1, symbol: { name: 'test' } }]
            let memory: Association[] = [{ strength: 1, symbol: { name: 'test' } }]
            expect(Core.recognize(pattern, memory)).toEqual(memory[0])
        })
    })
})