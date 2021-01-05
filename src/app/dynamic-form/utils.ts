
export function isString(value: any): value is string {
    return typeof value === 'string';
  }

export function isDate(input: any) {
    if (Object.prototype.toString.call(input) === '[object Date]') {
        return true;
    }
    return false;
}
