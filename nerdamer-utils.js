
function nerdCheck(a, b) {
    if (isWord(b)) {
        return a == b
    }

    if (isArray(a)) {
        return a.some((x) => nerdCheck(x, b))
    }

    a = normalizeMath(a)
    b = normalizeMath(b)
    if (a == b) return true

    a = prepareNerdCheck(a)
    b = prepareNerdCheck(b)

    if (hasVariable(b.toString())) {
        const dict = reduce(
            getVariables(b.toString()),
            (x) => char2n(x) + 2
        )
        const nerda = nerdsub(a, dict)
        const nerdb = nerdsub(b, dict)
        return String(nerda) == String(nerdb)
    } else {
        if (a.toString() == b.toString()) return true
        const answera = nerdEval(a)
        const answerb = nerdEval(b)
        return answera == answerb
    }
}

function nerdEval(s) {
    return nerdamer(s).evaluate().text()
}

function toLatex(s, styles) {
   if (!hasLatex(s)) {
       s = nerdamer.convertToLaTeX(s)
   }
   if (styles) {
       s = latexTemplater(s, styles)
   }
   return s 
}

function prepareNerdCheck(b) {
    if (hasLatex(b)) {
        try {
            b = nerdamer.convertFromLaTeX(b)
            return b
        } catch (e) {
            return 'error: nerdamer-syntax'
        }
    }
    return b
}

function hasLatex(s) {
    return test(/\\/, s)
}

function nerdsub(s, dict) {
    let nerd = nerdamer(s)
    for (let [k, v] of Object.entries(dict)) {
        nerd = nerd.sub(k, v)
    }
    return nerd
}
function _nerdSolver(a, b) {
    if (b == null) {
        if (isEquation(a)) {
            b = search(/[xyz]/, a)
            const value = orderByPolynomialDegree(
                nerdEval(nerdamer(a).solveFor(b))
            )
            return value
        }
        else {
            return nerdEval(nerdamer(a))
        }
    }
    if (b.length < 2 && isSimpleEquation(a)) {
        const value = orderByPolynomialDegree(
            nerdEval(nerdamer(a).solveFor(b))
        )
        return b + ' = ' + value
    }
    if (isEquation(b)) {
        return equationSolver(a, b)
    }
}
function toStandardLinearEquation(s) {
    return nerdSolver(s, 'y')
}
//console.log(toStandardLinearEquation('y + 4 = x'))

//console.log(items)
function getPolynomialDegree(s) {
    s = s.toString()
    let m = search(/\^\(?(\w+)/, s)
    if (m) return Number(m)
    m = search(/x/, s)
    if (m) return 1
    return 0
}

function orderByPolynomialDegree(equation) {
    if (!equation.includes('^')) return equation
    const items = schemaMatch(
        '^$mathop?$mathvar|$mathop$mathvar',
        equation
    )
    sorted(items, ([a, b]) => getPolynomialDegree(b), true)
    let s = ''
    for (let i = 0; i < items.length; i++) {
        let [a, b] = items[i]

        if (i == 0) {
            if (a == '-') s += a
            else if (a == '/') s += a
            s += b
        } else {
            s += ' ' + a + ' ' + b
        }
    }
    //console.log(s)
    return s.trim()
}


function getStringVariable(s) {
    return search(/\b[abcxyzmn]\b/, s) || 'x'
}
function functionFromString(s) {
    s = s.replace(/^y, *= */g, '')
    return nerdamer(s).buildFunction()
}

//import itersearch
//x = orderByPolynomialDegree('- b + x^2 + 5x + 7x')
//console.log(x)
//console.log(arg)
//console.log(nerdSolver("y=x^3", "y =x"))
function equationSolver(f1, f2){
    f1 = normalizeEquation(f1)
    f2 = normalizeEquation(f2)
    const equation = `${f1} = ${f2}`
    const variable = itersearch(equation, /\b[xabc]\b/)
    const value = nerdamer.solve(equation, variable).toString()
    return toNumericalArray(value)
}
function toNumericalArray(x) {
    return x.toString().slice(1, -1).split(/, */).map(Number)
}
function normalizeEquation(s) {
    return s.replace(/^\w+ *= */, '')
}

//import math-utils
//const nerdamer = require('nerdamer/all.min')

