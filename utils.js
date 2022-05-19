
const aobj={a:1, b:2, c:3}
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const TABINPUT = '\n\t$c\n'
const HTMLTAGS = ['p', 'div', 'a', 'section', 'main', 'img', 'svg']

const AGAIN = 'again'
const NEXT_LEVEL = 'nextlevel'
const INCORRECT = 'incorrect'
const CONTINUE = 'CONTINUE'
const DONE = 'DONE'
const CORRECT = 'CORRECT'
const IN_PROGRESS = 'IN_PROGRESS'
const NEXT = 'NEXT'
const STOP = 'STOP'
const z = 'z'
const SUCCESS = 'SUCCESS'

//const LEADER_KEY = '\\'
const LEADER_KEY = ';'
const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]
const fakeWindow = {
    a: {
        b: {
            c() {
                console.log('hi')
            },
        }
    },
    b() {
        console.log('b')
    },
}
boop='BOOP'
a='a'
b='b'
alist=['a', 'b', 'c', 'd', 'e']
const nativeConstructors = [
    'Array',
    'Function',
    'Object',
    'Promise',
    'String',
    'Number',
    'Null',
    'Undefined',
    'RegExp',
]
function isReferenceError(e) {
    return e.constructor.name == 'ReferenceError'
}

function isSyntaxError(e) {
    return e.constructor.name == 'SyntaxError'
}

original = console.log
const doglog = dogLogFactory()
const consoleColors = {
    Reset : '\x1b[0m',
    Bright : '\x1b[1m',
    Green : '\x1b[32m',
    Blue : '\x1b[34m',
    Red : '\x1b[31m',
}
function Red(x) {
    return consoleColors.Red + x + consoleColors.Reset
}
function pairlog(a, b) {
    //const [name, lineNumber] = getStackInfo()
    //const info = name + ': ' + lineNumber
    const Reset = '\x1b[0m'
    const Bright = '\x1b[1m'
    const Green = '\x1b[32m'
    const Blue = '\x1b[34m'
    const Red = '\x1b[31m'
    original(Bright + Red + a + Reset, b)
}
function dogLogFactory() {
    const Reset = '\x1b[0m'
    const Bright = '\x1b[1m'
    const Red = '\x1b[31m'
    const Green = '\x1b[32m'
    const Blue = '\x1b[34m'

    function info() {
        const [name, lineNumber] = getStackInfo()
        return name + ': ' + lineNumber
    }

    let count = 1

    return function lambdaDisplay(...args) {
        let message = `   [count ${count++}]`
        original(
            Bright + Red + info() + Blue + message + Reset,
            ...args
        )
    }
}

const WordToNumberDictionary = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
    hundred: 100,
    thousand: 1000,
    oneThousand: 1000,
    nineThousand: 9000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000,
}
//const getFunctionInfo = trace(getFunctionInfo2)
function trace(fn) {
    return function lambda(...args) {
        try {
            return fn(...args)
        } catch (e) {
            console.log({ e, args })
            throw 'trace error'
        }
    }
}
function getFunctionInfo(s) {
    s = s.toString().trim()
    let type = getFirstWord(s)
    let parameters
    let properties
    let returnValues

    let name = getFunctionName(s)
    if (!name) return
    if (test(/^[A-Z]\w*?Component$/, name)) type = 'component'

    switch (type) {
        case 'component':
        case 'function':
        case 'class':
            break
        case 'var':
        case 'const':
            type = 'variable'
            break
        case 'async':
            type = 'function'
            break
        case 'if':
        case 'for':
        case 'while':
        case 'let':
            return
        default:
            return
    }

    if (type == 'function') {
        parameters = getParameters(s)
        returnValues = findall(/return (\w+) *$/gm, s)
    }

    if (type == 'class') {
        properties = getClassPropertiesFromString(s)
    }

    return {
        body: s,
        name,
        type,
        properties: properties,
        parameters,
        returnValues,
    }
}
var dog = display

function display(s, b) {
    const Reset = '\x1b[0m'
    const Bright = '\x1b[1m'
    const Red = '\x1b[31m'
    const Green = '\x1b[32m'
    const Yellow = '\x1b[33m'
    const Blue = '\x1b[34m'
    const Magenta = '\x1b[35m'

    function info() {
        const [name, lineNumber] = getStackInfo()
        return name + ': ' + lineNumber
    }

    if (b) {
        original(Bright + Red + info(), Blue, s, Reset, b)
        return
    }
    if (isString(s)) {
        if (hasNewline(s)) {
            original(
                Bright + Red + info() + Reset,
                s,
                '------------------'
            )
        } else {
            original(Bright + Red + info() + Reset, s)
        }
    } else if (s) {
        //if (isVue(s)) {
        //return JSON.stringify(getClassProperties(s))
        //}

        if (isClass(s)) {
            return JSON.stringify(getClassProperties(s))
        } else {
            original(Bright + Red + info() + Reset, s)
        }
    } else {
        original(Bright + Red + info() + Reset)
    }
}

if (typeof window !== 'undefined') {
    module = {}
    module.exports = {}
    require = () => ({})
} else {
    //window={
    //addEventListener: () => ({}),
    //addEventListener: () => ({}),
    //}
    localStorage = {
        setItem: (a, b) => {
            this.store = {}
        },
        getItem: (a) => ({}),
        store: {},
    }
}

function noop() {
    return
}
function isUrl(s) {
    return s.startsWith('http')
}

const seasons = ['autumn', 'winter', 'spring', 'summer']

class StandardObject {
    constructor(store = {}) {
        this.store = store
    }
    get length() {
        return Object.keys(this.store).length
    }
    get keys() {
        return Object.keys(this.store)
    }
    get values() {
        return Object.values(this.store)
    }
    get entries() {
        return Object.entries(this.store)
    }
    has(key) {
        return this.store.hasOwnProperty(key)
    }
    get(key) {
        return this.store[key]
    }
}

function isError(x) {
    return x.constructor.name.includes('Error')
}

function isSet(x) {
    return x.constructor.name == 'Set'
}

function stringify(s, birth) {
    return !exists(s)
        ? ''
        : isPrimitive(s)
        ? s
        : isFunction(s)
        ? s.toString()
        : JSON.stringify(s, birth, 2)
}

function functionStringBirth(s) {
    const watcher = new Watcher()
    return !exists(s)
        ? ''
        : isPrimitive(s)
        ? s
        : isFunction(s)
        ? s.toString()
        : JSON.stringify(s, replacer, 2)

    function replacer(k, v) {
        const name = v.constructor.name
        if (k.startsWith('_')) return //isPrivate//
        if (name == 'Object' || name == 'Array') {
            return v
        }

        if (name == 'Function' || name == 'AsyncFunction') {
            return v.toString()
            // a lambda function ... wont remember the state
        }
        if (name == 'String' || name == 'Number') {
            return stringify(v)
        } else if (v) {
            return {
                constructorName: v.constructor.name,
                constructorValue: mapState(v),
            }
        }
    }
}

function isPrivate(s) {
    return s.startsWith('_')
}

function consoleVisitor(x) {
    if (x == null) return
    return x.name || x.constructor.name
}
function reconfigure(state, options) {
    if (!state.hasOwnProperty(('config'))) {
        console.log('reconfigure always targets the config property')
        return 
    }
    assignExisting(state.config, options)
}

function enforce(s) {
    s = s.replace(/[a-zA-Z]+$/, (x) => {
        return singlequote(x)   
    })
    let allGood = eval(s)
    if (!allGood) {
        let code = s.replace(/==/, '=')
        eval(code)
    }
}


function divide10(x) {
    if (x % 10 == 0) return x / 10
    return x
}

function notIn(x, ...args) {
    args = gatherArgs(args)
    if (isObject(x)) {
        
    }
}


function isColor(s) {
    return roygbiv.includes(s) || /^#/.test(s)
}

function arithmetic(operator, a, b) {
        const answer = eval(`${a} ${operator} ${b}`)
        const question = `${a} ${operator} ${b} = `
        const expression = `${question}${answer}`
        const payload = {answer, question, expression}
        return payload
}

function coerceTo(x, mode) {
    assert(mode)
    if (mode == 'array' || mode == Array) {
        if (isArray(x)) {
            return x
        }
        if (isString(x)) {
            return /\n/.test(x) ? 
                x.split(/\n/) :
                / /.test(x) ? 
                x.split(' ') :
                x.split('')
        }
    throw 'not done'
    }

    if (mode == 'string' || mode == String) {
        if (isString(x)) {
            return x
        }
        if (isArray(x)) {
            return x.join(' ')
        }
    throw 'not done'
    }
    throw 'not done'
}

function stringDictionaryEntry(a, b) {
    const parse = (x) => {
        if (isString(x)) {
            return quotify(x)
        }
        return toStringArgument(x)
    }
    return `'${a}': ${parse(b)},`
}



//function isJsonParsable(b) {
    //return test(/isJsonParsable)
//}

function looksLikeComponent(s) {
    return /-/.test(s) || /^[A-Z]/.test(s)
}

function notIn(...args) {
    const ref = flat(args)
    return (x) => {
        return !ref.includes(x)
    }
}

function lineFilter(s, fn) {
    return join(s.split('\n').filter(fn))
}


function info(state, ...keys) {
    const value = reduce(keys, (key) => state[key])
    console.log(value)
    return value
}

function editObject(obj, key, fn) {
    obj[key] = fn(obj[key])
    return obj
}

function isCssWord(s) {
    return /^[\w-]+$/.test(s)
}


function isMp3(x) {
    const e = ['m4a', 'wav', 'mp3']
    return e.includes(getExtension(x))
}



