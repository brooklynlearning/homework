const assets = {}
assets.templates = {}
assets.css = {}
assets.templates.vue = {}
assets.templates.vue.vue =
    "const $1 = {\n    components: {},\n    name: '$1',\n    props: [''],\n    data() {\n        return {\n            message: 'howdy',\n        }\n    },\n    methods: {\n\n    },\n    render(h) {\n        $c\n    },\n    async mounted() {\n        console.log('Mounted from $1')\n        await sleep(1000)\n    },\n}"

assets.templates.vue.vue2 =
    "const $1 = {\n    template,\n    components: {},\n    name: '$1',\n    props: [''],\n    data() {\n        return {\n            message: 'howdy',\n        }\n    },\n    methods: {\n\n    },\n    async mounted() {\n        console.log('Mounted from $1')\n        await sleep(1000)\n    },\n}"

const MASTER_LEVELS = [
    {
        sections: [
            {
                /***************** section 1 *************/
                ckey: 'sequential',
                questions: [
                    {
                        question: {
                            className: 'g4',
                            items: [
                                {
                                    ckey: 'Graph',
                                    props: {
                                        equation: '2x + 3',
                                    },
                                },
                                {
                                    ckey: 'Graph',
                                    props: {
                                        equation: '2x + 333',
                                    },
                                },
                                {
                                    ckey: 'Prose',
                                    props: 'Coolio',
                                },
                            ],
                        },
                        answer: 4,
                    },

                    {
                        question: '2 + 3 = ?',
                        answer: 5,
                    },
                ],
            },
            /***************** section 2 *************/
            {
                ckey: 'replaceable',
                blurb: 'yowa',

                questions: [
                    {
                        question: '2 + 20 = ?',
                        answer: 22,
                    },

                    {
                        question: '2 + 22 = ?',
                        answer: 24,
                    },
                ],
            },
            /***************** section 3 *************/
        ],
        /************ end of level 1 sections ********/
    },
    /******************** end of level 1 *************/
]
const MASTER_VOICE_ITEMS = [
    { time: 3, value: 'hio' },
    { time: 5, value: 'hiuu' },
    { time: 6, value: 'hiiii' },
    { time: 8, value: 'hii' },
]

const MASTER_MATH_LEVELS_FROM_KEY = {
    'basic-1': [
        {
            ckey: 'MathGroup',
            topics: 'addition subtraction',
            difficulty: 'easy',
            points: '10',
            threshold: '',
            onError: '',
            topic: '',
            // generated ...
        },

        {
            ckey: 'MathGroup',
            topics: 'addition subtraction',
            points: '10',
            threshold: '',
            onError: '',
            topic: '',
            // generated ...
        },
    ],
}

const GRADE1 = {}
const GRADE2 = {}
const GRADE3 = {}
const GRADE5 = {}
const GRADE6 = {}

//if (config.globalPassRequirement &&
//!config.globalPassRequirement(state))
//{
//state.generate()
//}
//
//
// To have so many things going on ...
// To be blamed ... for some one else's actions
// To have a scape goat
//
const GRADE4LEVELS = [
  {
      component: 'FourCornersOfMath', 
      tutorial: 'SimpleTutorial',

      generatorConfig: {
        templates: ['a + b', 'a + b + c', 'a - b', 'a - b - c'],
        numberRange: [2, 5],
        config: {
            onlyPositiveAnswers: true,
            onlyIntegerAnswers: true,
        },
        passRequirement: (x) => x.temphot == 2,
      },
      tutorialProps: {
          stack: [
            'hi'
          ]
      },

  },
  {
      component: 'FourCornersOfMath', 
      tutorial: 'SimpleTutorial',

      generatorConfig: {
        templates: ['a + a + a + b', 'a + b + c', 'a - b', 'a - b - c'],
        numberRange: [2, 5],
        config: {
            onlyPositiveAnswers: true,
            onlyIntegerAnswers: true,
        },
        passRequirement: (x) => x.temphot == 2,
      },
      tutorialProps: {
          stack: [
            'hi'
          ]
      },

  },
]

const LEVELS = [
    null, /* grade 0 */
    null, /* grade 1 */
    null,
    null,
    GRADE4LEVELS,
]

const LEVELDATA = [
    null,
    null,
    null,
    null,
    //GRADE4LEVELDATA,
]

const GRADE4_DATAMAP = [
    {
        templates: ['a + b', 'a + b + c', 'a - b', 'c - b - a'],
        numberRange: [2, 5],
        config: {
            onlyPositiveAnswers: true,
            onlyIntegerAnswers: true,
        },
        passRequirement: (x) => x.temphot == 2,
    },
]

const xGRADE4LEVELS = [
    {
        component: 'FourCornersOfMath',
        props: {
            generator: true,
            templates: [
                'a + b',
                'a + b + c',
                'a - b',
                'c - b - a',
            ],
            numberRange: [2, 5],
            config: {
                onlyPositiveAnswers: true,
                onlyIntegerAnswers: true,
            },
            passRequirement: (x) => x.temphot == 2,
        },
    },
    {
        ckey: 'GroupedQuestions',
        component: 'FourCornersOfMath',
        generator: true,
        //type: 'boss',
        type: 'minion',
        layout: '',
        type: 'sequential',
        //type: 'floof',
        packageSize: (x) => x.hot || 1,
        globalPassRequirement: (x) => x.count > 3 && x.hot == 3,
        questionPassRequirement: (x) => x.hot == 2,
        questions: ['a + b', 'a + b + c', 'a - b', 'c - b - a'],
        numberRange: [2, 5],
        description: 'veryBasicArithmetic',
        trackMistakes: false,
        notes: '',
        config: {
            onlyPositiveAnswers: true,
            onlyIntegerAnswers: true,
        },
        onError() {
            console.log('error')
        },

        onSuccess() {
            console.log('error')
        },
        //endingPassRequirement: 2,
        //minimumNumberOfQuestions: 5,
    },
]

const GRADE4 = { levels: GRADE4LEVELS }

const LEVEL_MAP = {
    GRADE4,
}
const MATH_CONFIG_BY_GRADE = [
    null,
    {},
    {},
    GRADE3,
    GRADE4,
    GRADE5,
    GRADE6,
]
const MASTER_MATH_TEMPLATES = {
    easy: {
        addition: ['a + b', 'a + b + c', 'a + b + c + d'],

        addition: ['a - b', 'c - b - a'],
    },
}

heart = `

.heart {
  background-color: red;
  display: inline-block;
  height: 30px;
  margin: 0 10px;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  width: 30px;
}

.heart:before,
.heart:after {
  content: "";
  background-color: red;
  border-radius: 50%;
  height: 30px;
  position: absolute;
  width: 30px;
}

.heart:before {
  top: -15px;
  left: 0;
}

.heart:after {
  left: 15px;
  top: 0;
}
`

assets.css.heart = heart
assets.windowFunctions = {
    howdy() {
        console.log('hiii')
    },
}
