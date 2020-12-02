
export function parseColor(color) {
    if (typeof color == 'string') {
        color = color.trim()
        if (color[0] === '#') {
            color = color.substr(1)
        }
        // white needs to be 6 f's or else get parsed incorrectly
        if (color.toLowerCase() === 'fff') {
            color = 'ffffff'
        }
        return parseInt(color, 16)
    }

    return color
}