function getProseWords(s) {
    return s.match(/\b\w[\w\'-]*\w\b/g)
}

function puppetVisitor(x, parent) {
    return 
    if (x == null) return `[Primitive]: null`
    const name = x.constructor.name
    const known = {
        TreeCursor: lookNode,
        BufferNode: lookNode,
        'BufferNode$1': lookNode,
        Tree: lookNode,
        TreeNode: lookNode,
    }


    if (name.endsWith('Error')) {
        console.log()
        return x.stack
    }

    if (name == 'Object' || name == 'Array') {
        return x
    }

    if (name == 'Function' || name == 'AsyncFunction') {
        return x.name
        return `[Primitive]: ${x.name}`
    }

    if (name == 'Boolean') {
        return x
        return `[Primitive]: ${x}`
    }

    if (name == 'Number') {
        return x
        return `[Primitive]: ${x}`
    }

    if (name == 'String') {
        return x
        return `[Primitive]: [${x || 'empty-string'}]`
    }

    if (name in known) {
        const value =  known[name](x)
        return value
    }
    return `[Name]: ${name || 'undefined'}`
}

function lookDiv(x) {
    return {
        name: x.className || x.tagName,
        text: x.textContent,
        pos: getBoundingClientRect(x),
        color: x.style.background,
    }
}

function legoConsole(x) {
    const value = JSON.stringify(_legoConsole(x), null, 2)
    console.log(value)
    return value 
}
function _legoConsole(x) {
    if (x == null) return `[Primitive]: null`
    const name = x.constructor.name
    const known = {
        TreeCursor: lookNode,
        BufferNode: lookNode,
        'BufferNode$1': lookNode,
        Tree: lookNode,
        TreeNode: lookNode,
        HTMLDivElement: lookDiv,
    }

    if (name.endsWith('Error')) {
        return x.stack
    }

    if (name == 'Object' || name == 'Array') {
        return x
    }

    if (name == 'Function' || name == 'AsyncFunction') {
        return x.name
        return `[Primitive]: ${x.name}`
    }

    if (name == 'Boolean') {
        return x
        return `[Primitive]: ${x}`
    }

    if (name == 'Number') {
        return x
        return `[Primitive]: ${x}`
    }

    if (name == 'String') {
        return x
        return `[Primitive]: [${x || 'empty-string'}]`
    }

    if (name in known) {
        return known[name](x)
    }
    return `[Name]: ${name || 'undefined'}`
}




function forIterationArg(s) {
    if (s.endsWith('s')) {
        return s.slice(0, -1)
    }
    const dict = {
        'children': 'child',
    }

    let match = search(/children$/i, s) || ''
    return dict[match.toLowerCase()] || 'item'
}
const knownAttrs = {
    //submit: ['@submit', 'onSubmit'],
    //click: ['@click', 'onClick'],
    //x: ['@x', 'onX'],
    //x: ['@x', 'onX'],
    //x: ['@x', 'onX'],
    //x: ['@x', 'onX'],
    //submit: ['@submit', 'onSubmit'],
}
function vueHelper(key, value) {
    let [a,b] = _vueHelper(key, value)
    return `${a}="${b}"`
}
function _vueHelper(key, value) {
    if (key == '@') {
        return ['@' + value, value]
    }

    if (key == ':') {
        if (value.includes('=')) {
            let [a,b] = value.split('=')
            return [':' + a, b]
        }
        return [':' + value, value]
    }
    if (value == null && key in knownAttrs) {
        return knownAttrs[key]
    }
    let vKey = vmap[key] || key
    if (key == 'for') {
        value = `(${forIterationArg(value)}, i) in ${value}`
    }

    return [vKey, value]
}

function singleWordParser(s) {
    
        if (s.includes('=')) {
            let [a, b] = split(s, '=')
            let div = 'div'
            if (a == 'for') {
                let arg = depluralize(b)
                let stuff = `(${arg}, index) in ${b}`
                className = toDashCase(arg) + '-item'
                return toOpeningTag('div', {
                    class: className,
                    'v-for': stuff,
                })
            }
        }
        if (s == 'div' || s == 'container') {
            let containerClass = 'container-' + 100
            return toOpeningTag(div, {
                class: containerClass,
            })
        }

        if (s == 'transition') {
            return toOpeningTag(s, {
                mode: 'out-in',
                name: 'fade',
            })
        }

        if (s == 'component') {
            return divify(s, {
                ':is': 'currentComponent',
            })
        }
        if (test(/^item\.\w+$/, s)) {
            let className = state.forArg
                ? state.forArg + '-' + toDashCase(s)
                : toDashCase(s)

            return divify('div', { class: className }, vueText(s))
        }

        return divify('div', { class: toDashCase(s) }, vueText(s))
        return toOpeningTag(div, { class: s })
}

function announceError(e) {
    console.log(['ERROR', getCaller(), e.toString()])
}


function repf(a, b, flags = 'g') {
    return function replacerLambda(s) {
        return replace(a, b, s, flags)
    }
}

function hasOverlap(a, b) {
    return a.some((x) => b.includes(x))
}



function typeOf(x) {
    if (x == null) return 'null'
    const name = x.constructor.name
    switch (name) {
        case 'String': 
            return name + '-variable'
        default:
            return name
    }
}


function jshint(source) {
    const JSHINT = require('../jshint.js')

    const predef = {
        Vue: true,
        prettier: true,
        clearTimeout: true,
        setTimeout: true,
        console: true,
    }

    const options = {
        asi: true,
        debug: true,
        evil: true,
        eqnull: true,
        esversion: 8,
        expr: true,
        funcscope: true,
    }

    JSHINT.jshint(source.toString(), options, predef)
    return JSHINT.data()
}

function puppetVisitorDeep(x) {
    return runner(x)
    function runner(x) {
    if (x == null) return `[Primitive]: null`
    if (isPrimitive(x)) {
         return x
    }

    if (isSet(x)) {
        return Array.from(x)
    }

    const name = x.constructor.name
    if (name == 'Object' || name == 'Array') {
        return x
    }

    if (name == 'Function' || name == 'AsyncFunction') {
        return `[Primitive]: ${x.name}`
    }
    return reduceObject(x, (k, v) => {
        return [k, runner(v)]
    })
    }
}

function shortValue(s) {
    if (s.includes('\n')) {
        return (
            s.match(/.+/)[0] +
            ' ... ' +
            opposite(search(/[\[\{]/, s))
        )
    }
    return s
}

function lookNode(x, s) {
    if (!s) return x.name
    if (!x) return
    const value = shortValue(s.slice(x.from, x.to))
    const o = {
        name: x.name,
        from: x.from,
        to: x.to,
        value: value,
        //long: s.slice(x.from, x.to)
    }
    return o
}

function datestamp(date) {
    const [month, day, year] = getMDY(date)
    return (
        month.toString().padStart(2, 0) +
        '-' +
        day.toString().padStart(2, 0) +
        '-' +
        year
    )
}


function getHMSM(date) {
    if (!date) date = new Date()
    else if (isString(date)) {
        date = new Date(date)
    }
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const ms = date.getMilliseconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    return [hours, minutes, seconds, ms, ampm]
}


function getDayAndMonth(date) {
    
    if (!date) date = new Date()

    var day = DAYS[ date.getDay() ];
    var month = MONTHS[ date.getMonth() ];
    return [day, month]
}
function datePhrase() {
    const date = new Date()
    const [day, month] = getDayAndMonth(date)
    const [_, dayNumber, year] = getMDY(date)
    return {
        day, phrase: `${month} ${dayNumber}${ordinal(dayNumber)}, ${year}`
    }
}

function ordinal(n) {
    return [, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th'
}

function getMDY(date) {
    if (!date) date = new Date()
    else if (isString(date)) {
        date = new Date(date)
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [month, day, year]
}

function isString(s) {
    return typeof s === 'string'
}

function conditional(fn, condition) {
    return function lambda(x) {
        if (ftest(condition, x)) return fn(x)
        return x
    }
}

function isArray(a) {
    return Array.isArray(a)
}

function isObject(x) {
    return (
        Object.prototype.toString.call(x) == '[object Object]'
    )
}
function getConstructorName(x) {
    return x && x.constructor && x.constructor.name
}
function isObjectLiteral(x) {
    return getConstructorName(x) == 'Object'
}

function seeInfo(x) {
    //
    //waiting on me...
    //v=new x((vv) => vv()).then((y) => console.log(y))
    //console.log(v)
    //console.log(Object.keys(v))
    //console.log(v)
    //Object.getOwnPropertyNames(new x(identity))
    //console.log(Object.getOwnPropertyNames(new x(identity)))
    //Object.getOwnPropertyNames(x)
    //Object.getOwnPropertyNames
    //console.log(Object.getPrototypeOf({}).hasOwnProperty('__defineGetter__'))
    //return Object.getPrototypeOf(x).hasOwnProperty('__defineGetter__')
}

function mapState(state) {
    const name = state.constructor.name
    const ref = {
        Set: Array.from,
        RegExp: String,
        Watcher: 'seen',
        //'Storage': 'store',
    }
    if (ref.hasOwnProperty(name)) {
        const key = ref[name]
        return isFunction(key) ? key(state) : state[key]
    }
}

function reduceIterableHelper(acc, value, k) {
        if (isArray(value) && value.length == 2) {
            acc[value[0]] = value[1]
        } else if (!isNull(value)) {
            /* if the value is null ... skip */
            acc[k] = value
        }
        return acc
}
function reduceObject(o, fn = (k, v) => [k, v]) {
    return Object.entries(o || {}).reduce((acc, item, i) => {
        const value = fn(...item, i)
        return reduceIterableHelper(acc, value, item[0])
    }, {})
}
function reduceArray(a, fn) {
    if (isNestedArray(a)) {
        return a.reduce((acc, item, i) => {
            const value = fn(...item, i)
            return reduceIterableHelper(acc, value, item[0])
        }, {})
    }
    else {
        return a.reduce((acc, item, i) => {
            const value = fn(item, i)
            return reduceIterableHelper(acc, value, item)
        }, {})
    }
}
function reduce(items, fn) {
    if (!exists(items)) return {}
    const objectReducer = (k, v) => [k, v]

    if (isObject(items)) {
        return reduceObject(items, fn || objectReducer)
    }

    return reduceArray(items, fn || objectReducer)
}

function uncomment(s) {
    return s.replace(/^\/\/ */, a)
}

function escapeNewlinesAndQuotes(s) {
    return s.replace(/[\n\'\"]/g, (x) => {
        switch (x) {
            case '\n':
                return '\\n'
            case "'":
                return "\\'"
            case '"':
                return '\\"'
        }
    })
}

function yes() {
    return true
}

function longShort(a, b) {
    if (isNumber(a)) {
        return a >= b ? [a, b] : [b, a]
    }
    return len(a) >= len(b) ? [a, b] : [b, a]
}

function shortLong(a, b) {
    if (isNumber(a)) {
        //console.log(a <= b, 'hi')
        //console.log(); throw ''
        return a <= b ? [a, b] : [b, a]
    }
    return len(a) <= len(b) ? [a, b] : [b, a]
}

function getLines(s, a, b) {
    let regex = ''
    let marker = '\\n.*'
    if (b) {
        if (a) {
            regex += '^.*\n'
            regex += marker.repeat(a - 1)
        }
        regex += '('
        regex += `(?:.*\\n){0,${b - 1}}.*`
        regex += ')'
    } else {
        regex += '('
        regex += '^.*'
        regex += `(?:\\n.*){0,${a - 1}}`
        regex += ')'
    }
    //console.log(regex)
    return search(regex, s)
}
function isSimilar(a, b) {
    //function runner(s) {
    //const words = getWords(getLines(s.trimStart(), 3), {mode:'code'})
    //return words
    //}

    function runner(s) {
        return s.trimStart().slice(0, 10).trim()
    }

    function runner(s) {
        return getLines(s.trimStart(), 0, 1).trim()
    }

    if (type(a) !== type(b)) return false
    if (!a || !b) return false
    if (isString(a)) {
        return runner(a) == runner(b)
        return (
            unique(...longShort(runner(a), runner(b))).length <
            3
        )
    }
    return true
}
function push(items, x, unique) {
    if (!x) return items
    if (isSet(x)) {
        x = Array.from(x)
    }
    if (unique) {
        if (isArray(x)) {
            for (let item of x) {
                if (!items.includes(item)) items.push(item)
            }
        } else if (!items.includes(x)) {
            items.push(x)
        }
    } else {
        isArray(x) ? items.push(...x) : items.push(x)
    }
    return items
}
function mergeState(state, key, value) {
    state[key] = merge(state[key], value)
    return state
}

function mergeProperty(state, key, value) {
    state[key] = merge(state[key], value)
    return state
}
function iterTest(s, items) {
    for (let i = 0; i < items.length - 1; i += 2) {
        if (test(items[i], s)) {
            return items[i + 1]
        }
    }
    return getLast(items)
}

function hasPeriod(s) {
    return s.includes('.')
}

function getFunction(key, s) {
    const functionRE = `^(?:(?:async )?function|const|var|class) ${key}[^]+?\\n}`
    return search(regex, s)
}

function argumentGetter(args) {
    if (args.length == 1) {
        return
    }
    return Array.from(args)
}
function argumentFiller(args, ...fillers) {
    if (args.length == 1) {
        return [fillers[0], args[0]]
    }
    return args
}

function toMilliseconds(s) {
    s = Number(s) || 0
    if (s >= 50) {
        return s
    }
    return s * 1000
}

function isAsync(x) {
    return x.constructor.name == 'AsyncFunction'
}

function partition(items, n) {
    if (isFunction(n)) {
        return partitionWithFunctions(...Array.from(arguments))
    }
    const store = []
    for (let i = 0; i < items.length; i++) {
        if (i % n == 0) {
            store.push([])
        }
        getLast(store).push(items[i])
    }
    return store
}

function getInterestingBindings(s) {
    const regex = /[a-zA-Z][\w.]{2,}(?=[\(\[\]])/g
    return Array.from(s.match(regex) || [])
}

function hasBracket(s) {
    return test(/{/, s)
}

function throwError(...args) {
    console.log(args)
    throw ''
}

function coinflip(n = 0.1) {
    return Math.random() > 1 - n
}

function isUtf(s) {
    const utfe = [
        'txt',
        'lang',
        'drafts',
        'js',
        'py',
        'vim',
        'json',
        'css',
        'html',
    ]
    return utfe.includes(getExtension(s))
}

s = `
// increment ...
// cssIncrement ...
// able to do some things ... today
//
`

function smartMore(s) {
}
function opposite(s) {
    const dict = {
        '{': '}',
        'visible': 'hidden',
        'hidden': 'visible',
        '[': ']',
        '(': ')',
        true: false,
        false: true,
        '^': '$',
        '}': '{',
        ']': '[',
        ')': '(',
        1: 0,
        0: 1,
    }
    s = s.toString()
    return dict.hasOwnProperty(s) ? dict[s] : s
}

class CumulativeStorage {
    constructor(store) {
        this.store = store || {}
    }
    get value() {
        return this.store
    }
    add(...args) {
        addProperty(this.store, ...args)
    }
}

function addProperty(o, ...args) {
    if (args.length == 2) {
        return addPropertyLambda2(o, ...args)
    }

    if (args.length == 3) {
        if (args[2] == Array) {
            return addPropertyLambdaArray(o, ...args)
        }
        return addPropertyLambda3(o, ...args)
    }

    function addPropertyLambdaArray(o, key, value) {
        if (!o.hasOwnProperty(key)) {
            o[key] = []
        }
        isArray(value)
            ? o[key].push(...value)
            : o[key].push(value)

        return o
    }
}

function exists(input) {
    if (input == null) return false
    if (isString(input)) return input.trim().length > 0
    if (isArray(input)) return input.filter(exists).length > 0
    if (isObject(input)) return Object.keys(input).length > 0
    return true
}

function addPropertyLambda2(o, key, value) {
    if (o[key]) {
        if (isObject(value)) {
            Object.assign(o[key], value)
        } else if (isArray(value)) {
            o[key] = [...o[key], ...value]
        }
        return o
    }

    o[key] = value
    return o
}

function addPropertyLambda3(o, parentKey, key, value) {
    if (!o.hasOwnProperty(parentKey)) {
        o[parentKey] = {}
    }
    o[parentKey][key] = value
    return o
}

function iterRange(...args) {
    const store = []
    args = gatherArgs(args)
    for (let i = args[0]; i <= args[1]; i++) {
        store.push(i)
    }
    return store
}

function isPureObject(x) {
    return x && x.constructor.name == 'Object'
}

function isThisFunction(s) {
    s = s.toString()
    return test(/\bthis\b/, s)
}

function rainbow(a, b = 10, stops = 20) {
    return rainbowStops(a, b, stops)

    function rainbowStop(h) {
        let f = (n, k = (n + h * 12) % 12) => {
            return (
                0.5 -
                0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1)
            )
        }
        let rgb2hex = (r, g, b) =>
            '#' +
            [r, g, b]
                .map((x) =>
                    Math.round(x * 255)
                        .toString(16)
                        .padStart(2, 0)
                )
                .join('')
        return rgb2hex(f(0), f(8), f(4))
    }

    function rainbowStops(a, length, stops) {
        let store = []
        let base = a
        for (let i = 0; i < length; i++) {
            let start = base + i
            let increment = start / stops
            console.log(increment)
            const value = rainbowStop(increment / length, 1, 0.5)
            store.push(value)
        }
        return store
    }
}

function average(a, b) {
    return (a + b) / 2
}
// u need a grammar & u need visitors

class Indexed extends StandardObject {
    constructor(store = {}) {
        super(store)

        this.tracker = exists(store)
            ? reduce(store, (k, v) => [
                  k,
                  { index: 0, done: !exists(v) },
              ])
            : {}

        this.key = this.keys[0]
        this.config = {
            autoIncrement: true,
            autoIncrement: false,
            modulus: false,
        }
    }

    get(index) {
        return this.store[this.key][index]
    }

    get index() {
        return this.tracker[this.key].index
    }

    set index(n) {
        if (this.isDone()) {
            if (this.config.autoIncrement) {
                this._incrementKey(this.key)
            }
            return 
        }
        this.tracker[this.key].index = n
    }

    set indexOld(val) {
        if (this.get(val)) {
            this.tracker[this.key].index = val
        } else {
            this.tracker[this.key].done = true
            const done = this._incrementKey(this.key)
            if (done) {
                this.finished = true
            }
        }
    }

    get value() {
        return this.store[this.key][this.index]
    }
    get length() {
        return this.store[this.key].length
    }

    _incrementKey(key) {
        let count = 0
        while (count++ < this.keys.length) {
            key = modularIncrement(this.keys, key)
            if (this.tracker[key].done === false) {
                this.key = key
                return false
            }
        }
        return true
    }

    set(key) {
        this.key = key
    }

    isDone() {
        const done = this.index == this.length
        if (done) {
            this.tracker[this.key].done = true
        }
        return done
    }
}

function isObject(x) {
    return type(x) == 'Object'
}

function type(x) {
    return search(
        /object (\w+)/,
        Object.prototype.toString.call(x)
    )
}

function breaker(limit = 5) {
    if (typeof __once__ == 'undefined') {
        __once__ = 0
    }
    if (++__once__ == limit) {
        console.log()
        throw 'limit reached'
    }
}

function isNumber(s) {
    return (
        typeof s == 'number' || test('^-?\\d+(?:\\.\\d+)?$', s)
    )
}

function test(regex, s, flags = '') {
    return (
        isString(regex) ? RegExp(regex, flags) : regex
    ).test(s)
}

function range(...args) {
    let a
    let b
    let c
    if (!isPrimitive(getLast(args))) {
        c = args.pop()
    }
    if (args.length == 1) {
        if (isStringNumberRange(args[0])) {
            ;[a, b] = split(args[0], '-').map(Number)
            console.log(a, b)
        } else {
            b = args[0]
            a = 1
        }
    } else {
        ;[a, b] = args
    }

    if (isArray(b)) {
        b = b.length - 1
        a = 0
    }

    const store = []
    for (let i = a; i <= b; i++) {
        if (c) {
            if (c.toString() == [].toString()) store.push([])
            else if (c.toString() == {}.toString())
                store.push({})
        } else {
            store.push(i)
        }
    }
    return store
}

function isPrimitive(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

function textTable(items) {
    const matrix = new Matrix(items, { width: 4 })
    let t = ''
    matrix.iterate((value, k, v, i, linebreak) => {
        t += i + '. ' + value + '   '
        if (linebreak) t += '\n'
    })
    return t
}

function isDoubleIterable(items) {
    return isObject(items) || isNestedArray(items)
}

function isQuote(s) {
    return test(/^['"]/, s)
}

function isStringNumberRange(s) {
    return /^\d+-\d+$/.test(s)
}

class Tally {
    constructor(items) {
        this.storage = tally(items || [], null)
    }
    lowest() {
        const lowest = getShortest(this.storage.values)
        const store = mapfilter(this.storage.entries, (x) => {
            return x[1] == lowest && x[0]
        })
        return coerceToNullIf(store.length > 1, store[0])
    }
}
function coerceToNullIf(condition, value) {
    if (condition) return null
    return value
}
function tally(arr, mode = Object) {
    const storage = new Storage({ _mode: Number })
    for (let item of arr) {
        storage.add(item)
    }
    return mode == Object ? storage.value : storage
}

function spellcheckFactory(dict) {
    let regex = `\\b(?:${Object.keys(dict).join('|')})\\b`
    regex = RegExp(regex, 'g')
    return function spellcheck(s) {
        return simpleSpellcheck(s, dict, regex)
    }
}
class Spellcheck {
    constructor(dict) {
        const regex = `\\b(?:${Object.keys(dict).join('|')})\\b`
        this.regex = RegExp(regex, 'g')
        this.dict = dict
    }
    spellcheck(s) {
        return simpleSpellcheck(s, this.dict, this.regex)
    }
}
function simpleSpellcheck(s, dict, dictRegex) {
    const regex = /[.\'\"]/
    if (!dictRegex)
        dictRegex = RegExp(
            `\\b(?:${Object.keys(dict).join(
                '|'
            )})(?![.\'\"\\w])`,
            'g'
        )
    return s.replace(dictRegex, (x, offset, original) => {
        if (regex.test(original.charAt(offset - 1))) return x
        return dict[x] || x
    })
}

function typist(s, mode = 'simple') {
    function typist2(s) {
        const dict = {
            'E': 'Enter',
            'spc': ' ',
        }
        return split(s).map((item, i) => {
            return dict[item] || item
            let [a, b] = split(item, '')
            if (b) {
                return { key: b, ctrlKey: a }
            }
            return { key: a }
        })
    }
    if (mode == 'simple') return typist2(s)
    const dict = {
        cr: 'Enter',
        esc: 'Escape',
        esc: 'Escape',
        left: 'ArrowLeft',
        l: 'ArrowLeft',
        bs: 'Backspace',
        right: 'ArrowRight',
        down: 'ArrowDown',
        up: 'ArrowUp',
        u: 'ArrowUp',
        r: 'ArrowRight',
        d: 'ArrowDown',
        space: 'Space',
        f1: 'F1',
        tab: 'Tab',
        stab: 'Shift-Tab',
    }

    function reducer(acc, item, key) {
        if (!test(/^</, key)) {
            acc.key = key
            return acc
        }
        if (item == 'c') acc['ctrlKey'] = true
        else if (item == 'a') acc['altKey'] = true
        else acc.key = dict[item] || item
        return acc
    }
    function reducern(acc, item, key) {
        acc.isFakeKeyboardEvent = true
        if (!test(/^</, key)) {
            acc.key = key
            return acc
        }
        acc.preventDefault = identity
        if (isNumber(item)) {
            acc.sleep = Number(item)
            return acc
        }
        if (item == 'c') acc['ctrlKey'] = true
        else if (item == 'a') acc['altKey'] = true
        else acc.key = dict[item] || item
        return acc
    }
    function transformer(key) {
        return key
            .slice(1, -1)
            .toLowerCase()
            .split('-')
            .reduce((acc, item) => {
                return (reducerFn || reducer)(acc, item, key)
            }, {})
    }
    function filter(x) {
        return x != null && x != ''
    }

    function run(s) {
        return split(s, /(<.*?>)|/).map(transformer)
    }

    return run(s)
}

function isNestedArray(x) {
    return isArray(x) && isArray(x[0])
}

function removeEs6(s) {
    return s.replace(/^import.+\n*|^export /gm, '')
}

function isLink(s) {
    return getExtension(s) == 'css'
}

function regexElongation(s) {
    return `(?:${s})+`
}

function getBindingName(s) {
    const bindingRE = /^(?:def|class|const|var|(?:async )?function) (\w+)/
    return search(bindingRE, s)
}

function getFunctionName(s) {
    if (isFunction(s)) return s.name
    return search(
        /^(?:def|class|const|var|(?:async )?function) (\w+)/,
        s
    )
}

function isFunction(x) {
    return typeof x === 'function'
}

function isPlural(s) {
    return test(/s$/, s)
}

function toSpaces(n = 4, tabs = 0) {
    if (!n) {
        return ''
    }
    if (tabs) return isNumber(n) ? '\t'.repeat(n/4) : '\t'.repeat(n.length/4)
    return isNumber(n) ? ' '.repeat(n) : n
}

function replace(regex, replacement, s, flags = 'gm') {
    return s.replace(prepareRegex(regex, flags), replacement)
}

class Watcher {
    constructor(fn) {
        this.fn = fn || identity
        this.seen = new Set()
        this.count = 0
    }
    filter(items) {
        return items.filter((item, i) => {
            return this.isFresh(item)
        })
    }
    isFresh(key) {
        let value = this.fn(key)
        if (this.seen.has(value)) {
            this.count += 1
            return false
        }
        this.seen.add(value)
        this.count = 0
        return true
    }
    has(key) {
        return this.seen.has(key)
    }
}

function isHtmlFile(s) {
    return /\.html$/.test(s)
}

function isCssFile(s) {
    return /\.css$/.test(s)
}

function isJavascriptFile(s) {
    return /\.js$/.test(s)
}

function getQuotes(s) {
    return findallStrings(s)
    //
}

function findKeyFactory(mode, index = 0) {
    const method = mode == 'single' ? 'find' : 'filter'
    return function findKeyRunner(x, kt, vt) {
        const value = Object.entries(x)[method]((x) => {
            if (kt) return kt(x[0])
            if (vt) return vt(x[1])
        })

        if (mode == 'single') {
            return value && value[index]
        }

        if (mode == 'multiple') {
            return value.map((x) => x[index])
        }
    }
}

const findKey = findKeyFactory('single')
const findKeys = findKeyFactory('multiple')

function getShortestLongest(mode) {
    const compare =
        mode == 'longest' ? (a, b) => a > b : (a, b) => a < b
    const mathFn = mode == 'longest' ? Math.max : Math.min
    const defaultMode = null
    //const defaultMode = mode == 'longest' ? Number : null

    return function getter(
        arr,
        measure = len,
        mode = defaultMode
    ) {
        let asObject
        let keys
        if (isObject(arr)) {
            keys = Object.keys(arr)
            arr = Object.values(arr)
            asObject = true
        }

        //console.log(mode)
        const value = arr.reduce(
            (acc, item, i) => {
                if (!item) return acc
                const itemLength = measure(item, i)
                //console.log(itemLength)
                if (mode == Number)
                    return mathFn(itemLength, acc)
                const accLength = isNumber(acc)
                    ? acc
                    : measure(acc, i)
                return compare(accLength, itemLength)
                    ? acc
                    : item
            },
            mode == Number ? 0 : arr[0]
        )
        if (asObject) {
            let index = arr.indexOf(value)
            console.log(index)
            return keys[index]
        }
        return value
    }
}

const getShortest = getShortestLongest('shortest')
const getLongest = getShortestLongest('longest')

function findCaller(target, offset = 0) {
    const stack = getStackTrace()
    console.log(stack, target)
    console.log()
    throw ''
    const index =
        stack.findIndex((x) => test(target, x[0])) + offset
    const [name, line] = index
    return { name, line }
}

function hasSymbol(s) {
    return test(/[^\sa-zA-Z]/, s)
}

function toArray(val) {
    return isArray(val) ? val : [val]
}
function looksLikeRegex(s) {
    return test(/^\//, s)
    return test(/^\/.*?\/\w*$/, s)
}

function prepareRegex(regex, flags) {
    //rn bringRegexToLife
    let newFlags
    if (isString(regex)) {
        if (looksLikeRegex(regex)) {
            ;[regex, newFlags] = search(
                /^\/(.*?)\/(\w*)$/,
                regex
            )
            if (newFlags) flags = newFlags
        }
        regex = RegExp(regex, flags || '')
    }
    return regex
}

function wordToNumber(s) {
    return numberWords.indexOf(s.toLowerCase())
}

function toStringDictionaryEntry(k, v) {
    return singlequote(k) + ': ' + singlequote(v) + ','
}

function comment(s) {
    return '// ' + s
}

function hasSelector(s) {
    return test(/^[.#]/, s)
}

function isUndefined(x) {
    return x == undefined
}

function isSelector(s) {
    return test(/^[.#][\w-]{1,30}$/, s)
}

function boundary(s) {
    if (isArray(s)) {
        s = ncgRunner(s)
    }
    return wrap(s, '\\b')
}

function getVueErrorInfo(e) {
    return e.stack
        .replace(/file.*?(?=\w+\.js)|at invo[^]+/g, '')
        .trim()
    let s = e.stack.replace(/vue.js.+/s)

    let [name, message] = search(/(\w+): *(.*)/, s)
    let regex = /^ *at (\S+) \((.*?):(\d+):(\d+)/gm
    let stack = findall(regex, s)
    let result = stack.map(([caller, file, line, ch], i) => {
        line = Number(line)
        ch = Number(ch)
        if (caller.includes('.')) {
            let [className, method] = caller.split('.')
            return {
                class: className,
                method,
                file,
                line: Number(),
                ch,
            }
        }
        return { caller, file, line }
        return { caller, file, line, ch }
    })
    result[0].message = message
    return result
    return result[0]
}

function hasSpaces(s) {
    return s.includes(' ')
}

function isNull(x) {
    return x == null
}

function toStringCallable(a, b) {
    return a + parens(b)
}

function uncapitalize(s) {
    return s.replace(/\w/, (x) => x.toLowerCase())
}

function insertBelow(s, key, payload) {
    const regex = '^.*?' + key + '.*'
    return replace(
        regex,
        (x) => {
            const indentation = getIndent(x) + 4
            return x + '\n' + indent(payload, indentation)
        },
        s,
        'm'
    )
}

//console.log('hix')

function linebreak(s) {
    return wrap('-'.repeat(20))
}

function hasNewline(s) {
    return s.trim().includes('\n')
}

function toNumber(val) {
    return isNumber(val) ? Number(val) : val
    if (isString(val) && test(/[\/ ]/, val)) return val
    var n = parseFloat(val)
    return isStringMathExpression(val) || isNaN(n) ? val : n
}

function removeQuotes(s) {
    if (test(/^[\'\"]/, s)) {
        return s.slice(1, -1)
    }
    return s
}

function blockComment(s) {
    return `/* ${s} */`
}

function modularIncrementNumber(current, increment, min, max) {
    console.log(min)
    if (current + increment > max) {
        if (current == max) return min
        return max
    }
    if (current + increment < min) {
        console.log('hiiii')
        console.log(current, increment, min, max)
        if (current == min) return max
        return min
    }

    return current + increment
}

function unique(a, b) {
    if (isNestedArray(a)) {
        const seen = []
        const store = a.filter((x) => {
            if (seen.includes(x[0])) return false
            seen.push(x[0])
            return true
        })
        return store
    }

    if (b)
        return Array.from(new Set(a.filter((item) => !Array.from(b).includes(item))))
    return isArray(a) && a.length > 1
        ? Array.from(new Set(a))
        : a
}

function numbered(text) {
    if (!text) return ''
    let count = 0

    if (isArray(text)) {
        return text
            .map((item, i) => 1 + i + '  ' + item)
            .join('\n')
    }

    function parser(s) {
        return ++count + '  ' + s
    }

    return replace('^', parser, text, 'gm')
}

function getLast(arr, n = -1) {
    return arr[arr.length + n]
}

function find(items, fn, reverse) {
    if (reverse) {
        for (let i = items.length - 1; i >= 0; i--) {
            if (ftest(fn, items[i])) {
                return items[i]
            }
        }
    } else {
        return items.find(fn)
    }
}
function matchall(regex, s) {
    regex = addGFlag(regex)
    let match
    let store = []
    while (exists((match = regex.exec(s)))) {
        store.push(match)
    }
    return store
}
function toggleFunction(a, b, duration) {
    a()
    setTimeout(() => {
        b()
    }, duration)
}

class ErrorWatcher {
    constructor() {
        this.threshold = 20
        this.count = 0
    }
    watch() {
        if (this.count++ > this.threshold) {
            throw new Error('surpasses threshold')
        }
    }
}

function getClassString(x) {
    if (!x) {
        return ''
    }
    let s = x.toString()
    if (s == '[object Object]') {
        return x.constructor.toString()
    }
    return s
}

function getClassMethods(s) {
    return findall(
        /^    (?:async |def )?(\w+)\(/gm,
        s.toString()
    )
}
function hasSharedKeys(a, b) {
    return (
        intersection(Object.keys(a), Object.keys(b)).length > 0
    )
}
function isPublic(s) {
    return test(/^\w+$/, s)
}

function getClassPropertiesFromString(s) {
    const matches = findall(
        /^    (?:(async|get|set) )?(\w+) *\(/gm,
        s.toString()
    )
    return matches.map(([a, name]) => {
        let type = 'method'
        if (a == 'get') type = 'getter'
        else if (a == 'set') type = 'setter'
        return { type, name }
    })
}
function readableProperties(obj) {
    function runner(obj) {
        if (isFunction(obj)) {
            return obj.nam
        }
        if (isSet(obj) || isFunction(obj) || isArray(obj) || isPrimitive(obj)) return obj
        let keys = Object.keys(obj)
        //let keys = Object.getOwnPropertyNames(obj)
            .filter(isPublic)

        //console.log(keys)
        return keys.reduce((acc, key, i) => {
            const value = obj[key]
            //console.log(value)
            //console.log(key)
            acc[key] = runner(value)
            return acc
        }, {})
    }
    return runner(obj)
}
function getClassProperties(obj) {
    const props = reduce(
        Object.getOwnPropertyNames(obj).filter(isPublic),
        (x) => [x, obj[x]]
    )
    const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(obj)
    )
    pop(methods, 'constructor')
    return { name: obj.constructor.name, methods, ...props }

    return Object.getOwnPropertyNames(s)
    console.log(s)
    let match
    let regex =
        /^ *(?:this\.(\w+) *= *(\w+)?|(?:async )?(\w+)\(|get (\w+))/gm
    //let s = vars()
    const storage = new Storage({ unique: 1 })
    while ((match = regex.exec(s))) {
        if (match[3]) {
            storage.add('methods', match[3])
        } else if (match[1]) {
            storage.add('properties', match[1])
        } else if (match[4]) {
            storage.add('properties', match[4])
        }
    }
    storage.pop('methods', 'constructor')
    //console.log(storage.value); throw ''
    return storage.value
}

function findall(regex, s, flags = 'g', filtered = false) {
    if (isString(regex)) regex = RegExp(regex, flags)

    let store = []
    let match
    s = s.trim()

    while (exists((match = regex.exec(s)))) {
        if (match.length == 1) {
            store.push(match[0])
        } else if (filtered) {
            store.push(smallify(match.slice(1).filter(exists)))
        } else if (match.length == 2) {
            store.push(match[1])
        } else {
            store.push(match.slice(1))
        }
    }
    return store
}

function smallify(x) {
    return x.length == 0 ? null : x.length == 1 ? x[0] : x
}

function deletef(r) {
    return (s) => {
        return s.replace(r, '')
    }
}
function functiongetter(x) {
    if (isFunction(x)) {
        return x
    }
    if (window.hasOwnProperty(x)) {
        return window[x]
    }
    return eval(parens(x))
}

function removeAllComments(s) {
    return s.replace(/^ *\/\/.+\n*/gm, '')
    return s.replace(
        /^ *([#]|<!--[^]*?-->|\/\/|\/\*[^]*?\*\/).*\n*/gm,
        ''
    )
}

function getLastWord(x) {
    return search('\\w+$', x)
}

function getSecondWord(x) {
    return search('\\w+ (\\w+)', x)
}

function getFirstWord(x) {
    return search('\\w+', x)
}

function getFirst(x, mode = '') {
    if (isObject(x)) {
        return Object[mode || 'keys'](x)[0]
    }
    if (mode == String) {
        return search(/^\S+/, x)
    }
    if (isString(x)) {
        return search('\\w+', x)
    }

    if (isArray(x)) {
        return x[0]
    }
}

function xsplit(s) {
    if (isArray(s)) {
        return s
    }
    return split(s, / +|([,\.])/)
}

function removeJavascriptComments(s, mode) {
    return s.replace(/^ *\/\/|\/\*[^]*?\*\/.*\n*/gm, '')
}

function removeComments(s, mode) {
    return s.replace(/^ *(\/\/|\/\*[^]*?\*\/).*\n*/gm, '')
    if (mode == 'js')
        return s.replace(/^ *\/\/|\/\*[^]*?\*\/.*\n*/gm, '')
    return s.replace(
        /^ *([#]|<!--[^]*?-->|\/\/|\/\*[^]*?\*\/).*\n*/gm,
        ''
    )
}

function search(regex, s, flags = '') {
    if (isString(regex)) regex = RegExp(regex, flags)

    const match = s.match(regex)
    return matchgetter(match)
}

function matchgetter(match) {
    return !match
        ? null
        : match.length == 1
        ? match[0]
        : match.length == 2
        ? match[1] || match[0]
        : match.slice(1)
}

function prepareIterable(data, mode) {
    if (!data) {
        return []
    }
    if (isStorage(data)) {
        return data.store
    }

    if (isNumber(data)) {
        return range(1, data)
    }
    if (isString(data)) {
        return [data]
    }
    if (isClass(data)) {
        return Array.from(data)
    }

    if (isObject(data)) {
        if (mode == Array) mode == 'values'
        else if (mode == Object) mode == 'entries'
        else if (!mode) {
            mode = 'values'
        }
        return Object[mode](data)
    }

    return data

    //if (data.constructor.name == 'IndexedMap')
}

function indent(s, n = 4, tabs = 0) {
    if (!s) return ''
    if (!n) return s
    if (!s.includes('\n')) return toSpaces(n, tabs) + s
    if (isArray(s)) return s.map((x) => indent(x, n))
    return replace('^', toSpaces(n, tabs), s, 'gm')
}

function joined(arr) {
    if (arguments.length > 1) {
        arr = Array.from(arguments).filter(exists).map(String)
        if (test(/^[, .] *$/, getLast(arr))) {
            delimiter = arr.pop()
            return arr.join(delimiter)
        }
    }

    let s = '\n'
    for (let item of arr) {
        s += item
        s += item.includes('\n') ? '\n\n' : '\n'
    }
    return s
}

function getYear() {
    const date = new Date()
    const year = date.getFullYear()
    return year
}

function difference(a, b) {
    a = prepareIterable(a, 'keys')
    b = prepareIterable(b, 'keys')
    return a.filter((x) => !b.includes(x))
}

function errorWrap(fn) {
    return (...args) => {
        try {
            let value = fn(args[0])
            return { value }
        } catch (e) {
            return {
                error: e.stack,
                input: smallify(args),
            }
        }
    }
}

function insertText(s, payload, regex) {
    regex = '^( *)' + '.*' + regex
    return replace(
        regex,
        (original, spaces) => {
            const value = indent(payload, spaces)
            return original + '\n' + value
        },
        s,
        'm'
    )
}

function isIterable(x) {
    return isArray(x) || isObject(x) || isSet(x)
}

function linegetter(x, regex = /\n+/) {
    return isArray(x) ? x : split(x, regex)
}

function isDefined(x) {
    return x != null
}

function isBoolean(x) {
    return x === true || x === false
}

function addGFlag(regex) {
    if (isString(regex)) {
        return new RegExp(regex, 'g')
    }
    if (!regex.flags.includes('g')) {
        regex = new RegExp(regex, regex.flags + 'g')
    }
    return regex
}

function isFirst(key, state = $$) {
    if (!state[key]) {
        state[key] = true
        return true
    }
    return false
}

function isWord(s) {
    return test(/^[a-zA-Z]+$/, s)
}

function isPromise(x) {
    return x.constructor.name == 'Promise'
}

function isJsonParsable(s) {
    return /^[{\[]/.test(s)
}

function isRegExp(x) {
    return x.constructor.name == 'RegExp'
}

function isFalse(x) {
    return x === false
}

function isTrue(x) {
    return x === true
}

function isClassObject(x) {
    const runner = (x) => x && x.toString().startsWith('class')
    return runner(x) || runner(x.constructor)
}

function isClass(x) {
    const natives = [
        'String',
        'Function',
        'Number',
        'Object',
        'Array',
        'Set',
        'Promise',
    ]
    return x && !natives.includes(x.constructor.name)
}

function isNode() {
    return typeof window === 'undefined' || window.isNodeWindow
}

function isJson(x) {
    return x.endsWith('.json')
}

function isElement(s) {
    return s.constructor.name.startsWith('HTML')
}

function isInteger(n) {
    return Number.isInteger(Number(n))
}

function isPositive(n) {
    return n >= 0
}

function isCapitalized(s) {
    return /^[A-Z]/.test(s)
}

function isYesterday(date) {
    return changeDate(datestamp(), -1) == date
}

function isDate(s) {
    return test(/^\d{1,2}[-/]\d{1,2}[-/](?:\d{2}|\d{4})$/, s)
}
function isToday(date) {
    return datestamp() == date
}

function zeroPad(x) {
    return String(x).length == 1 ? '0' + x : x
}

function backspaced(s) {
    return s ? s.slice(0, -1) : ''
}

function indexgetter(arr, index) {
    if (!index) return 0
    if (!isNumber(index)) index = arr.indexOf(index)
    return index
}

function insert(arr, item, index) {
    index = indexgetter(arr, index)
    arr.splice(index, 0, item)
    return arr
}

function getTabs(s) {
    return (search(/^[\t ]*/, s) || '').replace(/    /g, '\t')
}

function getSpaces(s) {
    return search(/^ */, s) || ''
}

function rescape(s, delimiters) {
    const rescapeRE = delimiters
        ? RegExp(
              `[${delimiters.replace(/[\[\]]/g, '\\$&')}]`,
              'g'
          )
        : /[.\\[*+?()|^${}\[\]]/g
    //console.log(rescapeRE)
    return s.replace(rescapeRE, '\\$&')
}

function replaceTemplaterHelper(s, ref) {
    if (!s.includes('$')) return s
    let regex = /\$(\d)/g
    return s.replace(regex, (_, x) => {
        return ref[Number(x)]
    })
}

function spicyReplace(regex, rep, s) {
    const parser = (...args) => {
        return spicyTemplater(rep, args.slice(1, -2))
    }
    console.log(prepareRegex(regex))
    return s.replace(prepareRegex(regex), parser)
}


function templaterWithBackup(s, ref, backup, functionArgs) {
    if (!s.includes('$')) return s
    let regex = /\$(\d+(?:\|[a-zA-Z]+)?|\{.*?\})/g
    return runner(s)

    function runner(s, fn) {
        return s.replace(regex, (_, x) => {
            if (x == 'c') {
                return '$c'
            }
            if (x == 0) return s
            if (test(/^{/, x)) {
                x = x.slice(1, -1)
                x = runner(x, quotify)
                x = eval(x)
                return x
            }

            let [n, other] = search(/^(\d+)\|?(\w*)/, x)
            let value = ref[Number(n) - 1]
            if (value == null && other) {
                value = backup[other]
                if (value == null) value = other
            }
            if (isFunction(value)) {
                value = value(...functionArgs)
            }

            return fn ? fn(value) : value
        })
    }
}


function spicyTemplater(s, ref, ...args) {
    if (!s.includes('$')) return s
    let regex = /\$(\d+|\w+|\{.*?\})/g
    return runner(s)

    function runner(s, fn) {
        return s.replace(regex, (_, x) => {
            //console.log([x, 'st'])
            if (x == 'c') {
                return '$c'
            }
            if (x == 0) return s
            if (test(/^{/, x)) {
                x = x.slice(1, -1)
                x = runner(x, quotify)
                x = eval(x)
                return x
            }

            let val = isArray(ref) ? ref[Number(x) - 1] : ref[x]
            if (val == null) val = ''
            if (isFunction(val)) {
                val = val(...args)
                //val = val(x, ...args)
            }
            return fn ? fn(val) : val
        })
    }
}

function reverse(s) {
    if (isArray(s)) {
        return s.reverse()
    }
    return split(s).reverse().join('')
}

function latexTemplater(s, ref, regex = '\\w+') {
    const ignore = ['left', 'right', 'frac', 'cdot', 'times']
    const ignoreRE = ignore.join('|')
    if (isArray(ref)) {
        regex = RegExp(ignoreRE + '|' + regex, 'g')
        let count = 0
        return s.replace(regex, (x) => {
            if (x.length > 1 && !isNumber(x)) return x
            let item = ref[count++]
            if (item == null) return x
            if (isColor(item)) {
                return katexColorer(x, item)
            }
            return fparse(item, x)
        })
    }
    if (isObject(ref)) {
        return s.replace(ncg(ref), (x) => {
            let item = ref[x]
            if (isColor(item)) {
                return katexColorer(x, item)
            }
            return item || x
        })
    }
}
function templater(s, ref, keep) {
    if (!s.includes('$')) return s

    if (!ref)
        return s.replace(/\$\{(.*?)\}/g, (_, x) => eval(x))
    let regex = /\$(\w)/g
    if (isPrimitive(ref)) {
        ref = [ref]
    } else {
        regex = /\$(\w+)/g
    }

    let functionals = []
    let offset = s.includes('$0') ? 0 : 1
    let value = s.replace(regex, (_, x) => {
        if (x == 'c') return '$c'
        let val = isArray(ref)
            ? ref[Number(x) - offset]
            : ref[x]
        if (val == null) {
            return keep ? '$' + x : ''
        }
        if (isFunction(val)) {
            functionals.push(val)
            return '###'
        }
        return val
    })

    if (exists(functionals)) {
        let parts = value.split(/###(?:\(.*?\))?/)
        return (a, b, c) => {
            let s = ''
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i]
                s += part
                if (i < parts.length - 1) {
                    s += functionals[i](a)
                }
            }
            return s
        }
    }
    return value
}

function hasCaptureGroup(s) {
    return test(/[^\\]\((?!\?)/, s)
}

function getIndent(s) {
    if (isNumber(s)) return s
    const match = s.match(/^[\t ]*/g)
    if (!match) return 0
    return match[0].split('').reduce((acc, item, i) => {
        return acc += item == '\t' ? 4 : 1
    }, 0)
}

function identity(...args) {
    return args.length == 1 ? args[0] : args
}

function identity(s) {
    return s
}

function trimmed(s) {
    return s.trim()
    if (s.trim().length == '') return s
}
class AssertionErrorHandler {
    constructor(fn) {
        try {
            fn()
        } catch (e) {
            console.log([e.name, e.line])
        }
    }
}
class AssertionError extends Error {
    constructor(x) {
        super()
        const { name, line } = getCaller('assert')
        this.name = name
        this.line = line
    }
}
function assert(condition) {
    if (!condition || !exists(condition)) {
        throw new AssertionError()
    }
    return condition
    return
    if (!condition || !exists(condition)) {
        const stack = getStackTrace()
        //console.log(stack)
        const name =
            stack[
                stack.findIndex((x) => x[0] == 'assert') + 1
            ][0]
        const error = assert.caller
            .toString()
            .match(/assert\((.*?)\) *(?=\n|$)/)[1]
        const message = `[assertion error] @${name}: undefined ${error}`
        console.log(message)
        throw ''
    }
}

function parens(s) {
    return '(' + s + ')'
}

function len(x) {
    if (!exists(x)) {
        return 0
    }
    if (isNumber(x)) return x.toString().length
    return x.length || Object.keys(x).length || 0
}

function hasNumber(x) {
    return (
        (isString(x) && test(/\d/, x)) || typeof x == 'number'
    )
}

function sum(items, fn) {
    return items.reduce(
        (acc, item, i) => (acc += fn ? fn(item, i) : item),
        0
    )
}

function recursiveFlat(...args) {
    const store = []
    function runner(args) {
        for (let arg of args) {
            if (isArray(arg)) {
                runner(arg)
            } else {
                store.push(arg)
            }
        }
    }
    runner(args)
    return store
}
function flat(arr) {
    const store = []
    for (let item of arr) {
        push(store, item)
    }
    return store
}

function doublequote(s) {
    return '"' + s + '"'
}

function delta(a, b) {
    return Math.abs(a - b)
}

function toVariable(name, value, lang, prefix = 'var ') {
    if (arguments.length == 1) {
        value = name
        lang = 'js'
        switch (type(value)) {
            case 'String':
                name = 's'
                break

            case 'Array':
                name = 'arr'
                break

            case 'Object':
                name = 'obj'
                break

            case 'Number':
                name = 'n'
                break
        }
    }
    //console.log(value)
    const payload = isString(value)
        ? isJsonParsable(value)
            ? value
            : quotify(
                  value
                      .replace(/\`/g, '\\`')
                      .replace(/\$\{/g, '\\$\\{')
              )
        : toStringArgument(value)

    return prefix + name + ' = ' + payload
}

function quotify(s, mode = '`') {
    if (mode == '`') return '`' + s + '`'
    if (mode == "'") return "'" + s + "'"
    if (mode == '"') return '"' + s + '"'
    return '"' + s + '"'
}

function tail(s) {
    return getLast(s.split('/')).replace(/^\W+/, '')
}

function bindObject(state, object) {
    if (!exists(object)) {
        return
    }
    for (let [k, v] of Object.entries(object)) {
        if (isFunction(v)) {
            state[k] = v.bind(state)
        } else {
            state[k] = v
        }
    }
}

function initializeStateVariable(state, key, value) {
    if (!state.hasOwnProperty(key)) {
        state[key] =
            arguments.length == 4
                ? {}
                : key.endsWith('s')
                ? []
                : null
    }
    const f = type(state[key])
    switch (f) {
        case 'Set':
            return state[key].add(value)
        case 'Array':
            return state[key].push(value)
        case 'Object':
            return (state[key][arguments[2]] = arguments[3])
        default:
            state[key] = value
    }
}

function bind(state, fnKey) {
    return state[fnKey].bind(state)
}
function fparse(x, ...args) {
    return isFunction(x) ? x(...args) : x
}
class Cache {
    constructor(cache = {}) {
        this.cache = isFunction(cache) ? new cache() : cache
        const name = this.cache.constructor.name
        this.get = this['get' + name]
        this.set = this['set' + name]
        this.clear = this['clear' + name]
        this.update = this['update' + name]
    }
    updateWeakMap(key, value) {
        const prev = this.get(key)
        this.cache.set(key, merge(prev, value))
    }

    setWeakMap(key, value) {
        this.cache.set(key, value)
    }

    setObject(key, value) {
        this.cache[key] = value
    }

    updateObject(key, value) {
        const prev = this.get(key)
        this.set(key, merge(prev, value))
    }

    clearObject() {
        this.cache = {}
    }
    clearWeakMap() {
        this.cache = new WeakMap()
    }
    getWeakMap(key, value) {
        if (this.cache.has(key)) {
            const cachedValue =  this.cache.get(key)
            return cachedValue
        }
        if (isFunction(value)) value = value(key)
        this.cache.set(key, value)
        return value
    }

    getObject(key, value) {
        if (this.cache.hasOwnProperty(key)) {
            return this.cache[key]
        }
        if (isFunction(value)) value = value(key)
        this.cache[key] = value
        return value
    }
    
}
class Cacheold extends StandardObject {
    constructor() {
        super()
    }

    get(key, fallback) {
        if (!this.has(key)) {
            this.store[key] = fparse(fallback, key)
        }
        return this.store[key]
    }

    set(key, value) {
        if (isObject(key)) {
            this.store = key
        } else {
            this.store[key] = value
            return value
        }
    }

    clear() {
        this.store = {}
    }
}

function getLongestOld(arr, measure = len, mode = Number) {
    const value = arr.reduce(
        (acc, item, i) => {
            if (!item) return acc
            const itemLength = measure(item, i)
            if (mode == Number) return Math.max(itemLength, acc)
            const accLength = isNumber(acc)
                ? acc
                : measure(acc, i)
            return accLength > itemLength ? acc : item
        },
        mode == Number ? 0 : arr[0]
    )

    return value
}

function splitSpellcheck(s, dict) {
    if (isNumber(s)) {
        return s
    }
    return split(s)
        .map((x) => dict[x] || x)
        .join(' ')
}
function dreplace(
    s,
    dict,
    regexTemplate = '\\b(?:$1)\\b',
    flags = 'g'
) {
    let escape
    if (regexTemplate === null) {
        regexTemplate = '(?:$1)'
    } else if (regexTemplate == 'ge') {
        flags = regexTemplate
        regexTemplate = '(?:$1)'
    } else if (regexTemplate == 'ge') {
        flags = regexTemplate
        regexTemplate = '(?:$1)'
    } else if (regexTemplate.length < 5) {
        flags = regexTemplate
        regexTemplate = '\\b(?:$1)\b'
    }
    if (flags.includes('e')) {
        escape = true
        flags = flags.replace('e', '')
    }

    if (flags.includes('b')) {
        flags = flags.replace('b', '')
        regexTemplate = '\\b(?:$1)\\b'
    }

    const regex = ncg(regexTemplate, dict, escape)

    function fixB(x) {
        if (isCapitalized(x)) {
            value = dict[x.toLowerCase()]
            return capitalize(value)
        }
        return dict[x]
    }
    const parser = hasCaptureGroup(regexTemplate)
        ? (_, x) => fixB(x)
        : (x) => fixB(x)

    return replace(regex, parser, s, flags)
}

function ncg(template, ref, escape) {
    //if (isString(template) && isString(escape)) {
    //ref = toArray(ref)
    //}
    //
    if (typeof template == 'object' && !ref) {
        return regexTemplater(/\b(?:$1)\b/g, template)
    }

    if (template == boundary) {
        return regexTemplater(/\b(?:$1)\b/g, ref)
    }

    if (isRegExp(template)) {
        return regexTemplater(template, ref)
    }
    if (template === '') template = '(?:$1)'
    if (arguments.length == 1) {
        return '(?:' + ncgRunner(template) + ')'
    }

    if (!ref && isIterable(template)) {
        return '\\b(?:' + ncgRunner(template, escape) + ')\\b'
    } else if (
        !isPrimitive(ref) &&
        ref[0] &&
        !isPrimitive(ref[0])
    ) {
        let value = templater(
            template,
            ref.map((el) => ncgRunner(el, escape))
        )
        if (escape) return RegExp(value, escape)
        return value
    } else {
        return templater(template, ncgRunner(ref, escape))
    }
}


function ncgRunner(ref, escape) {
    return isBoolean(escape)
        ? prepareIterable(ref, 'keys')
              .map(rescape)
              .join('|')
        : prepareIterable(ref, 'keys').join('|')
}

function filterObjectHelper(items, fn) {
    if (isFunction(fn)) {
        if (getParameters(fn).length == 2) {
            return Object.entries(items).filter(([a, b]) => {
                return fn(a, b)
            })
        } else {
            return Object.entries(items).filter(([a, b]) => {
                return fn(b)
            })
        }
    } else if (isArray(fn)) {
        return Object.entries(items).filter(([a, b]) => {
            return fn.includes(a)
        })
    }
}

function filter(items, fn, mode) {
    if (isObject(items)) {
        const value = filterObjectHelper(items, fn)

        return mode == 'keys'
            ? value.map((x) => x[0])
            : mode == 'values'
            ? value.map((x) => x[1])
            : mode == Array
            ? value
            : toDictionary(value)
    }
}

function filterObject(items, fn, mode) {
    const value = Object.entries(items).filter((x) => fn(...x))
    if (mode == 'keys') return value.map((x) => x[0])
    if (mode == 'values') return value.map((x) => x[1])
    return value.reduce((acc, [a,b]) => ({...acc, [a]:b}), {})
}

function oldfilterObject(items, fn) {
    function reducer(items, gn) {
        const store = {}
        for (let [a, b] of prepareIterable(items, 'entries')) {
            const value = gn(a, b)
            if (exists(value)) {
                if (value.length == 2 && isArray(value)) {
                    store[value[0]] = value[1]
                } else {
                    store[a] = value
                }
            }
        }
        return store
    }
    return getParameters(fn).length == 1
        ? reducer(items, (k, v) => (fn(v) ? v : null))
        : reducer(items, (k, v) => (fn(k, v) ? v : null))
}

// the english is hard.
function filtered(items, fn) {
    if (isObject(items)) {
        return reduce(items, (k, v) => (fn(k, v) ? v : null))
    }

    items = Array.from(items)
    if (isString(fn))
        return items.filter(
            (x) => exists(x) && test(fn, x, 'i')
        )
    if (isFunction(fn)) return items.filter(fn)
    if (isArray(fn)) return items.filter((x) => !fn.includes(x))
}

function getIndentAndLine(s) {
    return [getIndent(s), s.trim()]
}

function capitalize(s) {
    return s.replace(/^['"]?[a-zA-Z]/, (x) => x.toUpperCase())
}

function singlequote(s) {
    return "'" + s + "'"
}

function ftest(x, s, flags = 'i') {
    if (isArray(x)) {
        for (let item of x) {
            if (ftest(item, s, flags)) {
                return true
            }
        }
    }

    if (isFunction(x)) {
        return x(s)
    }

    if (s === x) {
        return true
    }

    if (s == '' && x.toString() == '/^$/') {
        return true
    }

    return test(x, s, flags)
}

function mapObject(a, b) {
    if (isObject(b)) {
        return reduce(a, (k, v) => {
            return b[k] ? [k, b[k]] : null
        })
    }
}
function mapConditional(a, b, c) {
    return (x, i) => {
        if (isRegExp(a)) {
            let match = x.match(a)
            if (match) {
                if (match.length == 2) {
                    if (isString(b)) {
                        return templater(b, match[1])
                    }
                    return b(match[1])
                } else {
                    if (isString(b)) {
                        return templater(b, x)
                    }
                    return b(x)
                }
            } else if (c) {
                if (isString(c)) {
                    return templater(c, x)
                }
                return c(x)
            } else {
                return x
            }
        }

        if (isFunction(a)) {
            if (a(x)) {
                if (isString(b)) {
                    return templater(b, x)
                }
                return b(x)
            } else if (c) {
                if (isString(c)) {
                    return templater(c, x)
                }
                return c(x)
            } else {
                return x
            }
        }

        if (isString(a)) {
            throw new Error(
                'must be regex or function for mapconditional'
            )
        }
    }
}

function merge(a, b) {
    if (!b) return a
    if (!a) return b
    if (isObject(a)) {
        return Object.assign(a, b)
    }
    if (isArray(a)) {
        return push(a, b, true)
    }
    if (isString(a)) {
        return a + b
    }
    return b
}
function mergeAll(...args) {
    args = args.filter(exists)
    let first = args[0]

    if (args.length == 1) {
        return args[0]
    }

    if (isObject(first)) {
        const store = {}
        for (let arg of args) {
            Object.assign(store, arg)
        }
        return store
    }

    if (isArray(first)) {
        for (let arg of args) {
            if (arg)
                isArray(arg)
                    ? first.push(...arg)
                    : first.push(arg)
        }
        return first
    }

    if (isString(first)) {
        if (first.includes('\n')) return args.join('\n')
        if (first.includes(' ')) return args.join(' ')
        return args.join('\n')
    }

    if (isNumber(first)) {
        return sum(args.map(Number))
    }
}

function tryval(s, ...args) {
    try {
        if (isFunction(s)) {
            return {
                value: s(...args),
                input: smallify(args),
            }
        }
        return {
            input: smallify(s),
            value: eval(s),
        }
    } catch (e) {
        return {
            input: smallify(s),
            error: getDetailedErrorInfo(e),
        }
    }
}

function shuffle(arr) {
    const ref = Array.from(arr)
    let m = arr.length
    while (m) {
        let i = ~~(Math.random() * m--)
        let t = ref[m]
        ref[m] = ref[i]
        ref[i] = t
    }
    return ref
}
class Clock {
    finish() {
        this._stop = true
        clearTimeout(this.timerID)
        this.onEnd()
    }
    constructor(options) {
        this.increment = 1000
        this.speed = 1
        this.onTick = console.log
        Object.assign(this, options)
        this.delta = this.increment / this.speed
        if (this.duration <= 100) this.duration *= 1000
        assert(this.duration)
        if (options.autoStart) this.start()
    }
    pause() {
        this._pause = true
    }
    async start() {
        if (this._pause) {
            this._pause = false
            this.count += 1
        } else {
            this.count = 0
            this._stop = false
        }
        return await this.runner()
    }

    stop() {
        this._stop = true
    }
    async resume() {
        this._stop = false
        await this.runner()
    }

    runner() {
        if (this._onStart) {
            this._onStart()
        } else {
            this._onTick()
        }

        return new Promise((resolve, reject) => {
            const runner = () => {
                if (this.isDone()) {
                    clearTimeout(this.timerID)
                    if (this._onEnd) {
                        this._onEnd()
                    }
                    resolve()
                } else if (this._pause) {
                    clearTimeout(this.timerID)
                    resolve()
                } else {
                    this.count += 1
                    this.timerID = setTimeout(() => {
                        if (this._onTick) this._onTick()
                        runner()
                    }, this.delta)
                }
            }

            runner()
        })
    }

    at(n, fn) {
        let current = this._onTick
        this._onTick = () => {
            this.count == n ? this.handle(fn(this)) : current()
        }
    }

    set onTick(fn) {
        this._onTick = () =>
            this.handle(fn(this.timeLeft))
    }
    set onStart(fn) {
        this._onStart = () =>
            fn(this.timeLeft)
    }

    set onEnd(fn) {
        this._onEnd = () =>
            fn(this.timeLeft)
    }
    get onEnd() {
        return this._onEnd
    }

    isDone() {
        return (this.count >= this._duration) || this._stop
    }
    get timeLeft() {
        return this._duration - this.count
    }
    get _duration() {
        return Math.floor(this.duration / 1000)
    }

    handle(result) {
        if (result === 'DONE') {
            this._stop = true
        } 
        else if (isNumber(result)) {
            this.duration += result * 1000
        } 
    }
}


class oldClock {
    createClock(o) {
        if (this.currentClock) {
            this.currentClock.abort()
        }
        this.currentClock = Clock.create(o)
        return this.currentClock
    }
    static async input(onTick, duration = Infinity) {
        let clock = new Clock({onTick, duration})
        clock.config.onTickEndResult = true
        return await clock.start()
    }

    static create(o) {
        let clock = new Clock(o)
        clock.start()
        return clock
    }
    setOptions(options) {
        if (!options) return
        if (options.config) {
            Object.assign(this.config, options.config)
        }
        if (options.duration) this.duration = options.duration
        if (options.increment)
            this.increment = options.increment
        if (options.steps)
            this.increment = this.duration / options.steps
        if (options.onTick) this.onTick = options.onTick
        if (options.onEnd) this.onEnd = options.onEnd
        if (options.onStart) this.onStart = options.onStart
    }
    abort() {
        console.log('aborting')
        this._onEnd = null
        this._stop = true
    }
    constructor(options = 3) {
        this.config = {
            onTickEndResult: 0,
        }
        this.increment = 1000
        this.speed = 1

        if (isObject(options)) {
            this.setOptions(options)
        } else {
            this.duration = options
            if (arguments[1]) {
                this.onTick = arguments[1]
                console.log('setting onti')
            }
        }
    }
    pause() {
        //this._stop = true
        this._pause = true
    }

    async start(duration) {
        if (this._pause) {
            console.log('starting form pause')
            //this.duration = this.timeRemaining
            //this._duration = this.duration / 1000
            //this.count = this.currentTime
            //this.timeRemaining = null
            //this.currentTime = null
            this._pause = false
            this.count += 1
        } else {
            if (duration) this.duration = duration
                //console.log(this.duration)
            if (this.duration <= 100) this.duration *= 1000
            else if (this.duration == Infinity) {
                this.duration = 1000 * 1000
            }

            this._duration = this.duration / 1000
            this.count = 0
            this._stop = false
        }
        return await this.runner()
    }

    stop() {
        this._stop = true
    }

    async resume() {
        this._stop = false
        await this.runner()
    }
    resetClock(count) {
        this.timeRemaining = null
        this.currentTime = null
        this.duration = 0
        this.count = 0
        this._pause = 0
        this._stop = 0
    }

    runner() {
        if (this._onStart) {
            this._onStart()
        } else {
            this._onTick()
        }

        return new Promise((resolve, reject) => {
            const runner = () => {
                if (this.isDone()) {
                    clearTimeout(this.timerID)
                    if (this._onEnd) {
                        this._onEnd()
                    }
                    this.resetClock(this.count)
                    //console.log(this.endValue, 'endv')
                    resolve(this.endValue)
                } else if (this._pause) {
                    clearTimeout(this.timerID)
                    resolve()
                } else {
                    this.count += 1
                    this.timerID = setTimeout(() => {
                        if (this._onTick) this._onTick()
                        runner()
                    }, Math.floor(this.increment / this.speed))
                }
            }

            runner()
        })
    }

    at(n, fn) {
        let current = this._onTick
        this._onTick = () => {
            this.count == n ? this.handle(fn(this)) : current()
        }
    }

    set onTick(fn) {
        this._onTick = () =>
            this.handle(
                fn(this.count, this.timeLeft, this.duration)
            )

        //this._onTick = async () =>
        //this.handle(fn(this.count, this.timeLeft, this.duration))
    }

    set onStart(fn) {
        this._onStart = () =>
            fn(this.count, this.timeLeft, this.duration)
    }

    set onEnd(fn) {
        this._onEnd = () =>
            fn(this.count, this.timeLeft, this.duration)
    }

    isDone() {
        return this.count >= this._duration || this._stop
    }
    get timeLeft() {
        //console.log(this.count, this._duration)
        return this._duration - this.count
    }

    handle(result) {
        if (result === 'DONE') {
            this._stop = true
        } 

        if (this.config.onTickEndResult && result) {
            //console.log('yielding an endValue from onTick')
            this._stop = true
            this.endValue = result
        }
        
        else if (result === true) {
            if (this.timeLeft) {
                this._pause = true
            } else {
                this._stop = true
            }
        } else if (isNumber(result)) {
            this.duration += result * 1000
            this._duration += result
        } 
    }
}

function addExtension(file, ext) {
    if (getExtension(file)) {
        return file
    }
    return file + '.' + ext
}

function getExtension(file) {
    return search(/\.(\w+)$/, file)
}

function sorted(items, fn, reverse = false) {
    const defaultObjectSort = (s) => s[1]
    const defaultNumberSort = (s) => s
    let asObject = false

    if (items.store) {
        items = Object.entries(items.store)
        asObject = true
    } else if (isObject(items)) {
        items = Object.entries(items)
        asObject = true
    }

    if (!fn)
        fn = isDoubleIterable(items)
            ? defaultObjectSort
            : isNumber(items[0])
            ? defaultNumberSort
            : char2n

    function runner(a, b) {
        if (reverse) return Number(fn(b)) - Number(fn(a))
        return Number(fn(a)) - Number(fn(b))
    }

    items.sort(runner)
    return asObject ? reduce(items) : items
}

function n2char(n) {
    return String.fromCharCode(n + 97)
}
function char2n(ch) {
    return ch.toLowerCase().charCodeAt(0) - 97
}

function newlineIndent(s, n = 4) {
    if (!s) {
        return ''
    }
    s = isArray(s) ? s.join('\n') : s
    return wrap(indent(s.replace(/^\n+/, '').trimEnd(), n))
}

class Storage {
    [Symbol.iterator]() {
        this.items = this.entries
        this.index = 0
        return this
    }
    next() {
        const value = this.items[this.index++]
        const done = this.index > this.items.length
        return {
            value,
            done,
        }
    }
    constructor() {
        this.store = {}
        this.watcher = new Watcher()
        const options = {
            _mode: Array,
            unique: false,
            delimiter: '\n',
            mergeArray: true,
        }
        Object.assign(this, options)
        if (arguments.length == 2) {
            this.store = arguments[0]
            Object.assign(this, arguments[1])
        } else if (arguments.length == 0) {
            Object.assign(this, options)
        } else if (arguments.length == 1) {
            if (hasSharedKeys(arguments[0], options)) {
                Object.assign(this, arguments[0])
            } else if (arguments[0] == Number) {
                this._mode = Number
            } else {
                this.store = arguments[0]
            }
        }
        //console.log(this)
    }

    delete(k) {
        delete this.store[k]
    }
    get value() {
        return this.store
    }
    get keys() {
        return Object.keys(this.store)
    }
    get values() {
        return Object.values(this.store)
    }
    get entries() {
        return Object.entries(this.store)
    }

    get(k) {
        if (arguments.length > 1) {
            return (
                (this.store[arguments[0]] &&
                    this.store[arguments[0]][arguments[1]]) ||
                ''
            )
        }
        return this.store[k] || this.fallback
    }

    get fallback() {
        switch (this._mode) {
            case Array:
                return []
            case Number:
                return 0
            case String:
                return ''
            case Object:
                return {}
        }
    }

    has(k) {
        return this.store.hasOwnProperty(k)
    }
    forEach(fn) {
        return Object.entries(this.store).forEach(([k, v]) =>
            fn(k, v)
        )
    }
    reset(k) {
        if (!k) {
            this.store = {}
            return
        }

        switch (this._mode) {
            case Array:
                this.store[k] = []
                break
            case Number:
                this.store[k] = 0
                break
            case String:
                this.store[k] = ''
                break
            case Object:
                this.store[k] = {}
                break
            case null:
                this.store[k] = null
                break
        }
    }

    pop(k, v) {
        if (v) {
            return pop(this.store[k], v)
        } else {
            return pop(this.store, k)
        }
    }

    map(k, fn) {
        this.store[k] = this.get(k).map(fn)
    }

    set(k, v) {
        this.store[k] = v || null
    }

    toString() {
        return stringify(this.store)
    }
    add(k, v) {
        if (k == null) return
        if (arguments.length == 3) {
            this.addObject(...Array.from(arguments))
            return
        }

        switch (this._mode) {
            case Array:
                this.addArray(k, v)
                break
            case Object:
                this.addObject(...Array.from(arguments))
                break
            case String:
                this.addString(k, v)
                break
            case Number:
                return this.addNumber(k, v)
                break
            default:
                this.set(k, v)
                break
        }

        return this.get(k)
    }

    addNumber(k, v) {
        v = v == null ? 1 : Number(v)
        return this.store[k]
            ? (this.store[k] += v)
            : (this.store[k] = v)
    }

    addString(k, v) {
        if (!exists(v)) {
            return
        }
        this.store[k]
            ? (this.store[k] += this.delimiter + v)
            : (this.store[k] = v)
    }

    addArray(k, v) {
        if (!exists(v)) {
            return
        }
        if (this.unique && this.get(k).includes(v)) {
            return
        }

        if (isArray(v) && this.mergeArray) {
            this.store[k]
                ? this.store[k].push(...v)
                : (this.store[k] = v)
        } else {
            this.store[k]
                ? this.store[k].push(v)
                : (this.store[k] = [v])
        }
    }

    addObject(parent, child, value) {
        if (!exists(value)) {
            return
        }
        if (!this.store[parent]) this.store[parent] = {}
        this.store[parent][child] = value
    }
}

function modularIncrement(arr, item, increment = 1) {
    if (isNumber(arr)) {
        return modularIncrementNumber(
            Number(arr),
            item,
            increment,
            arguments[3] || 9
        )
    }
    if (isFunction(increment)) {
        return modularIncrementFn(arr, item, increment)
    }
    if (increment == '+') increment = 1
    else if (increment == '-') increment = -1

    if (isObject(arr)) {
        arr = Object.keys(arr)
    }

    if (!item) return arr[0]
    const i = arr.indexOf(item)
    if (i < 0) return arr[0]

    let newIndex

    if (i + increment < 0) {
        newIndex = arr.length - 1
    } else {
        newIndex = (i + increment) % arr.length
    }

    const p = arr[newIndex]
    return p
}

function modularIncrementFn(arr, index, fn) {
    index = indexgetter(arr, index)

    for (let i = index; i < arr.length; i++) {
        let item = arr[i]
        if (fn(item)) return item
    }

    for (let i = 0; i < index; i++) {
        let item = arr[i]
        if (fn(item)) return item
    }

    return null
}

function mreplaceObject(o) {}
function mreplace(
    regex,
    replacement,
    s,
    flags = 'g',
    singular = false
) {
    if (arguments.length == 1) {
        return mreplaceObject(regex)
    }

    if (arguments.length == 2) {
        replacement = ''
        s = arguments[1]
    }

    if (arguments.length == 3 && arguments[2] == true) {
        replacement = ''
        s = arguments[1]
        singular = arguments[2]
    }

    if (!regex.flags || !flags.includes('g')) singular = true
    if (!test(regex, s, flags)) {
        return [s, singular ? null : []]
    }

    const store = []
    const sliceBy = hasCaptureGroup(regex) ? 1 : 0

    function parser(...args) {
        args = args.slice(sliceBy, -2).filter((x) => x != null)
        store.push(smallify(args))
        return isString(replacement)
            ? replacement
            : replacement(...args)
    }

    const text = replace(regex, parser, s, flags)
        /* nnoremap trim */
        .replace(/^\n+/, '')
        .trimEnd()

    if (singular) return [text, smallify(store)]
    return [text, store]
}

function wait() {
    return new Promise((resolve) => setTimeout(resolve, 100))
}

function sleep(delay = 3000) {
    delay = toMilliseconds(delay)
    return new Promise((resolve) => setTimeout(resolve, delay))
}

function parseJSON(s, functionStringRevive) {
    if (/^[\d/]+$/.test(s)) {
        return Number(s)
    }
    return isJsonParsable(s)
        ? JSON.parse(s, functionStringRevive)
        : s
}

function splitonce(s, delimiter = '\\s+') {
    if (!s) {
        return ['', '']
    }
    if (isArray(s)) return [s[0], s.slice(1)]
    if (isRegExp(delimiter)) delimiter = delimiter.source
    let regex = '^(.*?)' + delimiter + '([^]+)$'

    return search(regex, s) || [s, '']
}

function pop(arr, key, fallback) {
    if (isObject(arr)) {
        if (!key in arr) return fallback
        let value = arr[key]
        delete arr[key]
        return value
    }

    if (isArray(arr)) {
        const index = isFunction(key)
            ? arr.findIndex(key)
            : isNumber(key)
            ? key
            : arr.indexOf(key)
        if (index < 0) {
            if (fallback) {
                return pop(arr, fallback)
            } else {
                return
            }
        } else {
            return arr.splice(index, 1)
        }
    }
}

function fill(arr, n) {
    while (arr.length <= n) {
        arr.push(null)
        counter()
    }
}

function splitOnceReverse(s, deli) {
    const items = s.split(deli)
    return [items.slice(0, -1), getLast(items)]
}
function split(s, regex = / +/, flags = '') {
    if (isNumber(s)) {
        return s.toString().split('').map(Number)
    }

    if (isArray(s)) {
        let temp = []
        let big = []
        for (let i = 0; i < s.length; i++) {
            let item = s[i]
            if (test(regex, item)) {
                big.push(temp)
                temp = []
                //return [s.slice(0, i), s.slice(i + 1)]
            } else {
                temp.push(item)
            }
            //if (i == s.length - 1) {
            //return [s, null]
            //}
        }
        if (exists(temp)) {
            big.push(temp)
        }
        return big
    }
    if (isNumber(regex))
        return [s.slice(0, regex), s.slice(regex)]
    regex = isString(regex) ? regex : regexed(regex, flags)
    return s.trim().split(regex).filter(exists).map(trimmed)
}

function regexed(regex, flags = '') {
    if (regex == '.') return regex
    const addMultiLine = (x) =>
        /^.?\^/.test(regex) ? x + 'm' : x
    return isString(regex)
        ? RegExp(regex, addMultiLine(flags))
        : regex
}
function paired(list, mode = Array) {
    const store = mode == Object ? {} : []
    const start = list[0] == '' ? 1 : 0
    for (let i = start; i < list.length - 1; i += 2) {
        if (mode == Object) store[list[i]] = list[i + 1]
        else {
            store.push([list[i], list[i + 1]])
        }
    }
    return store
}

function toUpperCase(s) {
    return s.toUpperCase()
}

function depluralize(s) {
    return s.replace(/s$/, '')
}

function intersects(a, b) {
    a = prepareIterable(a, 'keys')
    b = prepareIterable(b, 'keys')
    return b.some((x) => a.includes(x))
}

function intersection(a, b) {
    return (
        a.filter((x) => b.includes(x)) ||
        b.filter((x) => a.includes(x))
    )
}

function shared(a, b) {
    return a.filter((x) => b.includes(x))
}

function changeDate(s, increment) {
    if (!increment) return s
    return s.replace(
        /-\d+/,
        (x) => '-' + zeroPad(Number(x.slice(1)) + increment)
    )
}

function sortByDependencies(items, reducer, ref) {
    const dependencies = items.reduce((acc, item, i) => {
        acc[item] = isFunction(reducer)
            ? reducer(item)
            : findall(reducer, item)
        return acc
    }, {})

    const keys = Object.keys(dependencies)
    const seen = new Set()
    const result = []
    let i
    let item
    let length

    do {
        length = keys.length
        i = 0
        while (i < keys.length) {
            if (
                dependencies[keys[i]].every(
                    Set.prototype.has,
                    seen
                )
            ) {
                item = keys.splice(i, 1)[0]
                result.push(item)
                seen.add(item)
                continue
            }
            i++
        }
    } while (keys.length && keys.length !== length)

    return ref ? result.map((key) => ref[key]) : result
}

function copy(x) {
    // what could go wrong with this?
    return JSON.parse(JSON.stringify(x))
}

function toDashCase(s) {
    return s
        .replace(/[a-z][A-Z]|\W/g, (x) => {
            return x.length == 1 ? '-' : x[0] + '-' + x[1]
        })
        .toLowerCase()
}

function toSnakeCase(s) {
    return s
        .replace(/[a-z][A-Z]/g, (x) => x[0] + '-' + x[1])
        .toLowerCase()
}

function toStringObject(x) {
    function parseObj(obj) {
        let s = '{\n'
        for (let [k, v] of Object.entries(obj)) {
            s += indent(k + ': ' + parse(v)) + ',\n'
        }
        s += '}'
        return s
    }

    function parseArr(arr) {
        let s = '[\n'
        for (let item of arr) {
            s += indent(parse(item)) + ',\n'
        }
        s += ']'
        return s
    }

    function parsePrimitive(s) {
        if (s == '') return "''"
        const known = []
        if (known.includes(s)) return s
        return s.toString()
    }

    function parse(s) {
        if (isObject(s)) {
            return parseObj(s)
        }

        if (isArray(s)) {
            return parseArr(s)
        }

        if (s == null) return 'null'

        return parsePrimitive(s)
    }

    return parse(x)
}

function toArgument(s) {
    s = s.trim()

    if (isQuote(s)) {
        return s.slice(1, -1)
    }
    if (s == '0') return 0
    if (isNumber(s)) return Number(s)
    if (s == 'false') return false
    if (s == 'true') return true
    if (s == 'null') return null
    if (s == 'Number') return Number
    if (s == 'String') return String
    return s
}

function toString(x) {
    if (isObject(x)) return JSON.stringify(x, null, 2)
    if (isArray(x)) return join(x)
    if (isRegExp(x)) return x.source
    return x.toString()
}

function toAttr(a, b) {
    return a + '=' + doublequote(b)
}
function toPascal(s) {
    return capitalize(toCamelCase(s))
}

function toCamelCase(s) {
    return uncapitalize(
        s
            .trim()
            .replace(/[- ]\w/g, (x) => x.slice(1).toUpperCase())
    )
}

function toggleVue(state, key, value, duration = 1000) {
    let from = state[key]
    let to = value
    toggle(state, key, from, to, duration)
}
function toggle(state, key, from, to, duration = 750) {
    let value
    if (arguments.length == 2) {
        value = !state[key]
        if (isBoolean(state[key])) state[key] = value
        return value
    }

    if (arguments.length == 3) {
        if (isFunction(state)) {
            return toggleFunction(...arguments)
        }
        if (isBoolean(state[key])) {
            from = state[key]
            to = !state[key]
            duration = arguments[2]
        } else {
            to = from
            from = state[key]
        }
    }

    state[key] = to
    setTimeout(() => {
        state[key] = from
    }, duration)
}

function toDictionary(items, kt, vt) {
    if (!isNestedArray(items)) items = paired(items)
    return reduce(items, (k, v) => [
        kt ? kt(k) : k,
        vt ? vt(v) : v,
    ])
}

function toLiteralArray(s) {
    return s.slice(1, -1).split(',')
}

function toInteger(x) {
    return Math.round(x)
}

const roygbiv = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
    'white',
    'black',
    'purple',
    'pink',
]

function numberToWord(n) {
    return numberWords[n]
}
const numberWords = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
]

function hasComma(s) {
    return s.includes(',')
}

function hasLetter(s) {
    return test(/[a-zA-Z]/, s)
}

function hasWord(s) {
    return /[a-zA-Z]{3,}/.test(s)
}

function hasLookBehind(s) {
    return test(/\(\?\</, s.toString())
}

function hasLookAround(s) {
    return test(/\(\?\</, s.toString())
}

function endsWithWord(s) {
    return test(/\w$/, s)
}
function endsWithNumber(s) {
    return test(/\d+$/, s)
}

function wordToNumber(s) {
    return numberWords.indexOf(s.toLowerCase())
}

function stringcall(fn, ...args) {
    if (isFunction(fn)) {
        fn = fn.name
    }
    return fn + parens(gatherArgs(args).filter(exists).join(', '))
}

function dedent(s, unit) {
    if (unit) {
        return replace('^' + unit, '', s)
    }
    s = s.trimEnd().replace(/^\n+/, '')
    const spaces = getSpaces(s)
    return replace('^' + spaces, '', s)
}

function getWords(s, { mode = 's', min = 3, max = 50 } = {}) {
    let numbers = ''
    let extra = ''
    if (mode == 'code') {
        extra += '.'
        numbers += '\\d*'
    }

    if (mode == 'css') {
        extra += '-'
    }

    const regex = RegExp(
        `[a-zA-Z${extra}]{${min},${max}}${numbers}`,
        'g'
    )
    return s.match(regex) || []
}

function zip(a, b = null) {
    if (isNestedArray(a)) {
        b = a[1]
        a = a[0]
    }

    const store = {}
    for (let i = 0; i < a.length; i++) {
        store[a[i]] = b[i]
    }
    return store
}

function cartesianProduct(arr) {
    return arr.reduce(
        function (a, b) {
            return a
                .map(function (x) {
                    return b.map(function (y) {
                        return x.concat([y])
                    })
                })
                .reduce(function (a, b) {
                    return a.concat(b)
                }, [])
        },
        [[]]
    )
}

function curry(fn, ...kwargs) {
    return (...args) => {
        let count = 0
        for (let i = 0; i < kwargs.length; i++) {
            let kwarg = kwargs[i]
            if (kwarg === null) kwargs[i] = args[count++]
        }
        return fn(...kwargs)
    }
}

function force(x, n = 2, fallback = '') {
    if (x == null) x = []
    while (x.length < n) {
        x.push(fallback)
    }
    return x
}

function isStorage(x) {
    return test(/Storage/, x.constructor.name)
}

function isNewLine(s) {
    return /^\n+$/.test(s)
}

function colorToHex(color) {
    const dict = {
        black: '000000',
    }
    return '#' + dict[color] || dict.black
}

function iter(items, fn, ...args) {
    if (isNumber(items)) {
        const store = []
        for (let i = 0; i < items; i++) {
            store.push(fn(i, ...args))
        }
        return store
    }

    if (isObject(fn)) {
        for (let item of items) {
            if (fn[item]) {
                if (isFunction(fn[item])) {
                    fn[item](...args)
                }
            }
        }
    }

    return toArray(items).map((item, i) => {
        return fn(item, i, ...args)
    })
}

const StringMixins = {
    trim() {
        this.s = this.s.trim()
    },
    mreplace(regex) {
        const [s, match] = mreplace(regex, this.s)
        this.s = s.trim()
        return match
    },
}

function mixin(state, mixin, ...keys) {
    if (keys.length == 0) keys = Object.keys(mixin)
    for (let key of gatherArgs(keys)) {
        const value = mixin[key]
        if (isObject(value)) {
            Object.defineProperty(state, key, value)
        } else {
            state[key] = value.bind(state)
        }
    }
}

class Eater {
    static eatStart(regex, s) {
        let m = search('^' + regex, s.trim())
        s = s.trim()
        if (m) return [s.slice(m), m]
        return [s, null]
    }

    constructor(regex) {
        this.regex = regex
        this.store = []
        mixin(this, StringMixins, 'trim', 'mreplace')
    }
    eatStart(regex) {
        const [s, match] = Eater.eatStart(regex, s)
        if (!match) return 1
        this.store.push(match)
    }

    eat(regex) {
        const match = this.mreplace(regex)
        if (!match) return 1
        this.store.push(match)
    }

    run(s) {
        this.s = s.trim()
        while (true) {
            const done = this.eat()
            this.trim()
            if (done) break
        }
        return [this.s, this.store]
    }
}

function notNull(s) {
    return s !== null
}

function trimSpaces(s) {
    return s.replace(/^ +| +$/g, '')
}

class Matrix {
    iterate(fn) {
        let count = 0
        let linebreak
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let value = this.get(x, y)
                if (value == null) continue
                count++
                fn(value, x, y, count, linebreak)
                linebreak = false
            }
            linebreak = true
        }
    }
    constructor(x, width) {
        if (isNumber(arguments[0]) && isNumber(arguments[1])) {
            this.width = arguments[0]
            this.height = arguments[1]
            this.store = []
        } else if (isNestedArray(x)) {
            this.store = flat(x)
            this.width = x[0].length
            this.height = x.length
        } else if (isArray(x)) {
            if (!width) width = 3
            if (isObject(width)) {
                width = width.width
            }

            this.store = x
            this.width = width
            this.height = Math.ceil(
                this.store.length / this.width
            )
        }
    }

    [Symbol.iterator]() {
        this.index = 0
        return this
    }

    get(x, y) {
        return this.store[y * this.width + x]
    }

    set(x, y, value) {
        this.store[y * this.width + x] = value
    }

    getColumn(n) {
        const store = []
        let y = 0
        while (y < this.height) {
            store.push(this.get(n, y))
            y += 1
        }
        return store
    }

    getRow(n) {
        const store = []
        let x = 0
        while (x < this.width) {
            store.push(this.get(x, n))
            x += 1
        }
        return store
    }

    getColumns() {
        return iter(this.width, (i) => this.getColumn(i))
    }

    getRows() {
        return iter(this.height, (i) => this.getRow(i))
    }
}

function getStrings(s) {
    return findall(/\'.*?\'|\".*?\"/g, s).map((x) =>
        x.slice(1, -1)
    )
}

function normalizeSpaces(s) {
    return s.replace(/^ +/gm, (x) => {
        return ' '.repeat(fixSpaceLength(x.length))
    })

    function fixSpaceLength(n) {
        switch (n) {
            case 1:
                return 0
            case 2:
                return 4
            case 3:
                return 4
            case 4:
                return 4
            case 5:
                return 4
            case 6:
                return 8
            case 7:
                return 8
            case 8:
                return 8
            case 10:
                return 12
            case 11:
                return 12
            default:
                return n
        }
    }
}

function partial(fn, arg) {
    return function () {
        return fn(arg)
    }
}

function toStringArgument(x, quotes) {
    function parseObj(obj) {
        let s = '{\n'
        for (let [k, v] of Object.entries(obj)) {
            s += indent(singlequote(k) + ': ' + parse(v)) + ',\n'
        }
        s += '}'
        return s
    }

    function parseArr(arr) {
        let s = '[\n'
        for (let item of arr) {
            s += indent(parse(item)) + ',\n'
        }
        s += ']'
        return s
    }

    function parseString(s) {
        if (test(/^[a-z].*?[A-Z]/, s)) return s
        return singlequote(s.toString())
        if (quotes) return s.toString()
        if (test(/^\+\(/, s)) return s
        if (s.includes(' ')) return singlequote(s)
        if (test(/[a-z]\.[a-z]/, s)) return s
    }

    function parse(s) {
        if (isObject(s)) {
            return parseObj(s)
        }

        if (isFunction(s)) {
            return s.toString()
        }

        if (isArray(s)) {
            return parseArr(s)
        }

        if (s == null) return 'null'
        if (s == undefined) return 'undefined'
        if (s == '') return "''"

        if (isNumber(s)) {
            return s
        }

        return parseString(s)
    }

    return parse(x)
}


function createVariable(a, b, quotes = true, prefix = 'const') {
    if (prefix) prefix += ' '
    switch (b) {
        case '': b = 'go'
    }
    let value = isJsonParsable(b) ? b : 
        toStringArgument(b, quotes)
    return `${prefix}${a} = ${value}`
}

function splitmapfilter(s, regex, fn, ...args) {
    const runner = (x, i, arr) => fn(x, ...args, i)
    return split(s, regex).map(runner).filter(exists)
}
function splitMapJoin(s, delimiter, fn) {
    return split(s, delimiter).map(fn).join(delimiter)

    let output = ''
    let match = ''
    let regex = RegExp(
        `(.*?)(${delimiter.source || delimiter})`,
        'gs'
    )
    console.log({ logValue: regex })
    while (exists((match = regex.exec(s)))) {
        let [a, b] = match
        console.log([a, b])
        output += fn(a)
        if (!test(rescape(b), output)) output += b
    }
}

function argsplit(s, ref, regex = '($1)(\\w+)') {
    let match = search(ncg(regex, ref), s)
    return match ? match : [null, null]
}

function partitionWithFunctions(items, ...args) {
    const store = range(args.length + 1, [])
    for (let item of items.filter(exists)) {
        for (let i = 0; i < args.length; i++) {
            let arg = args[i]

            if (ftest(arg, item)) {
                store[i].push(item)
                break
            }

            if (i == args.length - 1) {
                store[store.length - 1].push(item)
            }
        }
    }
    return store
}
function isOnlyWords(s) {
    return test(/^[a-zA-Z](?: [a-zA-Z]+)*$/, s)
}
function warn(s) {
    console.log('warn'.repeat(20))
    console.log(s)
    console.log(getCaller())
    console.log('---------------------------')
}
function getSingleAndDoubleAttrs(s, mode) {
    const [text, doubles] = mreplace(/(\S+?) *= *(\S+)/g, s)
    const singles = split(text)
    if (mode == Object) {
        const store = {}
        for (let single of singles) {
            store[single] = true
        }

        for (let [a, b] of doubles) {
            store[a] = b
        }
        return store
    }
    return [singles, doubles]
}
function getOptions(s, mode) {
    if (mode == Object) {
        const [text, doubleAttrs] = mreplace(
            /(\S+?) *= *(\S+)/g,
            s
        )
        return [
            text,
            toDictionary(doubleAttrs, null, toArgument),
        ]
    }
    function runner(s) {
        if (isOnlyWords(s)) {
            return ['', reduce(split(s), (x) => [x, true])]
        }
        if (test(/:\w/, s)) {
            let [a, b] = mreplace(/:(\w+)/g, '', s)
            return [a, reduce(b, (x) => [x, true])]
        }

        if (test(/=/, s)) {
            let [a, b] = mreplace(/(\w+)=(\w+)/g, '', s)
            const p = [a, reduce(b, (k, v) => [k, v])]
            return p
        } else {
            let [a, b] = mreplace(/[;@](\w+)/g, '', s)
            return [a, reduce(b, (x) => [x, true])]
        }
    }

    let [a, b] = runner(s)
    if (exists(b)) {
        b = mapObject(b, dict)
    }
    return [a, b]
}

function aggregate(s, regex, kt, vt) {
    const storage = new Storage()
    const matches = isString(s) ? findall(regex, s) : s

    for (let [a, b] of matches) {
        if (kt) a = kt(a)
        if (vt) b = vt(b)
        storage.add(a, b)
    }
    return storage.value
}

function pipe(...a) {
    if (isArray(a[0])) a = a[0]
    if (isFunction(a)) return a
    return (...args) =>
        a
            .filter((x) => x)
            .reduce(
                (y, f) => (isArray(y) ? f(...y) : f(y)),
                args
            )
}

function createError() {
    try {
        throw new Error()
    } catch (e) {
        return e
    }
}

function replaceFromIndex(s, index, original, replacement) {
    let length = isNumber(original) ? original : original.length
    let before = s.slice(0, index)
    let after = s.slice(index + length)
    return before + replacement + after
}

function freplace(regex, replacement, s, flags = '') {
    if (isFunction(regex)) {
        return regex(s)
    }

    const parser = (...args) => {
        return isFunction(replacement)
            ? replacement(...args)
            : replaceTemplaterHelper(replacement, args)
        //: templater([getLast(args), ...args])
    }

    return replace(regex, parser, s, flags)
}

class Table extends Matrix {
    constructor(items, width) {
        super(items, width)

        this.simulate()
    }
    simulate() {
        const widths = this.getWidthes()
        const heights = this.getHeights()
        console.log(widths)
    }

    getWidthes() {
        return this.getColumns().map((item, i) => {
            return getLongest(item, len, null)
        })
    }

    getHeights() {
        return this.getRows().map((item, i) => {
            return getLongest(item)
        })
    }
}


function regexgetter(template, dict) {
    assert(template.startsWith('/'))
    let [regex, flags] = search(/\/(.*?)\/(\w+)$/, template)
    let keys = isObject(dict) ? Object.keys(dict) : dict
    let boundary = false

    if (flags.includes('e')) {
        keys = keys.map(mapConditional(/^\W+$/, rescape))
        flags = flags.replace('e', '')
    }

    if (flags.includes('b')) {
        boundary = true
        flags = flags.replace('b', '')
    }

    regex = regex.replace(/\$1/g, keys.join('|'))
    if (boundary) regex = '\\b' + regex + '\\b'
    return RegExp(regex, flags)
}

function hasGFlag(r) {
    return r.flags.includes('g')
}

function regexStartsWithSpaces(r) {
    return /^\^?    /.test(r.source ? r.source : r)
}
function inferlang(s) {
    if (!s) return 'js'
    let match = getExtension(s)
    if (match) {
        if (match == 'vimrc') return 'vim'
        if (match == 'bash_aliases') return 'bash'
        if (match == 'bashrc') return 'bashrc'
        return match
    }

    const dict = {
        '<': 'html',
        function: 'js',
        var: 'js',
        const: 'js',
        let: 'js',
        def: 'py',
        '.': 'css',
    }

    match = s.match(regexgetter('/^($1)/me', dict))
    if (!match)
        match = s.match(regexgetter('/^ *($1)/me', dict))
    return dict[match[0]]
}

function isAllCaps(s) {
    return /^[A-Z]+$/.test(s)
}

function abbreviate(s, mode) {
    if (s.length <= 3 || s == s.toLowerCase()) 
        return s.toLowerCase()
    const regex = /[ \._-]|(\d+|[A-Z]+[a-z]*)/
    const letters = split(s, regex).map((x) => x[0])
    return mode == Array
        ? letters
        : letters.join('').toLowerCase()
}
class TextTokenizer {
    constructor(key) {
        const dictRE = ncg('^($1) *(.+)', dict)
        const splitRE =
            /(\n+|    +|bold \S+|bte.*|@.+|#\w+?(?:e .*?(?:\$|$)| \w+))/
        const items = split(s, splitRE)
        const store = []
        this.run
    }
    run(s) {
        this.s = s
        this.items = split(this.s, this.regex)
        console.log(this.items)
    }
    //new TextTokenizer('reddit')
}

function getFunctionNames(s) {
    return unique(
        findall(
            '^(?:var|const|class|(?:async )?function(?:\\*|!)?) (\\w+)',
            s,
            'gm'
        )
    )
}

function removeSpaces(s) {
    return s.replace(/ /g, '')
}

function identity(...args) {
    return args.length == 1 ? args[0] : args
}

function smallify(x) {
    if (isString(x)) {
        x = x.trim()
        if (lineCount(x) > 3) {
            return getFirstLine(x) + '\n...\n' + getLastLine(x)
        }
        return x
    }
    return x.length == 0 ? null : x.length == 1 ? x[0] : x
}

function spaceToCamel(s) {
    if (isNumber(s)) {
        return Number(s)
    }
    //return s.join('')
    let cap
    let lower
    return listgetter(s, ' ')
        .map((item, i, arr) => {
            if (i == arr.length - 1 && item == 'to') {
                return 2
            }

            if (item == 'new') {
                cap = true
                return 'new'
            }

            if (item == 'lowercase') {
                lower = true
                return ''
            }

            if (item == 'cap' || item == 'capitalize') {
                cap = true
                return ''
            }
            if (cap) {
                if (lower) {
                    lower = false
                } else {
                    item = capitalize(item)
                }
                cap = false
            }

            return item.length == 1 ||
                i == 0 ||
                arr[i - 1].endsWith('.')
                ? item
                : capitalize(item)
        })
        .join('')
}

function listgetter(x, regex) {
    if (isArray(x)) {
        return x
    }
    return split(x, regex)
}

function spaceToSnake(s) {
    return listgetter(s, ' ').join('_')
}

function createConfig(s) {
    if (arguments.length > 1) {
        return reduce(paired(Array.from(arguments)))
    }
    if (!s) return { emptyConfigValue: true }
    if (isWord(s)) return { [s.trim()]: true }
    if (isObject(s)) {
        return s
    }
    s = s.trim()
    let regex
    if (test(/^\w+ \w+$/, s)) {
        regex = /(\w+) (\w+)/g
    }
    else if (test(/  /, s)) {
        //regex = /(.*?)  (.*?)(?=$|  )/g
        regex = /(\S.*?) (\S.*?)(?=  |$)/g
    } else {
        regex = /(.*?) *[:=] *(.*?)(?:$|, ?|  )/g
    }
    //console.log(regex)
    return reduce(findall(regex, s), (k, v) => {
        return [k.trim(), v ? toArgument(v) : true]
    })
}

function jspy(lang, key, ...args) {
    function commentCSS(s) {
        if (hasNewline(s)) {
            return '/*\n' + (s) + '\n*/'
        }
        return `/* ${s} */`
    }

    function commentJS(s) {
        if (hasNewline(s)) {
            return '/*' + newlineIndent(s) + '*/'
        }
        return '// ' + s
    }

    function commentPY(s) {
        if (hasNewline(s)) {
            return '"""' + newlineIndent(s) + '"""'
        }
        return '# ' + s
    }

    const indexes = ['js', 'py', 'vim', 'bash', 'css', 'html']
    const ref = {
        compiler: ['node', 'python3', 'bash'],
        runtime: ['node', 'python3', 'bash'],
        const: ['const ', '', 'let'],
        name: [spaceToCamel, spaceToSnake],
        params: [spaceToCamel, spaceToSnake],
        comment: [commentJS, commentPY, 
        (x) => `" ${x}`,
        (x) => `# ${x}`,
        commentCSS,
        (x) => `<!-- ${x} -->`,
        ],
        //'variablefn': [variablejs, variablepy]
    }

    if (key == lang) {
        let index = indexes.indexOf(lang)
        return reduce(ref, (k, v) => [k, v[index]])
    }
    const value = ref[key][indexes.indexOf(lang)]
    return isFunction(value) && exists(args)
        ? value(...args)
        : value
}
function curryStart(...kwargs) {
    const fn = kwargs.pop()
    return function (...args) {
        fn(...kwargs, ...args)
    }
}
function stateCurryEnd(state, key, ...kwargs) {
    return function stateCurry(...args) {
        state[key](...args, ...kwargs)
    }
}

function stateCurryStart(state, key, ...kwargs) {
    return function stateCurry(...args) {
        return state[key](...kwargs, ...args)
    }
}

function curryEnd(...kwargs) {
    const fn = kwargs.shift()
    return function (...args) {
        fn(...args, ...kwargs)
    }
}

function timestamp(date) {
    let [h, m, s, ms, ampm] = getHMSM(date)
    //h = zeroPad(h)
    m = zeroPad(m)
    s = zeroPad(s)
    return `${h}:${m}:${s}${ampm} ms: ${ms}`
}
//console.log(timestamp())

function wordCount(s) {
    return split(s).length
}

function exporter(state, key, ...args) {
    if (isClassObject(state)) {
        return state[key] && state[key].bind(state)
    }
    state = new state(...args)
    return state[key].bind(state)
}

function stateTrace(state, fnKey) {
    state[fnKey] = trace(state[fnKey].bind(state))
}
class CodeLibrary {
    constructor(s) {
        const functions = getfunctions(s.toString())
        this.store = mapfilter(functions, getFunctionInfo)
    }
    get lib() {
        if (!this._lib) {
            this._lib = reduce(this.store, (x) => {
                return [x.name, x.body]
            })
        }
        return this._lib
    }

    get(key) {
        if (isNumber(key)) {
            const value = this.store[key - 1]
            return value || {}
        }
        if (isArray(key)) {
            return key.map((x) => this.lib[x]).filter(exists)
        }
        const item = this.find(key)
        return item
    }
    find(name) {
        let item = this.store.find((x) => x.name == name)
        if (!item) item = this.store.find((x) => test(name, x))
        if (!item) item = {}
        return item
    }
}

function getfunctions(s, mode = 'js') {
    return split(
        s,
        /\n+(?=export \w+|const|async|class|(@.+\n)*function|var|let)/
    ).map(trimmed)
}

function mapfilter(items, fn, filter) {
    //console.log([items])
    const store = []
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (!item) continue
        let value = fn(item, i)
        if (value) {
            if (filter && !filter(value)) continue
            store.push(value)
        }
    }
    return store
}

function getParamInfo(s) {
    const params = getParameters(s)
    let length = params.length
    if (params.includes('...')) {
        length += 99
    }
    return {params, length}
}
function countParameters(v) {
    if (getFirstLine(v.toString()).includes('...')) {
        return 100
    }
    return getParameters(v).length
}
function getParameters(s) {
    let r1 = /^function \w+ *\((.*?(?:} = {[^]+?)?)\) {/
    let r2 = /^\w+ *\((.*?(?:} = {[^]+?)?)\) {/
    let r3 = /^.*?=>/
    let m = itersearch(s.toString(), r1, r2, r3)
    //console.log(m)
    if (!m) return []
    return findall(/(?:\.\.\.)?(\w+)(?:,|$| *=>|\))/g, m)
}

async function foo() {
    timer = new Clock(12)
    timer.onTick = console.log
    await timer.start()
    console.log('ooo')
}

function scopedEval(expr, context) {
    if (!exists(context)) {
        return eval(expr)
    }
    const evaluator = Function.call(
        null,
        ...Object.keys(context),
        'expr',
        "return eval('expr = undefined;' + expr)"
    )
    return evaluator.call(null, ...Object.values(context), expr)
}

function timegetter(message) {
    let time = Date.now()
    return time
    console.log(timestamp(), message || '')
    return time
}
function getErrorInfo(e, options = {}) {
    if (isString(e)) {
        return console.log({ myError: e })
    }

    let s = e.stack
    let match = search(/<anonymous>:(\d+):(\d+)/, s)
    if (!match) {
        return 
    }
    match = match.map(Number)
    if (options.offset) {
        match = match.map((x, i) => x - options.offset[i])
    }

    let [name, message] = search(/(\w+): *(.*)/, s)
    let value
    let proposedFixFn
    let template
    if (name == 'ReferenceError') {
        value = search(/[\w.]+/, message)
    }

    if (name == 'SyntaxError') {
        value = search(/[\w.]+/, message)
        //template = `let ${value} = ''\n$1`
        //proposedFixFn = templateToFunction(template)
        //console.log(proposedFixFn.toString(), 'fixfn')
    }
    return {
        line: match[0],
        ch: match[1],
        name,
        message,
        value,
        proposedFixFn,
    }
}


function getDetailedErrorInfo(e) {
    let s = e.stack.slice(0, -465)
    let [name, message] = search(/(\w+): *(.*)/, s)

    let regex = /^ *at (\S+) \((.*?):(\d+):(\d+)/gm
    let stack = findall(regex, s).map(
        ([caller, file, line, ch], i) => {
            line = Number(line)
            ch = Number(ch)
            if (caller.includes('.')) {
                let [className, method] = caller.split('.')
                return {
                    class: className,
                    method,
                    file,
                    line: Number(),
                    ch,
                }
            }
            return { caller, file, line, ch }
        }
    )
    return {
        name,
        message,
        stack,
    }
}

class ItemIter {
    constructor(items) {
        this.load(items)
    }
    next() {
        if (this.index > this.items.length - 1) return false
        this.value = this.items[this.index++]
        return true
    }
    load(s) {
        if (!s) return
        const items = xsplit(s)
        this.items = items
        this.index = 0
        this.ei = 0
        this.value = this.items[this.index++]
        return items
    }
}

function forEach(items, fn, options) {
    const iter = new Iter(items)
    const clock = new Clock(iter.size)
    clock.setOptions(options)
    clock.onTick = () => {
        fn(iter.value)
        iter.next()
    }
    return clock.start()
}

function getCaller(target, simple = true) {
    let stack = getStackTrace().slice(3)
    if (simple) stack = stack.map((x) => x[0])
    switch (target) {
        case '':
        case null:
        case undefined:
        case 0:
            return stack[0]
        case -1:
        case -2:
        case -3:
        case 1:
            return stack[Math.abs(target)]
        case 2:
            return stack[2] + '-' + stack[1]
        case 3:
            return stack[3] + '-' + stack[2] + '-' + stack[1]
        default:
            return stack.find(testf(target))
    }
}

class WbooError extends Error {
    constructor(message) {
        super(message)
        this.foo = 'f'
    }
}

function completer(word, ref) {
    let parts = word.split('.')
}
abclist = ['a', 'b']

function owalker(o) {
    return Object.getOwnPropertyNames(o)
}
function vars(obj) {
    //console.log(owalker(obj))
    let s
    let name
    let _type
    if (!obj.prototype) {
        s = obj.constructor.toString()
        name = obj.constructor.name
        _type = 'class'
    } else if (obj.name) {
        name = obj.name
        s = obj.toString()
        _type = type(obj)
    }
    const info = { name, type: _type }

    let props = getClassProperties(s)
    if (!exists(props)) {
        props = owalker(props)
    }

    return { props, ...info }
}

function trywrap(fn, handler) {
    return (...args) => {
        try {
            return fn(...args)
        } catch (e) {
            return handler(e)
        }
    }
}
function stringIIFEWrap(s) {
    const value = parens(brackify('() =>', s)) + '()'
    //console.log(value)
    //console.log(value); throw ''
    return value
}
function stringTryWrap(s) {
    //const fix = `console.log(getErrorInfo(e, {offset: [2,5]}))`
    //return brackify('try', s) + ' ' + brackify('catch(e)', fix)

    const fix = `return getErrorInfo(e, {offset: [3, 9]})`
    return stringIIFEWrap(
        brackify('try', s) + ' ' + brackify('catch(e)', fix)
    )
}

function getLoggableProperties(x) {
    let value = isClass(x)
        ? getClassProperties(x)
        : stringify(x)
    return value
}

function veval(s) {
    const vuelog = (x) => boop.push(getLoggableProperties(x))
    const boop = []
    const logs = []

    const code = s.replace(/cl (.+)/g, (_, x) => {
        logs.push(x)
        return 'vuelog($1)'
    })

    try {
        eval(s)
    } catch (e) {
        const { name, message, stack } = getDetailedErrorInfo(e)
        logs.push(name + ': ' + message)
        vuelog(stack[0])
    }
    return zip(logs, boop)
}

//function toNumber(s) {
//if (isNumber(s)) {
//return Number(s)
//}
//}

function removeStrings(s) {
    return s.replace(/\'.*?\'|\".*?\"|\`[^]*?\`/g, '')
}

function addf(s) {
    return (x) => x + s
}

function lineCount(s) {
    return count('\n', s) + 1
}

function saybye() {
    console.log('bye')
}

function sayhi(...args) {
    if (args) {
        console.log('hi from args', ...args)
        return args[0] + 'hi'
    } else {
        console.log('hiya hiya')
        return 'sayinghi'
    }
}

function captureRegex(regex, flags) {
    if (isString(regex)) {
        return RegExp(parens(regex, flags))
    } else {
        return RegExp(parens(regex.source), regex.flags)
    }
}

function splitLast(s, regex, flags) {
    const items = s.split(captureRegex(regex, flags))
    let a = items[0]
    let b = ''
    //console.log(items)
    for (let i = 1; i < items.length - 1; i += 2) {
        let item = items[i]
        let next = items[i + 1]

        if (i == items.length - 2) {
            b += item
            b += next
            return [a, b]
        } else {
            a += item
            a += next
        }
    }
}
function replaceLast(regex, replacement, s) {
    let match
    let lastMatch
    regex = addGFlag(regex)
    while (exists((match = regex.exec(s)))) {
        lastMatch = match
    }
    let index = lastMatch.index
    let length = lastMatch[0].length
    return (
        s.slice(0, index) +
        replacement +
        s.slice(index + length)
    )
}
function bringFunctionToLife(s) {
    let [text, isAsync] = mreplace(/^async /, s)
    if (isStringObjectFunction(text)) {
        text = 'function ' + text
    }

    //if (isStringLambdaFunction(text)) {
        //text = text.replace(
            ///(.*?) *=> *({?)/,
            //(_, x, bracket) => {
                //let payload = x.startsWith('(') ? x : parens(x)
                //if (bracket) {
                    //payload += '{'
                //}
                //return 'function lambda' + k + payload
            //}
        //)
    //}

    if (isAsync) text = 'async ' + text
    const fnString = parens(text)
    const fn = eval(fnString)
    return fn
}

function bringToLife(s, context) {
    if (!isString(s)) return s
    if (context) return scopedEval(s, context)
    if (isStringFunction(s)) {
        return bringFunctionToLife(s)
    }
    return toArgument(s)
}

function addNestedProperty(base, ...args) {
    let ref = base
    if (args[0].includes('.')) {
        args.unshift(...args.shift().split('.'))
    }
    for (let i = 0; i < args.length; i++) {
        let arg = args[i]
        
        if (i == args.length - 2) {
            ref[args[i]] = args[i + 1]
            break
        } else {
            if (!ref.hasOwnProperty(arg)) {
                ref[arg] = {}
            }
            ref = ref[arg]
        }
    }
    return base
}
function addDeepKey(ref, key, value) {
    let [keys, last] = splitOnceReverse(key, '.')
    keys.forEach((item, i) => {
        if (!ref.hasOwnProperty(item)) {
            ref[item] = {}
        }
        ref = ref[item]
    })
    ref[last] = toArgument(value)
    return ref
}

function collectObjectFromString(s) {
    split(s, deli)
}
function looksLikeProse(s) {
    if (/\\/.test(s)) return false
    return test(/^[a-zA-Z]{2,}/, s)
}

function splitKatex(s) {
    if (!hasLatex(s)) return [s]
    const regex = /(\.? (?:[a-zA-Z]{2,}(?: |$))+)/
    return split(s, regex).filter(exists)
}

function hasLatex(s) {
    return test(/\\\w/, s)
}

function getFirstParameter(fn) {
    return search(/\((\w+)/, String(fn))
}
function isStandardHtml(s) {
    const natives = [
        //'html',
        //'main',
        'body',
        'div',
        'p',
        'a',
        'section',
        'iframe',
        'ul',
        'li',
    ]
    return natives.includes(s)
}
function isCssSymbol(s) {
    return test(/^[:#.*]/, s)
}
function fixSelector(s) {
    if (isCssSymbol(s)) return s
    if (isStandardHtml(s)) return s
    return '.' + s
}

function fixUrl(s) {
    s = s.replace(/view-source:/, '')
    if (!test('^http?://', s)) s = 'https://' + s
    if (!s.includes('.')) s += '.com'
    return s
}

function isSymbol(s) {
    return test(/^[\W\s]\W*$/, s)
}

function consoleThrow(...args) {
    console.log(...args)
    throw 'CONSOLE-THROWw'
}

function getChunks(s, regex) {
    if (!regex) regex = /\n+(?=[\w.#])/
    return s.trim().split(regex).map(trimmed)
}

function pluralize(word, amount) {
    if (amount !== undefined && amount === 1) {
        return word
    }
    const plural = {
        '(quiz)$': '$1zes',
        '^(ox)$': '$1en',
        '([m|l])ouse$': '$1ice',
        '(matr|vert|ind)ix|ex$': '$1ices',
        '(x|ch|ss|sh)$': '$1es',
        '([^aeiouy]|qu)y$': '$1ies',
        '(hive)$': '$1s',
        '(?:([^f])fe|([lr])f)$': '$1$2ves',
        '(shea|lea|loa|thie)f$': '$1ves',
        sis$: 'ses',
        '([ti])um$': '$1a',
        '(tomat|potat|ech|her|vet)o$': '$1oes',
        '(bu)s$': '$1ses',
        '(alias)$': '$1es',
        '(octop)us$': '$1i',
        '(ax|test)is$': '$1es',
        '(us)$': '$1es',
        '([^s]+)$': '$1s',
    }
    const irregular = {
        move: 'moves',
        foot: 'feet',
        goose: 'geese',
        sex: 'sexes',
        child: 'children',
        man: 'men',
        tooth: 'teeth',
        person: 'people',
    }
    const uncountable = [
        'sheep',
        'fish',
        'deer',
        'moose',
        'series',
        'species',
        'money',
        'rice',
        'information',
        'equipment',
        'bison',
        'cod',
        'offspring',
        'pike',
        'salmon',
        'shrimp',
        'swine',
        'trout',
        'aircraft',
        'hovercraft',
        'spacecraft',
        'sugar',
        'tuna',
        'you',
        'wood',
    ]
    if (uncountable.indexOf(word.toLowerCase()) >= 0) {
        return word
    }
    for (const w in irregular) {
        const pattern = new RegExp(`${w}$`, 'i')
        const replace = irregular[w]
        if (pattern.test(word)) {
            return word.replace(pattern, replace)
        }
    }

    for (const reg in plural) {
        const pattern = new RegExp(reg, 'i')
        if (pattern.test(word)) {
            return word.replace(pattern, plural[reg])
        }
    }
    return word
}

function depluralize(word, amount) {
    if (amount !== undefined && amount !== 1) {
        return word
    }
    const singular = {
        '(quiz)zes$': '$1',
        '(matr)ices$': '$1ix',
        '(vert|ind)ices$': '$1ex',
        '^(ox)en$': '$1',
        '(alias)es$': '$1',
        '(octop|vir)i$': '$1us',
        '(cris|ax|test)es$': '$1is',
        '(shoe)s$': '$1',
        '(o)es$': '$1',
        '(bus)es$': '$1',
        '([m|l])ice$': '$1ouse',
        '(x|ch|ss|sh)es$': '$1',
        '(m)ovies$': '$1ovie',
        '(s)eries$': '$1eries',
        '([^aeiouy]|qu)ies$': '$1y',
        '([lr])ves$': '$1f',
        '(tive)s$': '$1',
        '(hive)s$': '$1',
        '(li|wi|kni)ves$': '$1fe',
        '(shea|loa|lea|thie)ves$': '$1f',
        '(^analy)ses$': '$1sis',
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$':
            '$1$2sis',
        '([ti])a$': '$1um',
        '(n)ews$': '$1ews',
        '(h|bl)ouses$': '$1ouse',
        '(corpse)s$': '$1',
        '(us)es$': '$1',
        s$: '',
    }
    const irregular = {
        move: 'moves',
        foot: 'feet',
        goose: 'geese',
        sex: 'sexes',
        child: 'children',
        man: 'men',
        tooth: 'teeth',
        person: 'people',
    }
    const uncountable = [
        'sheep',
        'fish',
        'deer',
        'moose',
        'series',
        'species',
        'money',
        'rice',
        'information',
        'equipment',
        'bison',
        'cod',
        'offspring',
        'pike',
        'salmon',
        'shrimp',
        'swine',
        'trout',
        'aircraft',
        'hovercraft',
        'spacecraft',
        'sugar',
        'tuna',
        'you',
        'wood',
    ]
    // save some time in the case that singular and plural are the same
    if (uncountable.indexOf(word.toLowerCase()) >= 0) {
        return word
    }
    // check for irregular forms
    for (const w in irregular) {
        const pattern = new RegExp(`${irregular[w]}$`, 'i')
        const replace = w
        if (pattern.test(word)) {
            return word.replace(pattern, replace)
        }
    }
    // check for matches using regular expressions
    for (const reg in singular) {
        const pattern = new RegExp(reg, 'i')
        if (pattern.test(word)) {
            return word.replace(pattern, singular[reg])
        }
    }
    return word
}

function findallStrings(s) {
    return findall(/\'.*?\'|\".*?\"/g, s).map((x) =>
        x.slice(1, -1)
    )
}

function isStandardCss(s) {
    if (test(/^.*?{/, s)) return true
}
function isDoubleIterable(x) {
    return isArray(x[0]) && x[0].length == 2
}
function reduceToString(iterable, fn, options = 'entries') {
    if (!fn && isObject(iterable)) {
        fn = (k, v) => v
    }
    let mode = 'entries'
    let delimiter
    if (isObject(options)) {
        mode = options.mode
        delimiter = options.delimiter || null
    }
    iterable = prepareIterable(iterable, mode)
    const runner = isDoubleIterable(iterable)
        ? (x, i) => fn(...x, i)
        : fn
    const values = iterable.map(runner).filter(exists)
    return join(values, delimiter)
}

function join(arr, delimiter) {
    if (!exists(arr)) {
        return ''
    }
    if (delimiter && arguments.length > 1 && !/^\s+$/.test(delimiter)) {
        arr = Array.from(arguments).filter(exists).map(String)
    } else if (isString(arr)) {
        return arr
    } else if (isObject(arr)) {
        arr = Object.values(arr)
    } else {
        arr = Array.from(arr)
    }
    if (delimiter) return arr.join(delimiter)

    let s = ''
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (item == '') continue
        s += item
        if (i < arr.length) {
            let next = arr[i + 1] || ''
            s += item.includes('\n') || next.includes('\n') ? '\n\n' : '\n'
        }
    }
    return s
}


function joinold(arr) {
    if (!exists(arr)) {
        return ''
    }
    if (arguments.length > 1) {
        arr = Array.from(arguments).filter(exists).map(String)
    } else if (isString(arr)) {
        return arr
    } else if (isObject(arr)) {
        arr = Object.values(arr)
    } else {
        arr = Array.from(arr)
    }

    let s = ''
    for (let item of arr) {
        s += item
        s += item.includes('\n') ? '\n\n' : '\n'
    }
    return s
}

function wrap(s, delimiter = '\n') {
    if (delimiter == '[]') return `[${s}]`
    if (delimiter == '{}') return `{${s}}`
    return delimiter + s + delimiter
}

function hasOwn(obj, key) {
    return obj.hasOwnProperty(key)
}

function startsWithSymbol(s) {
    const startsWithSymbolRE = /^[^\w\s]/
    return test(startsWithSymbolRE, s)
}

function splitOnceSymbolOrWord(s) {
    const value = startsWithSymbol(s)
        ? search(/^([^\w\s]+)(.*)/, s)
        : search(/^(\w+) (\w.*)/, s)

    if (!value) return [null, null]
    if (value.length == 1) return [value, null]
    return value
}

class IndexError extends Error {
    constructor(...args) {
        super(...args)
    }
}

function mergeProps(...args) {
    const store = {}

    function childRunner(store, k, v) {
        let current = store[k]
        if (isObject(v)) {
            runner(v, current)
        } else if (isArray(v)) {
            for (let item of v) {
                if (!current.includes(item)) {
                    store[k].push(item)
                }
            }
        } else if (isFunction(v)) {
            store[k] = mergeFunction(current, v)
        }
    }
    function runner(arg, store) {
        if (!arg) return
        for (let [k, v] of Object.entries(arg)) {
            if (store.hasOwnProperty(k)) {
                childRunner(store, k, v)
            } else {
                store[k] = v
            }
        }
    }

    for (let arg of args) {
        runner(arg, store)
    }
    return store
}

function mergeFunction(current, next) {
    return function mergedFunction(...args) {
        let a = current(...args)
        let b = next(...args)
    }
}
function compose(...fns) {
    return (x) => fns.reduceRight((acc, f) => f(acc), x)
}

function coerceToArray(x) {
    if (x == null) return []
    if (isString(x)) {
        return split(x)
    }
    return [x]
}

function coerceToString(x) {
    return x.toString()
}

function coerceToNumber(x) {
    //console.log([x])
    if (isNumber(x)) {
        return Number(x)
    }
    if (isString(x)) {
        let y = wordToNumber(x)
        if (y > -1) return x
        return Number(x.replace(/\D+/g, ''))
    }
}

function startsWithPeriod(s) {
    return test(/^\./, s)
}

function splitOptionalComma(s) {
    return s.trim().split(/,? +/)
}

function brackify(name, value) {
    return (
        (name ? name + ' ' : '') +
        '{' +
        newlineIndent(value) +
        '}'
    )
}

function hasColon(s) {
    return test(/:/, s)
}

function curryEnd(fn, ...args) {
    return (...bargs) => fn(...bargs, ...args)
}

function curryStart(fn, ...args) {
    if (!isFunction(fn)) {
        return stateCurryStart(fn, ...args)
    }
    return (...bargs) => fn(...args, ...bargs)
}

function hasDash(s) {
    return test(/-/, s)
}
function getFirstLine(s) {
    return s.match(/^.*/)[0]
}

function removeStartingSpaces(s) {
    return s.toString().replace(/^\n*/, '').trimEnd()
}

function toFunctionRegex(s, flags = 'm') {
    const ignore = ['run']
    if (s.length <= 2 && !ignore.includes(s)) {
        s = toAbbreviationRegex(s)
    }
    return RegExp(
        '^(?:(?:async )?function|class|const|var) ' +
            s +
            '\\b[\\w\\W]*?\\n}',
        flags
    )
}

function getSpacesFromOffset(offset, original) {
    let ch
    let s = ''
    let a = offset
    while (a > 0 && ch != '\n') {
        ch = original.charAt(a--)
        s += ch
    }
    let spaces = search(/ +(?=\n)/, s)
    return (spaces && spaces.length) || 0
}

function countParentheses(s) {
    return count(/[()]/, s)
    //return (s.match(/(?:[^\\]|^)\((?![\?])/g) || []).length
}

function countCaptureGroups(regex) {
    //util
    let s = regex.source || regex
    return (s.match(/(?:[^\\]|^)\((?![\?])/g) || []).length
}

function getLastLine(s) {
    return s.match(/.*?$/)[0]
}
function splitThePage(s, key) {
    return s.split(RegExp(wrap(key || '---+'))).map(trimmed)
}

function iterSearch(s, regexes, mode = 'match') {
    for (let regex of regexes) {
        let value =
            mode == 'search' ? search(regex, s) : s.match(regex)

        if (value) {
            return value
        }
    }
    return null
}

function itersearch(s, ...regexes) {
    if (!s) return
    s = s.trim()
    for (let regex of regexes) {
        let value = search(regex, s)
        if (value) {
            return value
        }
    }
    return null
}

//console.log(getLongest([{a:1}, {a:3}], (x) => x.a, Object))
//console.log(lineCount('hi'))
function findError(s) {
    const chunks = getChunks(s)
    const store = []

    for (let chunk of chunks) {
        try {
            eval(chunk)
        } catch (e) {
            if (e.constructor.name == 'ReferenceError') {
                continue
            }
            store.push([e.toString(), chunk])
        }
    }
    console.log(store)
    console.log(store.length)
    return store
}

function hasCamelCase(s) {
    return test(/[a-z][A-Z]/, s)
}

function lbreplace(regex, replacement, s, flags) {
    let lbRegex
    let newRegex

    if (isRegExp(regex)) {
        regex = regex.toString()
        flags = regex.match(/\/(\w+)$/)
        flags = (flags && flags[1]) || ''
        regex = regex.slice(1).replace(/\/\w*$/, '')
        //console.log(regex)
    }

    if (test(/\?<=/, regex)) {
        let temp = ''
        let index = 0
        let close = 0
        let open = 0
        while (true) {
            let prev = regex[index - 1]
            let char = regex[index++]
            if (prev != '\\') {
                if (char == '(') {
                    open += 1
                } else if (char == ')') {
                    close += 1
                }
            }
            temp += char
            if (open == close) {
                break
            }
        }

        newRegex = regex.replace(/\?<=/, '?:')
        lbRegex = temp.replace(/\?<=/, '?:')
        return replace(newRegex, parser, s, flags)
    } else {
        return replace(regex, replacement, s, flags)
    }

    function parser(...args) {
        let x = args[0]
        //console.log(lbRegex); throw ''
        //console.log(x); throw ''
        let [text, lb] = mreplace(
            lbRegex,
            '',
            x,
            flags.replace('g', '')
        )
        //console.log([text, lb]); throw ''
        let value = isFunction(replacement) ? 
            replacement(text, ...args.slice(1)) : replacement
        return lb + value
    }
}

function sreplace(s, r, f, flags = 'g') {
    r = rescape(r).replace(/\\\$1/g, '(\\w+)')
    return s.replace(RegExp(r, flags), (_, x) => {
        return eval(f.replace(/\$1/, singlequote(x)))
    })
}

function toRequireString(s) {
    return `const ${removeExtension(s)} = require('${s}')`
}

function removeFunctionPrefix(s) {
    return s.replace(/function /, '')
}
function removeExtension(s) {
    return s.replace(/\.\w+$/, '')
}

function getStackInfo(e) {
    // DONT WRITE CONSOLE.LOG
    const stack = getStackTrace(e)
    //original(stack)
    //throw ''
    const ignore = ['reduce', 'filter']
    for (let i = stack.length - 1; i >= 0; i--) {
        let name = stack[i][0]
        //original(name)
        switch (name) {
            case 'display':
            case 'lambdaDisplay':
            case 'proxyAssertion':
            case 'Console.display':
            case 'console.display':
                if (ignore.includes(stack[i + 1][0])) {
                    return stack[i + 2]
                }
                return stack[i + 1]

            case '<anonymous>':
                if (stack[i - 1][0] == 'Console.display')
                    return ['global', stack[i][1]]
        }
    }
    return stack[0]
}
function getStackTrace(e) {
    if (!e) e = createError()
    const s = isString(e) ? e : e.stack
    //console.log(s)
    const r =
        /at (?:new |Object\.)?([<>a-zA-Z0-9\.]+) .*?(\d+):\d+\)/g
    return findall(r, s)
}
//rename sreplace ereplace
function htmlify(s) {
    if (hasHtml(s)) return s
    s = removeComments(s)
    s = smartDedent(s)
    const dict = {
        list(s) {
            const [a, b] = splitonce(s)
            const items = b ? split(b, ',') : split(a, ',')
            const className = b ? a : 'list'
            const childClassName =
                depluralize(className) + '-' + 'child'
            return divify(
                'ul',
                className,
                items.map((x) =>
                    divify('li', childClassName, x)
                )
            )
        },
    }
    function fn(line) {
        let [a, b] = splitonce(line)
        if (a in dict) {
            return dict[a](b)
        }
        return divify('div', a, b)
    }
    return join(linegetter(s).map(fn))
}

function isCss(s) {
    return test(/^\./, s)
}
class IndexedMap {
    combine(...args) {
        const map = new IndexedMap()
        map.keys = this.keys
        map.values = this.values

        for (let arg of args) {
            map.set(...arg)
        }
        return map
    }

    [Symbol.iterator]() {
        this.index = 0
        return this
    }
    next() {
        const value = this.values[this.index++]
        const done = this.index > this.values.length
        return { value, done }
    }

    constructor() {
        this.index = 0
        this.values = []
        this.keys = []
    }
    has(k) {
        return this.keys.includes(k)
    }
    set(k, v) {
        if (this.has(k)) {
            const index = this.keys.indexOf(k)
            this.values[index] = v
        } else {
            this.keys.push(k)
            this.values.push(v)
        }
    }
    get size() {
        return this.keys.length
    }
    get(key, update = true) {
        let index = this.index
        if (!key) {
            index = 0
        } else if (key == 1 || key == -1) {
            index += key
            if (index == this.size) index = 0
            else if (index == -1) index = this.size - 1
        } else if (isNumber(key)) {
            index = Number(key)
            if (index >= this.size) index = this.size - 1
            if (index < 0) index = 0
        } else if (isString(key)) {
            key = expensiveFuzzyMatch(key, this.keys)
            if (key) {
                index = this.keys.indexOf(key)
                console.log('found it', index)
            } else {
                return [null, null]
            }
        }
        if (update) {
            this.index = index
            this.key = this.keys[this.index]
            this.value = this.values[this.index]
            return [this.key, this.value]
        } else {
            return [this.keys[index], this.values[index]]
        }
    }
}

function isSingleCssProperty(s) {
    return test(/^.*?{\n.+\n}/, s)
}

function smartDedent(s) {
    s = replace(/^\n*|\n$/g, '', s, 'g')
    const spaces = search(/^ *(?=\S)/m, s)
    const secondLineSpaces = search(/\n *(?=\S)/, s)
    if (
        !spaces &&
        secondLineSpaces &&
        secondLineSpaces.length > 4
    ) {
        return replace(
            '^' + secondLineSpaces.slice(5),
            '',
            s,
            'gm'
        ).trim()
    } else {
        s = replace('^' + spaces, '', s, 'gm')
        s = removeComments(s)
        return s.trim()
    }
}


class Iter {
    set parser(fn) {
        this._parser = fn
    }
    get size() {
        return this.items.length
    }
    constructor(x) {
        this.items = xsplit(x)
        this.index = 0
    }
    test(x) {
        return ftest(x, this.value)
    }
    break() {
        this.index--
    }
    peek() {
        return this.items[this.index]
    }
    get remaining() {
        return this.items.slice(this.index)
    }
    replace(x) {
        this.items[this.index] = fparse(x, this.value)
    }
    next() {
        if (this.index > this.items.length - 1) return false
        this.value = this.items[this.index++]
        this.nextValue = this.items[this.index]
        if (this._parser) this.parsed = this._parser(this.value)
        if (this._sets) {
            for (let [k, v] of Object.entries(this._sets)) {
                this[k] = v(this.value)
            }
        }
        return true
    }

    set(key, fn) {
        if (!this._sets) this._sets = {}
        this._sets[key] = fn
    }
}

class LineEdit {
    toString() {
        return this.getValue()
    }

    insertLineBelow(index, content) {
        this.getset(index, (line, spaces) => {
            const spacing = isEnterBlock(line) ? 4 : 0
            return indent(content, spacing) + '\n' + line
        })
    }

    insertLineAbove(index, content) {
        this.getset(index, (line, spaces) => {
            return content + '\n' + line
        })
    }

    get(n) {
        return this.lines[n]
    }

    delete(n) {
        this.lines[n] = null
    }

    get prev() {
        return this.lines[this.index - 1]
    }

    get next() {
        let count = this.index + 1
        let line = this.get(count)
        while (!exists(line)) {
            line = this.get(count++)
        }
        return line
    }

    get isLast() {
        return this.index == this.lines.length - 1
    }
    get last() {
        return this.lines[this.lines.length - 1]
    }

    getset(index, fn, ...args) {
        let line = this.get(index)
        let spaces = getSpaces(line)
        let payload = fn(line, spaces.length, ...args)
        this.set(payload)
    }

    find(regex, n = -1) {
        let a = this.index - 1
        let match
        let line
        let count = 0

        do {
            line = this.getLine(a)
            match = search(regex, line)
            a += n
        } while (!match || count++ < 100)
        return match
    }

    peek(x) {
        if (x) {
            let a = this.index + 1
            let next = this.lines[a]
            while (a < this.lines.length && !ftest(x, next)) {
                next = this.lines[a++]
            }
            return next
        }
        return this.lines[this.index + 1]
    }

    getValue() {
        return join(this.store.filter(String))
    }

    deleteRange(range) {
        let [from, to] = range
        for (let i = from; i < to; i++) {
            this.deleteLine(i)
        }
    }

    replaceRange(range, fn) {
        const block = this.getRange(...range)
        this.deleteRange(range)
        const replacement = fn(block)
        this.setLine(range[0], replacement)
        this.lastIndex = range[1]
    }

    getRange(from, to) {
        return this.lines
            .slice(from, to || this.lines.length)
            .join('\n')
    }

    constructor(parser, ...parsers) {
        //this.parsers = parsers.map((parser) => parser.bind(this))
        if (parser) this.parser = parser.bind(this)
        this.tabWidth = 4
    }

    reset() {
        this.tracker = {}
        this.store = []
        this.index = 0
    }

    run(s) {
        this.reset()
        this.lines = (this.s || s).trim().split('\n')

        for (let i = 0; i < this.lines.length; i++) {
            const [indentation, line] = getIndentAndLine(
                this.lines[i]
            )
            this.spaces = indentation
            this.index = i
            //for (let parser of this.parsers) {
            //if (parser(line, indentation, i)) {
            //continue
            //}
            //}

            this.parser(line, indentation, i)
        }
        return this
    }

    insert(index, value) {
        let [spaces, line] = getSpacesAndLine(this.get(index))
        const payload =
            spaces + (isFunction(value) ? value(line) : value)
        insert(this.lines, payload, index)
    }

    set(value, spaces) {
        const payload = indent(
            value,
            spaces == null ? this.spaces : spaces
        )
        if (isArray(payload)) {
            this.store.push(...payload)
        } else {
            this.store.push(payload)
        }
    }
}

function isEnterBlock(s) {
    return /[:{(\[] *$/.test(s)
}

function fixSpaceLength(n) {
    switch (n) {
        case 1:
            return 0
        case 2:
            return 4
        case 3:
            return 4
        case 4:
            return 4
        case 5:
            return 4
        case 6:
            return 8
        case 7:
            return 8
        case 8:
            return 8
        case 10:
            return 12
        case 11:
            return 12
    }
    return n
}

function isHtml(s) {
    if (test(/<\w/, s)) {
        return true
    }
}

function isHtmlAttr(s) {
    if (test(/^\.|foo/, s)) {
        return true
    }
}

//rest='foo for=mrdd'
//;[rest, doubleAttrs] = mreplace(/(\S+?) *= *(\S+)/g, rest)
//console.log([rest, doubleAttrs])
class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(e, listener) {
        if (isObject(e)) {
            for (let [k, v] of Object.entries(e)) {
                this.on(k, v)
            }
            return
        }

        if (typeof this.events[e] !== 'object') {
            this.events[e] = []
        }
        this.events[e].push(listener)
        return () => this.removeListener(e, listener)
    }
    removeListener(e, listener) {
        if (typeof this.events[e] === 'object') {
            const index = this.events[e].indexOf(listener)
            if (index > -1) {
                this.events[e].splice(index, 1)
            }
        }
    }
    emit(e, ...args) {
        if (typeof this.events[e] === 'object') {
            this.events[e].forEach((listener) => {
                listener.apply(this, args)
            })
        }
    }
    once(e, listener) {
        const remove = this.on(e, (...args) => {
            remove()
            listener.apply(this, args)
        })
    }
}

//console.log(typist('<c-a-s->hizhGG<CR><3><4>44<l><r><u><d>  '))
function testf(regex, flags = '') {
    return (s) => test(regex, s, flags)
}

// what is taking so long ...
//
const vmap = {
    'v-bind': 'v-bind',
    'style': ':style',
    enter: '@keydown.enter',
    tc: 'textContent',
    t: 'textContent',
    ih: 'innerHTML',
    bind: 'v-bind',
    ref: 'ref',
    show: 'v-show',
    click: '@click',
    tg: 'transition-group',
    if: 'v-if',
    elif: 'v-else-if',
    else: 'v-else',
    key: ':key',
    for: 'v-for',
    fori: 'v-for',
    vfor: 'v-for',
    html: 'v-html',
    model: 'v-model',
}
//z=new IndexedMap()
//z.set('h', 'f')
//z.set('h', 'fg')
//z.set('jh', 'gggfg')
//console.log(z.get(0))
//console.log(z.get(1))
//console.log(z.get(1))
//function a(x) {
//console.log('hi')
//}
//function b(x) {
//console.log('bye')
//}
//z=pipe(a, b)
//z()
//

function atFirst(fn, ...args) {
    return (x) => [fn(x[0], ...args), x[1]]
}

function atSecond(fn, ...args) {
    return (x) => [x[0], fn(x[1], ...args)]
}

function log(s) {
    return `console.log(${s})`
}
function logger(x) {
    //dumb
    if (isClassObject(x)) {
        return x
    } else if (isPrimitive(x)) {
        return x
    } else {
        return stringify(x)
    }
}

function run(State, ...args) {
    try {
        const state = new State()
        const value = state.run(...args)
        console.log(value)
        //console.log(logger(value))
        return
    } catch (e) {
        console.log(e)
        //const value = State(...args)
        //console.log(logger(value))
        //l e
    }
}
//
//
//
//console.log(isClassObject(Cache))
//console.log(isClassObject(test))
//console.log(isClassObject(Set))
//console.log(isClassObject(4))
//console.log(isClassObject(Promise))
//console.log(isClassObject({a:1}))
//console.log(isClassObject(new Set()))
//console.log(isClassObject([3]))
//console.log(isClassObject(new Storage))
//console.log(isClassObject(new Cache))
//

class IncrementalBuilder {
    constructor() {}
}

// cannot use my parent's funds.
// unclear expectations
// unmet promises
// unreliability
// must change the discipline aspect
// i didnt take it seriously (huge)
// the same mistake i made with John && Ben
// ... ... ...
// with responsibility ...
// to be proletariat
// to entertain a reality
// to exert a reality
//
//
//

function getUniqueLetters(s) {
    return unique(findall(/\w/g, s))
}

function isAllEqual(x) {
    return x.every((item) => item == item[0])
}

function fillTo(items, item, amount) {
    if (arguments.length == 2) {
        amount = item
        item = getLast(items)
    }

    while (items.length < amount) {
        items.push(item)
    }
    return items
}
class Builder {
    constructor() {
        this.start = []
        this.end = []
    }
    append(x) {
        this.end.push(x)
    }
    prepend(x) {
        this.start.push(x)
    }
    toString() {
        const lines = [...this.start.reverse(), ...this.end]
        return join(lines)
    }
}
//

function getVariablesFromString(s) {
    const regex =
        /\w+\(|\b(?:if|else|while|for|do)\b|\/.*?\/\w*|'.*?'|".*?"/g
    return getWords(s.replace(regex, ''))
}
//console.log(getVariablesFromString('if (/foo/g, dfg, d, foo(bar) {'))
function toStringFunction(name, params, body) {
    if (isArray(params)) {
        params = params.join(', ')
    }
    params = params ? params : ''
    return brackify(
        `function ${name.trim()}(${params})`,
        body
    )
}

function checkjs(s) {
    s = s.replace(
        /^[\w\.]+\( *(?:\n[^]+?\n\)|\{ *\n[^]+?\n\}\)|.+)/gm,
        ''
    )
    //console.log(s)
    try {
        return true
        eval(s)
    } catch (e) {
        console.log(e)
        return false
    }
}

s = `
foo({
    hi
})
`

//console.log(checkjs(s))
//console.log(checkjs('foo(dfg)'))

function toAbbreviationRegex(input, splatLength = 1) {
    let letters = split(input, '')
    let s = ''
    //let m = '\\w'
    let m = '[a-z]'
    //let fg = {${splatLength - 1},}
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i]
        if (i == 0) {
            s += `[${letter}${capitalize(letter)}]`
            s += `${m}*`
        } else if (i == letters.length - 1) {
            s += `(?:[-_.][${letter}${capitalize(letter)}]`
            s += `|${capitalize(letter)})`
            s += '\\w*'
        } else {
            s += `(?:[-_.][${letter}${capitalize(letter)}]`
            s += `|${capitalize(letter)})`
            s += `${m}*`
        }
    }
    //console.log([s, 'abr'])
    return s
}

function expensiveFuzzyMatch(input, choices, mode) {
    choices = prepareIterable(choices, 'keys')

    const FuzzyMatchTests = [
        (x) => test('^' + input, x, 'i'),
        //(x) => test('^' + toAbbreviationRegex(input) + '$', x),
        (x) =>
            test(
                '^' + toAbbreviationRegex(input) + '$',
                removeExtension(x)
            ),
    ]

    if (choices.includes(input)) {
        return input
    }

    if (hasSymbol(input)) {
        let results = choices.filter(FuzzyMatchTests[0])
        return getLongest(results)
    }

    const [a, b] = FuzzyMatchTests.map((x) => choices.filter(x))
    //console.log([a, b])
    /* a = startswith */
    /* b = abbreviate */

    if (a.length == 0 && b.length == 0) return
    if (a.length != 1 && b.length == 1) {
        return b[0]
    }
    if (b.length != 1 && a.length == 1) {
        return a[0]
    }
    if (a.length == 1 && b.length == 1) {
        return b[0]
    }
    if (mode == Array) return recursiveFlat(a, b)
    return getLongest(getShortest([a, b]))
}

function fuzzyMatch(input, choices) {
    if (!choices || choices.length == 0) return 
    const cachedRegex = toAbbreviationRegex(input)
    const fuzzyMatchTests = [
        (x) => test('^' + cachedRegex + '$', x),
        (x) => test('^' + input, x, 'i'),
        (x) => search('^' + cachedRegex, x),
    ]

    let count = 0
    for (let test of fuzzyMatchTests) {
        if (count == 2) {
            let m = choices.map(test).filter(String)
            return getLongest(m, len, String)
        }

        let r = choices && choices.filter(test)
        if (exists(r)) {
            return getLongest(r, len, String)
        }
        count++
    }
}

function isAllSingleWords(s) {
    return test(/\w+/, s) && !test(/\w+ \w+/, s)
}

function startsWithSingleWord(s) {
    return test(/^(\w+)\n/m, s)
}

//console.log(split(abbreviate('to-siWoRD'), ''))
//fuzzyMatch('ret', ['removeType', 'refat'])
//

function count(regex, s, flags = 'g') {
    // error forgetting s
    if (isArray(s)) return s.filter(regex).length

    if (isString(regex)) {
        if (!test(/\\/, regex)) {
            regex = rescape(regex)
        }
        if (isWord(regex)) regex = '\\b' + regex + '\\b'
        regex = RegExp(regex, flags)
    }

    regex = addGFlag(regex)
    const matches = s.match(regex)
    return matches ? matches.length : 0
}
//count
//

///functionwallu

//"schema get
//"/^ *"/gm
//"/'fn': '$1'/
//"/'\d+': '$1'/
//regexgetter regexGetter
//stringcall  toCallable
//counted     count
//infer-lang
//trimmed trim
//console.log(stringify(aggregate(text, /(\w+) = ([a-zA-Z].+)/g)))
function isLogicFunction(s) {
    return test(/^(is|start|end|has)/, s)
}

function isGetFunction(x) {
    return test(/^get/, x)
}

function sortByOccurence(items, source, reverse = true) {
    const store = []
    for (let item of items) {
        store.push([item, count('\\b' + item + '\\(', source)])
    }
    return sorted(store, null, reverse).map((x) => x[0])
}

function toVimVariable(key, items) {
    if (arguments.length == 3) {
        
        let value = isPrimitive(arguments[2]) ?
            doublequote(arguments[2]) : toStringArgument(arguments[2])
        return `let g:${arguments[0]}[${arguments[1]}] = ${value}`
    }
    let value = isPrimitive(items)
        ? items
        : JSON.stringify(items)
    return `let g:${key} = ${value}`
}

function toConfig(s) {
    return reduce(s, (x) => [x, true])
}

function toVimDict(dict, key, value) {
    if (arguments.length == 4) {
        const [a, b, c, d] = Array.from(arguments)
        return `let g:${a}["${b}"]["${c}"] = "${d}"`
    }
    return `let g:${dict}["${key}"] = "${value}"`
}
function splitparsef(dict, fallback, regex = ' ') {
    return function splitparse(s) {
        let [a, b] = splitonce(s, regex)
        if (a in dict) {
            return dict[a](b)
        }
        return fallback(a, b, s)
    }
    // reminds me of argsplit...
}

function splitCamelCase(x, preserveCase) {
    return x
        .trim()
        .replace(
            /[a-z][A-Z]/g,
            (s) =>
                s[0] +
                ' ' +
                (preserveCase ? s[1] : s[1].toLowerCase())
        )
        .split(' ')
}

function mergeSingleLetters(s) {
    return s.replace(/(?:(?:^| )[a-zA-Z]\b){2,}/g, (x) => {
        let value = removeSpaces(x)
        return ' ' + value
    })
}

function fixPath(s) {
    if (test(/^[\'\"]/, s)) {
        s = s.slice(1, -1)
    }
    return test(/^\w/, s) ? './' + s : s
}
function once(fn, ...args) {
    if (typeof __once__ == 'undefined') {
        let value = fn(...args)
        if (value) {
            __once__ = value
            return value
        }
        return null
    }
    return __once__
}


const randomWords = ['APPLE', 'BANANA', 'CUCUBMBER']
function exciting() {
    if (typeof __once__ == 'undefined') {
            __once__ = copy(randomWords)
    }
    return {'exciting': __once__.pop()}
}

function seen(x) {
    if (typeof __seen__ == 'undefined') {
        __seen__ = new Set()
    }
    if (__seen__.has(x)) {
        return true
    }
    __seen__.add(x)
    return false
}

//forEach(['a', 'b', 'c', 'd', 'e'], console.log).then((x) => console.log('do'))
class FunctionBuilder extends Builder {
    constructor() {
        super()
        this.params = []
        this.name = 'hiya'
    }
    setParams(...params) {
        this.params = params
    }
    getValue() {
        const value = parens(this.toString(String))
        //console.log('value of brought to life fn', value)
        return eval(value)
    }
    toString() {
        return toStringFunction(
            this.name,
            this.params,
            super.toString()
        )
        return `function ${this.name}(${this.params.join(
            ', '
        )}) {${newlineIndent(super.toString())}}`
    }
}

//const newIndex = modularIncrement(8,  1, 0, 8)
//display({newIndex})
function splitNumberBoundary(s) {
    return split(s, /(\d+)/).filter(exists).map(toNumber)
}
function foo({ x = 'hi' } = {}) {
    assert(1 == 2)
}
//module.exports.getErrorInfo = getErrorInfo
function functionProxy(context, method, fn) {
    return function functionProxyRunner(...args) {
        if (fn) fn()
        method.call(context, ...args)
    }
    //console.warn = functionProxy(console, console.warn, vueWarn)
}

s = `

<span class="test1 test2"></span>
<div class="test">
    <div>
        <input class="a" />
        <input class="b" />
    </div>
</div>

<span class="test1 ok test2"></span>
<div class="test fo">
    <div class="const">
        <input class="a" />
        <input class="c" />
    </div>
</div>


`
//run(HtmlTree, s)
//
//
//console.log(['a', 'b', 'c', 'd', 'e'].slice(-3))

function isStorageSchema(x) {
    const entries = isObject(x) && Object.entries(x)
    return entries && entries[0] && isArray(entries[0][1])
}

function toStorageSchema(data) {
    const entries = isObject(data) && Object.entries(data)
    if (!exists(entries)) {
        return {}
    }
    const first = entries[0]
    if (isArray(first)) {
        return data
    }
    if (isObject(first)) {
        return reduce(entries, (k, v) => [k, [v]])
    }

    if (isString(first)) {
        console.log('is a stirng')
        return reduce(entries, (k, v) => [k, [v]])
    }
    return data
    //return entries && entries[0] && isArray(entries[0][1])
}

function getModuleExports(s) {
    const r = /^module\.exports\.(\w+)/gm
    return unique(findall(r, s))
}

const catpics = [
    //'dancing.jpg',
    'fist on chin.jpg',
    'flying.jpg',
    'like a boss.jpg',
    'ocean sunset.jpg',
    'pose f.jpg',
]

//storage = new Storage()
//storage.add('a', 'b', 'c')
//storage.add('a', 'b', 'd')
//storage.add('b', 'b', 'd')
//storage.add('b', 'c', 'd')
//console.log(storage.value)
//
function foo() {
    console.log('hi')
    assert(1 == 2)
}
//bringToLife('const foo = go\nconst boo = hi\nyoyo')
function regexTemplater(r, dict) {
    let s = r.source.replace(/\$(\w+)/g, (_, x) => {
        if (x == '1')
            return prepareIterable(dict, 'keys').join('|')
    })
    let value = RegExp(s, r.flags)
    return value
}

function dynamicGetterSetter(state, key, callback) {
    const get = () => {
        if (!state['_' + key]) {
            console.log('returning cached value of ', key)
            state['_' + key] = callback(state)
        }
        return state['_' + key]
    }

    const set = () => {
        return state['_' + key]
    }
    Object.defineProperty(state, key, { get, set })
}

function hasReturnValue(s) {
    return test(/return \S/, s.toString())
}

function defineFunctionProperty(state, k, v) {
    if (hasReturnValue(v)) {
        const get = () => {
            const value = v(state)
            return value
        }
        Object.defineProperty(state, k, { get })
    } else {
        state[k] = (...args) => v(state, ...args)
    }
}
function defineProperty(state, k, v) {
    const get = () => {
        const value = v(state)
        return value
    }

    Object.defineProperty(state, k, { get })
}

//class Foo {
//constructor() {
//this.s = 'hi'
//}
//}
//function cmf(foo) {
//return foo.s + 'soooup'
//}
//foo=new Foo()
//defineProperty(foo, 'boo', cmf)
//foo.boo // gets a value

//console.log(toFunctionRegex('foo'))
//console.log(getOptions('grid ab h=120', {height:30}, Object))
//console.log(brackify('', ['a', 'b', 'c', 'd', 'e'].join(',\n')))
//l
//console.log(toStringArgument(['a', 'b', 'c', 'd', 'e']))
//

function toArrayOrObjectList(s, mode) {
    const [a, b] = mode == Array ? ['[', ']'] : ['{', '}']
    return a + newlineIndent(s.join(',\n') + ',') + b
}
//console.log(toArrayOrObjectList(['a', 'b', 'c', 'd', 'e']))
function isEven(n) {
    return n % 2 == 0
}

function isOdd(n) {
    return n % 2 == 1
}

function divifyOLD(tag, className, x) {
    console.log('sup')
    let attrs = className.includes('=')
        ? ' ' + className
        : className
        ? ` class="${className}"`
        : ''
    if (!x) x = ''
    let s = `<${tag}${attrs}>`

    if (isArray(x) || (isString(x) && hasNewline(x))) {
        s += newlineIndent(x)
    } else {
        s += x
    }

    s += `</${tag}>`
    return s
}
//console.log(expensiveFuzzyMatch('mes', ['element-const-com', 'foOn', 'hi']))
function removeStartingSymbols(s) {
    return s.replace(/^\W+/, '')
}
function removeSymbols(s) {
    return s && s.replace(/[^\w-]+/g, '')
}

// ------------------------------------------

function edit(x, ...args) {
    if (isArray(x)) {
        return editArray(x, ...args)
    }

    if (isObject(x)) {
        return editObject(x, ...args)
    }

    function editArray(items, index, value) {
        items[index] = fparse(value, items[index])
        return items
    }

    function editObject(object, kt, vt) {
        return reduce(object, (k, v) => {
            if (kt) k = kt(k)
            if (vt) v = vt(v)
            return [k, v]
        })
    }
}

function isWordy(s) {
    const regex = /[a-zA-Z\']+ [a-zA-Z\']+ [a-zA-Z\']+/
    return test(regex, s)
}

//dicts = [{a:1, b:2, c:3}, {ac:1, cb:2, cc:3}]
//const regex = ncg('($1)(\\d+)|($2)\\b', dicts, 'g')
//console.log(regex)
//
//
//
s = `

        #katex-question katex=question
        #math-quill ref @onEnter focusIt
`

s = `


hi
`

//console.log(splitThePage(s))
//

function stringify2(x, options) {
    // hard.
    function stringWrapper(s) {
        return h('string', s)
    }

    const checkpoint = isVueElement

    function runner3(x) {
        const type = typeOf(x)
        const value = options[type](x, type)
        return checkpoint(value) ? value : runner3(value)
    }

    function runner(x) {
        const value = runner2(x)
        return options.condition(value) ? value : runner(value)
    }

    function runner2(x) {
        if (isFunction(x)) {
            return options.functionWrapper(x)
        }
        if (isPrimitive(x)) {
            return options.stringWrapper(x)
        }
        if (isArray(x)) {
            return options.arrayWrapper(x.map(runner))
        }
        if (isObject(x)) {
            return options.objectWrapper(
                Object.entries(x).map(atSecond(runner))
            )
        }
    }
    /* this will create a component */
    return runner(x)
}
function walk(x, fn, depthLimit = 5) {
    function walker(x, depth, a) {
        if (depth > depthLimit) {
            return evaluator(x)
        }
        if (isArray(x)) {
            return x.map((y) => walker(y, depth + 1))
        }

        if (isObjectLiteral(x)) {
            return Object.entries(x).reduce((acc, [a, b]) => {
                acc[a] = walker(b, depth + 1, a)
                return acc
            }, {})
        }
        return evaluator(x, depth, a)
    }

    function evaluator(x, depth, a) {
        const value = fn(x, depth, a)
        return value == null ? x : value
    }
    return walker(x, 0)
}


function simpleWalk(x, fn) {
    function walker(x) {
        if (isArray(x)) {
            return x.map(walker)
        }

        if (isObjectLiteral(x)) {
            return Object.entries(x).reduce((acc, [a, b]) => {
                acc[a] = walker(b)
                return acc
            }, {})
        }
        return evaluator(x)
    }

    function evaluator(x) {
        const value = fn(x)
        return value == null ? x : value
    }
    return walker(x)
}

//console.log(walk({a:1, b:2, c: {a:1, b:2, c:3}}))

function allowIgnoreFilterFactory(allow, ignore, ignoreRE) {
    const filter = (x) => {
        if (allow.includes(x)) return true
        if (ignore.includes(x)) return false
        if (test(ignoreRE, x)) return false
        return true
    }
    return filter
}

function toHtmlRegex(tag, capture) {
    const content = capture ? '([^]+?)' : '[^]+?'
    return `<${tag}.*?>${content}</${tag}>`
}

function removeHtmlComments(s) {
    return s.replace(/<!--[^]+?--> *\n*/g, '')
}
//console.log({a:1, b:2, c:3}.toString())
//l
//console.log(timestamp('hi'))
//console.log(getHMSM())
function stop() {
    throw 'stoping'
}

function assignAliases(state, ref, ...keys) {
    for (let key of gatherArgs(keys)) {
        state[key] = ref[key].bind(ref)
    }
}
function assignFresh(to, from, callback) {
    for (let [k, v] of Object.entries(from)) {
        if (!to.hasOwnProperty(k)) {
            if (v != null) to[k] = v
        } else if (callback) {
            callback(k, v)
        }
    }
}
function mergeOnTop(a, b) {
    for (let [k, v] of Object.entries(b)) {
        if (a.hasOwnProperty(k)) {
            a[k] = merge(a[k], v)
        } else {
            a[k] = v
        }
    }
    return a
}

function assignExisting(base, incumbent) {
    for (let k of Object.keys(base)) {
        const v = incumbent[k]
        if (v != null) base[k] = v
    }
}

function rng(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomPick(items) {
    if (!isArray(items)) return items
    return items[Math.floor(Math.random() * items.length)]
}

function onceFactory(fn) {
    let touched
    return function once(x) {
        if (!touched && (fn ? fn(x) : x)) {
            touched = true
            return true
        }
    }
}
//console.log(merge({a:1}))

function getIndexesOf(items, fn) {
    return items
        .map((item, i) => {
            return fn(item) ? i : null
        })
        .filter(notNull)
}
//console.log(reduce(['hi'], (x) => null))
//console.log(getIndexesOf([1,2,3], identity))

//console.log(once(identity, 3))
//console.log(once(identity, 3))
//console.log(once(identity, 3))
//console.log(once(identity, 3))
//
// belowNonEssential
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly
// ------------------------------------------ silly

function schemaMatch(schema, s, flags = 'g') {
    const captureDictionary = {
        quote: '(?:\'(.*?)\'|"(.*?)")',
        mathvar: '\\w+(?:\\^\\w+)?',
        //line: '(?:^|\\n)(.+)(?=\\n|$)',
        line: '\\S.+',
        mathop: '[+-/\\*] *',
        rest: '[^]+',
        para: '.*',
        char: '\\S',
        word: '[a-zA-Z]{1,}',
        w: '[\\w-$]{1,}',
        a: '.*?',
        A: '[^]+?',
        sym: '\\S{1,}',
        symbol: '[\\W]{1,}',
        nonspace: '\\S{1,}',
    }

    const noCaptureDictionary = {
        q: '\\?',
        s: '\\s*',
        ws: '\\s+',
        to: '[^]+?',
        linebreak: ' *(?:\\n+|$)',
    }

    let keys = []
    let names = []
    let count = 0
    let regex
    schema = prepareSchema(schema)
    regex = schema.replace(/\$(\w+)#?/g, regexParser)
    regex = regex.replace(/\*\?(?=\)(?:$|\|))/g, '*')
    regex = RegExp(regex, flags)

    function prepareSchema(s) {
        const SchemaDictionary = {
            arr: '[$1,$1]',
            config: '$word $any(?=  |$)',
            config: '$sym $sym',
        }

        if (s in SchemaDictionary) s = SchemaDictionary[s]
        return s.replace(
            / *([\[\]. :,]) */g,
            (_, x, offset, o) => {
                if (x == '[' || x == ']' || x == '.')
                    return '\\' + x
                if (x == ' ') return ' +'
                if (x == ':' && o[offset - 1] == '?') return ':'
                if (x == ':' || x == ',') return ` *${x} *`
            }
        )
    }

    function regexParser(_, x) {
        if (x in noCaptureDictionary) {
            return noCaptureDictionary[x]
        }

        count++

        if (x in captureDictionary) {
            let value = captureDictionary[x]
            let groups = countCaptureGroups(value)
            if (groups == 0) return parens(value)
            else {
                count += groups - 1
                return value
            }
        }

        if (isPlural(x)) {
            let regexValue = captureDictionary[depluralize(x)]
            keys[count] = regexValue
            names[count] = x
            const all = '(\\S[^]+?)'
            return all
            //return parens(regexElongation(regexValue))
        }

        const value = parens(regexParserHelper(x))
        return value
    }

    function regexParserHelper(x) {
        switch (x) {
            case 'mc':
                keys[count - 1] = '\\w+'
                names[count - 1] = x
                return '\\S+ \\S+ \\S+ \\S+(?= *(?:$|\\n))'
        }
    }

    // ------------------------------------------ start
    //console.log(regex)
    s = smartDedent(s)
    if (flags.includes('g')) {
        let matches
        let output = []
        while (exists((matches = regex.exec(s)))) {
            let store = []
            for (let i = 1; i < matches.length; i++) {
                let index = i
                let match = matches[i]
                if (match == undefined) {
                    continue
                }
                match = match.trim()
                console.log({
                    name: names[index],
                    match,
                    keys,
                    index,
                    r: keys[index],
                })
                if (keys[index]) {
                    store.push(findall(keys[index], match))
                } else {
                    store.push(toArgument(match))
                }
            }
            output.push(store)
        }
        return smallify(output)
        return output
        return store
    } else {
        let match = s.match(regex)
    }
}

s = `

dog {
   sfgf dffd 
    hog
}

foo {
    bog
    hog
}
`

//v = schemaMatch('^.?$word {$symbols}', s, 'gm')
//console.log(v)
//
//
s = `
x + 2 : red
x^2 : blue
x^2 + 5x + 6 : green
[2,3] : red
[2,5] : blue
`

//const items = schemaMatch('^[$any,$any]:$any|$any:$any', s, 'gm')
//console.log(items)
//console.log(abbreviate('doGo'))
//
//
//

class MathRearrangement {
    constructor(s) {
        this.s = s
    }
    generate() {}
    //const arrange = new MathRearrangement('y = x + 4')
}

s = `

The graph of f(x) crosses the yax at the coordinate point (a,b).
wmtv of a be? ans cbd a b 0      
`

sc = '$A$q$s(?:ans)? *(?:$mc|$para)'

//console.log(schemaMatch(sc, s))
function getOptionsFromSchema(s, schema) {
    const options = {}
    const keys = []
    schema = schema.replace(/\$(\w+)/g, (_, x) => {
        keys.push(x)
        return '(\\w+)'
    })
    schema = schema.replace(/[\[\]]/g, '\\$&')
    schema = schema.replace(/ *, */, ' *, *')
    //console.log(schema); throw "";
    s = s.replace(RegExp(schema, 'g'), (...args) => {
        for (let i = 1; i < args.length - 2; i++) {
            if (!args[i]) continue
            options[keys[i - 1]] = toArgument(args[i])
        }
        return ''
    })
    return [s.trim(), options]
}

s = `

            case 'symbol':
                return '[\\W]{1,}'
            case 'nonspace':
                return '\\S{1,}'
`

//s=schemaMatch('case $quote$to#return $quote', s)
//console.log(s)
s = `
bb
nn

h
h
h
`

//let [imports, html] = schemaMatch('$lines\\n\\s+$rest', s)
//console.log(imports)

//s = 'const $1 = PM.${getLastWord($a, $3)}'
//console.log(spicyTemplater(s, {'a': sayhi, '1': 'vvv'}))
//l spicyReplace
function defineAliases(state, object, dict) {
    for (let [k, v] of Object.entries(dict)) {
        state[k] = object[v].bind(v)
    }
}

class KVStorage {
    constructor() {
        this.store = []
    }

    add(key, value, data) {
        const payload = data
            ? { ...data, key, value }
            : { key, value }
        this.store.push(payload)
        return value
    }

    getKeys(fn = identity) {
        return this.store.filter(fn).map((x) => x.key)
    }

    getValues(fn = identity) {
        return this.store.filter(fn).map((x) => x.value)
    }

    getValue(fn) {
        const value = this.store.find(fn)
        return value && value.value
    }
}

//console.log(typist('hi<c-s>'))
//console.log(tally(['hi', 'hi', 'go']))
//l n
//console.log(n2char(0))
// ------------------------------------------ silly
function letterRange(x) {
    let [a, b] = split(x, '-')
    a = char2n(a)
    b = char2n(b)
    let store = []
    for (let i = a; i <= b; i++) {
        store.push(n2char(i))
    }
    return store
}
function partitionLetterGroups(groupSize, groupAmount) {
    const store = []
    const n = groupSize * groupAmount
    for (let i = 0; i < n; i++) {
        if (i % groupSize == 0) {
            store.push([])
        }
        getLast(store).push(n2char(i))
    }
    return store
}
//console.log(partitionLetterGroups(3, 3))
//
function recursiveDataBuilder(depth) {
    const store = {}
}

function debounce(fn, delay = 250) {
    let id
    return function debouncedFunction(...args) {
        clearTimeout(id)
        id = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}
//console.log(splitLast('abcbd', 'b'))
//console.log(range('3-5'))
s = ['a', 'b', 'c', 'd', 'e']
//console.log(numbered(s))
//console.log(textTable(['a', 'b', 'c', 'd', 'e', ...'ggggggggg'.split('')]))
//console.log(range('1-3'))
//console.log(randomColor())
//console.log(randomColor())
//console.log(randomColor())
//console.log(range(2))
//
class Breaker {
    constructor(limit) {
        this.limit = limit || 3
    }
    singleton(key) {
        if (!this.storage) this.storage = new Storage(Number)
        this.raise(this.storage.add(key), key)
    }
    init(key) {
        if (!this.key || key != this.key) {
            this.key = key
            this.count = 0
        }

        this.raise(++this.count, key)
    }

    raise(n, message) {
        if (n >= this.limit) {
            throw new Error(message)
        }
    }
}
function BreakerFactory(n = 5) {
    let count = 0
    return function lambda(fn) {
        if (++count == n) {
            if (fn) {
                fn()
                return true
            }
            throw 'breaker'
        }
    }
}

function getAndGetAgain(fn, delay = 100) {
    let id
    let breaker = BreakerFactory(5)
    return new Promise((resolve, reject) => {
        id = setInterval(() => {
            breaker()

            console.log('hi')
            const value = fn()
            if (value) {
                resolve(value)
                clearInterval(id)
                return
            }
        }, delay)
    })
}
function tryAndTryAgain(fn, ...args) {
    let id = setInterval(() => {
        try {
            fn(...args)
            clearInterval(id)
        } catch (e) {
            console.log('trying agan')
        }
    }, 1000)

    function runner() {
        try {
            fn(...args)
        } catch (e) {}
    }
}

function buildFileRelations() {
    /* he */
}

function superb(...args) {
    args = gatherArgs(args)
    const store = []
    for (let i = 0; i < args.length; i++) {
        let el = args[i]
        if (isFunction(el)) {
            store.push([el, []])
        } else {
            getLast(store)[1].push(el)
        }
    }
    return store
}
//console.log(mergeProps({b: {x: 1}}, {b: {y: 1}}))

function gatherArgs(args) {
    if (isArray(args[0]) && args.length == 1) {
        return args[0]
    }
    if (args.some(isArray)) {
        return flat(args)
    }
    return args
}

function assertion(x) {
    if (x == null) {
        throw new AssertiongError()
    } else {
        //console.log('the value of x has been asserted')
        return x
    }
}

async function actions(n, fn, delay = 1000, state) {
    for (let i = 0; i < n; i++) {
        await sleep(delay)
        state ? fn.call(state) : fn()
    }
}

function optiongetter(s) {
    return mreplace(/^# *(\w+) *(.*)/gm, s.toString())
}
function waterfall(items, onTick, callback) {
    let id
    let i = 0
    let max = items.length
    let delay

    function runner(x) {
        let item = items[i++]
        //console.log(item)
        delay = item.delay || 1000
        onTick(item)
        if (i == max) {
            clearTimeout(id)
            setTimeout(() => {
                callback()
            }, delay + 250)
            return
        }
        id = setTimeout(() => {
            runner()
        }, delay)
    }
    runner()
}

function waterfall2(promises) {
    return promises.reduce((acc, promise, i) => {
        return acc.then(() => {
            console.log('sup', [i])
            return promise.then(() => {
                return true
            })
        })
    }, Promise.resolve([]))
}

function incrementName(name, offset = 1) {
    return test(/\d$/, name)
        ? name.replace(/\d+$/, (x) => Number(x) + offset)
        : name + '1'
}
function defineVariable(a, b) {
    eval(`${a} = ${b}`)
}

//const a = ['a', 'b', 'c', 'd', 'e']
//b = new Iter(a)
//console.log(b.index)
//console.log(b.next())
//console.log(b.index)
//console.log(b.value)
//console.log(b.index)
//console.log(b.peek())
//console.log(search(/(hi)i/g, 'hiii'))
//console.log((new Tally(['fb', 'b', 'cc', 'cc', 'e'])).lowest())
//console.log(split('h\n\nb', '\n'))
function datemark04082022() {}

function getThis(state, regex) {
    const value = mapfilter(Object.entries(state), (x) => {
        return (
            !isFunction(x[1]) &&
            test(regex, x[0]) && [x[0], x[1]]
        )
    })
    return reduce(value)
}

//console.log(toDashCase('hi'))
//console.log(toDashCase('Hi'))
//console.log(toDashCase('Hi-go'))
//console.log(toDashCase('HiGo'))
//console.log(stringify('2 + 4'))
//let k = 'fooDirectivveff'
//let r = /(\w+)(Directive)|(nativeOn|on)(\w+)/
//let match = search(r, k)
//console.log(match)

//k = 'Toooo'
//k = toCamelCase(k)
//console.log(k)
function foo() {
    boo()
}
//foo()
function boo() {
    console.log(getCaller(2))
}
//generateRandomHtml
//js = boo
//const {name, parameters} = getFunctionInfo(js)
//console.log({name, parameters})

s = `

component circle-data
props h,k,r
colors h,k,r

the circle currently
has a h value of :h
has a k value of :k
is centered around the point (:h,:k)
has a radius of :r
has the equation #equation(circle, h, k, r)
`

//std.eqs.circle(:h, :k, :r)
const standards = {
    equations: {
        circle(h, k, r) {
            return `(x - ${h})^2 + (y - ${k})^2 = ${r}^2`
        },
    },
}

function lineNeedsEndingColon(s) {
    if (test(/[^a-zA-Z]$/, s)) {
        return false
    }
    const words = ['is', 'of', 'currently', 'has', 'be']
    let word = getLastWord(s)
    if (words.includes(word)) {
        return true
    }
}

function infuseVue(s) {
    return s.replace(/:([a-z]+)/g, (_, x) => {
        return `{{${x}}}`
    })
}

function infuseSpanColors(s, colors) {
    if (isArray(colors)) {
        colors = reduce(colors, rainbow)
    }
    const regex = ncg('\\b($1)\\b|({{(?:$1)}})', colors)
    return replace(
        regex,
        (_, a, b) => {
            let value = a || b
            let color = colors
                ? colors[getFirstWord(value)]
                : rainbow()
            return spanify(value, { style: { color } })
        },
        s,
        'g'
    )
}
function createClassFromValue(s) {
    let match = search(/^\w+(?: \w+)?/, s)
    return toDashCase(match)
}
function spanify(value, options) {
    if (isString(options)) {
        options = {
            style: cssEvaluator(options),
        }
    }
    else if (!options) {
        options = {
            class: createClassFromValue(value)
        } 
    }
    //console.log(options); throw ''
    const attrs = Object.entries(options)
        .reduce((acc, [a, b], i) => {
            acc += a + '="'
            if (a == 'style') {
                if (isObject(b)) {
                    for (let [k, v] of Object.entries(b)) {
                        acc += k + ': ' + v + '; '
                    }
                }
                acc = acc.trim()
            }
            else {
                acc += b
            }

            acc += '" '
            return acc
        }, '')
        .trim()
        //console.log(attrs); throw ''
    return `<span ${attrs}>${value}</span>`
}

//s = infuseVue(s)
//s = infuseSpanColors(s, ['h', 'k', 'r'])
//console.log(s)
//console.log(standards.equations.circle(2,3,4))
//derived from functions on StackOverflow http://bit.ly/30qC25j
//console.log(splitonce(['a', 'b']))
//

function validArgs(args) {
    return args.filter((x) => x != null && x != '')
}

function schemaRegexFactory(schema, fn) {
    let [a, template] = split(schema, / *\.\.\. */)
    const dict = {
        wallu: '[^]+?',
        function: 'function',
        //'\\n': '\\\\n',
        //'\\cw': '(\\\\w+)',
        //'\\w': '\\\\w+',
        n: '\\n',
        cw: '(\\w+)',
        w: '\\w+',
        dotu: '.*?',
        s8: ' {8}',
        s4: ' {4}',
    }
    let flags = 'g'
    let r = RegExp(dreplace(a, dict, null), flags)
    console.log(r)
    return function lambda(s) {
        //console.log({s})
        const matches = findall(r, s)
        //console.log(matches); throw ''
        //console.log('matches.length', matches.length)
        return matches.map((x) => spicyTemplater(template, x))
    }
}

// to be out of sight ...
//functionStore = ['vds', 'vvv']
//s = 'vds(fo) vvv(vds(fo)'
//s = s.replace(ncg(functionStore), 'utilsjs.$&')
//console.log(s)

s = `

function hasHtml(s) {
            if (s.includes('<')) return true
        }
`

//console.log(smartDedent(s))
function removeThis(s) {
    return s.replace(/\bthis\./g, '')
}
s = `
Chapter 4: Circles

To make a circle, all you need is a [point (:h, :k)],
and a radius :r
`

//console.log(isPureObject(new StandardObject)); throw ''
//
//

function bindObjectToState(obj, state, transformer) {
    if (!transformer)
        transformer = (x, state) => {
            return x.bind(state)
        }

    return walk(obj, (x) => {
        if (isFunction(x)) {
            return transformer(x, state)
        }
    })
}

function bringFunctionsToLife(dict, state, transform) {
    return reduce(dict, (k, v) => {
        if (isFunction(v)) {
            return [k, v]
        }

        const fn = new FunctionBuilder()
        fn.name = toCamelCase(k)
        if (transform) {
            v = transform(v)
        }

        if (isThisFunction(v) && state) {
            fn.append(v)
            fn.params.push('...args')
            return [k, fn.getValue().bind(state)]
        } else if (isThisFunction(v)) {
            v = v.replace(/\bthis\b/g, 'state')
            fn.params.push('state')
            if (v.includes('...args')) fn.params.push('...args')
            fn.append(v)
            return [k, fn.getValue()]
        } else {
            const param = itersearch(v, 'app', 'state', 'vue')
            fn.params.push(param)
            fn.params.push('...args')
            fn.append(v)
            //console.log(fn.toString())
            return [k, fn.getValue()]
        }
    })
}
//class Foo {
//constructor() {
//this.s = 'hi from foo'
//}
//boo(s = '') {
//console.log(this.s + s)
//}
//}
//const ax = {
//foo: 'console.log(app.s + "YO")',
//foo: 'this.boo(...args)',
//}
//b = new Foo()
//const x = bringFunctionsToLife(ax, b)
//console.log(x.foo(b, 'hi'))
//x.foo('vv')
//console.log(type(null))
//console.log(iterRange(3,5))
//x = new CumulativeStorage()
//x.add('b', 'b', 'c')
//x.add('a', 'b')
//x.add('d', 'b', Array)
//x.add('d', 'c', Array)
//x.add('b', 'f', 'cvv')
//console.log(x.value)
//

s = `

var board = JXG.JSXGraph.initBoard('jsxgraph', {
    grid: false,
    zoom: {
        factorX: 'cv',
        factorY: gogo,

        wheel: false,
        needshift: false,
        eps: 0.1,
    },
})

var ax1 = board.create('line', [
`
//console.log(split(1234))
//console.log(Math.max([3, 4]))
//
//console.log(isIterable(new Set()))
s = `

const HTMLBuilderTemplate = \`
    <!doctype html><html>
        <head>
            $dependencies

\`
`
//console.log(new CodeLibrary(s))
//console.log(getInterestingBindings('askjdhfasdkj sakdjfhsakdf('))
//console.log(partition(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 2))
function schemaReplace(s, schema) {
    let [a, b] = split(schema, / \.\.\. /)
    let regex = rescape(a).replace(/\\\$(\w+)/g, (_, x) => {
        if (x == 1) x == 'w'
        return '(\\' + x + '+)'
    })
    regex = regex.replace(/[\'\"]/g, '[\'"]')
    regex = RegExp(regex, 'g')
    console.log(regex)
    //console.log(regex); throw ''
    const replacement = test(/\$\d/, b)
        ? b
        : bringToLifeLambda(b)
    console.log(replacement)
    const value = s.replace(regex, replacement)
    return value
    return s.replace(regex, value)
}
//console.log(getClassProperties(new Storage()))
//$1 = 'hi'
//console.log($1)
//x= new Breaker()
//x.init(1)
//x.init(1)
//x.init(1)
//x.init(2)
//x.init(1)
//x.init(1)
//x.init(1)
//x.init(1)
// yeah it works
//

//console.log(filter({a:1, b:2, c:3}, (x) => x > 1))
//nlist =[['a', 'b']]
//console.log(nlist.map(atFirst(addf('hi'))))

function xveryMagicLogicHandler(s) {
    const info = {
        Array: [
            'length',
            'concat',
            'fill',
            'find',
            'findIndex',
            'lastIndexOf',
            'pop',
            'push',
            'reverse',
            'shift',
            'unshift',
            'slice',
            'sort',
            'splice',
            'includes',
            'indexOf',
            'join',
            //"keys",
            //"entries",
            //"values",
            //"forEach",
            //"filter",
            //"flat",
            //"flatMap",
            //"map",
            'every',
            'some',
            //"reduce",
            //"reduceRight",
        ],
        //"Number": [
        //"toExponential",
        //"toFixed",
        //"toPrecision",
        //"toString",
        //"toLocaleString"
        //],
        String: [
            'length',
            //"anchor",
            //"big",
            //"blink",
            //"bold",
            //"charAt",
            //"charCodeAt",
            //"codePointAt",
            //"concat",
            'endsWith',
            //"fontcolor",
            //"fontsize",
            //"fixed",
            'includes',
            'indexOf',
            //"italics",
            //"lastIndexOf",
            //"link",
            //"localeCompare",
            //"match",
            //"matchAll",
            //"normalize",
            //"padEnd",
            //"padStart",
            'repeat',
            'replace',
            //"replaceAll",
            //"search",
            'slice',
            //"small",
            'split',
            //"strike",
            //"sub",
            //"substr",
            //"substring",
            //"sup",
            'startsWith',
            'toString',
            'trim',
            'trimStart',
            //"trimLeft",
            'trimEnd',
            //"trimRight",
            //"toLocaleLowerCase",
            //"toLocaleUpperCase",
            'toLowerCase',
            'toUpperCase',
            //"at"
        ],
    }
    s = 'ifhnl'
    obj = { ifo: 'if (isObject($1)) {\n    $c\n}' }
    const { spaces, first, second } = getLineInfo(s)
    const { sol, eol, mol } = getCursorInfo()
}
function xnothingInfront(s) {}
//console.log(~~true)

function defineEmitProperty(state, key) {
    function get() {
        return this['_' + key]
    }

    function set(value) {
        this['_' + key] = value
        this.emit(key, value)
    }

    Object.defineProperty(state, key, { get, set })
}

//class Foo extends EventEmitter {
//constructor() {
//super()
//defineEmitProperty(this, 's')
//}
//run() {
//this.s = 'vvvsdf'
//}
//}
//foo =new Foo()
//foo.on('s', (x) => doglog(x))
//foo.run()
//['a', 'b', 'c', 'g', 'e'].sort().map(console.log)

//console.log(split('goo', '.'))

function endsWithParentheses(s) {
    return test(/\)$/, s)
}

//console.log(join())
//
//const functionRE = /^(?:async )?function[^]+?\n}/gm
//console.log(mreplace(functionRE, 's' + test.toString()))
//
//
//

//match='gi.s'
//const [front, last] = splitOnceReverse(match, /\./)
//console.log(front, last)

//class Foo {
//constructor() {
//}
//a() {
//return capitalize(n2char(~~this.untitledIndex++))
//}
//}

const StorageMixin = {
    reduce(fn, checkpoint = exists) {
        return Object.entries(this.store).reduce(
            (acc, [a, b]) => {
                const value = fn(b)
                if (value && checkpoint(value)) acc[a] = value
                return acc
            },
            {}
        )
    },
    has(x) {
        return this.store.hasOwnProperty(x)
    },
    set(key, value) {
        if (key == null || value == null) return
        this.store[key] = value
    },
    get(key) {
        return this.store[key] || ''
    },
}

function lengthDelta(a, b) {
    const runner = (x) => (isNumber(x) ? x : x.length)
    return Math.abs(runner(a), runner(b))
}

//c = new Clock()
//e = c.createClock({
//onTick(n) {
//console.log('hi e', n)
//console.log(arguments)
//}
//})
//console.log(isSimilar(null, undefined))

function indentAfterFirstLine(s, n) {
    return replace('\n', '\n' + toSpaces(n), s, 'gm')
}

function templateToFunction(s) {
    s = smartDedent(s)
    let items = s.split(/(\$[a-zA-Z0-9]+)/)
    let template = ''
    let variables = new Set()
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.startsWith('$')) {
            item = item.slice(1)
            if (isNumber(item)) {
                item = n2char(Number(item) - 1)
            }
            variables.add(item)
            let prev = items[i - 1]
            let spaces = prev && search(/\n( *).*$/, prev)
            let value = spaces
                ? `indentAfterFirstLine(${item}, ${spaces.length})`
                : item
            template += wrap(value, ' + ')
        } else {
            template += singlequote(
                escapeNewlinesAndQuotes(item)
            )
        }
    }
    //const body = 'return ' + dreplace(template, {
    //'\n': '\\n',
    //'\'': '\\\'',
    //'\"': '\\\"',
    //})
    const body = 'return ' + template
    variables = Array.from(variables).sort()
    let params = variables.map((x, i) => `${x} = ''`)

    if (variables[0] != 'a') {
        params = `{${params.join(', ')}} = {}`
    }
    //console.log(variables)
    const fn = toStringFunction('lambda', params, body)
    //console.log(fn); throw "";
    //console.log([fn])
    //
    return bringToLife(fn)
}
// 04-18-2022

//s = `
//$js
//$foo

//`
//console.log(templateToFunction(s)({js: 'foo\nbye', foo: 'go'}))

//s = `
//$4
//$1
//$2
//$3$4
//`
//console.log(templateToFunction(s)('abc', 'b\ncddd\ne', 'dd'))
//console.log(1==2-1==3-2==4-2)

//s = `fish
//$A
//gogop howdyhow.sadf.vvc
//$4
//$1
//$2
//
//$3$4
//`
//console.log((getLines('fish', 3)))
//console.log(isSimilar(s, 'fish'))

s = `fb(`

function runit(s, evaluater = eval) {
    let value
    let count = 0
    while (++count <= 3) {
        breaker(3)
        try {
            console.log('v')
            value = evaluater(stringTryWrap(s))
            console.log('hi')
        } catch (e) {
            console.log('unreachable syntax error')
            console.log(e)
            return
        }
        if (!value) {
            return true
            /* true usually means everything is okay */
            /* however it also means terminate onTick... or to stop something. it usually ends up meaning the case u want it to be. */
            return console.log('done without errors')
        }
        if (value.proposedFixFn) {
            s = value.proposedFixFn(s)
            console.log(s)
        }
    }
}
//runit()

module.exports.isReferenceError = isReferenceError
module.exports.isSyntaxError = isSyntaxError
module.exports.doglog = doglog
module.exports.pairlog = pairlog
module.exports.dogLogFactory = dogLogFactory
module.exports.WordToNumberDictionary = WordToNumberDictionary
module.exports.trace = trace
module.exports.getFunctionInfo = getFunctionInfo
module.exports.dog = dog
module.exports.display = display
module.exports.noop = noop
module.exports.isUrl = isUrl
module.exports.seasons = seasons
module.exports.StandardObject = StandardObject
module.exports.isError = isError
module.exports.isSet = isSet
module.exports.stringify = stringify
module.exports.datestamp = datestamp
module.exports.getHMSM = getHMSM
module.exports.getMDY = getMDY
module.exports.isString = isString
module.exports.isArray = isArray
module.exports.reduce = reduce
module.exports.uncomment = uncomment
module.exports.escapeNewlinesAndQuotes = escapeNewlinesAndQuotes
module.exports.yes = yes
module.exports.longShort = longShort
module.exports.shortLong = shortLong
module.exports.getLines = getLines
module.exports.isSimilar = isSimilar
module.exports.push = push
module.exports.iterTest = iterTest
module.exports.hasPeriod = hasPeriod
module.exports.getFunction = getFunction
module.exports.argumentGetter = argumentGetter
module.exports.argumentFiller = argumentFiller
module.exports.toMilliseconds = toMilliseconds
module.exports.isAsync = isAsync
module.exports.partition = partition
module.exports.getInterestingBindings = getInterestingBindings
module.exports.hasBracket = hasBracket
module.exports.throwError = throwError
module.exports.coinflip = coinflip
module.exports.isUtf = isUtf
module.exports.opposite = opposite
module.exports.CumulativeStorage = CumulativeStorage
module.exports.addProperty = addProperty
module.exports.exists = exists
module.exports.addPropertyLambda2 = addPropertyLambda2
module.exports.addPropertyLambda3 = addPropertyLambda3
module.exports.iterRange = iterRange
module.exports.isPureObject = isPureObject
module.exports.isThisFunction = isThisFunction
module.exports.rainbow = rainbow
module.exports.average = average
module.exports.Indexed = Indexed
module.exports.isObject = isObject
module.exports.type = type
module.exports.breaker = breaker
module.exports.isNumber = isNumber
module.exports.test = test
module.exports.range = range
module.exports.isPrimitive = isPrimitive
module.exports.textTable = textTable
module.exports.isDoubleIterable = isDoubleIterable
module.exports.isQuote = isQuote
module.exports.isStringNumberRange = isStringNumberRange
module.exports.Tally = Tally
module.exports.coerceToNullIf = coerceToNullIf
module.exports.tally = tally
module.exports.spellcheckFactory = spellcheckFactory
module.exports.Spellcheck = Spellcheck
module.exports.simpleSpellcheck = simpleSpellcheck
module.exports.typist = typist
module.exports.isNestedArray = isNestedArray
module.exports.removeEs6 = removeEs6
module.exports.isLink = isLink
module.exports.regexElongation = regexElongation
module.exports.getFunctionName = getFunctionName
module.exports.isFunction = isFunction
module.exports.isPlural = isPlural
module.exports.toSpaces = toSpaces
module.exports.replace = replace
module.exports.Watcher = Watcher
module.exports.isHtmlFile = isHtmlFile
module.exports.isCssFile = isCssFile
module.exports.isJavascriptFile = isJavascriptFile
module.exports.getQuotes = getQuotes
module.exports.findKeyFactory = findKeyFactory
module.exports.findKey = findKey
module.exports.findKeys = findKeys
module.exports.getShortestLongest = getShortestLongest
module.exports.getShortest = getShortest
module.exports.getLongest = getLongest
module.exports.findCaller = findCaller
module.exports.hasSymbol = hasSymbol
module.exports.toArray = toArray
module.exports.looksLikeRegex = looksLikeRegex
module.exports.prepareRegex = prepareRegex
module.exports.wordToNumber = wordToNumber
module.exports.toStringDictionaryEntry = toStringDictionaryEntry
module.exports.comment = comment
module.exports.hasSelector = hasSelector
module.exports.isUndefined = isUndefined
module.exports.isSelector = isSelector
module.exports.boundary = boundary
module.exports.getVueErrorInfo = getVueErrorInfo
module.exports.hasSpaces = hasSpaces
module.exports.isNull = isNull
module.exports.toStringCallable = toStringCallable
module.exports.uncapitalize = uncapitalize
module.exports.insertBelow = insertBelow
module.exports.linebreak = linebreak
module.exports.hasNewline = hasNewline
module.exports.toNumber = toNumber
module.exports.removeQuotes = removeQuotes
module.exports.blockComment = blockComment
module.exports.modularIncrementNumber = modularIncrementNumber
module.exports.unique = unique
module.exports.numbered = numbered
module.exports.getLast = getLast
module.exports.find = find
module.exports.matchall = matchall
module.exports.toggleFunction = toggleFunction
module.exports.ErrorWatcher = ErrorWatcher
module.exports.getClassString = getClassString
module.exports.getClassMethods = getClassMethods
module.exports.hasSharedKeys = hasSharedKeys
module.exports.isPublic = isPublic
module.exports.getClassProperties = getClassProperties
module.exports.findall = findall
module.exports.smallify = smallify
module.exports.deletef = deletef
module.exports.functiongetter = functiongetter
module.exports.removeAllComments = removeAllComments
module.exports.getLastWord = getLastWord
module.exports.getFirstWord = getFirstWord
module.exports.getFirst = getFirst
module.exports.xsplit = xsplit
module.exports.removeComments = removeComments
module.exports.search = search
module.exports.matchgetter = matchgetter
module.exports.prepareIterable = prepareIterable
module.exports.indent = indent
module.exports.joined = joined
module.exports.getYear = getYear
module.exports.difference = difference
module.exports.errorWrap = errorWrap
module.exports.insertText = insertText
module.exports.isIterable = isIterable
module.exports.linegetter = linegetter
module.exports.isDefined = isDefined
module.exports.isBoolean = isBoolean
module.exports.addGFlag = addGFlag
module.exports.isFirst = isFirst
module.exports.isWord = isWord
module.exports.isPromise = isPromise
module.exports.isJsonParsable = isJsonParsable
module.exports.isRegExp = isRegExp
module.exports.isFalse = isFalse
module.exports.isTrue = isTrue
module.exports.isClassObject = isClassObject
module.exports.isClass = isClass
module.exports.isNode = isNode
module.exports.isJson = isJson
module.exports.isElement = isElement
module.exports.isInteger = isInteger
module.exports.isPositive = isPositive
module.exports.isCapitalized = isCapitalized
module.exports.isYesterday = isYesterday
module.exports.isDate = isDate
module.exports.isToday = isToday
module.exports.zeroPad = zeroPad
module.exports.backspaced = backspaced
module.exports.indexgetter = indexgetter
module.exports.insert = insert
module.exports.getSpaces = getSpaces
module.exports.rescape = rescape
module.exports.replaceTemplaterHelper = replaceTemplaterHelper
module.exports.spicyReplace = spicyReplace
module.exports.spicyTemplater = spicyTemplater
module.exports.reverse = reverse
module.exports.templater = templater
module.exports.hasCaptureGroup = hasCaptureGroup
module.exports.getIndent = getIndent
module.exports.identity = identity
module.exports.trimmed = trimmed
module.exports.AssertionErrorHandler = AssertionErrorHandler
module.exports.AssertionError = AssertionError
module.exports.assert = assert
module.exports.parens = parens
module.exports.len = len
module.exports.hasNumber = hasNumber
module.exports.sum = sum
module.exports.recursiveFlat = recursiveFlat
module.exports.flat = flat
module.exports.doublequote = doublequote
module.exports.delta = delta
module.exports.toVariable = toVariable
module.exports.quotify = quotify
module.exports.tail = tail
module.exports.bindObject = bindObject
module.exports.initializeStateVariable = initializeStateVariable
module.exports.bind = bind
module.exports.fparse = fparse
module.exports.Cache = Cache
module.exports.getLongestOld = getLongestOld
module.exports.dreplace = dreplace
module.exports.ncg = ncg
module.exports.filterObjectHelper = filterObjectHelper
module.exports.filter = filter
module.exports.filterObject = filterObject
module.exports.filtered = filtered
module.exports.getIndentAndLine = getIndentAndLine
module.exports.capitalize = capitalize
module.exports.singlequote = singlequote
module.exports.ftest = ftest
module.exports.mapObject = mapObject
module.exports.mapConditional = mapConditional
module.exports.merge = merge
module.exports.mergeAll = mergeAll
module.exports.tryval = tryval
module.exports.shuffle = shuffle
module.exports.Clock = Clock
module.exports.addExtension = addExtension
module.exports.getExtension = getExtension
module.exports.sorted = sorted
module.exports.n2char = n2char
module.exports.char2n = char2n
module.exports.newlineIndent = newlineIndent
module.exports.Storage = Storage
module.exports.modularIncrement = modularIncrement
module.exports.modularIncrementFn = modularIncrementFn
module.exports.mreplace = mreplace
module.exports.sleep = sleep
module.exports.parseJSON = parseJSON
module.exports.splitonce = splitonce
module.exports.pop = pop
module.exports.fill = fill
module.exports.splitOnceReverse = splitOnceReverse
module.exports.split = split
module.exports.regexed = regexed
module.exports.paired = paired
module.exports.toUpperCase = toUpperCase
module.exports.depluralize = depluralize
module.exports.intersection = intersection
module.exports.shared = shared
module.exports.changeDate = changeDate
module.exports.sortByDependencies = sortByDependencies
module.exports.copy = copy
module.exports.toDashCase = toDashCase
module.exports.toSnakeCase = toSnakeCase
module.exports.toStringObject = toStringObject
module.exports.toArgument = toArgument
module.exports.toString = toString
module.exports.toAttr = toAttr
module.exports.toPascal = toPascal
module.exports.toCamelCase = toCamelCase
module.exports.toggleVue = toggleVue
module.exports.toggle = toggle
module.exports.toDictionary = toDictionary
module.exports.toLiteralArray = toLiteralArray
module.exports.toInteger = toInteger
module.exports.roygbiv = roygbiv
module.exports.numberToWord = numberToWord
module.exports.numberWords = numberWords
module.exports.hasComma = hasComma
module.exports.hasLetter = hasLetter
module.exports.hasWord = hasWord
module.exports.hasLookBehind = hasLookBehind
module.exports.hasLookAround = hasLookAround
module.exports.endsWithWord = endsWithWord
module.exports.endsWithNumber = endsWithNumber
module.exports.stringcall = stringcall
module.exports.dedent = dedent
module.exports.getWords = getWords
module.exports.zip = zip
module.exports.cartesianProduct = cartesianProduct
module.exports.curry = curry
module.exports.force = force
module.exports.isStorage = isStorage
module.exports.isNewLine = isNewLine
module.exports.colorToHex = colorToHex
module.exports.iter = iter
module.exports.StringMixins = StringMixins
module.exports.mixin = mixin
module.exports.Eater = Eater
module.exports.notNull = notNull
module.exports.trimSpaces = trimSpaces
module.exports.Matrix = Matrix
module.exports.getStrings = getStrings
module.exports.normalizeSpaces = normalizeSpaces
module.exports.partial = partial
module.exports.toStringArgument = toStringArgument
module.exports.splitmapfilter = splitmapfilter
module.exports.splitMapJoin = splitMapJoin
module.exports.argsplit = argsplit
module.exports.isOnlyWords = isOnlyWords
module.exports.warn = warn
module.exports.getSingleAndDoubleAttrs = getSingleAndDoubleAttrs
module.exports.getOptions = getOptions
module.exports.aggregate = aggregate
module.exports.pipe = pipe
module.exports.createError = createError
module.exports.replaceFromIndex = replaceFromIndex
module.exports.freplace = freplace
module.exports.Table = Table
module.exports.evaluate = evaluate
module.exports.regexgetter = regexgetter
module.exports.hasGFlag = hasGFlag
module.exports.regexStartsWithSpaces = regexStartsWithSpaces
module.exports.inferlang = inferlang
module.exports.isAllCaps = isAllCaps
module.exports.abbreviate = abbreviate
module.exports.TextTokenizer = TextTokenizer
module.exports.getFunctionNames = getFunctionNames
module.exports.removeSpaces = removeSpaces
module.exports.spaceToCamel = spaceToCamel
module.exports.listgetter = listgetter
module.exports.spaceToSnake = spaceToSnake
module.exports.createConfig = createConfig
module.exports.jspy = jspy
module.exports.curryStart = curryStart
module.exports.stateCurryEnd = stateCurryEnd
module.exports.stateCurryStart = stateCurryStart
module.exports.curryEnd = curryEnd
module.exports.timestamp = timestamp
module.exports.wordCount = wordCount
module.exports.exporter = exporter
module.exports.stateTrace = stateTrace
module.exports.CodeLibrary = CodeLibrary
module.exports.getfunctions = getfunctions
module.exports.mapfilter = mapfilter
module.exports.foo = foo
module.exports.getParameters = getParameters
module.exports.scopedEval = scopedEval
module.exports.timegetter = timegetter
module.exports.getErrorInfo = getErrorInfo
module.exports.getDetailedErrorInfo = getDetailedErrorInfo
module.exports.ItemIter = ItemIter
module.exports.forEach = forEach
module.exports.getCaller = getCaller
module.exports.WbooError = WbooError
module.exports.completer = completer
module.exports.owalker = owalker
module.exports.vars = vars
module.exports.trywrap = trywrap
module.exports.stringIIFEWrap = stringIIFEWrap
module.exports.stringTryWrap = stringTryWrap
module.exports.getLoggableProperties = getLoggableProperties
module.exports.veval = veval
module.exports.removeStrings = removeStrings
module.exports.addf = addf
module.exports.lineCount = lineCount
module.exports.saybye = saybye
module.exports.sayhi = sayhi
module.exports.captureRegex = captureRegex
module.exports.splitLast = splitLast
module.exports.replaceLast = replaceLast
module.exports.bringToLife = bringToLife
module.exports.addDeepKey = addDeepKey
module.exports.collectObjectFromString = collectObjectFromString
module.exports.looksLikeProse = looksLikeProse
module.exports.splitKatex = splitKatex
module.exports.hasLatex = hasLatex
module.exports.getFirstParameter = getFirstParameter
module.exports.isStandardHtml = isStandardHtml
module.exports.isCssSymbol = isCssSymbol
module.exports.fixSelector = fixSelector
module.exports.fixUrl = fixUrl
module.exports.isSymbol = isSymbol
module.exports.consoleThrow = consoleThrow
module.exports.getChunks = getChunks
module.exports.pluralize = pluralize
module.exports.findallStrings = findallStrings
module.exports.isStandardCss = isStandardCss
module.exports.reduceToString = reduceToString
module.exports.join = join
module.exports.wrap = wrap
module.exports.hasOwn = hasOwn
module.exports.startsWithSymbol = startsWithSymbol
module.exports.splitOnceSymbolOrWord = splitOnceSymbolOrWord
module.exports.IndexError = IndexError
module.exports.mergeProps = mergeProps
module.exports.mergeFunction = mergeFunction
module.exports.compose = compose
module.exports.coerceToArray = coerceToArray
module.exports.coerceToString = coerceToString
module.exports.coerceToNumber = coerceToNumber
module.exports.startsWithPeriod = startsWithPeriod
module.exports.splitOptionalComma = splitOptionalComma
module.exports.brackify = brackify
module.exports.hasColon = hasColon
module.exports.hasDash = hasDash
module.exports.getFirstLine = getFirstLine
module.exports.removeStartingSpaces = removeStartingSpaces
module.exports.toFunctionRegex = toFunctionRegex
module.exports.getSpacesFromOffset = getSpacesFromOffset
module.exports.countParentheses = countParentheses
module.exports.countCaptureGroups = countCaptureGroups
module.exports.getLastLine = getLastLine
module.exports.splitThePage = splitThePage
module.exports.iterSearch = iterSearch
module.exports.itersearch = itersearch
module.exports.findError = findError
module.exports.hasCamelCase = hasCamelCase
module.exports.lbreplace = lbreplace
module.exports.sreplace = sreplace
module.exports.toRequireString = toRequireString
module.exports.removeFunctionPrefix = removeFunctionPrefix
module.exports.removeExtension = removeExtension
module.exports.getStackInfo = getStackInfo
module.exports.getStackTrace = getStackTrace
module.exports.htmlify = htmlify
module.exports.isCss = isCss
module.exports.IndexedMap = IndexedMap
module.exports.isSingleCssProperty = isSingleCssProperty
module.exports.smartDedent = smartDedent
module.exports.hasHtml = hasHtml
module.exports.Iter = Iter
module.exports.LineEdit = LineEdit
module.exports.isEnterBlock = isEnterBlock
module.exports.fixSpaceLength = fixSpaceLength
module.exports.isHtml = isHtml
module.exports.isHtmlAttr = isHtmlAttr
module.exports.EventEmitter = EventEmitter
module.exports.testf = testf
module.exports.vmap = vmap
module.exports.atFirst = atFirst
module.exports.atSecond = atSecond
module.exports.logger = logger
module.exports.run = run
module.exports.IncrementalBuilder = IncrementalBuilder
module.exports.getUniqueLetters = getUniqueLetters
module.exports.isAllEqual = isAllEqual
module.exports.fillTo = fillTo
module.exports.Builder = Builder
module.exports.getVariablesFromString = getVariablesFromString
module.exports.toStringFunction = toStringFunction
module.exports.checkjs = checkjs
module.exports.toAbbreviationRegex = toAbbreviationRegex
module.exports.expensiveFuzzyMatch = expensiveFuzzyMatch
module.exports.fuzzyMatch = fuzzyMatch
module.exports.isAllSingleWords = isAllSingleWords
module.exports.startsWithSingleWord = startsWithSingleWord
module.exports.count = count
module.exports.isLogicFunction = isLogicFunction
module.exports.isGetFunction = isGetFunction
module.exports.sortByOccurence = sortByOccurence
module.exports.toVimVariable = toVimVariable
module.exports.toConfig = toConfig
module.exports.toVimDict = toVimDict
module.exports.splitparsef = splitparsef
module.exports.splitCamelCase = splitCamelCase
module.exports.mergeSingleLetters = mergeSingleLetters
module.exports.fixPath = fixPath
module.exports.once = once
module.exports.seen = seen
module.exports.FunctionBuilder = FunctionBuilder
module.exports.splitNumberBoundary = splitNumberBoundary
module.exports.functionProxy = functionProxy
module.exports.isStorageSchema = isStorageSchema
module.exports.toStorageSchema = toStorageSchema
module.exports.getModuleExports = getModuleExports
module.exports.catpics = catpics
module.exports.regexTemplater = regexTemplater
module.exports.dynamicGetterSetter = dynamicGetterSetter
module.exports.hasReturnValue = hasReturnValue
module.exports.defineFunctionProperty = defineFunctionProperty
module.exports.defineProperty = defineProperty
module.exports.toArrayOrObjectList = toArrayOrObjectList
module.exports.isEven = isEven
module.exports.isOdd = isOdd
module.exports.divify = divify
module.exports.removeSymbols = removeSymbols
module.exports.edit = edit
module.exports.isWordy = isWordy
module.exports.walk = walk
module.exports.allowIgnoreFilterFactory =
    allowIgnoreFilterFactory
module.exports.toHtmlRegex = toHtmlRegex
module.exports.removeHtmlComments = removeHtmlComments
module.exports.stop = stop
module.exports.assignAliases = assignAliases
module.exports.assignFresh = assignFresh
module.exports.assignExisting = assignExisting
module.exports.rng = rng
module.exports.randomPick = randomPick
module.exports.onceFactory = onceFactory
module.exports.getIndexesOf = getIndexesOf
module.exports.schemaMatch = schemaMatch
module.exports.MathRearrangement = MathRearrangement
module.exports.getOptionsFromSchema = getOptionsFromSchema
module.exports.defineAliases = defineAliases
module.exports.KVStorage = KVStorage
module.exports.letterRange = letterRange
module.exports.partitionLetterGroups = partitionLetterGroups
module.exports.recursiveDataBuilder = recursiveDataBuilder
module.exports.debounce = debounce
module.exports.Breaker = Breaker
module.exports.BreakerFactory = BreakerFactory
module.exports.getAndGetAgain = getAndGetAgain
module.exports.tryAndTryAgain = tryAndTryAgain
module.exports.buildFileRelations = buildFileRelations
module.exports.superb = superb
module.exports.gatherArgs = gatherArgs
module.exports.assertion = assertion
module.exports.actions = actions
module.exports.optiongetter = optiongetter
module.exports.waterfall = waterfall
module.exports.incrementName = incrementName
module.exports.defineVariable = defineVariable
module.exports.datemark04082022 = datemark04082022
module.exports.getThis = getThis
module.exports.boo = boo
module.exports.standards = standards
module.exports.lineNeedsEndingColon = lineNeedsEndingColon
module.exports.infuseVue = infuseVue
module.exports.infuseSpanColors = infuseSpanColors
module.exports.spanify = spanify
module.exports.validArgs = validArgs
module.exports.schemaRegexFactory = schemaRegexFactory
module.exports.removeThis = removeThis
module.exports.bindObjectToState = bindObjectToState
module.exports.bringFunctionsToLife = bringFunctionsToLife
module.exports.schemaReplace = schemaReplace
module.exports.xveryMagicLogicHandler = xveryMagicLogicHandler
module.exports.xnothingInfront = xnothingInfront
module.exports.defineEmitProperty = defineEmitProperty
module.exports.endsWithParentheses = endsWithParentheses
module.exports.lengthDelta = lengthDelta
module.exports.indentAfterFirstLine = indentAfterFirstLine
module.exports.templateToFunction = templateToFunction
module.exports.runit = runit

module.exports.mergeProperty = mergeProperty
//console.log(getLines('hi\nbye', 0, 1))
module.exports.mergeOnTop = mergeOnTop

function rigidCompareFactory(preset, transform = identity) {
    return function compare1(x) {
        const value = preset.indexOf(transform(x))
        return value > -1 ? value : preset.length + 1
    }
}
function sortHtmlAttrs(items) {
    const preset = ['v-for', 'v-if', 'v-show']
    const compare1 = rigidCompareFactory(preset, onFirst)
    const compare2 = (x) => x.join('').length
    return multiSort(items, compare1, compare2)
}
function rigidSort(items, preset, transform) {
    const compare1 = rigidCompareFactory(preset, transform)
    return multiSort(items, compare1)
}
function multiSort(items, ...criteria) {
    if (getLast(criteria) != identity) criteria.push(identity)

    const sort = (a, b) => {
        for (let i = 0; i < criteria.length; i++) {
            const fn = criteria[i]
            const A = fn(a)
            const B = fn(b)

            let value
            if (isNumber(A)) {
                value = Number(A) - Number(B)
            } else if (isString(A)) {
                value = charPointScore(A) - charPointScore(B)
            }
            if (value) return value
        }
        return 0
    }
    return items.sort(sort)
}

//arr=['a', 'fd', 'c', 'd', 'e']
//rigidSort(arr, ['d', 'e'])
//console.log(arr)
function charPointScore(s) {
    let score = 0
    for (let i = 0; i < s.length; i++) {
        let c = s.codePointAt(i)
        score += c * Math.pow(10, -2 * i)
    }
    return score
}
//charPointScore('AZ')
//charPointScore('AZz')
module.exports.mapfilter = mapfilter
module.exports.multiSort = multiSort
module.exports.rigidCompareFactory = rigidCompareFactory
module.exports.getSecondWord = getSecondWord
//console.log(shortLong(3,1))
//console.log(range(1,4))
//value = mreplace(/^ *hi$/m, 'abc\nhi\nb')
//console.log('b' - 'a')
//console.log(splitSpellcheck('  b c a', {a:1, b:2, c:3}))

//console.log(stringify({a:1, b:2, c:3} ))

//food = new Storage()
//bood = new Storage()
//food.add('k', 's')
//food.add('k', bood)
//bood.add(food)
//console.log(stringify({a: {a:[test], b:2, c:food}, b:2, c:3}))
// doc recursive json stringing
//console.log(functionStringBirth(new Storage()))
//console.log({a:1}.constructor.name)
//console.log(new Storage().constructor.name)
//seeInfo(Promise)

function isStringClass(s) {
    return test(/^class/, s)
}

function isStringFunction(s) {
    return test(
        /^(?:async )?(?:.*?=>|function|class|\w+\(.*?{)/,
        s
    )
}

function isStringObjectFunction(s) {
    return test(/^(?:async )?\w+\(.*?{/, s)
}
function isStringLambdaFunction(s) {
    return test(/^(?:async )?.*?=>/, s)
}

function functionStringRevive(k, v) {
    if (isStringFunction(v)) {
        return bringFunctionToLife(v)
    }
    return v
}

//class Foo {
//constructor() {
//}
//s() {
//console.log('hi')
//}
//}
//x=functionStringBirth({
//v: Foo.toString(),
//async de() {
//await sleep(1000)
//return 'b'
//},
//ce: async x => 'hi',
//})

//console.log(x)
//s = JSON.parse(x)
//g=new s.v()
//console.log(g.s())
//t=functionStringBirth(s)
//console.log(s)
//console.log(t)
//async function foo() {
//v=await s.ce()
//console.log(v)
//}
//foo()

//x= {
//a: [(x) => (y) => console.log(x, y)]
//}
//console.log(x)
//y=functionStringBirth(x)
//z=JSON.parse(y, functionStringRevive)
//console.log(z)
//z.a(1)(2)

function magicComplete(line, upline, state) {
    let baseWords = line.match(/\w+/g)
    // ways to map the state
    // calenderTracker

    function ifMagic(args, line, upline) {
        let words = upline.match(/\w+/g)
        let targets = args.map((x) => words[x - 1])

        // count the targets
        return pairs.map((item, i) => {
            let value = dreplace(upline, [targets, item])
            return value
        })
    }
    const ref = {
        if: ifMagic,
        ef: ifMagic,
    }

    upline = "if (key == 'a') left = 1"
    line = 'w up d right s down Escape escape Enter enter'
    magicArgs = '$3 $4'
    let words = upline.match(/\w+/g)
    if (!words) return
    let runner = ref[words[0]]
    let value = runner(magicArgs, line, upline)
    console.log(words)
    // sprawl to the upline
    // return
}

//console.log(getLongest({a:'xxx', b: 'vv'}))
//magicComplete()


//const x = {
//a() {
//x.depth += 1
//this.depth -= 1
//return x
//},
//depth: 0
//}
//console.log(x.a().a().a())

class InfiniteStorage {
    ccumulative(ref, key, value) {
        const current = ref[key]
        if (isArray(current)) {
            ref[key] = push(current, value, 1)
        } else if (current !== value)
            ref[key] = [current, value]
    }
    set(...keys) {
        let ref = this
        for (let i = 0; i < keys.length - 1; i++) {
            let key = keys[i]
            if (i == keys.length - 2) {
                if (
                    this.cumulative &&
                    ref.hasOwnProperty(key)
                ) {
                    this.cumulative(ref, key, keys[i + 1])
                } else {
                    ref[key] = keys[i + 1]
                }
                break
            }

            if (!ref.hasOwnProperty(key)) {
                ref[key] = {}
            }

            if (isObject(ref[key])) {
                ref = ref[key]
            }
        }
    }
}

//z=new InfiniteStorage()
//z.set('a')
//z.set('a', 'b', 'c')
//z.set('a', 'b', 'd')
//z.set('a', 'b', 'e')
//z.set('b', 'b', 'b')
//console.log(z.a.b)
//z.set('a', 'b', 'd')
//console.log(z.a.b)

//const x = {
//x() {
//const value = Math.random() > 0.99 ? 1 : x
//if (value == x) {
//return x.x()
//} else {
//return value
//}
//}
//}
//console.log(x.x())
//after running this function 100 times, what is the probability of returning a value of 1?

//console.log(countParameters('(x) => hi'))
//s='(x) => "HI"'
//console.log(bringToLife(s)())

//console.log(rigidSort(['z', 'b', 'c', 'd', 'e'], ['b', 'd']))

//console.log(/\n/.toString().includes('\\n'))
//console.log(test(RegExp('\\n'), '\n'))

function getParenOffset(s) {
    const value = search(/[\'\"\)}\]]*$/, s)
    return (value && value.length) || 0
}
//console.log(getParenOffset('foo" ")))'))
module.exports.isObject = isObject
module.exports.isObjectLiteral = isObjectLiteral
module.exports.conditional = conditional

//console.log(walk(new Storage, console.log))
//console.log(walk(new Storage, puppetVisitor))

//x=['a', 'b', 'c', 'd', 'e']
//console.log(modularIncrement(x, 'a', -1))


//args = "A"
//console.log(walk(args, puppetVisitor))
//the depth is improtant

nestedobj = {a:1, b:2, c: {a:1, b:22, D:{a:1, b:2, ccc:33} }}

function walker(value, depth, key) {
    return key + "HI"
}
function objectWalk(o) {
    let lastKeys = []

    function runner(x) {
        for (let [k, v] of Object.entries(x)) {
            if (isObject(v)) {
                lastKeys.push(k)
                runner(v)
            }
            else {
                //console.log(...lastKeys)
                //store.push(lastKeys.concat(v).join('-'))
            }
        }
    }
    runner(o)
}
//objectWalk(nestedobj)


//const a = {
    //b, c, d, e, f
//}
//const b = 1
//let   c = 1
//var   d = 1
//function e() {
    //return
//}
// playing with variable scope
// testpoint


function visitor() {
    
}
    //console.log(readableProperties(new Storage()))
    //console.log(Object.entries(new Storage))
//console.log(puppetVisitorDeep(new Storage))

//console.log(Math.max(2, 3))

function jshintErrorInfo(s) {
    return jshint(s).errors.slice(0, -1).filter((x) => {
        return x.code.startsWith('E')
    }).map((item, i) => {
        return {
            line: item.line,
            ch: item.character,
            reason: item.reason,
            code: item.code,
            evidence: item.evidence
        }
    })
}
function evaluate(s) {
    try {
        const success = eval(s) || true
        return { success }
    } catch(e) {
        console.log(e.stack)
        const error = getErrorInfo(e) || prettierErrorInfo(s) || jshintErrorInfo(s)
        return { error }
    }
}

s = `  console.log(' bye)`
//console.log(evaluate(s))


//x = {
    //a: ['a', 'b', 'c', 'd', 'e']
//}
//pop(x.a, 'a')
//pop(x.a, 'b')
//console.log(x)


//x = {
    //a: ['a', 'b', 'c']
    //d: 'e'
//}
//console.log(mergeOnTop(x, {a: ['c', 'd', 'e'], d: 'f'}))
//ex merge
//
//
//
//


//promises
//function promiser(value, i) {
    //let delay = 1000
    //return new Promise((resolve) => {
        //setTimeout(() => resolve(value), delay)
    //})
//}
//const promises = [1,2,3].map(promiser)
//Promise.all(promises).then(console.log)

function surpassFunction(fn, gn) {
    return (...args) => {
        if (gn(...args)) return 
        fn(...args)
    }
}
function wrapFactory(before, after) {
    if (!after) after = before
    return function lambda(fn) {
        if (isAsync(fn)) {
            return async function lambda(...args) {
                const beforeValue = before()
                console.log('before', beforeValue)
                const value = await fn(...args)
                const afterValue = after()
                console.log('after', afterValue)
                return value
            }
        }
        else {
            return function lambda(...args) {
                before()
                const value = fn(...args)
                after()
                return value
            }
        }
    }
}


//console.log(timestamp(new Date("2011-06-20T11:34:15Z")))


//console.log = display
//an async clock listener
//async function fo() {
//const value = await Clock.input((count) => {
    //if (count == 3) return 'xxx'
//})
//return value
//}
//wrapFactory(timestamp)(fo)().then(console.log)


//console.log(typist("cm a spc"))



module.exports.announceError = announceError

//console.log(fuzzyMatch('c', ['abDe', 'ade.a.b', 'c', 'd', 'ae']))

function codeWords(s) {
    let words = s.match(/[a-zA-Z][\w.]{6,}/g)
    if (!words) return 
    let ignore = ['function']
    words = unique(words, ignore)
    return words
}

function bigWords(s) {
    return unique(findall(/[\w.]{10,}/g, s))
}
function onFirst(fn) {
    if (isFunction(fn)) {
        return function lambda(k, v) {
            return fn(k)
        }
    }
    if (isArray(fn)) {
        return fn[0]
    }
}

function onlyFirst(fn) {
    return (x, i) => i == 0 ? fn(x) : x
}


function onlySecond(fn) {
    return (x, i) => i == 1 ? fn(x) : x
}

function onSecond(fn) {
    if (isFunction(fn)) {
        return function lambda(k, v) {
            return fn(k)
        }
    }
    if (isArray(fn)) {
        return fn[1]
    }
}


function getLongestDollar(s) {
    return getLongest((s.match(/\$\d+/g)||[]).map((item, i) => {
        return Number(item.slice(1))
    }))
}
//console.log(modularIncrement(['a', 'b', 'c', 'd', 'e'], 'b'))
//
//


function forRunner(name, singles, doubles) {
    let output = ''
    let child = forIterationArg(name)
    output += `<ul class="${name}-container">`
    output += newlineIndent('hi')
    output += '<ul>'
    return output
}

function doubleReplace(s, regex, childRegex, fn) {
    //console.log(childRegex)
    return s.replace(regex, (_, x, offset) => {
        return _.replace(x, x.replace(childRegex, fn)).replace(/  +/g, ' ')
    })
}
function htmlLineFix(s) {
    // to have an original ref
    //
    function fixer(s, lineRef) {
        if (test(/=/, s)) {
            let [a,b] = s.split(/ *= */)
            return (vmap[a] || a) + `="${b}"`
        }
        throw 'not done yet'
    }
    return doubleReplace(s, /<\w+ (.*?)>/, /\w+ *= *\w+/g, fixer)
    ///\w+ *= *\w+| \w+(?= \w)|^\w+(?= \w)|\w+$/g, fixer)
}
function htmlLineParser(s, asVue = 1) {
    let ref = {
        t: '<transition name="fade" mode="out-in">\n\t$c\n</transition>',
        tg: '<transition-group name="fade" mode="out-in" tag="span">\n\t$c\n</transition-group>'
    }

    if (/^\w\S+$/.test(s)) {
        if (s == 'div') {
            return buildCloser2('div')
        }
        if (s in ref) return ref[s]
        const className = toDashCase(s.replace(/[^\w-]+/g, ''))
        let text = asVue ? vueText(s) : s 
        return buildCloser2('div', {className}, text)
    }

    let iter = new Iter(split(s, ' '))
    let tag = 'div'
    let id = ''
    let text = ''
    let classNames = []
    let dataAttributes = []

    while (iter.next()) {
        let value = iter.value
        if (iter.index == 1) {
            if (HTMLTAGS.includes(value)) {
                tag = value
            }

            else if (value.startsWith('.')) {
                classNames.push(value.slice(1))
            }
            else if (value.startsWith('#')) {
                tag = value.slice(1)
            }

            else if (looksLikeComponent(value)) {
                tag = value
            }
        }
        else if (value.startsWith('.')) {
            classNames.push(value.slice(1))
        }
        else if (value.startsWith('#')) {
            id = value.slice(1)
        }

        else if (test(/^[@:]/, value)) {
            let items = [value[0], value.slice(1)]
            //console.log(items); throw "";
            dataAttributes.push(vueHelper(...items))
            //console.log(dataAttributes); throw ''
        }

        else if (value.includes('=')) {
            let items = split(value, '=')
            dataAttributes.push(vueHelper(...items))
        }
        else if (value in ref) {
            const args = [classNames[0]]
            ref[value](...args)
        }
        else {
            text = iter.items.slice(iter.index - 1).join(' ')
            if (!text.includes(' ') && asVue) {
                text = vueText(text)
            }
            break
        }
    }

    const attrs = {
        classNames,
        dataAttributes,
        id,
    }

    return buildCloser2(tag, attrs, text)
}

function vueLineParser2(s) {

    if (/^\w\S+$/.test(s)) {
        const className = s.replace(/[^\w-]/g, '')
        return buildCloser2('div', {className}, vueText(s))
    }

    let items = match(/(\S+?) *= *(\S+)|([\w-]+)/g, s)
        .map((x) => smallify(x.filter((x) => x)))

    let iter = new Iter(items)
    let ref = {}
    let tag = 'div'
    let id = ''
    let text = ''
    let classNames = []
    let dataAttributes = []

    while (iter.next()) {
        let value = iter.value
        if (iter.index == 1 && HTMLTAGS.includes(value)) {
            tag = value
        }
        else if (value.startsWith('.')) {
            classNames.push(value.slice(1))
        }
        else if (value.startsWith('#')) {
            id = value.slice(1)
        }

        else if (value.includes('=')) {
            let [a,b] = split(value, '=')
            dataAttributes.push(`data-${a}="${b}"`)
        }
        else if (value in ref) {
            const args = [classNames[0]]
            ref[value](...args)
        }
        else {
            text = iter.items.slice(iter.index - 1).join(' ')
            break
        }
    }

    const attrs = {
        classNames,
        dataAttributes,
        id,
    }

    return buildCloser2(tag, attrs, text)
}
function buildCloser2(tag, attrs, text) {
    //console.log(arguments)
    const A = toOpeningTag2(tag, attrs)
    const B = toClosingTag(tag)
    if (text || looksLikeComponent(tag)) {
        return A + text + B + '\n$c'
    } else {
        return A + TABINPUT + B
    }
}
function toOpeningTag2(tag, attrs) {
    let s = ''
    let spaces = ' '
    for (let [k, v] of Object.entries(attrs || {})) {
        if (!exists(v)) {
            continue
        }
        s += spaces
        if (k == 'classNames') {
          s += attrEntry('class', v.join(' '))
        }
        else if (k == 'class' || k == 'className') {
          if (/^[A-Z]/.test(v)) {
              v = toDashCase(v)
          }
          s += attrEntry('class', v)
        }

        else if (k == 'dataAttributes') {
            s += v.join(' ')
        }
        else {
            s += attrEntry(k, v)
        }
    }

    //if (s) {
        //s = ' ' + s
    //}

    const suffix = hasHtmlSuffix(tag) ? '>' : '/>'
    return '<' + tag + s + suffix
}
function vueLineParser(s) {
    if (test(/^v\w+$/, s)) {
        const target = s.slice(1)
        return `<div class=${target}>{{${target}}}</div>`
    }

    let [line, text] = /\[/.test(s) ?
        mreplace(/\[(.*?)\]/, s) :
        /v \w/.test(s) ? 
        s.split(/ *v +/).map(onlySecond(vueText)) : 
        /\|/.test(s) ?
        s.split(/ *\| */) :
        [s, '']

    //console.log([line, text])
    let [singles, doubles] = getSingleAndDoubleAttrs(line)
    let first = singles.shift()
    let [item, symbol] = mreplace(/^[.!@#]/, first)

    let className = ''
    let tag = 'div'
    let isClosing = false
    let isComponent = false
    let attrs = []
    let originalItem = item
    let isFor = false
 
    if (isStandardHtml(item)) {
        tag = item
        for (let i = 0; i < singles.length; i++) {
            let single = singles[i]
            if (single.startsWith('.')) {
                className += ' ' + single.slice(1)
            } else {
                text = singles.slice(i).join(' ')
                singles = []
                break
            }
        }
    }

    else if (item == 'for') {
        isFor = true
        className = singles.shift()
    } else if (symbol == '#' || item.includes('-')) {
        //tag = item + '-component'
        className = item
        tag = item
        isComponent = true
    } else if (symbol == '.') {
        className = item
    }
    else if (test(/^\w+\.\w+$/, item)) {
        className = toDashCase(item)
        text = vueText(item)
    } else if (item) {
        className = item
    }
    for (let [attr, val] of doubles) {
        if (attr == 'html') {
            attrs.push(vueHelper(attr, val))
            isClosing = true
            continue
        }
        if (attr == 'class') {
            if (!className.includes(val)) className += ' ' + val
            continue
        }

        if (attr.startsWith(':')) {
            attrs.push([attr, val])
            continue
        }

        if (attr == 'key') {
            attrs.push([':key', val])
            continue
        }

        if (attr == 'show') {
            if (!test(/^(show|is)/, val) && !val.includes('.')) {
                val = 'show' + capitalize(val)
            }
            attrs.push(['v-show', val])
            continue
        }

        if (attr == 'for') {
            const b = depluralize(val)
            const c = pluralize(val)
            const stuff = `(${b}, index) in ${c}`

            if (isComponent) {
                attrs.push([':' + b, b])

                if (!attrs.find((x) => x[0] == ':key')) {
                    attrs.push([':key', 'index'])
                }
            }

            attrs.push(['v-for', stuff])
            continue
        }
        if (attr.startsWith('v')) {
            attr = attr.replace(/^v(?=\w)/, 'v-')
            attrs.push([attr, val])
            continue
        }

        if (vmap[attr]) {
            attr = vmap[attr]
            attrs.push([attr, val])
            continue
        }

        if (true) {
            attr = ':' + attr
            attrs.push([attr, val])
            continue
        }
    }

    for (let attr of singles) {
        if (attr in knownAttrs) {
            attrs.push(vueHelper(attr))
            continue
        }
        if (attr == 'html') {
            attrs.push(vueHelper(attr, originalItem))
            isClosing = true
            continue
        }

        if (attr == 'click') {
            attrs.push(vueHelper(attr, originalItem))
            continue
        }

        if (attr == 'vt' || attr == 'text' || attr == 'v') {
            if (text) text = vueText(text)
            else {
                text = vueText(originalItem)
            }
            tag = 'p'
            continue
        }

        if (attr.startsWith('@')) {
            if (attr == '@') {
                attrs.push([
                    '@' + toDashCase(originalItem),
                    toCamelCase('on' + capitalize(originalItem)),
                ])
                continue
            }

            let val = attr.slice(1)
            let value = toCamelCase(
                val.startsWith('on') ? val : 'on' + capitalize(val)
            )
            attrs.push(['@' + toDashCase(val), value])
            continue
        }
        if (attr.startsWith('.')) {
            let name = attr.slice(1)
            if (!className.includes(name)) className += ' ' + name
            continue
        }

        if (attr == 'style') {
            attrs.push([
                ':style',
                `computed${capitalize(originalItem)}Style`,
            ])
            continue
        }

        if (attr == 'show' || attr == 'if') {
            attrs.push(vueHelper(attr, originalItem))
            continue
        }

        if (attr == 'for') {
            const a = getFirstWord(originalItem.toLowerCase())
            const b = depluralize(a)
            const c = pluralize(a)
            const stuff = `(${b}, index) in ${c}`
            attrs.push(['v-for', stuff])
            continue
        }

        if (attr == 'ref') {
            attrs.push(['ref', toCamelCase(originalItem)])
            continue
        }

        if (attr.startsWith('v')) {
            attr = attr.replace(/^v(?=\w)/, 'v-')
            attrs.push([attr, getFirstWord(originalItem)])
            continue
        }

        if (attr) {
            if (test(/^:/, attr)) {
                console.log('dont do this')
                attrs.push([attr, attr.slice(1)])
            }
            else {
                attrs.push([':' + toDashCase(attr), attr])
            }
            continue
        }
    }

    if (className) {
        className = fixClassName(className)
        attrs.push(['class', className])
    }
    //if (isComponent) {
        //tag = className.match(/\S+/)[0]
    //}

    if (!isClosing) isClosing = !!(text || isComponent)
    sortHtmlAttrs(attrs)

    const args = [
        tag,
        attrs,
        text,
        isComponent,
        isClosing,
    ]

    //console.log(args)
    return buildCloser(...args)

}
function buildOpener(tag, attrs, text) {
    // needs to put a cursor into it. for where ur supposed to go next
}

function buildCloser( tag, attrs, text, isc, isClosing) {
    let withIndentedAttrs = attrs.length > 2 || isc
    let s = `<${tag}`

    if (!exists(attrs)) {
        s += '>'
        if (text) s += text
    } else if (withIndentedAttrs) {
        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i]
            if (isc) {
                if (i == 0) {
                    s += '\n'
                }
                let isLast = i == attrs.length - 1
                s += '   ' + attrEntry(attr, !isLast)
                continue
            }
            if (i == 0) {
                s += ' ' + attrEntry(attr, 1)
            } else {
                let isLast = i == attrs.length - 1
                s += '   ' + attrEntry(attr, !isLast)
            }
        }

        s += '>'
        if (text) s += newlineIndent(text, 3)
        else if (isc) s += '\n'

    } else {
        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i]
            s += ' ' + attrEntry(attr)
        }
        s += '>'
        s += text
    }

    //console.log(s, 'hi')
    if (!isClosing) s += '\n\t\n'
    s += toClosingTag(tag) + (isClosing ? '\n' : '')
    return s
}


function htmlbuildLine( tag, attrs, text, isc, isClosing) {
    let withIndentedAttrs = attrs.length > 2 || isc
    let s = `<${tag}`

    if (!exists(attrs)) {
        s += '>'
        if (text) s += text
    } else if (withIndentedAttrs) {
        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i]
            if (isc) {
                if (i == 0) {
                    s += '\n'
                }
                let isLast = i == attrs.length - 1
                s += '   ' + attrEntry(attr, !isLast)
                continue
            }
            if (i == 0) {
                s += ' ' + attrEntry(attr, 1)
            } else {
                let isLast = i == attrs.length - 1
                s += '   ' + attrEntry(attr, !isLast)
            }
        }

        s += '>'
        if (text) s += newlineIndent(text, 3)
        else if (isc) s += '\n'

    } else {
        for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i]
            s += ' ' + attrEntry(attr)
        }
        s += '>'
        s += text
    }

    //console.log(s, 'hi')
    if (!isClosing) s += '\n\t\n'
    s += toClosingTag(tag) + (isClosing ? '\n' : '')
    return s
}

function attrEntry(a, b, newline) {
    if (isArray(a)) {
        newline = b
        b = a[1]
        a = a[0]
    }
    return `${a}="${b}"${newline ? '\n': ''}`
}

module.exports.htmlLineParser = htmlLineParser

function toOpeningTag(el, attrs = '', force) {
    if (el == 'html') return '<!doctype html><html>'
    if (isString(attrs) && !attrs.includes('=')) {
        attrs = ' class=' + doublequote(attrs)
    } else if (isObject(attrs)) {
        attrs = reduceToString(attrs, (a, b) => {
            return b ? ` ${a}="${b}"` : a
        }, {delimiter: ' '})
    } else {
        attrs = ''
    }

    const suffix = hasHtmlSuffix(el, force) ? '>' : '/>'
    return '<' + el + attrs + suffix
}

function hasHtmlSuffix(el, force) {
    if (force) return true
    return closers.includes(el)
}

const closers = [
    'style',
    'p',
    'pre',
    'script',
    'body',
    'ul',
    'li',
    'p',
    'textarea',
    'button',
    'section',
    'div',
    'h1',
    'h2',
    'h3',
    'main',
    'blockquote',
    'span',
    'article',
    'body',
    'html',
    'head',
    'template',
    'h4',
    'h5',
    'h6',
]

function divify(tag, attrs = '', x = '') {
    if (!x) x = ''
    let s = toOpeningTag(tag, attrs)

    if (tag == 'input' || tag == 'hr') {
        
    }
    else if (
        isArray(x) ||
        (isString(x) && (hasNewline(x) || hasHtml(x)))
    ) {
        s += newlineIndent(x)
    } else {
        s += x
    }

    s += toClosingTag(tag)
    return s
}

function hasHtml(s) {
    return test(/<\/?[a-z\/]/, s)
}

function toClosingTag(el) {
    const noclosers = ['input', 'hr', 'br', 'link', 'img']
    if (noclosers.includes(el)) return ''
    if (looksLikeComponent(el)) return ''
    return '</' + el + '>'
}

function vueText(s) {
    return '{{' + toCamelCase(s) + '}}'
}

function fixClassName(s) {
    s = s.trim()
    if (!s || test(/[A-Z]/, s)) return s
    const items = [
        'post',
        'get',
        'split',
        'set',
        'is',
        'has',
        'create',
        'component',
    ]
    const regex = ncg('^(?:$1)(?!(?:-|$))', items)
    return replace(regex, '$&-', s, '')
}

s = `
  //#apple show=bi click=run :class=hi style=bi
  //apple show vt click = sam

//p .foo .zoo hey hows it going boo=moo boo=hii
//#apple .foo show .bg if :boo goo=boo
  
  //for items
  //grass html=foo
  //grass if
  //.boo
  //p .goo [okay]
  //title .goo v oka
  //<div  bb = nnn class="hi"></div>
  abc-car show=zo html=html

`
function testRunner(s, fn) {
    const value = linegetter(removeAllComments(s)).map(fn)
    if (value) console.log(value[0])
    return value
}

//console.log = display

//console.log([1,2].map(onlySecond((x) => x + 3)))
// working for smth ...
// i am working too ...
// to be tricked ... 
//


function assetObject(items, insideObject, lang = 'js') {
    const delimiter = insideObject ? ': ' : ' = '
    const ending = insideObject ? ',\n' : ''

    if (items.length == 1) {
        return `${insideObject ? '' : jspy(lang, 'const')}${items[0]}${delimiter}{\n\t\n}`
    }
    return (
        jspy(lang, 'const') + 
        items[0] + delimiter + 
        items.slice(1).reduce((acc, item, i) => {
            if (i % 2 == 0) acc += '    ' + toStringArgument(item)
            else {
                acc += ': ' + toStringArgument(item) + ',\n'
            }
            return acc
        }, '{\n') + '}' + ending
    )
}
function removeNumbers(s) {
    return s.replace(/\d/g, '')
}
function assetArray(items, lang = 'js') {
    /* insideObject can be done later */
    if (items.length == 1) {
        return `${jspy(lang, 'const')}${items[0]} = [\n\t\n]`
    }
    return (
        jspy(lang, 'const') + ' = ' + 
        items[0] + 
        wrap(items.slice(1).map(singlequote).join(', '), '[]')
    )
}

function unquote(s) {
    return s.slice(1, -1)
}
//console.log(opposite(true))

function lineDitto(template, args) {
    const key = search(/\w+(?= *=)/, template)
    const regex = key ? 
        (key.length > 2 ? key + '\\b' : `\\b${key}\\b`) :
        args.shift()

    const runner = (x) => {
        return replace(regex, x, template)
    }
    return args.map(runner).join('\n')
}
//console.log([lineDitto('abcfoo()', ['abc', 'bb'])])
//we arent children anymore.

function forToNumber(s) {
    if (isNumber(s)) {
        return s
    }
    return s + '.length'
}
//console.log(filterObject({a:1, b:2, c:3}, (k,v) => k < 'a'))
//console.log(test.toString().length)


//console.log(timestamp())
//console.log(alist.slice(0,2))


//x=['a', 'b', 'c', 'd', 'e','f','g','h','i','k'].slice(0, 5).map((item, i) => {
    //return {delay:250 * (1+i), key:item}
//})
//waterfall(x, console.log, console.log)
//console.log(splitKatex('8 + 8'))



function loremSimpleMathQuestion(a, b) {
    if (a == null) a = rng(1, 10)
    if (b == null) b = rng(1, 10)
    let question = `${a} * ${b}`
    let answer = eval(question)
    return { question, answer }
}

function loremMath(n = 1, mode) {
    return (mode == Array ? identity : smallify)(range(n).map(loremSimpleMathQuestion))
}
//console.log(loremMath(1))
//console.log(getProseWords('goo ba\'r c'))
//console.log(decimalToFraction('0.15'))

s = `
run=gun .hh #gb #hh .foo
`

function abbreviateObject(o) {
    return reduceObject(o, (k, v) => {
        return [abbreviate(k), v]   
    })
}

//console.log(rainbow(1))
//console.log(Number(-0.2))
//
//color = -23
//const colors = rainbow(Number(color))
//console.log(colors)
//console.log(divify('pre', '', 'hi\nbye'))
//toStringArgument(2)
//console.log(toStringArgument('3'))
//console.log(lineDitto('vv d 1 2', [1, 2]))
module.exports.countParameters = countParameters
        //console.log(partition(gatherArgs('prosemirror-setup.js', 'prosemirror.js, prosemirror.css')))

        //console.log(htmlLineParser('acorn-item @submit ref=tom if=hi show=boo v-john=hi v-bind=go style=howdy'))
        //console.log(htmlLineParser('.vv-bbD @submit ref=bb '))


//console.log(findall('(a)(b)', 'vab'))
//let [vb, vn, vh] = []
//console.log([vb])

module.exports.createVariable = createVariable
module.exports.repf = repf
//v=new Storage()
//v.add('v', 'b', 'h')
//console.log(v)
//console.log(spaceToCamel('21'))
//x = {}
        //console.log(addNestedProperty(x, 'a', test))
        //console.log(addNestedProperty(x, 'a', 'c', sayhi))
module.exports.conditional = conditional
module.exports.addNestedProperty = addNestedProperty

function extractConfig(s) {
    let [a,b] = mreplace(/(\w+) *= *(\w+)/g, s)
    if (b) {
       b = reduce(b) 
    }
    return [a,b]
}
function Factory(fn, ...args) {
    if (args.includes(null)) {
        let [a,b] = partition(args, isNull)
        return function lambda(s) {
            return fn(...a, s, ...b)
        }
    }
    return function lambda(s) {
        return fn(...args, s)
    }
}
    //console.log(coerceTo('gg'))
module.exports.getParamInfo = getParamInfo
module.exports.coerceTo = coerceTo
//console.log(spanify('howdy pivnurt"s'))
//spanify('sup')
//console.log(spanify('sup'))


// 05-17-2022 tile-match.js

function generateTiles() {
s = `

    2 3
    2 4
    1 7

    3 4
    2 8
    4 6

    3 6
    4 4
    5 5
`

    let numbers = 
        split(smartDedent(s), /\n\n+/).map((x) => findall(/(\d+) (\d+)/g, x))
    numbers = walk(numbers, toNumber)
    //console.log(numbers)
//loremSimpleMathQuestion
    //console.log(tileItUp(numbers[0]))
    return tileItUp(numbers[0])
    
}
function tileItUp(numbers) {
    return flat(numbers.map((x) => parser(...x)))

function parser(a, b) {
    const base = mathProduct('1' + String(a) , '1' + String(b))
    const sum = mathSum(a, b)
    const product = mathProduct(a, b)
    let tiles = []
    function push(value, type) {
        let id = base.answer
        tiles.push( {
            value, id, type
        })
    }
    const addColor = exporter(MathColors, 'color')
    push(addColor(base.question), 'question')
    push(addColor(base.answer), 'answer')
    push([addColor(sum.expression), addColor(product.expression)], 'setup')
    return tiles 
    return {
        question: base.question,
        answer: base.answer, 
        setup: [sum.expression, product.expression]
    }
    /* separating the data-layer from the presentation-layer */
}
}
const mathSum = mathFactory('+')
const mathProduct = mathFactory('*')

function mathEval(s) {
    s = s.replace(/ = $/, '')
    s = s.replace(/\\(?:cdot|times)/, '*')
    return eval(s)
}
function mathFactory(operator, colors) {
    if (operator == '*') {
        operator = '\\cdot'
        operator = '\\times'
    }
    let equalSign = ' = '
    return function lambda(a, b) {
        const question = `${a} ${operator} ${b}${equalSign}`
        const answer = mathEval(question)
        const expression = `${addEqualSign(question)}${answer}`
        return {question, answer, expression}
    }
}



//11 12 13 14 15
//21 22 23 24 25
function generateNumbers({
   start = 1,
   end = 9,   
   condition = identity,
} = {}) {
    condition = fastFunction(condition)
    const store = []
    for (let i = start; i <= end; i++) {
        for (let j = i; j <= end; j++) {
            if (condition(i, j)) {
                store.push([i, j])
            }
        }
    }
    return store
}
function mathConditionFromString(s) {
    if (isFunction(s)) {
        return s
    }

    return fastFunction(s)
}
function match(regex, s) {
    let match
    if (regex.flags.includes('g')) {
        let store = []
        while (match = regex.exec(s)) {
            let value = matchGetter(match)
            store.push(value)
        }
        return store
    } else {
        match = s.match(regex)
        return matchGetter(match)
    }

    function matchGetter(match) {
        return !match
            ? null
            : match.length == 1
            ? match[0]
            : match.length == 2
            ? match[1] || match[0]
            : match.slice(1)
    }
}
function fastFunction(s) {
    let variables = unique(match(/\b[abcdexyzin]\b/g, s))
    const dict = {
        'and': '&&',
        'or': '||',
    }
    s = dreplace(s, dict)
    let fnCode = `(${variables.join(', ')}) => ${s}`
    return bringToLife(fnCode)
}
    //console.log(generateNumbers({
        //condition: 'a + b < 10 and a * b < 10 and a > 1'
    //}))




s = `
Sometimes, you will have to carry a number over.
To enjoy reading.
creating education games
why did i let this happen

`



class TileMatch {
    constructor(tiles) {
        this.load(tiles)
    }

    load(tiles) {
        if (!tiles) { return }
        //this.tiles = shuffle(tiles)

        this.tiles = tiles.map((x) => {
            return {
                /* type, value, id */
                ...x,
                active: false,
                done: false,
                rotation: 0,
                style: {
                    background: 'white',
                    color: 'black',
                },
            }
        })

        this.matchLength = this.filterById(tiles[0].id).length
        const n = Math.ceil(tiles.length / this.matchLength)
        this.styles = generateStyles(n)
        return this.tiles
    }

    filterById(id, match = true) {
        return this.tiles.filter((x) => {
            return match ? x.id == id : x.id != id
        })
    }

    click(index) {
        let tile = this.tiles[index]
        if (tile.done) {
            return 
        }

        tile.rotation += tile.active ? 1 : -1

        if (tile.active) {
            tile.active = false
            return 
        }

        tile.active = true
        const possibles = this.filterById(tile.id)

        if (possibles.every((x) => x.active)) {
            const style = this.styles.pop()
            possibles.forEach((x) => {
                x.done = true
                x.style = style
            })
            return true
        }
    }
}


//tm = new TileMatch()
//tm.load(generateTiles())
//console.log(tm.click(0))
//console.log(tm.click(0))
//console.log(tm.click(0))
//console.log(tm.click(1))
//console.log(tm.click(2))

// 05-17-2022 robot
//
class Robot {
    constructor() {
    }
    walk() {
        
    }
    speak(s) {
        // using an image bit-map
        // is how to do it
        // to make it funny
        // to have no one to align with
        // to meet people
        // to recruit
        // people who you vibe with?
        // smarts are not everything
        // smaller colleges
        // those with a chip
    }
}
function generateStyles(n) {
    //const backgrounds = Object.values(tailwind)
    const backgrounds = roygbiv
    let color = 'white'
    return range(n).map((item, i) => {
        return {
            color: color,
            background: backgrounds.pop()
        }
    })
}


// 05-18-2022 



// give leeway.
// mistakes of discipline
//
//console.log(infuseKatexColors('x^2 + 3', {2: 'red'}))

class MathColors {
    constructor() {
        this.colors = rainbow()
        this.ref = {}
    }
    export(s, creator) {
        s = toLatex(s)
        s = infuseKatexColors(s, this.ref)
    }

}

class EquationDisplay {
    load(equation, ref, colors) {
        this.template = this.cache.get(equation, () => nerdamer.convertToLaTeX(equationLibrary[equation]))
        this.colors = colors
        if (colors) {
            this.template = infuseKatexColors(this.template, colors)
        }
        this.ref = ref
    }
    constructor() {
        this.cache = new Cache()
        const equationLibrary = {
            'circle': '(x - h)^2 + (y - k)^2 = r^2',
            '1213': '1a * 1b = 1cd',
        }
    }
    toKatex() {
        let template = infuseVariables(this.template, this.ref)
        console.log(template)
        return template
    }
    color(s) {
    }
}

//console.log(randomColor())
//console.log(opposite(true))
//console.log(divify('div', {a:1}, 'hi'))
//console.log(latexTemplater('22 + 3 + 22 2', [(x) => 'hi' + x, 'xx']))
//console.log(latexTemplater('22 + 3 + 22 2', {22: 'foo'}))
module.exports.latexTemplater = latexTemplater
//console.log(253 == "253")
        //console.log(htmlLineParser('date-expr'))
        //console.log(toDashCase('date-expr'))
//console.log(datePhrase())
//console.log(htmlLineParser('div'))
module.exports.lineFilter = lineFilter
//console.log("1" + 2)
function katexAttributer(a, b, c) {
    return `\\${a}{${b}}{${c}}`
}

function parser(a, b, colorA, colorB) {
    const cA = (x) => katexAttributer('textcolor', colorA, x)
    const cB = (x) => katexAttributer('textcolor', colorB, x)
    const creator = (x, args) => latexTemplater(x.question, args)
    let topArgs = [null, cA, null, cB]
    let botArgs = [cA, cB]

    const base = mathProduct('1' + a , '1' + b)
    const sum = mathSum(a, b)
    const product = mathProduct(a, b)
    //console.log(base, sum, product)
    let top = creator(base, topArgs)
    let q1 = creator(sum, botArgs)
    console.log(q1)
    let q2 = creator(product, botArgs)
    console.log(q2)
}

//console.log(parser(2, 3, 'red', 'blue'))

function rungen(Generator, ...args) {
    let x = new Generator(...args)
    const value = x.generate()
    console.log(value)
    return value
}

function katexColorer(x, color) {
    return katexAttributer('textcolor', color, x)
}
function addColors(s, ...colors) {
    return latexTemplater(s, colors)
}
//
//const addEqualSign = conditional(addf(' = '), /[^\s=] *$/)
//rungen(MathDrill)
module.exports.intersects = intersects

// Math Warmup

