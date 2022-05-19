
function coinflip(n = 0.5) {
    return Math.random() > 1 - n
}

function hasMultipleVariables(s) {
    return count(/\b[abcde]\b/g, s) > 1
}

function getNumbers(s) {
    const regex = /-?\d+\.?\d*/g
    const match = s.match(regex)
    return match ? match.map(Number) : []
}

function allEqual(arr) {
    return arr.every(x => x == arr[0])
}

function hasEquals(s) {
    return test(/=/, s)
}

function hasVariableX(s) {
    return test(/x/, s)
}

function hasNaN(s) {
    return s.toString().includes('NaN')
}

function isPositive(n) {
    return n > 0
}
function isInteger(n) {
    return Number.isInteger(n)
}
function isNiceAnswer(n) {
    return n > 0 && isInteger(n) && n <= 10
}

function hasTerminatingDecimal(s) {
    return len(s) < 6 || isRepeatingDecimal(s)
}

function getPrimeFactors(n) {
    return getFactors(n).filter(isPrime)
}

function getDigitsFromString(x) {
    return String(x).split('').map(Number)
}

function notPrime(n) {
    return !isPrime(n)
}

function power10(n) {
    return Math.pow(10, n)
}

function getDecimalLength(n) {
    return search(/\.(.+)/, n).length || 0
}

function getOperators(s) {
    return s.match(/[\+\-\*]/g)
}

function hasMathOperator(x) {
    return test(/[^*+-]/, x)
}

function isNegativeAnswer(s) {
    return String(s).trim().startsWith('-')
}

function isLatexOperator(s) {
    const r = /[\+\-\*]/
    return test(r, s)
}

function isLatexFraction(s) {
    return test('frac', s)
}

function isLatexExponent(s) {
    return /^\w+\^/.test(s)
}

function simplifyRatio(a,b) {
    let g = gcd(a,b)
    return [a,b].map(x => x/g)
}

function hasDecimal(x, n = 0) {
    return test('\\.' + '\\d'.repeat(n), String(x))
}

function isSquare(x) {
    return !hasDecimal(Math.sqrt(x))
}

function isCube(x) {
    return !hasDecimal(Math.cbrt(x))
}

function toPercentage(a, b) {
    return (100 * (a/b).toFixed(2)) + '%'
}

function fractionToPercent(a, b) {
    return (100 * (a/b).toFixed(2)) + '%'
}

function getVariables(s) {
    return s.match(/[a-z]/g)
}

function hasVariable(s) {
    return test(/\b[abcde]\b/, s)
}

