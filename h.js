function currentRenderData() {
    if (this.modal) {
        return {
            ckey: 'ResultModal',
        }
    }

    let level = this.levelData[this.levelIndex]
    if (this.useTutorial && level.tutorial) {
        return {
            ckey: level.tutorial,
            props: level.tutorialProps,
        }
    }

    if (level.component) {
        return {
            ckey: level.component,
            key: this.levelIndex,
            props: {config: level.generatorConfig},
        }
    }
}


Vue.use(GeneratorPlugin)
const App = {
    name: 'app',
    render(h) {
        return h(DrillerA)
        return h(UtilColorPicker)
        return h(VueTileMatch)
        return h(LevelUpOnMath)
    },
}

const MathLevels = {
    components: { 
        ResultModal, MathTutorial, FourCornersOfMath
    },
    name: 'MathLevels',
    created() {
        const gradeLevel = this.$student.config.gradeLevel
        this.useTutorial = this.$student.useTutorial()
        const ref = LEVELS[gradeLevel]
        this.levelData = ref
        this.length = ref.length
    },
    template: `
    <div>
        <transition name="fade" mode="out-in">
            <component :class="current.ckey" :is="current.ckey"
                v-bind="current.props"
                :key="current.key"
                @next="next(current.ckey)">
            </component>
        </transition>
    </div>
    `,
    computed: {
        current: currentRenderData,
    },
    methods: {
        next: mathLevelsNext,
        MathTutorial(analysis) {
            this.useTutorial = false
            console.log('the component should be rendered now')
        },
        FourCornersOfMath(analysis) {
            this.modal = analysis
            if (this.modal) return
            this.levelIndex += 1
        },
        ResultModal() {
            if (this.levelIndex == this.length - 1) {
                return
            }
            this.levelIndex += 1
            this.modal = null
        }
    },
    data() {
        return {
            useTutorial: false,
            levelIndex: 0,
            modal: null,
        }
    },
}
const LevelUpOnMath = {
    components: {
        MathLevels,
        //HomeScreen,
    },
    name: 'LevelUpOnMath',
    created() {
        this.studentInfo = this.$student.load()
    },
    data() {
        return {
            studentInfo: {},
            active: false,
            active: true,
            transitionName: 'fade',
        }
    },
    methods: {
        onSubmit(name) {
            this.active = true
        },
    },

                //<MathLevels v-if="active"/>
                //<HomeScreen @submit="onSubmit "v-else/>
    template: `
        <div>
            <transition :name="transitionName" mode="out-in">
                <MathLevels/>
            </transition>
        </div>
    `,
}



