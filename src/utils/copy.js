export default function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object' && target[key] != null) {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }
        return result
    }
    return target
}