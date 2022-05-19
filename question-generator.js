class BaseGenerator {
    constructor(numbergen, watcher) {
        this.config = {}
        this.numbergen = numbergen || new NumberGen()
        this.watcher = watcher || new Watcher()
    }
    reconfigure(config) {
        assignExisting(this.config, config)
    }

    generate(item) {
        let value = this._generate(item)
        this.numbergen.cache.clear()
        return value
    }

    _generate(template) {
        this.count += 1
        if (this.count == 10) {
            this.count = 0
            return null
        }
        let question = this._generateQuestion(template)
        if (!this._validateQuestion(question)) {
            return this._generate(template)
        }

        let answer = nerdSolver(question)

        if (!this._validateAnswer(answer)) {
            return this._generate(template)
        }
        this.count = 0

        if (this.config.convertToX) {
            ;[question, answer] = convertToX(question, answer)
        }

        if (this.config.useLatex) {
            question = toLatex(question)
            answer = toLatex(answer)
        }

        return { question, answer }
    }

    _validateAnswer(answer) {
     if (this.config.onlyIntegerAnswers && !isInteger(answer)) {
         return false
     }
     if (this.config.onlyPositiveAnswers && !isPositive(answer)) {
         return false
     }
     if (this.config.onlyNiceAnswers && !isNiceAnswer(answer)) {
         return false
     }
     return true
    }
    _validateQuestion(question) {
        return this.watcher.isFresh(question)
    }
}

class QuestionGenerator {
    constructor() {
        this.watcher = new Watcher()
        this.numbergen = new NumberGen()
        this.generator = new InfusionGenerator()
        this.count = 0
        this.index = 0
    }
    load(config) {
        if (config.templates) {
            this.templates = config.templates
        }
        if (config.index) {
            this.index = config.index
        }
        if (config.numberRange) {
            this.numbergen.numberRange = config.numberRange
        }
        if (config.config) {
            this.generator.config = config.config
        }
    }

    generate() {
        const template = this.templates[this.index]
        return this.generator.generate(template)
    }
}

class InfusionGenerator extends BaseGenerator {
    constructor(numbergen, watcher) {
        super(numbergen, watcher)
        this.config.convertToX = false
        this.config.useLatex = false
        this.config.onlyIntegerAnswers = true
        this.config.onlyPositiveAnswers = true
        this.config.onlyNiceAnswers = true
    }

    _generateQuestion(template) {
        const numberRef = {
            pow2: [2, 4, 8],
            pow64: [2, 4, 8, 16, 32, 64, 128],
            pow3: [3, 9],
            pm: ['+', '-'],
            timesDivide: ['*', '/'],
            td: ['*', '/'],
        }

        let s = isFunction(template) ? template() : template
        if (coinflip() & isEquation(s)) {
            s = reverseMathString(s)
        }
        //s = s.replace(
        ///[abcd\d][abcxyz]/g,
        //(x) => x[0] + ' * ' + x[1]
        //)
        s = s.replace(/\$(\w+)/g, (_, key) =>
            randomPick(numberRef[key])
        )
        s = s.replace(/z+/g, (x) =>
            '0'.repeat(rng(0, x.length + 1))
        )
        s = s.replace(/[abcde]/g, (x) => this.numbergen.get(x))
        s = templater(s)
        return s
    }
}

class NumberGen {
    constructor() {
        this.cache = new Cache()
        this.numberRange = [1,10]
    }
    get(key) {
        return this.cache.get(key, () => this.rng())
    }
    rng() {
        return rng(...this.numberRange)
    }
}

const guestStudent = {
    name: 'Alan Huzak',
    gradeLevel: 4,
    history: 0,
}

const alanStudent = {
    templates: [
        'a + b',
        'a + b + c',
        'a + b^(2 * a)', 'aaa + x + c^d', 'x/2 + x/4'],
    numberRange: [2, 5],
    config: {
        onlyPositiveAnswers: true,
        onlyIntegerAnswers: true,
        //onlyNiceAnswers: true,
    },
}

function convertToX(question, answer) {
    if (isEquation(question) || question.includes('x')) {
        return [question, answer]
    }
    //console.log({question, answer}); throw ''
    let replacement = randomPick(unique(getNumbers(question)))
    let regex = RegExp('\\b' + replacement + '\\b', 'g')
    question =
        question.replace(regex, (x) => {
            return 'x'
        }) +
        ' = ' +
        answer
    return [question, replacement]
}

function nerdSolver(a, b) {
    return 3
    let answer = _nerdSolver(a, b)
    return answer
}

function differentForms(s) {
    if (/^\S+ \\cdot \S+$/.test(s)) {
        return s.replace(/ \\cdot /, '')
    }
    return s
}
function toLatex(s) {
    if (isNumber(s)) return s
    let value = nerdamer.convertToLaTeX(s)
    //value = value.replace(/\\(?:left|right)[()]/g, '')
    if (test(/0\.\d+ *\*x/, value)) {
        return value.replace(/0\.(\d+) *\*/g, (x, y) => {
            return toLatexFraction(...simplifyRatio(y, 100))
        })
    }
    value = differentForms(value)
    return value
}