function isTerminating(a, b) {
    if (isPrime(b)) return false
    return true
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function countDecimalPlaces(n) {
    return (n.toString().split('.')[1] || '').length
}

function divmod(n, d) {
    return [ Math.floor (n / d), Math.floor (n % d) ]
}

function toRatio(a, b) {
    return simplifyRatio(a,b).join(':')
}

function isPercentage(s) {
    return s.toString().endsWith('%')
}

function isRepeatingDecimal(s) {
    s = s.toString()
    if (!s.includes('.')) return 
    const decimal = s.split('.')[1]
    return allEqual(split(decimal.slice(4)))
}

function getFactors(number) {
    const factors = [];
    for (var i = 1; i <= number; i++) {
        if (number % i == 0) {
           factors.push(i)
        }
    }

    return factors
}
function addMathComma(x) {
    // node-only
    const regex = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    return x.toString().replace(regex, ",");
    //const regex = /\B(?=(\d{3})+(?!\d))/g
}

function gcd(a, b, ...args) {
    if (args.length > 0) {
        return [a, b, ...args].reduce((acc, item) => gcd(acc, item))
    }
    if (a == 0)
        return b;

    while (b != 0) {
        if (a > b)
            a = a - b;
        else {
            b = b - a;
        }
    }
    return a;
}


function removeDecimals(n, amount = 0) {
    return n.toString().replace(/\.\d+/, (x) => {
        if (amount) return '.' + Math.round(x.slice(1, 1 + amount))
        return ''
    })
}


function roundToNearestTen(n, boundary = 10) {
    return Math.round(n / boundary) * boundary
}

function roundToLowestTen(n) {
    if (n < 10) {
        return 0
    }

    if (n < 100) {
        return 10
    }

    if (n < 1000) {
        return 100
    }
}



function roundToNearest(n, boundary = 10) {
    return Math.ceil(n / boundary) * boundary
}


function isPrime(n) {
    for(let i = 2, s = Math.sqrt(n); i <= s; i++) {
        if(n % i === 0) return false;
    }
    return n > 1;
}


function simplifyFraction(a, b) {
    if (!b) [a, b] = a.split('/')

    if (hasDecimal(a)) {
        let factor = Math.pow(10, countDecimalPlaces(a))
        a *= factor
        b *= factor
    }
    if (hasDecimal(b)) {
        let factor = Math.pow(10, countDecimalPlaces(b))
        a *= factor
        b *= factor
    }

    const g = gcd(a, b)
    const p = [a, b].map((x) => x / g).join('/')
    return p
}

function randomlyAddZeroes(n, decimals = 1) {
    let [a, b] = [0, decimals]
    let r = coinflip(0.5)
    if (r > 0.67) return n + '0'.repeat(rng(a, b))
    if (r > 0.33) return '0.' + '0'.repeat(rng(a, b)) + n
    return n.toString().replace(/\d\d/, (x) => x[0] + '.' + x[1])
}



function isEquation(s) {
    return test(/=/, s)
}

class Calculation {
    constructor() {
        this._symbols = {}
        this.defineOperator('!', this.factorial, 'postfix', 6)
        this.defineOperator('^', Math.pow, 'infix', 5, true)
        this.defineOperator('*', this.multiplication, 'infix', 4)
        this.defineOperator('/', this.division, 'infix', 4)
        this.defineOperator('+', this.last, 'prefix', 3)
        this.defineOperator('-', this.negation, 'prefix', 3)
        this.defineOperator('+', this.addition, 'infix', 2)
        this.defineOperator('-', this.subtraction, 'infix', 2)
        this.defineOperator(',', Array.of, 'infix', 1)
        this.defineOperator('(', this.last, 'prefix')
        this.defineOperator(')', null, 'postfix')
        this.defineOperator('min', Math.min)
        this.defineOperator('sqrt', Math.sqrt)
    }
    // Method allowing to extend an instance with more operators and functions:
    defineOperator(
        symbol,
        f,
        notation = 'func',
        precedence = 0,
        rightToLeft = false
    ) {
        // Store operators keyed by their symbol/name. Some symbols may represent
        // different usages: e.g. "-" can be unary or binary, so they are also
        // keyed by their notation (prefix, infix, postfix, func):
        if (notation === 'func') precedence = 0
        this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
            [notation]: {
                symbol,
                f,
                notation,
                precedence,
                rightToLeft,
                argCount: 1 + (notation === 'infix'),
            },
            symbol,
            regSymbol:
                symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') +
                (/\w$/.test(symbol) ? '\\b' : ''), // add a break if it's a name
        })
    }
    last(...a) {
        return a[a.length - 1]
    }
    negation(a) {
        return -a
    }
    addition(a, b) {
        return a + b
    }
    subtraction(a, b) {
        return a - b
    }
    multiplication(a, b) {
        return a * b
    }
    division(a, b) {
        return a / b
    }
    factorial(a) {
        if (a % 1 || !(+a >= 0)) return NaN
        if (a > 170) return Infinity
        let b = 1
        while (a > 1) b *= a--
        return b
    }
    static calc(s) {
        const calculator = new Calculation()
        return calculator.calculate(s)
    }

    static get(s) {
        const calculator = new Calculation()
        return calculator.calculate(s)
    }
    calculate(expression) {
        let match
        const values = [],
            operators = [this._symbols['('].prefix],
            exec = (_) => {
                let op = operators.pop()
                values.push(op.f(...[].concat(...values.splice(-op.argCount))))
                return op.precedence
            },
            error = (msg) => {
                let notation = match ? match.index : expression.length
                return `${msg} at ${notation}:\n${expression}\n${' '.repeat(
                    notation
                )}^`
            },
            pattern = new RegExp(
                // Pattern for numbers
                '\\d+(?:\\.\\d+)?|' +
                    // ...and patterns for individual operators/function names
                    Object.values(this._symbols)
                        // longer symbols should be listed first
                        .sort((a, b) => b.symbol.length - a.symbol.length)
                        .map((val) => val.regSymbol)
                        .join('|') +
                    '|(\\S)',
                'g'
            )
        let afterValue = false
        pattern.lastIndex = 0 // Reset regular expression object
        do {
            match = pattern.exec(expression)
            const [token, bad] = match || [')', undefined],
                notNumber = this._symbols[token],
                notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
                notAfterValue =
                    !notNumber || (!notNumber.postfix && !notNumber.infix)
            // Check for syntax errors:
            if (bad || (afterValue ? notAfterValue : notNewValue))
                return error('Syntax error')
            if (afterValue) {
                // We either have an infix or postfix operator (they should be mutually exclusive)
                const curr = notNumber.postfix || notNumber.infix
                do {
                    const prev = operators[operators.length - 1]
                    if (
                        (curr.precedence - prev.precedence ||
                            prev.rightToLeft) > 0
                    )
                        break
                    // Apply previous operator, since it has precedence over current one
                } while (exec()) // Exit loop after executing an opening parenthesis or function
                afterValue = curr.notation === 'postfix'
                if (curr.symbol !== ')') {
                    operators.push(curr)
                    // Postfix always has precedence over any operator that follows after it
                    if (afterValue) exec()
                }
            } else if (notNumber) {
                // prefix operator or function
                operators.push(notNumber.prefix || notNumber.func)
                if (notNumber.func) {
                    // Require an opening parenthesis
                    match = pattern.exec(expression)
                    if (!match || match[0] !== '(')
                        return error('Function needs parentheses')
                }
            } else {
                // number
                values.push(+token)
                afterValue = true
            }
        } while (match && operators.length)
        return operators.length
            ? error('Missing closing parenthesis')
            : match
            ? error('Too many closing parentheses')
            : values.pop() // All done!
    }
}




