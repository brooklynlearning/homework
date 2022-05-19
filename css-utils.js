
const colorPairs = [
    [
        '#69d2e7',
        '#f38630',
    ],
    [
        '#fe4365',
        '#83af9b',
    ],
    [
        '#ff6b6b',
        '#4ecdc4',
    ],
    [
        '#ece5ce',
        '#c5e0dc',
    ],
    [
        '#031634',
        '#e8ddcb',
    ],
    [
        '#45ada8',
        '#9de0ad',
    ],
    [
        '#c6e5d9',
        '#e94e77',
    ],
    [
        '#ff9e9d',
        '#ff3d7f',
    ],
    [
        '#00dffc',
        '#008c9e',
    ],
    [
        '#f0b49e',
        '#f7e4be',
    ],
    [
        '#ff847c',
        '#f6f7bd',
    ],
]
function cssDecompose(s) {
    const regex = /^(.*?) {\n([^]+?)\n}/m
    const fn = compose(runner, trimmed, dedent)

    function runner(s) {
        const regex = test(/;/, s) ? /;\s*$/m : /\s*$/m
        const items = split(s, regex)
        const value = items.filter(exists).map((x) => split(x, / *: */))
        return value
    }
    const m = s.trim().match(regex)
    if (m) {
        let [_, a, b] = m
        let properties = runner(b)
        if (properties.length == 0) {
            return
        }
        return {
            name: a,
            properties,
        }
    }
}
function aggregateCSS(s, mode = String) {
    const regex = /^(.*?)\s*{([^]+?)}/gm
    const ignore = ['foo', 'boo', 'mockup']
    const fn = compose(runner, trimmed, dedent)
    storage = new Storage()
    findall(regex, s).forEach(([a, b]) => {
        a = a.trim()
        if (test(/foo|boo|mockup/, a)) return 
        const pairs = fn(b)
        for (let [c, d] of pairs) {
            if (!c || !d) continue
            storage.add(a, c, d)
        }
    })

    function runner(s) {
        const regex = test(/;/, s) ? /;\s*$/m : /\s*$/m
        const items = split(s, regex)
        const value = items.filter(exists).map((x) => split(x, / *: *(?!['"])/))
        return value
    }

    if (mode == Storage) {
        return storage
    }

    //console.log(storage.entries)
    //console.log(); throw ''
    // will not be present
    if (mode == String) {
        let positionKeys = ['relative', 'fixed', 'absolute']
        return cssCleanupFinalString(
            reduceToString(storage.entries, (k, v) => {
                if (!intersects(v, positionKeys)) {
                    pop(v, 'top')
                    pop(v, 'bottom')
                    pop(v, 'left')
                    pop(v, 'right')
                }
                return toCssFinalProduct(k, v)
            })
        )
    } else {
        return reduce(storage.entries, (k, v) => {
            return [k.replace(/^\W/, ''), toCssFinalProduct(k, v)]
        })
    }
}

function toCssFinalProduct(a, b) {
    const name = fixSelector(a)
    const value = cssReduce(b)
    //console.log(value)
    return brackify(name, value)
}

function imageGetter(s) {
    const value = ImageLibrary[s] || s
    return addExtension(value, 'jpeg')
}

function cssImgParser(s) {
    return [
        ['background-image', `url("${imageGetter(s)}")`],
        ['background-size', 'cover'],
        ['background-position', 'center center'],
    ]
}
function backgroundPositionParser(s) {
    const dict = {
        't': 'top',
        'l': 'left',
        'r': 'right',
        'b': 'bottom',
        'c': 'center',
    }
    let [a,b] = s.length == 4 ? [s.slice(0, 2), s.slice(2)] :
    [s[0], s[1]]
   const value =  a + '%' + ' ' + b + '%'
    return [['background-position', value]]
}
function cssBox() {
    return [
        ['width', '50px'],
        ['height', '50px'],
        ['background', randomColor()],
    ]
}
const cssFunctions = {
    'box': cssBox,
    'bgp': backgroundPositionParser,
    'bgg': backgroundGradient,
    'img': cssImgParser,
}
            //return [
                //['position', 'absolute'],
                //['top', posX + '%'],
                //['left', posY + '%'],
            //]
let lastCssKey
let lastCssValue
function cssValueParser(a, b) {
    let initialKey = a
    let key = cssattrmap[a]
    if (isFunction(key)) {
        return key(b)
    }
    //console.log({a, key, b})

    if (!b) return [key, 0]
    b = b.replace(/\$[a-zA-Z]+/, (x) => 'var' + parens('--' + x.slice(1)))
    const initials = ['none', 'transparent', 'unset', 'initial', 'auto']

    if (b == 'u' || b == 'n') {
        if (key == 'border' && a != 'border') key = 'bottom'
        return [key, 'unset']
    }
    if (initials.includes(b)) return [key, b]
    if (b.startsWith('calc')) return [key, cssCalc(b.slice(4))]
    if (test(/^-?\d{1,2}$/, a)) return cssPosition(a, b)

    switch (a) {
        case 'o':
            if (b.length < 2 || isNumber(b)) {
                if (Number(b) > 1) b = b/10
                return [key, b]
            }
            key = 'outline'
            return cssBorder(b, key)
        case 'br':
            if (b.length < 2 || isNumber(b)) break
            key = 'border-right'
        case 'bl':
        case 'bt':
        case 'bb':
        case 'b':
            if (b.length < 2 || isNumber(b)) {
                return ['bottom', b + '%']
            }
        case 'border':
            return cssBorder(b, key)
        case 'z':
        case 'zi':
        case 'offset':
        case 'scale':
        case 'fw':
            return [key, Number(b) < 10 ? b * 100 : b]
        case 'pos':
            let translateX
            let translateY

            let [posX, posY] =
                b.length == 2
                    ? b.split('').map((x) => Number(x) * 10)
                    : b.split(/(?=\w\w$)/).map(Number)

            return [
                ['position', 'absolute'],
                ['top', posX + '%'],
                ['left', posY + '%'],
            ]
    }

    if (test(/color|background/, key)) {
        return [key, cssColor(b)]
    }

    //console.log([b, key, 'hi'])
    b = cssUnit(b, key || initialKey)

    switch (a) {
        case 'tx':
        case 'ty':
        case 'r':
            return ['transform', key + parens(doublequote(b))]
        case 'wh':
            return [
                ['width', b],
                ['height', b],
            ]
        case 'px':
        case 'py':
        case 'mx':
        case 'my':
            let $key = cssattrmap[a[0]]
            let $dirs = a[1] == 'x' ? ['left', 'right'] : ['top', 'bottom']
            return $dirs.map(($dir) => [$key + '-' + $dir, b])
    }

    return [key, b]
}

const cssAliases = {
    'kf': 'keyframes',
    'grid': 'grid',
    'gr': 'grid-template-rows',
    'gc': 'grid-template-columns',
}
const cssRef = {
    gr(s) {
        
    },
}
function cssEvaluator(s) {
    if (isObject(s)) {
        return s
    }
    if (test(/^;/, s)) {
        return toDictionary(cssSingletonParser(removeStartingSymbols(s)))
    }

    const [a, b] = splitonce(s)
    if (a in cssFunctions) return cssFunctions[a](b)

    const items = hasColon(s)
        ? split(s, /: ? +/)
        : splitOptionalComma(s).reduce(cssItemReducer, [])

    return toDictionary(items)
}

function cssItemReducer(acc, item) {
    function cssPush(item) {
        if (!item) return 
        let nested = isNestedArray(item)
        ;[lastCssKey, lastCssValue] = nested ? 
            item[0] : item

        if (nested) { acc.push(...item) } 
        else { acc.push(item) }
    }
    if (item in cabalias) {
        cssPush(cabmap[cabalias[item]])
    } else if (item in cabmap) {
        cssPush(cabmap[item])
    } else {
        let match = search(cssParserGlobalREGEX, item)
        if (match) cssPush(cssValueParser(...match))
    }

    return acc
}

function cssParser(name, value) {
    if (!value) return
    if (isStandardCss(value)) {
        return value
    }
    if (name == 'import') return assets.css[value] || ''
    return toCssFinalProduct(name, cssEvaluator(value))
}

function cssReduce(css, mode) {
    if (mode == Object) {
        return reduce(css, (a, b) => [toCamelCase(a), b])
    }
    return reduceToString(css, cssEntry)
}

function cssEntry(a, b) {
    return a + ': ' + b + ';'
}

function cssCalc(b) {
    //console.log('hi')
    const expr = b
        .replace(/\dp/g, (x) => x[0] + '%')
        .replace(/\d(?=$|[ -])/g, (x) => x + 'px')
    return stringcall('calc', expr)
}

function cssAnimation(b) {
    let items = b.split(/(\d)/)
    let animation
    let duration = '1s'
    let easing = 'ease-in-out'
    let iterations = 1
    let delay = 0
    switch (items.length) {
        case 1:
            animation = items[0]

        case 2:
            animation = items[0]
            duration = items[1] + 's'

        case 3:
            animation = items[0]
            duration = items[1] + 's'
            iterations = 'infinite'
    }
    return joined(animation, duration, easing, delay, iterations, ' ')
}

function cssColorMatch(b) {
    let [color, fontNumber] = hasNumber(b) ? splitNumberBoundary(b) : [b, 5]

    let bgNumber = 9 - fontNumber || 1

    let fontColor = cssColor(color, fontNumber)
    let bgColor = cssColor(color, bgNumber)

    return [
        ['color', fontColor],
        ['background', bgColor],
    ]
}

function cssAddPeriod(s) {
    return startsWithPeriod(s) ? s : '.' + s
}



const GoogleFontList = [
    'Fauna One',
    'Oleo Script',
    'Fugaz One',
    'Monda',
    'Unica One',
    'Alegreya',
    'Abril Fatface',
    'Vollkorn',
    'Megrim',
    'Roboto Slab',
    'Open Sans',
    'Gentium Basic',
    'Questrial',
    'Old Standard TT',
    'Ovo',
    'Muli',
    'Playfair Display',
    'Vast Shadow',
    'Oswald',
    'Playfair Display SC',
    'Neuton',
    'Quattrocento',
    'Fanwood Text',
    'Exo ',
    'Inknut Antiqua',
    'Quando',
    'Judson',
    'Montserrat',
    'Vollkorn',
    'Exo',
    'Stint Ultra Expanded',
    'Slabo ',
    'Ultra',
    'Open Sans Condensed',
    'Lora',
    'Alfa Slab One',
    'Gentium Book Basic',
    'Nixie One',
    'Libre Baskerville',
    'Julius Sans One',
    'Crimson Text',
    'Almendra Display',
    'Cardo',
    'Philosopher',
    'Cinzel Decorative',
    'Amiri',
    'Oswald',
    'Yeseva One',
    'Merriweather Sans',
    'Merriweather',
    'Mr De Haviland',
    'Neuton',
    'Scope One',
    'Shrikhand',
    'Sansita One',
    'Chonburi',
    'Fjord One',
    'BioRhyme',
    'Lemon',
    'Poppins',
    'Halant',
]


const FontList = [
    'Montserat',
    'Lato',
    'Poppins',
    'Open Sans',
    'Roboto',
    'Raleway',
    'Cormorant',
    'DM Sans',
    'DM Serif',
    'Arvo',
    'Playfair Display',
    'Montserrat',
    'Source Serif Pro',
    'Source Sans Pro',
    'Kameron',
    'Neuton',
    'Varela Round',
    'IBM Plex Sans',
    'IBM Plex Serif',
    'Alegreya',
    'EB Garamond',
    'Fira Sans',
    'IBM Plex Sans',
    'IBM Plex Serif',
    'Merriweather',
    'Montserrat',
    'Newsreader',
    'Rosario',
    'Rosarivo',
    'Recursive',
    'Spectral',
    'Ubuntu',
    'Vollkorn',
]
const FontLibrary = {
    '': 'foo'
}

const ImageLibrary = {
    
}

function backgroundGradient(s) {
    /* never know what it will be */
    //-?\d+(?:[a-z]\d+)
    const items = split(s, /(?=[a-z])/)
    let extra = ''
    const values = items.map((item, i) => {
        if (i == 0) {
            if (isNumber(item)) {
                return i + 'deg'
            }
            else {
                extra = 'to right, '
            }
        }

        let [a,b] = [item.slice(0, 2), item.slice(2)]
        //console.log([a,b])
        let color = cssColor(a)
        let offset = b ? b + '%' : ''
        return color + ' ' + offset
    })
    const arg = extra + values.join(', ')
    const output = `linear-gradient(${arg})`
    return [['background', output]]
}

function cssPcal(s) {
    let options
    ;[s, options] = getOptions(s)
    let ref = ['bl', 'br', 'b', 'tl', 'tr', 't']
    let [A, B] = argsplit(s, ref)
    let k = 1
    let margin = 50
    let bottomMargin = margin
    let rightMargin = margin

    if (options.bottom) bottomMargin += Number(options.bottom)
    if (options.right) rightMargin += Number(options.right)

    margin += 'px'
    bottomMargin += 'px'
    rightMargin += 'px'

    switch (A) {
        case 'bl':
        case 'br':
            return [
                ['width', B + '%'],
                ['right', rightMargin],
                ['bottom', bottomMargin],
            ]
        case 'b':
        case 'tl':
        case 'b':
        case 'b':
            return
    }

    throw ''

    if (options.half) {
        k = 0.5
        return [['width', `calc(${k} * (100% - 2 * ${b})`]]
    } else {
        return [
            ['width', `calc(100% - 2 * ${b})`],
            ['height', `calc(100% - 2 * ${b})`],
            ['margin', b],
        ]
    }
}


const cssSelectorSuffixes = {
    a: '::after',
    b: '::before',
    h: ':hover',
    f: ':focus',
}

const cabalias = {
    whitespace: 'pre',
    ws: 'pre',
    centered: 'center',
    c: 'center',
    flexc: 'flexcol',
}

function cssCleanupFinalString(s) {
    return lineFilter(s, (x) => !cssHasStringError(x))
}

function cssHasStringError(s) {
    return s && /unset|none|null|undefined|: (?:[=]|[a-zA-Z]{1,2};)/.test(s)
}

function cssBoxShadow(b) {
    const shadows = [
        '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    ]

    return shadows[Number(b)]
}

function cssBorder(s, key) {
    let match = search(/(-?[\d.]+(?:px)?)(\w+)/, s)
    if (!match) {
        if (isNumber(s)) {
            return [key + '-' + 'width', s + 'px']
        } else {
            return [key + '-color', cssColor(s)]
        }
    }

    let [a, b] = match

    let dashed = ' solid '
    if (isNumber(a)) a += 'px'
    b = cssColor(b)
    return [key, a + dashed + b]
}

function cssColor(b) {
    if (arguments.length == 2) {
        b = arguments[0] + arguments[1]
    }
    if (b.length < 3) b = b.replace(/\w/, (x) => roygbiv.find((y) => x == y[0]))
    if (!test(/\d$/, b)) b += 5
    return tailwind[b] + ' ' + blockComment(b)
}

function hasUnit(s) {
    return test(/\D+$/, s)
}

function cssUnit(b, key = 'width') {
    if (b.endsWith('p')) {
        return b.replace(/p$/, '%')
    } else if (b != 0 && test(/\d$/, b)) {
        let unit = cssunitmap[search(/\w+/, key)] || 'px'
        return b + unit
    }
    return b
}

function cssShorthand(s) {
    const ref = [
        [/^([odt])(\d+\.?\d*)/, csho], // opacity  and delay
        [/^(\d+)[,-](\d+)(pex)?/, cshpos], // position
        [/^([bu]?)([pwroygbiv])(\d*)([st])?/, cshcolor], // color
    ]

    const items = s.trim().split(/ +/)
    const store = {}
    //console.log(items)
    for (let item of items) {
        for (let [k, v] of ref) {
            if (test(k, item)) {
                Object.assign(store, v(...search(k, item)))
                break
            }
        }
    }
    return store
}

function cssGridArea(
    parent,
    children,
    s,
    { col = 0, row = 0, columnWidth = '1fr', rowHeight = '100px' } = {}
) {
    const gridItems = cssGridItems(s, children)
    const columns = gridItems[0].length

    const obj = {
        display: 'grid',
        'grid-template-areas': newlineIndent(
            gridItems.map((x) => doublequote(x.join(' ')))
        ),
    }

    if (row) {
        const value = split(row, /[-\/]/).map(addf('%')).join(' ')
        obj['grid-template-rows'] = value
    }

    if (col) {
        const value = split(col, /[-\/]/).map(addf('%')).join(' ')
        obj['grid-template-columns'] = value
    } else {
        obj['grid-template-columns'] = `repeat(${columns}, 1fr)`
    }

    const parentString = cssParser(parent, obj)
    const childrenString = children.map(cssGridAreaChild)
    return parentString + '\n\n' + join(childrenString)
}

//
function cssColumns(parent, children, s, options = {}) {
    const template = children
        .map((item, i) => {
            return n2char(i)
        })
        .join('')
    const extraProps = options.center ? cssEvaluator('center wh100') : {}
    return join([
        cssGridArea(parent, children, template),
        ...children.map((name) =>
            cssParser(name, {
                //width: removeDecimals(100 / children.length) + '%',
                ...extraProps,
            })
        ),
    ])
}

function toPositive(x) {
    return Math.abs(toNumber(x))
}
function isNegative(x) {
    return x.toString().startsWith('-')
}

function cssPosition(a, b, unit = '%') {
    let x = 'left'
    let y = 'top'
    if (hasUnit(b)) {
        ;[b, unit] = mreplace(/\D+$/, b)
    }

    if (isNegative(a)) {
        a = toPositive(a)
        x = 'right'
    }

    if (isNegative(b)) {
        b = toPositive(b)
        y = 'bottom'
    }

    if (a == 0) {
        return [x, b + unit]
    }

    if (b == 0) {
        return [x, a + unit]
    }
    return [
        //['position', 'absolute'],
        [x, a + unit],
        [y, b + unit],
    ]
}
class Partitions {
    constructor() {
        this.store = []
        this.count = 0
        this.index = 0
    }

    add(item) {
        //console.log(this.sizes)
        if (this.count == this.sizes && this.index < this.sizes - 1) {
            this.index += 1
            this.count = 0
        }

        if (this.store.length <= this.index) {
            this.store.push([])
        }

        this.store[this.index].push(item)
        this.count++
    }
}
function cssPartition(sa, n = 2) {
    const sizes = Math.ceil(sa.length / n)
    console.log(sizes)
    const items = Array.from(sa)
    const partitions = new Partitions()
    partitions.sizes = sizes
    for (let item of items) {
        partitions.add(item)
    }
    return partitions.store
}

function oldpartition(sa, n = 2, frontHeavy = false) {
    const length = sa.length
    const size = (frontHeavy ? Math.ceil : Math.floor)(length / n)
    const items = Array.from(sa)
    const store = [[]]
    let count = 0
    let index = 0
    for (let i = 0; i < items.length; i++) {
        count++
        let item = items[i]
        store[index].push(item)
        if (i == items.length - 1) {
            return store
        } else if (count == size) {
            index += 1
            store.push([])
            count = 0
        }
    }
    return store
}
function cutInHalf(sa) {
    return cssPartition(sa, 2)
}
function splitNumberBoundary(s) {
    return findall(/\d+|[a-zA-Z]+/g, s)
}


function cssGetDynamicIncrement(value, min, max) {
    if (max) {
        let delta = max - min
        return delta > 10 ? parseInt(delta / 10) : delta
    }
    if (value == 0) return 1
    if (value < 10) return 1
    return Math.ceil(value / 10)
}

var tailwindStorage = {
    black: ['#111'],
    gray: [
        '#f7fafc',
        '#edf2f7',
        '#e2e8f0',
        '#cbd5e0',
        '#a0aec0',
        '#a0aec0',
        '#718096',
        '#4a5568',
        '#2d3748',
        '#1a202c',
    ],
    red: [
        '#fff5f5',
        '#fed7d7',
        '#feb2b2',
        '#fc8181',
        '#f56565',
        '#e53e3e',
        '#c53030',
        '#9b2c2c',
        '#742a2a',
    ],
    orange: [
        '#fffaf0',
        '#feebc8',
        '#fbd38d',
        '#f6ad55',
        '#ed8936',
        '#ed8936',
        '#dd6b20',
        '#c05621',
        '#9c4221',
        '#7b341e',
    ],
    yellow: [
        '#fffff0',
        '#fefcbf',
        '#faf089',
        '#f6e05e',
        '#ecc94b',
        '#ecc94b',
        '#d69e2e',
        '#b7791f',
        '#975a16',
        '#744210',
    ],
    green: [
        '#f0fff4',
        '#c6f6d5',
        '#9ae6b4',
        '#68d391',
        '#48bb78',
        '#48bb78',
        '#38a169',
        '#2f855a',
        '#276749',
        '#22543d',
    ],
    teal: [
        '#e6fffa',
        '#b2f5ea',
        '#81e6d9',
        '#4fd1c5',
        '#38b2ac',
        '#38b2ac',
        '#319795',
        '#2c7a7b',
        '#285e61',
        '#234e52',
    ],
    blue: [
        '#ebf8ff',
        '#bee3f8',
        '#90cdf4',
        '#63b3ed',
        '#4299e1',
        '#4299e1',
        '#3182ce',
        '#2b6cb0',
        '#2c5282',
        '#2a4365',
    ],
    indigo: [
        '#ebf4ff',
        '#c3dafe',
        '#a3bffa',
        '#7f9cf5',
        '#667eea',
        '#667eea',
        '#5a67d8',
        '#4c51bf',
        '#434190',
        '#3c366b',
    ],
    purple: [
        '#faf5ff',
        '#e9d8fd',
        '#d6bcfa',
        '#b794f4',
        '#9f7aea',
        '#9f7aea',
        '#805ad5',
        '#6b46c1',
        '#553c9a',
        '#44337a',
    ],
    violet: [
        '#fff5f7',
        '#fed7e2',
        '#fbb6ce',
        '#f687b3',
        '#ed64a6',
        '#ed64a6',
        '#d53f8c',
        '#b83280',
        '#97266d',
        '#702459',
    ],
    pink: [
        '#fff5f7',
        '#fed7e2',
        '#fbb6ce',
        '#f687b3',
        '#ed64a6',
        '#ed64a6',
        '#d53f8c',
        '#b83280',
        '#97266d',
        '#702459',
    ],
}

const cabmap = {
    'smoothfont': [
    ['text-rendering', 'optimizeLegibility'],
  ['text-rendering', 'geometricPrecision'],
  ['font-smooth', 'always'],
  ['font-smoothing', 'antialiased'],
    ],
    /* marked */

    gtext: [
      //["background-clip", "text"],
      //["color", "transparent"],
      ["-webkit-background-clip", "text"],
      ["-webkit-text-fill-color", "transparent"],
    ],
    '100vh': [['height', '100vh']],
    '100vw': [['width', '100vw']],
    'wrap': [['flex-wrap', 'wrap']],
    jis: [['justify-items', 'start']],
    jie: [['justify-items', 'end']],
    jic: [['justify-items', 'center']],
    jcsb: [['justify-content', 'space-between']],
    jcsa: [['justify-content', 'space-around']],
    jcse: [['justify-content', 'space-evenly']],
    jist: [['justify-items', 'stretch']],

    ais: [['align-items', 'start']],
    aie: [['align-items', 'end']],
    aic: [['align-items', 'center']],
    aist: [['align-items', 'stretch']],

    jis: [['justify-items', 'start']],
    jie: [['justify-items', 'end']],
    jic: [['justify-items', 'center']],
    jist: [['justify-items', 'stretch']],

    jcs: [['justify-content', 'start']],
    jce: [['justify-content', 'end']],
    jcc: [['justify-content', 'center']],
    jcst: [['justify-content', 'stretch']],

    acs: [['align-content', 'start']],
    ace: [['align-content', 'end']],
    acc: [['align-content', 'center']],
    acst: [['align-content', 'stretch']],
    ored: [['outline', '1px solid red']],
    outline: [['outline', '1px solid red']],
    arrow: [['list-style', 'none']],
    //nls: [['list-style', 'none']],
    nls: [['list-style-type', 'none']],
    a: [['position', 'absolute']],
    gradient: [
        ['-webkit-background-clip', 'text'],
        ['-webkit-text-fill-color', 'transparent'],
        //['display', 'inline-block'],
        ['background-image', 'linear-gradient(to right, #1de9b6, #2979ff)'],
    ],

    content: [['content', '']],
    pseudo: [['content', '']],
    ilb: [['display', 'inline-block']],
    inline: [['display', 'inline']],
    span: [['display', 'inline']],
    block: [['display', 'block']],
    ofh: [['overflow', 'hidden']],
    upper: [['text-transform', 'uppercase']],
    cap: [['text-transform', 'capitalize']],
    lower: [['text-transform', 'lowercase']],
    ofs: [
        ['overflow', 'scroll'],
        ['overflow-x', 'hidden'],
    ],
    ofx: [['overflow-x', 'hidden']],
    ofy: [['overflow-y', 'hidden']],
    bebas: [['font-family', 'bebas']],
    pre: [
        ['font-family', "'Courier New', monospace"],
        ['white-space', 'pre-wrap'],
    ],

    perspective: [
        ['perspective', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    card: [
        ['backface-visibility', 'hidden'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    '3d': [
        ['left', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],

    absu: [
        ['left', 'unset'],
        ['right', 'unset'],
        ['bottom', 'unset'],
        ['top', 'unset'],
        ['position', 'unset'],
        ['transform', 'unset'],
    ],

    origin: [
        ['left', '50%'],
        ['position', 'absolute'],
        ['top', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    east: [
        ['left', 'unset'],
        ['right', '0'],
        ['top', '50%'],
        ['transform', 'translateY(-50%)'],
    ],
    b0: [
        ['bottom', '0'],
        ['position', 'absolute'],
    ],
    l0: [
        ['left', '0'],
        ['position', 'absolute'],
    ],
    t0: [
        ['top', '0'],
        ['position', 'absolute'],
    ],
    r0: [
        ['right', '0'],
        ['position', 'absolute'],
    ],

    right: [['right', '0']],
    top: [['top', '0']],
    left: [['left', '0']],
    bottom: [['bottom', '0']],
    se: [
        ['bottom', '0'],
        ['right', '0'],
    ],
    south: [
        ['bottom', '0'],
        ['left', '50%'],
        ['transform', 'translateX(-50%)'],
    ],
    sw: [
        ['bottom', '0'],
        ['left', '0'],
    ],
    west: [
        ['top', '50%'],
        ['transform', 'translateY(-50%)'],
        ['right', 'unset'],
        ['left', '0'],
    ],
    nw: [
        ['left', '0'],
        ['top', '0'],
    ],
    north: [
        ['top', '0'],
        ['left', '50%'],
        ['transform', 'translateX(-50%)'],
    ],

    code: [
        [
            'font-family',
            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        ],
    ],

    middleright: [
        //[ "position", "absolute" ], [ "top", "50%" ], ["right", "-50%"],
        //[ "transform", "translateY(50%)"],
    ],

    topleft: [
        ['position', 'absolute'],
        ['top', '0'],
        ['left', '0'],
    ],

    full: [
        ['width', '100vw'],
        ['height', '100vh'],
    ],
    reset: [
        ['box-sizing', 'border-box'],

        [
            'font-family',
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\nsans-serif",
        ],
        ['-webkit-font-smoothing', 'antialiased'],
        ['-moz-osx-font-smoothing', 'grayscale'],

        ['padding', '0'],

        ['margin', '0'],
    ],

    cabtac: [['text-align', 'center']],
    serrat: [
        ['font-family', '"Montserrat Alternates"'],
        ['font-weight', '700'],
    ],
    flexu: [
        ['display', 'unset'],
        ['align-items', 'unset'],
        ['justify-content', 'unset'],
    ],

    center: [
        ['display', 'flex'],
        ['align-items', 'center'],
        ['justify-content', 'center'],
    ],
    jcse: [['justify-content', 'space-evenly']],
    spacebetween: [['justify-content', 'space-between']],

    se: [['justify-content', 'space-evenly']],
    sa: [['justify-content', 'space-between']],
    sb: [['justify-content', 'space-between']],

    jcsb: [['justify-content', 'space-between']],
    jcc: [['justify-content', 'center']],
    shadow: [
        [
            'box-shadow',
            'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
        ],
    ],
    shadow1: [['0px 4px 10px rgba(0, 0, 0, 0.25)']],
    shadow2: [['0px 4px 10px rgba(0, 0, 0, 0.1)']],
    tall: [['transition', 'all 1s ease-out']],
    halfscreen: [
        ['position', 'absolute'],
        ['width', '35%'],
        ['right', '0'],
        ['height', '90%'],
    ],
    xcenter: [
        ['position', 'absolute'],
        ['transform', 'translateX(-50%)'],
        ['left', '50%'],
    ],
    ycenter: [
        ['position', 'absolute'],
        ['transform', 'translateY(-50%)'],
        ['top', '50%'],
    ],
    'space-between': [['justify-content', 'space-between']],
    jcbtwn: [['justify-content', 'space-between']],
    jcspc: [['justify-content', 'space-evenly']],
    abscenter: [
        ['position', 'absolute'],
        ['top', '0'],
        ['left', '0'],
        ['right', '0'],
        ['bottom', '0'],
        ['margin', 'auto'],
    ],
    'shadow-lg': [['box-shadow', 'rgba(0, 0, 0, 0.1) 0px 4px 12px']],
    'shadow-sm': [['box-shadow', 'rgba(0, 0, 0, 0.08) 0px 4px 12px']],
    rounded: [['border-radius', '5px']],
    times: [['font-family', 'Times']],
    georgia: [['font-family', 'Georgia']],
    mhauto: [['margin', '0 auto']],
    mauto: [['margin', '0 auto']],
    fullscreen: [
        ['width', '100vw'],
        ['height', '100vh'],
    ],
    full: [
        ['width', '100vw'],
        ['height', '100vh'],
    ],
    caps: [['text-transform', 'uppercase']],
    underline: [['border-bottom', '1px solid currentColor']],
    lh: [['line-height', '1.4']],
    bold: [['font-weight', '700']],
    superbold: [['font-weight', '900']],
    flex: [['display', 'flex']],
    flexcol: [
        ['display', 'flex'],
        ['flex-direction', 'column'],
    ],
    unflex: [
        ['display', 'unset'],
        ['flex-direction', 'unset'],
        ['align-items', 'unset'],
        ['justify-content', 'unset'],
    ],

    gmail: [['font', 'small/ 1.5 Arial,Helvetica,sans-serif']],
    geist: [
        ['flex', '1'],
        ['justify-content', 'flex-start'],
        ['align-items', 'stretch'],
    ],
    antialiased: [
        ['text-rendering', 'optimizeLegibility'],
        ['-webkit-font-smoothing', 'asdflxxanzztzzizzzaliased'],
    ],
    ol: [
        ['text-rendering', 'optimizeLegibility'],
        ['-webkit-font-smoothing', 'antialiased'],
    ],
    round: [['border-radius', '50%']],
    transparent: [['background', 'transparent']],
    tac: [['text-align', 'center']],
    ta: [['text-align', 'center']],
    ilb: [['display', 'inline-block']],
    block: [['display', 'block']],
    radial: [['border-radius', '50%']],
    absolute: [['position', 'absolute']],

    blue: [['color', 'tailwind-blue']],
    white: [['color', 'white']],
    black: [['color', '#333']],
    green: [['color', 'tailwind-green']],

    f16: [
        ['font-size', '24px'],
        ['font-weight', '600'],
    ],

    smf: [
        ['font-size', '24px'],
        ['font-weight', '500'],
    ],

    sm: [
        ['font-size', '24px'],
        ['font-weight', '500'],
    ],

    medf: [
        ['font-size', '36px'],
        ['font-weight', '650'],
    ],

    med: [
        ['font-size', '36px'],
        ['font-weight', '650'],
    ],

    lgf: [
        ['font-size', '48px'],
        ['font-weight', '650'],
    ],

    lg: [
        ['font-size', '48px'],
        ['font-weight', '650'],
    ],

    vlg: [
        ['font-size', '72px'],
        ['font-weight', '800'],
    ],

    abs: [['position', 'absolute']],
    rel: [['position', 'relative']],
    sans: [
        [
            'font-family',
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        ],
        ['-webkit-font-smoothing', 'antialiased'],
        ['-moz-osx-font-smoothing', 'grayscale'],
    ],
    serif: [['font-family', 'Georgia']],
    garamond: [['font-family', 'Garamond']],
    monospace: [['font-family', 'monospace']],
    codestack: [
        [
            'font-family',
            '"Source Code Pro", Consolas, Monaco, Menlo, Consolas, monospace',
        ],
    ],
    mono: [
        [
            'font-family',
            'Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace',
        ],
    ],
    code: [['font-family', 'monospace']],
    hidden: [['overflow', 'hidden']],
    cursive: [['font-family', 'relative']],
    w1: [['color', '#EAEAEA']],
    bl: [['color', '#333']],
    bl3: [['color', '#555']],
    bl1: [['color', '#2d2d2d']],
    bl2: [['color', '#242424']],
}

function cssKeyWrap(key, fn) {
    return (b) => {
        return [key, fn(b)]
    }
}

const cssReplacementDictionary = {
    gtc: 'grid-template-columns',
    gtr: 'grid-template-rows',
    gac: 'grid-auto-columns',
    gar: 'grid-auto-rows',
    gg: 'grid-gap',
    dg: 'display: grid;',
    df: 'display: flex;',
}

const cssGridDict = {
    gtc: 'grid-template-columns',
    gtr: 'grid-template-rows',
    gac: 'grid-auto-columns',
    gar: 'grid-auto-rows',
    gg: 'grid-gap',
}

function cssGrid(b) {
    const unitdict = {
        gtc: 'fr',
        gtr: 'fr',
        gac: '%',
        gar: '%',
        gg: 'px',
    }
    const regex = ncg('($1)', cssGridDict)
    const store = [['display', 'grid']]
    const items = split(b, regex).filter(exists)
    for (let [a, b, unit] of paired(items)) {
        if (!unit) unit = unitdict[a]
        if (a == 'gtc' || a == 'gtr') b = `repeat(${b}, 1${unit})`
        else if (a == 'gar' || a == 'gac') b = `${b}${unit}`
        else if (a == 'gg') b = `${b}${unit}`
        a = dict[a] || a
        store.push([a, b])
    }
    return store
}
function cssBackgroundPosition(s) {
    const value = isNumber(s) ? [s.slice(0, 2), s.slice(2)].map(addf('%')) : [s]
    return [['background-position', value.join(' ')]]
}

function cssFontFamily(s) {
    let font = FontLibrary[s] || font
    return [['font-family', font]]
}

function cssGtc(s) {
    let gtc, a, b, c, d, e
    if (isNumber(s)) {
        switch (s.length) {
            case 2:
                a = Number(s.slice(0, 2))
                b = 100 - a
                break
            case 4:
                a = Number(s.slice(0, 2))
                b = Number(s.slice(2, 4))
                if (a + b != 100) c = 100 - (a + b)
                break
        }
        let numbers = [a,b,c,d,e].map(divide10).filter(exists)
        gtc = numbers.map(addf('fr')).join(' ')
    }

    return [
        ['display', 'grid'],
        ['grid-template-columns', gtc],
    ]
}
function cssMockup(s) {
    let a = s[0] || 2
    let b = s[1] || 1
    return [
        ['width', a + '00px'],
        ['height', b + '00px'],
        ['background', randomColor()],
    ]
}
const cssattrmap = {
    /* marked */ con: 'content',
    '-?\\d{1,2}': '',
    bs: cssKeyWrap('animation', cssAnimation),
    cm: cssColorMatch,
    ff: cssFontFamily,
    mu: cssMockup,
    gtc: cssGtc,
    grid: cssGrid,
    //bgp: cssBackgroundPosition,
    ul: cssUnderline,
    bs: cssKeyWrap('box-shadow', cssBoxShadow),
    //ff: cssFontFamily,
    // \d = positioning
    bblr: 'border-bottom-left-radius',
    bbrr: 'border-bottom-right-radius',
    btrr: 'border-top-right-radius',
    btlr: 'border-top-left-radius',
    wh: '',
    calc: '',
    px: '',
    py: '',
    mx: '',
    my: '',
    offset: 'offset',
    border: '',
    ls: 'letter-spacing',
    hsla: 'hsla',
    kf: '',
    bottom: 'bottom',
    bot: 'bottom',
    top: 'top',
    left: 'left',
    right: 'right',
    pos: 'position',
    cgap: 'column-gap',
    rgap: 'row-gap',
    gap: 'grid-gap',
    //bs: 'box-shadow',
    ai: 'align-items',
    jc: 'justify-content',
    //gc: 'grid-column',
    //gr: 'grid-row',
    b: 'border',
    bb: 'border-bottom',
    bl: 'border-left',
    br: 'border-right',
    bt: 'border-top',
    z: 'z-index',
    zi: 'z-index',
    o: 'opacity',
    fw: 'font-weight',
    br: 'border-radius',
    bw: 'border-weight',
    lh: 'line-height',
    gg: 'grid-gap',
    ggx: 'row-gap',
    border: 'border',
    ggy: 'column-gap',
    lg: 'linear-gradient',
    bg: 'background',
    bc: 'border-color',
    bb: 'border-bottom',
    fc: 'color',
    fs: 'font-size',
    mw: 'min-width',
    mh: 'min-height',
    minw: 'min-width',
    minh: 'min-height',
    maxw: 'max-width',
    maxh: 'max-height',
    //gtc: 'grid-template-columns',
    //gtr: 'grid-template-rows',
    w: 'width',
    h: 'height',
    p: 'padding',
    m: 'margin',
    pb: 'padding-bottom',
    pt: 'padding-top',
    pl: 'padding-left',
    pr: 'padding-right',
    mb: 'margin-bottom',
    mt: 'margin-top',
    ml: 'margin-left',
    mr: 'margin-right',
    l: 'left',
    t: 'top',
    right: 'right',
    r: 'right',
    //r: 'rotate',
    ta: 'text-align',
    s: 'scale',
    tx: 'transform',
    ty: 'transform',
    tr: 'transform',
}

const cssunitmap = {
    wh: '%',
    rotate: 'deg',
    scale: '',
    translate: '%',
}

const tailwind = {
    charcoal: '#36454f',
    none: 'transparent',
    olive: '',
    strawberry: '',
    tomato: '',
    //black1: 'asd',
    //black2: 'asd',
    //black3: 'asd',
    //black4: 'asd',
    //black5: 'asd',
    //black: '#111',
    //black6: 'asd',
    //black7: 'asd',
    //black8: '#111',
    //black9: 'asd',

    black1: 'rgba(0, 0, 0, .1)',
    white1: 'rgba(255, 255, 255, .1)',
    black2: 'rgba(0, 0, 0, .2)',
    white2: 'rgba(255, 255, 255, .2)',
    black3: 'rgba(0, 0, 0, .3)',
    white3: 'rgba(255, 255, 255, .3)',
    black4: 'rgba(0, 0, 0, .4)',
    white4: 'rgba(255, 255, 255, .4)',
    black5: 'rgba(0, 0, 0, .5)',
    white5: 'rgba(255, 255, 255, .5)',
    black6: 'rgba(0, 0, 0, .6)',
    white6: 'rgba(255, 255, 255, .6)',
    black7: 'rgba(0, 0, 0, .7)',
    white7: 'rgba(255, 255, 255, .7)',
    black8: 'rgba(0, 0, 0, .8)',
    white8: 'rgba(255, 255, 255, .8)',
    black9: 'rgba(0, 0, 0, .9)',
    white9: 'rgba(255, 255, 255, .9)',
    gray1: '#f7fafc',
    gray2: '#edf2f7',
    gray3: '#e2e8f0',
    gray4: '#cbd5e0',
    gray5: '#a0aec0',
    gray: '#a0aec0',
    gray6: '#718096',
    gray7: '#4a5568',
    gray8: '#2d3748',
    gray9: '#1a202c',
    red1: '#fff5f5',
    red2: '#fed7d7',
    red3: '#feb2b2',
    red4: '#fc8181',
    red5: '#f56565',
    red6: '#e53e3e',
    red7: '#c53030',
    red8: '#9b2c2c',
    red9: '#742a2a',
    orange1: '#fffaf0',
    orange2: '#feebc8',
    orange3: '#fbd38d',
    orange4: '#f6ad55',
    orange5: '#ed8936',
    orange: '#ed8936',
    orange6: '#dd6b20',
    orange7: '#c05621',
    orange8: '#9c4221',
    orange9: '#7b341e',
    yellow1: '#fffff0',
    yellow2: '#fefcbf',
    yellow3: '#faf089',
    yellow4: '#f6e05e',
    yellow5: '#ecc94b',
    yellow: '#ecc94b',
    yellow6: '#d69e2e',
    yellow7: '#b7791f',
    yellow8: '#975a16',
    yellow9: '#744210',
    green1: '#f0fff4',
    green2: '#c6f6d5',
    green3: '#9ae6b4',
    green4: '#68d391',
    green5: '#48bb78',
    green: '#48bb78',
    green6: '#38a169',
    green7: '#2f855a',
    green8: '#276749',
    green9: '#22543d',
    teal1: '#e6fffa',
    teal2: '#b2f5ea',
    teal3: '#81e6d9',
    teal4: '#4fd1c5',
    teal5: '#38b2ac',
    teal: '#38b2ac',
    teal6: '#319795',
    teal7: '#2c7a7b',
    teal8: '#285e61',
    teal9: '#234e52',
    blue1: '#ebf8ff',
    blue2: '#bee3f8',
    blue3: '#90cdf4',
    blue4: '#63b3ed',
    blue5: '#4299e1',
    blue: '#4299e1',
    blue6: '#3182ce',
    blue7: '#2b6cb0',
    blue8: '#2c5282',
    blue9: '#2a4365',
    indigo1: '#ebf4ff',
    indigo2: '#c3dafe',
    indigo3: '#a3bffa',
    indigo4: '#7f9cf5',
    indigo5: '#667eea',
    indigo: '#667eea',
    indigo6: '#5a67d8',
    indigo7: '#4c51bf',
    indigo8: '#434190',
    indigo9: '#3c366b',
    purple1: '#faf5ff',
    purple2: '#e9d8fd',
    purple3: '#d6bcfa',
    purple4: '#b794f4',
    purple5: '#9f7aea',
    purple: '#9f7aea',
    purple6: '#805ad5',
    purple7: '#6b46c1',
    purple8: '#553c9a',
    purple9: '#44337a',
    violet1: '#fff5f7',
    violet2: '#fed7e2',
    violet3: '#fbb6ce',
    violet4: '#f687b3',
    violet5: '#ed64a6',
    violet: '#ed64a6',
    violet6: '#d53f8c',
    violet7: '#b83280',
    violet8: '#97266d',
    violet9: '#702459',

    pink1: '#fff5f7',
    pink2: '#fed7e2',
    pink3: '#fbb6ce',
    pink4: '#f687b3',
    pink5: '#ed64a6',
    pink: '#ed64a6',
    pink6: '#d53f8c',
    pink7: '#b83280',
    pink8: '#97266d',
    pink9: '#702459',
}

function aggregateRegexFromHashmap(map, regexTemplate = '^($1)(\\S+)') {
    const storage = new Storage()
    const store = []

    for (let item of sorted(Object.keys(map))) {
        storage.add(item[0], item)
    }

    storage.forEach((k, v) => {
        storage.store[k] = sorted(v, len, true)
    })

    storage.forEach((k, v) => {
        v.length == 1
            ? store.push(v[0])
            : store.push(
                  k +
                      ncg(
                          '(?:$1)',
                          v.map((x) => x.slice(1))
                      )
              )
    })

    return ncg(regexTemplate, store)
}

function cssIncrementColor(value, direction) {
    const commentCaptureRE = /\/\* *(.*?) *\*\//
    const colorKey = search(commentCaptureRE, value)
    const [color, index] = splitNumberBoundary(colorKey)
    const ref = tailwindStorage[color]
    const newIndex = modularIncrement(index, direction, 0, ref.length - 1)
    return ref[newIndex] + ' ' + blockComment(color + newIndex)
}
function isCssColorKey(key) {
    const colors = ['color', 'background', 'border-color']
    return colors.includes(key)
}
function cssIncrement(key, value, direction, dynamicKFactor) {
    //display({key, value, direction, dynamicKFactor})
    if (isCssColorKey(key)) {
        return cssIncrementColor(value, direction)
    }
    let ref = cssPresets[key]
    if (ref) return modularIncrement(ref, value, direction)

    //console.log(value)
    let originalUnit = search(/\D+$/, value.toString())
    //console.log(originalUnit)
    value = coerceToNumber(value)
    //console.log(value)

    let { increment, unit, min, max, color, next, prev } =
        cssIncrementTable[key]
    if (increment == 'dynamic') {
        increment = cssGetDynamicIncrement(value, min, max)
    }
    //console.log(cssIncrementTable[key])

    let nextValue = modularIncrementNumber(
        value,
        direction * increment,
        min,
        max
    )
    //console.log([value, direction * increment, min, max])
    //console.log(nextValue)
    return nextValue == 0 ? 0 : nextValue + (originalUnit || unit || '')
}

const cssIncrementTable = {
    opacity: { min: 0, max: 1, increment: 0.1, unit: '' },
    'line-height': { min: 1, max: 2, increment: 0.1, unit: '' },
    'border-width': { min: 1, max: 2, increment: 0.1, unit: '' },
    'border-radius': { min: 0, max: 10, increment: 1, unit: 'px' },
    'font-weight': { min: 500, max: 900, increment: 100, unit: '' },
    // ----------------------------------------------------,
    top: { min: 0, max: 100, increment: 5, unit: '%' },
    left: { min: 0, max: 100, increment: 5, unit: '%' },
    right: { min: 0, max: 100, increment: 5, unit: '%' },
    bottom: { min: 0, max: 100, increment: 5, unit: '%' },
    //bottom: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    // ----------------------------------------------------,
    padding: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    margin: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    width: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    height: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    'min-height': { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    'min-width': { min: 0, max: 100, increment: 'dynamic', unit: 'px' },

    'font-size': { min: 16, max: 96, increment: 8, unit: 'px' },
    'border-radius': { min: 0, max: 10, increment: 1, unit: 'px' },
}

// the temperature

//cshpos
//csho
//cshcolor
//cshkf
//cshclasses
//cshtimelinecoerceToNumber
//splitOptionalComma
//brackify
//hasColon
//curryEnd
//curryStart
//hasDash
module.exports.cssParser = cssParser
//


const cssPresets = {
    display: ['inline-block', 'inline', 'block', 'grid', 'flex'],
    overflow: ['hidden', 'scroll', 'auto'],
    'text-transform': ['capitalize', 'uppercase', 'lowercase'],
    'font-family': [
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
        //'Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        //'sans-serif',
        //'bebas',
        //'Times',
        //'Georgia',
        //'Garamond',
        //'Source Code Pro, Consolas, Monaco, Menlo, Consolas, monospace',
    ],
    'font-family': GoogleFontList,
    position: ['absolute', 'relative', 'unset'],
    'justify-content': [
        'space-evenly',
        'center',
        'space-between',
        'unset',
        'flex-start',
    ],
    'text-align': ['center', 'unset'],
    'align-items': ['center', 'unset', 'stretch'],
    'flex-direction': ['column', 'row'],
}

//console.log(coerceToNumber('7px'))
//console.log(cssIncrement('margin', 0, 1))
//console.log(cssIncrement('margin', 5, 1))
//console.log(cssIncrement('margin', 15, 1))
//console.log(cssIncrement('margin', 35, 1))

//console.log(cssIncrement('margin', '5%', -1))
//console.log(cssIncrement('margin', 5, -1))
//console.log(cssIncrement('margin', 15, -1))
// value of the updated.

function cssGridItems(s, nameRef) {
    const items = split(s, /, *|  +|\/ */)
    const uniqueLetters = getUniqueLetters(s)
    const longest = getLongest(items, (x) => x.length, Number)
    console.log({ nameRef, uniqueLetters })
    assert(nameRef && uniqueLetters.length == nameRef.length)
    const ref = zip(uniqueLetters, nameRef)
    return items.map(runner).map((x) => x.map((y) => ref[y]))

    function runner(s) {
        let letters = split(s, '')
        let length = letters.length
        if (length == longest) {
            return letters
        } else {
            return fillTo(letters, longest)
        }
    }
}

function cssGridAreaChild(name) {
    return `.${name} { grid-area: ${name}; height: 100%; }`
}

//console.log('hi')
//display({cssParserGlobalREGEX})
//console.log(cssIncrement('border-radius', '5px', -1))
//console.log(cssIncrement('background', '/* blue3 */', -1))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'sans'))
//l p
//console.log(cssPartition(alist ['a', 'b', 'c', 'd', 'e']))
//console.log(cssPartition(['a', 'b', 'c', 'd'], 2))
//console.log(ecCol('fo', ['gg', 'hh', 'mjh'], '', {center: 1}))
//
//
//
//
//

//console.log(aggregateCSS(cssParser('body', 'cmblue4') + '\n'+  cssColumns('fo', ['ggbo', 'bo'], 'ab', {center: 1}), Object))
//console.log(aggregateCSS(s, String))
//s='-40-40'
//s='bot50'
//s='-400px rel'

function combineSimilarCssPropertiesIntoNewClass(s) {
    const storage = aggregateCSS(s, Storage)
    console.log(storage)
    for (let [k, v] of Object.entries(storage.entries)) {
        //inprogress
    }
}

//console.log(combineSimilarCssPropertiesIntoNewClass(s))

function cssUnderline(b) {
    const thickness = 1
    const color = b ? cssColor(b) : 'black'
    return [
        ['border-bottom', `${thickness}px solid ${color}`],
        ['padding-bottom', `${thickness * 3}px`],
    ]
}

function cssGradient(b) {
    const value = 'linear-gradient(to right, #1de9b6, #2979ff)'
    return [
        ['-webkit-background-clip', 'text'],
        ['-webkit-text-fill-color', 'transparent'],
        ['background-image', value],
    ]
}

function cssList() {
    s = `

    nlsol {
  counter-reset: orderedlist;
}

ol li::before {
  'counter-increment': orderedlist;
  'content': counter(orderedlist);
}
li::before {
    font-family: "Indie Flower";
    font-size: 1.25em;
    line-height: 0.75;
    width: 1.5rem;
    padding-top: 0.25rem;
    text-align: center;
    color: #fff;
    background-color: purple;
    border-radius: 0.25em;
}
`
}

function cssFontFamily(b) {
    return ['font-family', singlequote(prepareGoogleFontKey(b))]
}

function prepareGoogleFontKey(s) {
    const a = (x) => x.length < 3
    const b = (x) => x.toUpperCase()
    const c = capitalize
    return split(s, '-').map(mapConditional(a, b, c)).join(' ')
}

//
const GoogleFonts = [
    'Raleway',
    'Anton',
    'Lora',
    'Oxygen',
    'Poppins',
    'Work Sans',
    'Cormorant',
    'Sora',
    'Manrope',
    'BioRhyme',
    'Hahmlet',
    'Lato',
    'Archivo',
    'Andada Pro',
    'JetBrains Mono',
    'Oswald',
    'Spectral',
    'Nunito',
    'Montserrat',
    'Source Sans Pro',
    'Epilogue ',
    'Open Sans',
    'Old Standard TT',
    'Inter',
    'Encode Sans',
    'Roboto',
    'Playfair Display',
]

function formatCssAsHtml(s) {
    const x = cssDecompose(s)
    if (!x) return
    let { properties, name } = x
    return divify('div', 'css-text', [
        divify('h4', 'css-selector-name', name),
        divify(
            'ul',
            'css-prop-list',
            properties.map(([k, v]) => {
                return divify('div', '', [
                    divify('span', 'css-prop-key', k),
                    divify('span', 'css-prop-value', v),
                ])
            })
        ),
    ])
}

function cssSingletonParser(s) {
    return cssSpellcheck(s).split(/ *[=:;] */)
}

const cssSpellcheck = spellcheckFactory(cssReplacementDictionary)
const cssParserGlobalREGEX = aggregateRegexFromHashmap(cssattrmap)
//console.log(cssParserGlobalREGEX)

function hasDashedLine(s) {
    return test(/^--+$/m, s)
}
function mixedHtmlCssParser(s) {
    let [a, b] = hasDashedLine(s) ? splitThePage(s) : splitHtmlCss(s)
    let html
    let css
    if (a) {
        html = toVueHtml(a)
        html = prettifyHtml(html)
    }
    if (b) {
        css = cssValueGetter(b, Object)
    }
    return [html, css]
}

function isRawBracketCss(s) {
    return test(/^\w+ {/, s)
}
function cssValueGetter(s, mode) {
    if (mode == String) {
        return reduceToString(linegetter(s), (item) => {
            let [a,b] = splitCssNameAndValue(item)
            let name = cssNameParser(a)
            return cssParser(name, b)
        })
    }

    if (mode == Object) {
        return reduce(linegetter(s), (item, i) => {
            let [a,b] = splitCssNameAndValue(item)
            let name = cssNameParser(a)
            return [removeStartingSymbols(name), cssParser(name, b)]
        })
    }
}

function inferLanguage(s) {
    if (hasDashedLine(s)) {
        return 'html'
    }
    return 'js'
}

function splitCssNameAndValue(s) {
    if (test(/: /, s)) {
        return splitonce(s, ': ')
    }
    return splitonce(s)
}



function prettifyHtml(s) {
    return s.replace(/ *[{}]+ */g, '')
}

function cssNameParser(s) {
    const dict1 = {
        'nt': 'nth-of-type',
        'nc': 'nth-child',
    }
    const dict2 = {
        'foo': 'boo',
    }

    const dicts = [dict1, dict2, cssSelectorSuffixes]
    const regex = ncg('($1)(\\d+)|:($3)', dicts, 'g')
    s = s.replace(/^\w+/, cssAddPeriod)
    s = s.replace(regex, (_, a, b, c, d) => {
        if (a) {
            return `:${dict1[a]}(${b})`
        }
        if (c) {
            return `:${cssSelectorSuffixes[a]}(${b})`
        }
    })
    return s
}

function cssParseFromString(s) {
    /* string to string parsing */
    /* @cssLoader */

    if (hasBracket(s)) {
        return s
    }
    if (isRawBracketCss(s)) {
        const chunks = schemaMatch('^.?$word {$symbols}', s, 'gm')
        return reduceToString(chunks, (name, items) => {
            name = cssNameParser(name)
            let values = items.reduce(cssItemReducer, [])
            return toCssFinalProduct(name, values)
        })
    }

    return reduceToString(linegetter(s), (item) => {
        let [a,b] = splitCssNameAndValue(item)
        let name = cssNameParser(a)
        return cssParser(name, b)
    })
}


function gridify(n, key = 'rows') {
        
    const opposites = {
        'rows': 'column',
        'columns': 'row',
    }
    const oppositeKey = opposites[key]
    const verticalColumnGridTemplate = `
      display: grid;
      grid-template-${key}: repeat(${n}, 1fr)
      grid-auto-flow: ${oppositeKey};
    `
    return verticalColumnGridTemplate
}

//console.log(cssParser('bbb3', 'bgr1'))
//console.log(toCssFinalProduct('a', cssEvaluator('bbb3 bgr1')))

//console.log(fixSelector('.sdf'))
        //text = 'wh40 jic'
        //const dict = cssEvaluator(text)
        //const cssValue = cssReduce(dict)
        //console.log({cssValue})

//console.log(cssParser(null, 'bgp 1010'))
//console.log(cssParser(null, 'bgg v3v7'))
//console.log(cssParser(null, 'fflato'))
//console.log(cssEvaluator('2020'))
//console.log(cssGridArea('tom', ['a', 'b', 'c'], 'ab/cc'))
//cssIncrement('font-family', 1, 1)
//console.log(cssIncrement('font-family', null, 1))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('bb1b3'))
//console.log(cssEvaluator('btlr5'))
//console.log(cssEvaluator('bru'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('fcb5'))
//console.log(cssEvaluator('bot10 top10 left10 right10 l20 r20p t30em'))
        //console.log(cssParser('vim-modes', 'p5 aic flex jcs a b0 r0 cmb7 fs18 h60px w240px fw600 sans z1000'))
        //console.log(cssEvaluator('mu52'))