class QuestionController {
    use(Generator) {
        this._generator = this.generator
        this.generator = new Generator()
        this.generator.init()
        this.currentLength = this.generator.length
    }
    empty() {
        this.generator = this._generator
        this._generator = null
    }

  constructor(key) {
    this.generator = new QuestionGenerator()
    this.config = {
        passRequirement: null
    }
    this.totalCorrect = 0
    this.level = 0
    this.reset()
  }
  reset() {
    this.count = 0
    this.hot = 0
    this.temphot = 0
    this.correct = 0
    this.wrong = 0
    this.highScore = 0
  }

  load(config) {
      if (config.templates) {
          this.currentLength = config.templates.length
      }
      this.generator.load(config)
      assignExisting(this.config, config)
  }

  check(answer) {
      let correct = answer == this.lastItem.answer
      correct = true /* for debug purposes */
      let status = this.update(correct)
      if (status === false) {
          return INCORRECT
          return 'wrong-answer'
      }
      
      if (this.isDone()) {
          return DONE
          return 'next-level'
      }
      if (status === true) {
          return CORRECT
          return 'next-square'
      }
      return AGAIN
      return 'again'
  }
  update(e) {
    this.count += 1
    if (e == true) {
      this.correct += 1
      this.hot += 1
      this.temphot += 1
      //info(this, 'correct', 'hot')
    } else {
        this.wrong += 1
      //console.log('wrong')
      if (this.hot > this.highScore) {
        this.highScore = this.hot
      }
      this.hot = 0
      this.temphot = 0
      return false
    }
    if (!this.config.passRequirement ||
        (this.config.passRequirement && 
        this.config.passRequirement(this))) {
        this.generator.index += 1
        this.temphot = 0
        return true
    }
  }
  get name() {
      return this.generator.constructor.name
  }
  generate() {
      this.lastItem = this.generator.generate()
      return this.lastItem
  }
  isDone() {
      const value = this.generator.index == this.currentLength
      if (value) {
          this.reset()
          return value
      }
  }
  getHint() {
      return 
  }
  getResults() {
    const keys = ['highScore', 'wrong', 'correct', 'count']
    const results = info(this, ...keys)
    const analysis = analyzeResults(results)
    return analysis
  }
}

function analyzeResults({highScore, wrong, correct, count}) {
    if (wrong > 3) {
        return {
            showResults: false,
            startTutorial: true,
        }
    }

    return {
        showResults: {
            percent: toPercentage(correct, count),
            correct,
            highScore
        },
    }
}

class Student {
    constructor() {
        this.config = {}
    }
    useTutorial() {
        return false
    }
    load(config) {
        let data = config || getStorage('student', null) || guestStudent
        Object.assign(this.config, data)
        return data
    }
}

class MathDrill {

    generate() {
        const value = this.items[this.index]
        return value
    }

    init() {
        this.items = this.create()
        //this.length = this.items.length - 1
        this.length = this.items.length
        this.index = 0
    }

    constructor() {
        this.colorRef = {}
        this.first = 10
        this.multiply = (...a) => this.arithmetic('*', ...a)
        this.sum = (...a) => this.arithmetic('+', ...a)
    }

    arithmetic(operator, a, b, colorA, colorB) {
        this.handleColors(a, b, colorA, colorB)

        return arithmetic(operator, a, b)
    }

    handleColors(a, b, cA, cB) {
        if (!cA && !cB) return 
        if (cA) { this.colorRef[a] = cA }
        if (cB) { this.colorRef[b] = cB }
    }

    create() {
        //return [rng(2, 9), rng(2, 9)]
        let [a,b] = [3, 7]
        let [color1, color2, color3, color4] = roygbiv.slice(0,4)
        //let [color1, color2, color3, color4] = generateColors(4)
        let A = this.multiply(a, this.first)
        let A1 = addColors(A.question, color1)
        let A2 = {answer: A.answer, colorIt: color3}

        let B = this.multiply(a, b)
        let B1 = addColors(B.question, color1, color2)
        let B2 = {answer: B.answer, colorIt: color4}
        let C = this.sum(A.answer, B.answer)
        let C1 = addColors(C.question, color3, color4)
        let C2 = {answer: C.answer, colorIt: 'black'}
        let D = this.multiply(a, this.first + b)
        let D1 = latexTemplater(D.question, [color1, null, color2], '\\w')
        let D2 = C2
        return [
            {question: A1, ... A2},
            {question: B1, ... B2},
            {question: C1, ... C2},
            {question: D1, ... D2},
        ]
        return {
            A1, B1, C1, D1, A2, B2, C2, D2
        }
    }
}

