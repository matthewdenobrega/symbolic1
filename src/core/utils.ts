
export class Utils {
    static clone(input: any): any {
        if (typeof input === 'boolean' || this.isBlank(input) || this.isNumber(input) || this.isString(input)) {
            return input
        }

        if (this.isDate(input)) {
            return new Date(input.getTime())
        }

        if (this.isArray(input)) {
            return input.map((item: any) => { return this.clone(item) })
        }

        if (this.isStringMap(input)) {
            let clone: Object = {}

            Object.keys(input).forEach((key: string) => {
                clone[key] = this.clone(input[key])
            })

            return clone
        }

        return JSON.parse(JSON.stringify(input || {}))
    }

    static isArray(input: any): boolean {
        return Array.isArray(input)
    }

    static isBlank(input: any): boolean {
        return input === undefined || input === null
    }

    static isBoolean(input: any): boolean {
        return typeof input === 'boolean'
    }

    static isDate(input: any): boolean {
        return input instanceof Date && !isNaN(input.valueOf())
    }

    static isNumber(input: any): boolean {
        return typeof input === 'number'
    }

    static isString(input: any): boolean {
        return typeof input === 'string'
    }

    static isStringMap(input: any): boolean {
        return typeof input === 'object' && input !== null
    }
}