function reverseMathString(s) {
    const items = s.split(' ')
    items.reverse()
    return items.join(' ')
}


function mathTruncate(answer, degree) {
    s = answer.toString()
    let match = search(/(^.*?\.0+)(.+)/, s)
    if (match) {
        let [a, b] = match
        return a + b.slice(0, 2)
    }
    else {
        return isDecimal(answer) ? answer.toFixed(2).replace(/0+$/, '') : answer
    }
}


function addMultiplicationSigns(s) {
    return s.replace(/[abcd\d][abcxyz]/g, (x) => x[0] + '*' + x[1])
}


function fixFloatingPoint(number) {
    let flag = false
    function parser(x, offset, original) {
        if (original[offset - 1] != '.') {
            if (x.startsWith('9')) {
                flag = true
            }
        }
        return ''
    }
    let value = Number(String(number).replace(/[09]{8,}[\d]+/, parser).replace(/\.$/, ''))
    if (flag) value += 0.1
    if (value.toString().length > 8) {
        return mathTruncate(value)
        console.log(value)
        throw "too long fix  floating point didnt work"
    }
    return value
}

function addZeroes(n, amount) {
    return n * Math.pow(10, amount)
}

function isDecimal(x) {
   return /^-?\d*?\.\d+/.test(x.toString())
}


function combinate(arr, comboLength = 2) {
  const sourceLength = arr.length;
  if (comboLength > sourceLength) return [];

  const combos = []; // Stores valid combinations as they are generated.

  const makeNextCombos = (workingCombo, currentIndex, remainingCount) => {
    const oneAwayFromComboLength = remainingCount == 1;

    // For each element that remaines to be added to the working combination.
    for (let sourceIndex = currentIndex; sourceIndex < sourceLength; sourceIndex++) {
      // Get next (possibly partial) combination.
      const next = [ ...workingCombo, arr[sourceIndex] ];

      if (oneAwayFromComboLength) {
        // Combo of right length found, save it.
        combos.push(next);
      }
      else {
        // Otherwise go deeper to add more elements to the current partial combination.
        makeNextCombos(next, sourceIndex + 1, remainingCount - 1);
      }
        }
  }

  makeNextCombos([], 0, comboLength);
  return combos;
}




function permute(arr) {

    const store = []

    function runner(len) {
        if (len === 1) store.push(arr.slice(0))
        for (let i = 0; i < len; i++) {
            runner(len - 1)
            len % 2
                ? ([arr[0], arr[len - 1]] = [arr[len - 1], arr[0]])
                : ([arr[i], arr[len - 1]] = [arr[len - 1], arr[i]])
        }
    }

    runner(arr.length)
    return store
}


function distance(x1, y1, x2, y2) {
    if (arguments.length == 2) {
        ;[x2, y2] = y1
        ;[x1, y1] = x1
    }
    let y = x2 - x1;
    let x = y2 - y1;
    return roundToNiceNumber(Math.sqrt(x * x + y * y))
}

function roundToNiceNumber(n) {
    return hasDecimal(n) ? n.toFixed(2) : n
}



// hohoo


function xxdecimalToFraction(dec) {
    let epsilon = 1e-7
    dec = Number(dec)
    //console.log(dec)
    if (isInteger(dec)) return dec
    let flag = false
    if (dec >= 1) {
        flag = true
        dec /= 100
    }
    var is_neg = dec < 0;
    //console.log(Math.abs(-1))
    //throw ''
    
    if (dec < 0) dec *= -1
    //console.log(Math.abs(0.3333)); throw "";
    //console.log(dec)
    var done = false;
    var n1 = 0, d1 = 1, n = 1, d = 0, n = 0, q = dec;
    while (!done) {
        if (n++ > 50) {
            console.log('done forced')
            done = true;
        }

        var a = parseInt(q);
        //console.log(a)
        var num = n1 + a * n;
        var den = d1 + a * d;
        //console.log(num, den)
        if (num > 1000 || den > 1000) {
            num = n
            den = d
            break
        }
        var e = (q - a);
        if (e < epsilon) {
            done = true;
        }
        q = 1 / e;
        n1 = n;
        d1 = d;
        n = num;
        d = den;
        if (Math.abs(num / den - dec) < epsilon || n > 30) {
            done = true;
        }
    }
    console.log(n, 'count')

    if (flag) {
        console.log('sup')
        den /= 100
        if (hasDecimal(den)) {
            den *= 100
            num *= 100
            let g = gcd(den, num)
            den /= g
            num /= g
        }
    }
    let p = [(is_neg ? -num : num), den];
    console.log(p)
    //return toFraction(p)
}

