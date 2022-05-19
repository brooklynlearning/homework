function determineClassLayout(state) {
    if (state.question && state.answer) {
        return determineQuestionAnswerLayout(state)
    }
}

function determineQuestionAnswerLayout({
    question,
    answer,
    hint,
}) {
    if (hint) {
        return 'simple-question'
    }
    return 'simple-question'
}

const ColoredDisplay = {
    name: 'ColoredDisplay',
    props: ['value'],
    render(h) {
        
    },
    mounted() {
        console.log('hi from ColoredDisplay')
    }
}
const QuestionDisplay = {
    name: 'QuestionDisplay',
    props: ['value'],
    render(h) {
        //return h('div', Math.random())
        function runner(item) {
            return looksLikeProse(item)
                ? h('span', { class: 'prose-item' }, item)
                : h('span', {
                      directives: [
                          { name: 'katex', value: item },
                      ],
                      class: 'katex-item',
                  })
        }

        const items = splitKatex(this.value).map(runner)
        return items.length == 1
            ? items[0]
            : h('div', { class: 'math-expression' }, items)
    },
}

const MathInput = {
    name: 'MathInput',
    props: ['focusIt', 'answerIt', 'answer', 'colorIt'],
    render(h) {
        const self = this
        const component = isNumber(this.answer)
            ? MathNormalInput
            : MathQuillInput

        return h(component, {
            props: this.$props,
            on: { onEnter(x) { self.$emit('onEnter', x) }, },
        })
    },
}


const MathQuillInput = {
    props: ['answer', 'focusIt', 'answerIt'],
    name: 'math-quill-component',
    template: `<div class="math-quill-component"></div>`,
    methods: {
        disable() {
            this.textarea.disabled = true
            this.cursorDisplay = 'none'
        },
        focus() {
            this.quill.focus()
        },
        onEnter() {
            const value = this.quill.latex()
            const correct = value == this.answer
            this.$emit('onEnter', correct)
            if (correct) this.disable()
        },
    },
    async mounted() {
        const self = this
        const options = {
            spaceBehavesLikeTab: true,
            handlers: {
                enter: self.onEnter,
            },
        }

        if (this.automatic) {
            options.handlers.edit = self.onEdit
        }
        await sleep(150)
        this.quill = MathQuill.getInterface(2).MathField(
            this.$el,
            options
        )
        this.textarea =
            this.quill.__controller.container[0].children[0].firstChild
        this.cursorDisplay =
            this.quill.__controller.cursor._jQ[0].style
        //console.log('hello from MathQuillComponentt')
    },

    watch: {
        answerIt: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.quill.write(this.answer)
                    this.onEnter()
                }
            },
        },

        focusIt: {
            immediate: true,
            handler(val) {
                if (val) {
                    tryAndTryAgain(focusQuill, this)
                }
            },
        },
    },
}

const MathNormalInput = {
    name: 'MathNormalInput',
    props: ['answer', 'focusIt', 'answerIt', 'colorIt'],
    template: `<input :style="style" class="math-normal-input"/>`,
    computed: {
        style() {
            console.log(this.colorIt, 'b')
            if (this.colorIt) {
                return {
                    color: this.colorIt
                }
            }
        },
    },
    watch: {
        focusIt: {
            handler: 'focus',
        },
    },

    answerIt: {
        immediate: true,
        handler(val) {
            if (val) {
                console.log('answer it')
                this.$el.value = this.answer
                //this.onEnter()
            }
        },
    },
    mounted() {
        this.focus(this.focusIt)

        this.$el.addEventListener('keydown', (e) => {
            e.stopPropagation()

            if (this.userInput.length >= this.maxLength) {
                return
            }
            if (e.key == 'Enter') {
                this.onEnter()
                return
            }
            if (isTypable(e.key)) {
                this.userInput += e.key
                return
            }
        })
    },
    methods: {
        focus(val) {
            if (val) {
                autoFocus(this.$el)
            }
        },
        onEnter() {
            debug = 0
            debug = 1
            if (debug || this.userInput == this.answer) {
                this.disable()
                this.$emit('onEnter', this.userInput)
            }
        },
        disable() {
            this.$el.setAttribute('readOnly', true)
            this.$el.setAttribute('disabled', true)
        },
    },
    data() {
        return {
            userInput: '',
            maxLength: 100,
        }
    },
}

const QuestionAnswer = {
    name: 'QuestionAnswer',
    props: ['answer', 'question', 'focusIt', 'colorIt', 'className'],
    render(h) {
        const self = this
        const question = self.question
        const questionDisplay = h(QuestionDisplay, {
            props: { value: question },
        })

        const input = h(MathInput, {
            on: { onEnter: (x) => self.$emit('onEnter', x) },
            props: {
                disableIt: self.disableIt,
                answerIt: self.answerIt,
                focusIt: self.focusIt,
                answer: self.answer,
                colorIt: self.colorIt,
            },
        })

        return renderWrapper(h, 
            self.className || 'question-answer', questionDisplay, input
        )
    },
    mounted() {
        console.log('hi from QuestionAnswer')
    },
}