function hasDecimal(x, n = 0) {
    return test('\\.' + '\\d'.repeat(n), String(x))
    // n is the number of decimal places to match.
}

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function toFraction(a, b, mode = String) {
    if (isArray(a)) {
        b = a[1]
        a = a[0]
    }
    [a,b] = simplifyFraction(a, b)
    if (b == 1) return a
    if (mode == Array) return [a, b]
    if (mode == String) return a + '/' + b
    return '\\frac' + '{' + a + '}' + '{' + b + '}'
}
function toLatexFraction(a, b) {
    return '\\frac' + '{' + a + '}' + '{' + b + '}'
}

function simplifyFraction(a,b) {
    if (!b) [a,b] = a.split('/')

    if (hasDecimal(a)) {let factor = Math.pow(10, countDecimalPlaces(a)); a *= factor; b *= factor}
    if (hasDecimal(b)) {let factor = Math.pow(10, countDecimalPlaces(b)); b *= factor; a *= factor}
    let g = gcd(a,b)
    return [a,b].map(x => x/g).join('/')
}

function countDecimalPlaces(n) {
    return (n.toString().split('.')[1] || '').length
}

function fixFloatingPoint(number) {
    return number.toString().replace(RegExp(floatingPointREGEX, 'g'), (x, offset, s) => {
        let a = x[0]
        let b = Number(x[1])

       //console.log({s, a, b, offset, x})

        if (a == '.') {
            if (offset == 2) return x[1]
            return x
        }

        if (b >= 5) return Number(a) + 1
        return a
    })

}

const floatingPointREGEX = '(?:.(?:' + [0,1,2,3,4,5,6,7,8,9].map((x) => x + '{' + 5 + ',}').join('|') + ')(?:\\d|e-\\d+)$)'
//console.log(floatingPointREGEX)
//const nerdamer = require("nerdamer/all.min")




function normalizeMath(s) {
    s = s.toString().trim()
    return s
}

function isSimpleEquation(s) {
    return true
}


//console.log(toLatex('(3 + 3) * (3 + 4)'))
//console.log(toLatex(zeroDecimalToFraction('0.75*x')))
//console.log(decimalToFraction(0.3333333))

function decimalToFraction(dec, precision = 4) {
    if (/\.\d{1,2}$|[a-z]/.test(dec)) return dec
    let epsilon = Math.pow(10, -1 * precision)
    dec = Number(dec)
    //console.log(dec)
    if (isInteger(dec)) return dec
    let flag = false
    if (dec >= 1) {
        flag = true
        dec /= 100
    }
    var is_neg = dec < 0;
    dec = Math.abs(dec);
    //console.log(dec)
    var done = false;
    var n1 = 0, d1 = 1, n2 = 1, d2 = 0, n = 0, q = dec;
    while (!done) {
        if (n++ > 50) {
            console.log('done forced')
            done = true;
        }

        var a = parseInt(q);
        //console.log(a)
        var num = n1 + a * n2;
        var den = d1 + a * d2;
        //console.log(num, den)
        if (num > 1000 || den > 1000) {
            num = n2
            den = d2
            break
        }
        var e = (q - a);
        if (e < epsilon) {
            done = true;
        }
        q = 1 / e;
        n1 = n2;
        d1 = d2;
        n2 = num;
        d2 = den;
        if (Math.abs(num / den - dec) < epsilon || n > 30) {
            done = true;
        }
    }

    if (flag) {
        den /= 100
        if (hasDecimal(den)) {
            den *= 100
            num *= 100
            let g = gcd(den, num)
            den /= g
            num /= g
        }
    }
    let p = [(is_neg ? -num : num), den];
    return p[0] + '/' + p[1]
}
function nerdSolver(a, b) {
    let answer = _nerdSolver(a,b)
    if (test(/0\.\d+ *\*x/, answer)) {
        return answer.replace(/0\.(\d+) *\*/g, (x, y) => {
            return toLatexFraction(...simplifyRatio(y, 100))
        })
    }
    return answer
}

//console.log(nerdSolver('x/2 + x/4'))
    //console.log(isInteger(4))