const Star = createSvg('star', 20, 'yellow')
const Stars = {
    name: 'Stars',
    props: ['value'],
    data() {
        return {
            stack: []
        }
    },
    watch: {
        value(val) {
            let starData = null
            if (val) fillTo(this.stack, starData, val)
        },
    },
    render(h) {
        const children = this.stack.map((item, i) => {
            return h(createStar(), useDirective('movement', this.position))
        })
        return transitionWrapper(h, children)
    },
    mounted() {
        console.log('hi from Stars')
        const parent = this.$parent.$el
        const input = findDescendant(parent, 'input|textarea')
        if (input) {
            console.log('found input')
            this.position = getBoundingClientRect(input)
            console.log(this.position)
        }
    }
}
const SimpleQuestion = {
    components: { Stars, QuestionAnswer },
    name: 'SimpleQuestion',
    props: ['answer', 'question', 'focusIt'],
    created() {
          this._question = this.question
          this._answer = this.answer 
    },
    data() {
        return {
            myKey: 0,
            _question: null,
            stars: 0,
            _answer: null,
        }
    },
    computed: {
        className() {
            return determineClassLayout(this)
        },
    },
    methods: {
        onEnter: simpleQuestionEnterHandler,
    },
    template: `
      <div :class="className">
            <transition name="fade" mode="out-in">
                <question-answer :key="myKey"
                    :answer="_answer"
                    :question="_question"
                    :focusIt="focusIt"
                    @onEnter="onEnter"
                />
            </transition>
            <Stars :value="stars">
      </div>
    `,
    mounted() {
        console.log('hello from SimpleQuestion')
    },
}

const MathTutorial = {
    name: 'MathTutorial',
    props: [''],
    render(h) {
        return h('div', 'hi')
    },
}
const ResultModal = {
    name: 'ResultModal',
    props: ['level'],
    template: `
        <div>
            <button @click="onClick"
                    class="next-level">
                Next Level
            </button>
        </div>
    `,
    computed: {
        levelHeader() {
            this.level
        },
    },
    methods: {
        onClick() {
            this.clock.finish()
        },
    },
    mounted() {
        const self = this
        console.log('mounted result modal')
        this.clock = new Clock({
            duration: 3,
            onTick(timeLeft) {
                console.log(timeLeft)
            },
            onEnd() {
                emitNext(self)
            },
        })
    },
}

const FourCornersOfMath = {
    name: 'FourCornersOfMath',
    props: ['config'],
    created() {
        this.$generator.load(this.config)
        this.stack.push(this.$generator.generate())
    },
    data() {
        return {
            stack: [],
        }
    },
    render(h) {
        //return h('div', 'hi')
        const self = this
        const children = this.stack.map((item, i, arr) => {
            return h(SimpleQuestion, {
                key: item.question,
                props: {
                    focusIt: i == arr.length - 1,
                    ...item,
                },
                on: { next: self.next },
            })
        })
        return transitionWrapper(
            h,
            'four-corners-of-math',
            children
        )
    },
    methods: {
        next: fourCornersNext,
    },
}
function simpleQuestionEnterHandler(x) {
    const status = this.$generator.check(x)
    console.log(status)
    switch (status) {
        case 'wrong-answer-max-limit':
        case 'wrong-answer-limit':
        case 'game-over':
            this.$emit(status)
            return
        case 'wrong-answer':
            return
        case 'next-level':
            this.disableIt = true
            this.$emit('next', status)
            return 
        case 'next-square':
            this.disableIt = true
            this.color = 'green'
            //this.vvv = 'hohoho'
            setTimeout(() => this.$emit('next', status) , 100)
            return 
        case 'again':
            this.stars += 1
            this.myKey += 1
            const {question, answer} =
                this.$generator.generate()
            this._question = question
            this._answer = answer
            return 
    }
}

function fourCornersNext(status) {
    switch (status) {
        case 'game-over':
            emitNext(this, status)
            return 
        case 'wrong-answer':
            return 
        case 'next-level':
            const results = this.$generator.getResults()
            console.log('donnnnnnnnnne')
            emitNext(this, results)
            return 
        case 'next-square':
            this.stack.push(this.$generator.generate())
    }
}

function mathLevelsNext(name, data) {
    console.log(arguments)
    switch (data) {
        case 'game-over':
            const tutorial = createTutorial(this)
            this.goto()
    }
    this[name](data)
}

function createTutorial(state) {
    return state.$tutor.createTutorial(state.$student, state.$generator)
}

const DrillerA = {
  name: 'DrillerA',
  data() {
    return {
      questionIndex: 0,
      stack: [],
    }
  },
  render(h) {
    const self = this
    const children = this.stack.map((item, i, arr) => {
      if (i == arr.length - 1) {
        item.focusIt = true
      } else {
        item.focusIt = false
      }

      return h(QuestionAnswer, {
        props: item,
        key: i,
        on: { onEnter: self.onEnter },
      })
    })
    return transitionWrapper(h, children)
    return transitionWrapper(h, 'numbered-list', children)
  },
  methods: {
      onEnter(answer) {
          const status = this.$generator.check(answer)
          console.log({status})
          modal(status)
          switch (status) {
              case NEXT_LEVEL:
              case AGAIN:
                return 
              case DONE:
                console.log('doneeeeeeeeeee')
                return this.$emit('next')
              case INCORRECT:
                return 
              case CORRECT:
                return stackGenNext(this)
          }
      },
  },
  created() {
      this.$generator.use(MathDrill)
      stackGenNext(this)
      //this.onEnter(2)
      //this.onEnter(2)
      //this.onEnter(2)
      //this.onEnter(2)
      //this.onEnter(2)
  },
  beforeDestroy() {
      this.$generator.empty()
  },
}

function stackGenNext(state) {
  const value = state.$generator.generate()
  state.stack.push(value)
}

/* have to make some effort ... have to feel like  */
/* the way of it ... */
/* to sweep people in ... our generation */
/* to follow the proper customs and traditions */
