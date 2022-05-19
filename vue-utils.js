function componentFromData(data, componentRef) {
    const dataRef = {data() { return data }}
    const component = Object.assign(componentRef, dataRef)
    return component
}
function renderModal(h, value) {
        const style = {
            zIndex: '999',
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            background: 'yellow',
            'fontSize': '24px',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        }
        return renderWrapper(h, {style}, value)
}
function hfactory(h) {
    function lambda(options, ...components) {
         return renderWrapper(h, options, ...components)
    }
}

class VueSocketService {
    emit(a, b) {
        this.socket.emit(a, b)
    }
    constructor(vue) {
        this.socket = io()
        this.socket.on('data', (data) => {
            Object.assign(vue, data)
        })
    }
}

function groupRenderer(key, o) {
    /* this is too hard to use */
    /* readability is important */
    return {
        render(h) {
            const name = toDashCase(this.$options.name)
            const items = this[key]
            const children = items.map((item, i) => {
                const childName = name + '-' + 'item'
                o.class = childName
                const options = propOptionBuilder(this, o, item)
                return h(tag, options, item)
            })
            return renderWrapper(h, name, children)
        }
    }
}

const LibraryPicker = {
    name: 'LibraryPicker',
    props: ['value'],
    template: `
        <div class="library-picker">
            <div v-for="item in value" 
                <div class="library-picker-item">
                    
                </div>
            </div>
        </div>
    `,
    methods: {
        click() {
            this.$store.commit('add', 'scripts', item)
        },
    },
}




class VueDisplayManager {
    constructor({state, callbacks}) {
        this.vue = state
        this.callbacks = bindObjectToState(callbacks, state)
        this.keys = Object.keys(this.vue.displays)

        this.lastKey = null
        this.activeKey = findKey(
            this.vue.displays,
            null,
            isTrue
        )
    }

    async exit() {
        await this.enter(this.lastKey)
    }
    async enter(key, ...args) {
        if (!key || this.activeKey == key) return 

        this.lastKey = this.activeKey
        await this.doAfter(this.lastKey, 'Exit')
        this.vue.displays[this.lastKey] = false

        await this.doAfter(key, 'Enter', ...args)
        this.vue.displays[key] = true
        this.activeKey = key
    }

    async enterAndLeave(key, ...args) {
        const delay = isNumber(args[0]) && args.shift() || 
            this.vue.config.delay || 0
        await this.enter(key, ...args)
        if (!delay) return 
        await sleep(delay)
        await this.enter(this.lastKey)
    }

    async doAfter(key, mode, ...args) {
        if (this.vue.frameAndMirror) {
            return 
        }
        const name = key.toLowerCase() + mode
        console.log('VUE-DISPLAY-MANAGER-calling', name)
        const callback = this.callbacks[name]
        if (callback) {
            await callback(...args)
        }
    }
}



function loremGenerateQuestion() {
    return `${rng()} + ${rng()} = ?`
}

function propify(key, value) {
    if (isObject(key)) {
        return {props: key}
    }
    return {props: {[key]: value}}
}

function toProps(key, data, ...args) {
    console.log([key, data])
    const propData = merge(data, ...args)
    return {
        props: key ? {[toName(key)]: propData} : propData
    }
    function toName(s) {
        return pluralize(s.replace(/Component$/, '').toLowerCase())
    }
}




function vuetify(x) {
    if (isObject(x)) {
        const name = x.name || getSelfVariableName(x)
        return Vue.directive(name, x)
    }

    return isDirective(x) ? vuetifyDirective(x) : vuetifyFunction(x)

    function vuetifyDirective(fn) {
        const name = toDashCase(fn.name.replace(/^vue|directive$/gi, ''))
        Vue.directive(name, fn)
    }

    function vuetifyCurry(fn) {
        let name = fn.name.replace(/vue(\w)/, (_, x) => '$' + x.toLowerCase())
        Vue.prototype[name] = function (...args) {
            fn(this, ...args)
        }
    }

    function vuetifyFunction(fn) {
        let name = fn.name
        if (name.startsWith('vue')) {
            return vuetifyCurry(fn)
        }
        if (!name.startsWith('$')) name = '$' + name
        Vue.prototype[name] = fn
    }
}

function isDirective(x) {
    return getFirstParameter(x).startsWith('el')
    return x.name.endsWith('Directive')
}

function VueHtmlDirective(el, binding) {
    if (binding.value) el.innerHTML = binding.value
}

function VueAnimationDirective(el, binding) {
    if (isArray(binding.value)) {
        forEach2(binding.value, (x) => assignStyle(el, x))
    } else {
        const delay = 1000 * (binding.arg || 1)
        setTimeout(() => {
            el.style.opacity = 1
        }, delay)
    }
}

function VueDisableItDirective(element, binding) {
    console.log('disableit???')
    if (!binding.value) return 
        console.log('disabling')
    element.disabled = true
    //element.setAttribute('disabled', true)
}

function VueFocusItDirective(element, binding, {context}) {
    console.log('focusi`irective`')
    if (binding.value == null || binding.value == false) return 
    console.log(context)
    // should be able to access the mathquill from here.
    setTimeout(() => element.focus() , 250)
}

function VueScrollDirective(element, binding) {
    if (!binding.value) return 
    setTimeout(() => {
        element.scrollTop = element.scrollHeight
    }, 250)
}

function VueKatexDirective(element, binding, value) {
    const displayMode = binding.arg == 'display' || value.length > 15

    const options = {
        displayMode,
        throwOnError: true,
        //minRuleThickness: 0.5, // caused problems
    }

    try {
        katex.render(binding.value, element, options)
    } catch (e) {
        console.log(e)
    }
}


const VueVisibleDirective = {
    name: 'visible',
    bind(el, binding) {
        el.style.opacity = 0
    },
    update(el, binding) {
        if (binding.value) {
            const options = 1000
            el.animate([{ opacity: 0 }, { opacity: 1 }], options)
        }
    }
}



function toRefs(name) {
    return {
        ref: name,
        refInFor: name.endsWith('s'),
    }
}


function useDirective(name, value) {
    if (!value) return 
    return {
        directives: [{ name, value }],
    }
}


function toDirectives(name, value) {
    return {
        directives: [{ name, value }],
    }
}


function transitionFactory(h) {
    const props = {
        props: { name: 'fade', mode: 'out-in', tag: 'div', class: 'vv' },
    }

    const opts = {
        class: 'zoop'
    }
    return function transition(children) {
        if (isArray(children)) {
            return h('div', opts, [h('transition-group', props, children)])
        } else {
            return h('div', [h('transition', props, children)])
        }
    }
}


function toListener(key, x) {
    return {
        on: {
            [key]: isFunction(x) ? x : x[key].bind(x)
        }
    }
}

function toListenersFromString(key, state) {
    const listeners = {[key]: state[key].bind(state)}
    console.log(listeners)
    return {on: listeners}
}
function toListeners(...args) {
    if (isString(args[0])) {
        return toListenersFromString(...args)
    }

    return toListenersFromState(...args)
}

function toListenersFromState(state, component) {
    const listeners = Object.entries(component.methods).reduce((acc, [k,v], i) => {
            if (test(/^(next|on)/, k)) {
                acc[k] = v.bind(state)
            }
            return acc
    }, {})
    console.log(listeners)
    assert(listeners)
    return {on: listeners}
}

function toListenersgdfgs(keys, x) {
    if (isVue(keys)) {
        dog(keys.$options.methods)
        dog(Object.keys(keys))
        const listeners = reduce(keys.$options.methods, (k) => {
            if (test(/^(next|on)/, k)) {
                return [k, keys[k].bind(keys)]
            }
        })
        dog(listeners)
        return {
            on: listeners
        }

    }
    if (isObject(keys)) {
        return {
            on: keys
        }
    }
    const on = reduce(toArray(keys), (key) => {
        console.log(key, 'kkkkkkkkkk')
        return [key, x[key].bind(x)]
    })
    console.log(on)
    console.log('hhhhhhhhvvvv')
    return {on}
}



const VueTimelineDirective = {
    name: 'timeline',
    bind(el, binding) {
        toInvisibleElement(el)
    },
    inserted(el, binding) {
        if (el.dataset.appeared) return
        setTimeout(() => {
            el.dataset.appeared = true
            appear(el)

            //setTimeout(() => {
                //scrollToBottom(el)
            //}, 250)
        }, 500 * binding.value)
    },
}

const VueInvisibleDirective = {
    name: 'invisible',
    bind(el, binding) {
        toInvisibleElement(el)
    },
}

const VueBoxDirective = {
    name: 'box',
    bind(el, binding) {
        assignStyle(el, {
            width: '100px',
            height: '100px',
        })
    },
    inserted(el, binding) {
        console.log('the box directive has been inserted')
    },

    update(el, binding) {
        console.log('the box directive has bene updated')
    },
}

const VueColorBindDirective = {
    name: 'color-bind',
    bind(el, binding) {
        if (!binding.value) return 
        assignStyle(el, {
            background: binding.value
        })
    },
}


const VueColorDirectiveOLD = {
    name: 'color',
    bind(el, binding) {
        assignStyle(el, {
            background: binding.value
        })
    },
    updated(el, binding) {
        return assignStyle(el, {
            background: binding.value
        })

        assignStyle(el, {
            background: randomColor()
        })
        return 
        if (binding.value) {
            console.log('got a binding.value')
        assignStyle(el, {
            background: randomColor()
        })
        }
        else {
        assignStyle(el, {
            background: 'none'
        })
            console.log('nb')
        }
    },
}

const VueAppearDirective = {
    name: 'appear',
    bind(el, binding) {
        //console.log({ LINE: 4, CALLER: 'bind', VALUE: 'hi' })
        el.style.display = 'none'
        el.style.opacity = 0
        el.dataset.appear = '0'
    },
    update(el, binding) {
        //console.log({ LINE: 10, CALLER: 'update', VALUE: 'h-i' })
        if (el.dataset.appear === '0') {
            console.log({
                LINE: 91,
                CALLER: 'update',
                VALUE: 'time-to-appear',
            })
            el.dataset.appear = '1'
            const options = 1000
            //el.style.display = 'block'
            el.style.display = 'initial'
            el.animate([{ opacity: 0 }, { opacity: 1 }], options)
        } else {
            console.log({
                LINE: 95,
                CALLER: 'update@vueD',
                VALUE: '/already-appeared',
            })
        }
    },
}

function vueStoreFactory(key, method, callback, setKey) {
    return function vueStoreRunner(state, ...args) {
        //doglog()
        let store = state.$store
        store.commit(method, ...args)
        let value = store.getters[key]
        if (value == null) {
             value = store.state[key]
        }

        if (callback) {
            value = callback(value, state, args)
        }

        if (setKey) {
            state[setKey] = value
        }

        return value
    }
}


const dynamicComponentTemplate = '<div> <transition name="fade" mode="out-in"> <component @next="next" :is="computedComponent" v-bind="computedProps" :key="rootIndex" :ref="computedRef" :class="computedComponent" /> </transition> </div>'

function nextHelperFactory(items) {
    const length = isNumber(items) ? items : items.length
    return function nextHelper(index) {
        if (index < length - 1) {
            return true
        }
    }
}
function addPropertyOnce(o, ...args) {
    if (args.length == 2 && !o.hasOwnProperty(args[0])) {
        return addPropertyLambda2(o, ...args)
    }

    if (args.length == 3 && (!o[args[0]] || (o[args[0]] && !o[args[0]][args[1]]))) {
        return addPropertyLambda3(o, ...args)
    }
}

function vueNextHelperFactory(components, key, callback) {
    const nextHelper = nextHelperFactory(components)
    return function lambdaNextHelper(state) {
        let index = state[key]
        if (nextHelper(index)) {
            state[key]++
            return true
        }
        else if (callback) {
            callback(state)
            return false
        }
        else {
            console.log('finished@next')
        }
    }
}



function findStateMethodKey(state, ...keys) {
    for (let key of keys) {
        if (state.$options.methods[key]) return key
    }
}

function componentGroupBuilderFactory(x) {
    if (isFunction(x)) {
        const name = callback.name
        return function lambda(state, h, items) {
            return componentGroupBuilder(
                state, h, name, items, callback
            )
        }
    }
    if (isObject(x)) {
        const {name, renderTable} = x
        return function lambda(state, h, items) {
            const children = items.map((item, i) => {
                const callback = renderTable[item.tag]
                return callback(state, h, item, i)
            })
            return renderWrapper(h, name, children)
        }
    }
}

function componentGroupBuilder(state, h, {
    name, items, callback}) {

    const children = items.map((item, i) => {
        return callback(state, h, item, i)
    })
    return renderWrapper(h, name, children)
}


function componentBuilder(state, h, component, o) {
    assignFresh(o, {
        class: isString(component) ? component : component.name
    })
    const options = propOptionBuilder(state, o)
    console.log(options, 'propoptions')
    return h(component, options)
}

function propOptionBuilder(state, o, arg) {
    if (!exists(o)) {
        return {}
    }

    const keyPressLibrary = {}

    function keyDownHandler(e) {
        if (e.key in keyPressLibrary) {
            return keyPressLibrary[e.key].call(state, e)
        }
    }

    const functionBuilder = (k, arg1) => {
        let runner = state.$options[k] || state[k]
        let args = []

        return (arg2) => {
            if (arg2) args.push(arg2)
            if (arg1) args.push(arg1)
            runner.call(state, ...args)
        }
    }

    const propsBuilder = (x) => {
        if (isString(x)) {
            return {[x]: x}
        } else if (isObject(x)) {
            return x
        } else {
            return {propItem: x}
        }
    }

    const directiveBuilder = (name, value) => {
        if (value === null) { value = state[name] }
        name = toDashCase(name)
        return {name, value}
    }

    return Object.entries(o).reduce((acc, [k,v], i) => {
        if (isFunction(v)) {
             const value = arg ? 
                () => fn.call(state, arg)
                : fn.bind(state)
             return addProperty(acc, 'on', k, value)
        }


        let k1
        let k2

        switch (k) {
            case 'center':
              return addProperty(acc, 'style', {
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
              })

            case 'pos':
              return addProperty(acc, 'style', {
                  position: 'absolute', 
                  left: v[0],
                  top: v[1],
              })

            case 'katex':
            case 'katex':
            case 'katex':
              return addProperty(acc, 'props', k, v)
            case 'vmodel':
              addProperty(acc, 'on', 'input', (e) => {
                    state.$emit('input', e.target.value)
              })
              addProperty(acc, 'domProps', 'value', state.userInput)
              return acc

            case 'props':
                return addProperty(acc, k, propsBuilder(v))
            case 'id':
                return addProperty(acc, 'attrs', k, v)
            case 'refInFor':
                return addProperty(acc, k, true)
            case 'ref':
            case 'class':
                return addProperty(acc, k, v)

            case 'next':
            case 'respondToNext':
            case 'click':
                k1 = 'on'
                k2 = k
                return addProperty(
                    acc, k1, k2, functionBuilder(k2, v)
                )
        }

        let r = /(\w+)(Directive)|(onNative|nativeOn|on)(\w+)/
        let match = search(r, k)
        if (!match) return acc
        let [a,b] = match.filter(exists)
        doglog(a, b)
        if (b == 'Directive') {
            /* a is the name of the directive */
            return addProperty(acc, 'directives', directiveBuilder(a, v), Array)
        }


        if (b == 'Enter') {
            keyPressLibrary[b] = state.$options[k] || state[k]
            console.log(keyPressLibrary)
            return addPropertyOnce(acc, 'on', 'keydown', keyDownHandler)
        }

        if (a == 'onNative') { a = 'nativeOn' }
        if (a == 'on' || 'nativeOn') {
            b = toCamelCase(b)
            let k2 = splitCamelCase(b)[0]
            return addProperty(acc, a, k2, functionBuilder(b, v))
        }
    }, {})
}


async function request(url) {
    return await fetch(url)
        .then(response => {
            try {
                return response.json()
            }
            catch {
                return response.text()
            }
        })
}
async function fetchRandomSentence() {
    const value =  await request('https://animechan.vercel.app/api/random')
    console.log('fetched', value)
    return value
    //return await fetch('https://animechan.vercel.app/api/random')
        //.then(response => response.json())
}
function loremSimpleComponent(key) {
    return {
        props: [key],
        name: key,
        data() {
            return {
                loremId: key,
                clickCount: 0,
            }
        },
        methods: {
            sayhi() {
                console.log('hello from', this.loremId)
            },
            next() {
                console.log('nexting from', this.loremId)
                this.$emit('next')
            },
            click() {
                let click = incrementClick(this, key)
                this.clickCount = click
                console.log(click)
                if (click == 2) {
                    //console.log('suppers')
                    this.next()
                }
            },
        },
        created() {
            this.sayhi()
            this['_' + key] = this[key]
        },
        render(h) {
            const renderValue = stringify(this.$data)
            //console.log(renderValue)
            console.log('rendering', key)
            return h('pre', {
                class: key,
                on: {
                    click: this.sayhi,
                }
            }, renderValue)
        },
    }
}

function clickPropFunction(...args) {
    let key = 'click'
    let options = {}
    if (!isVue(args[0])) options = args.shift() 
    state = args.shift()
    ensureOn(options)
    options.on[key] = (x) => state[key].call(state, ...args)
    return options
}

function loremComponentsAndProps(n, componentMaker = loremSimpleComponent) {
    const components = []
    const props = []
    const names = []
    for (let i = 0; i < n; i++) {
        let letter = n2char(i)
        let name = letter.repeat(3)
        let component = componentMaker(name)
        let prop = loremSimpleProp(name)
        components.push(component)
        props.push(prop)
        names.push(name)
    }
    return [components, props, names]
}
function loremSimpleProp(key) {
    return {
        [key]: key
    }
}


function vueGetComponentMethods(state) {
    return Object.keys(state.$options.methods)
}

function onceFunctionFactory(fn) {
    let value
    return function lambda(...args) {
        if (value) return value
        value = fn(...args)
        return value
    }
}

function addVuePropKey(childComponent, key) {
    if (!childComponent.props) {
        childComponent.props = [key]
    }
    else if (childComponent.props.includes(key)) {
        childComponent.props.push(key)
    }
    return true
}

function vueDispatch(vue, event, target, once) {
  const parent = vue.$parent;
  const isTarget = (a, b) => {
      return a == b
  }

  if (parent) {
    if (isTarget(target, parent.$options.name)) {
      parent.$emit.apply(parent, ...event);

      if (once) return;
    }
    dispatch(parent, event, target, once);
  }
}

function renderDataComponent(h, state, methodKey) {
    function clickHandler() {
        const methods = vueGetComponentMethods(state)
        if (methodKey && methods.includes(methodKey)) {
            state[methodKey]()
        } else {
            sayhi()
        }
    }

    const renderValue = stringify(state.$data)
    return h(
        'pre',
        {
            class: 'data-component',
            on: {
                click: clickHandler,
            },
        },
        renderValue
    )
}


function g(x, mode = Object) {
    function getter(x) {
        if (isArray(x)) {
            return reduce(x, runner)
        }
        return runner(x)
    }
    function runner(x) {
        return getAncestry(x)
        const value = {
            id: x._uid,
            refs: exists(x.$refs) && Object.keys(x.$refs),
            tag:
                x.$options.propsData &&
                x.$options.propsData._componentTag,
            ancestry: getAncestry(x),
        }
        return mode == Object ? value : JSON.stringify(value)
    }
    function getAncestry(x) {
        let store = []
        let type

        while (x.$parent) {
            let name = x.constructor.name
            let options = x.$options
            if (options.name) {
                store.push(options.name)
            } else if (name == 'Vue') {
                console.log(x._uid, 'uid')
                store.push('root')
            } else if (name == 'VueComponent') {
                const r = /vue-component-?\d*/
                store.push(x.$vnode.tag.replace(r, ''))
            } else if (options.template) {
                store.push(options.template.trim())
            } else {
                store.push('noname')
            }
            x = x.$parent
        }
        return store
    }
    y = getter(x)
    console.log(y)
    return y
}




function appearDirective(i) {
    return {
        name: 'timeline',
        value: i,
    }
}




function isFocusableComponent(x) {
    return x.key == 'SimpleQuestionComponent'
}


function transitionWrapper(h, className, children) {
    if (arguments.length == 2) {
        children = className
        className = ''
    }

    const props = {
        props: { name: 'fade', mode: 'out-in', tag: 'div'}
    }

    const opts = {
        class: className || ''
    }

    if (isArray(children)) {
        return h('div', opts, [h('transition-group', props, children)])
    } else {
        console.log('hi', opts, props)
        return h('div', opts, [h('transition', props, children)])
    }
}
function bindStateFunctionWithArgs(state, fn, ...args) {
    const noRunner = (...args) => {
        console.log('hi from nnoremap runner', args)
        console.log('fn doesnt exist', [fn])
    }
    let runner = isFunction(fn) ? fn : state[fn]
    if (!runner) {
        runner = noRunner
    }
    else {
        console.log('got a runner', fn, 'jjjjjjjj')
    }
    return () => {
        console.log('biond runner has been called')
        runner.call(state, ...args)
    }
}

function bindStateFunction(state, fn) {
    return isFunction(fn) ? fn.bind(state) : state[fn].bind(state)
}
function bindProps(props, state) {
    if (props.on) {
        for (let [k, v] of Object.entries(props.on)) {
            props.on[k] = bindStateFunction(state, v)
        }
    }
    return props
}
function renderFromComponentAndPropsFactory(component, props) {
    return function render(h, state) {
        const options = 
            !props ? 
            {} :
            isObject(props) ? 
            bindProps(props, state) :
            { props: { childPropData: props } }

        injectRespondToNextPropOption(state, options, component)

        return h(component, options)
    }
}

function loremCreateLetterComponents(s) {
    return console.log("NOT IN USE")
    const f = renderFromComponentAndPropsFactory
    const a = (x) => {
        return f(LetterQuestionComponent, x)
    }
    const b = (x) => {
        return f(LetterComponent, x)
    }

    let items = split(s, '')
    items = items.map((x) => x.repeat(3))
    items = items.map(mapConditional(/^x$/, a, b))
    return items
}




function loremVerySimpleComponent(key) {
    return {
        data() {
            return {
                fallback: 'loremVerySimpleFallback-' + key
            }
        },
        props: [key],
        render(h) {
            const value = this[key] || this.fallback
            return h('div', value)
        },
    }
}



function isDirectiveObject(x) {
    return isObject(x) && x.name
}




function addPropertyKey(object, key, value) {
    if (!object.hasOwnProperty(key)) {
        object[key] = getValueFromStringCase(value)
    }
}
function curryEmptyStart(fn) {
    return function curryFactory(...args) {
        return function curryRunner(...bargs) {
            return fn(...bargs, ...args)
        }
    }
}


function getValueFromStringCase(value) {
    if (typeof value == 'object') {
        return getValueFromStringCase(JSON.stringify(value))
    }

    switch (value) {
        case '{}': return {}
        case '[]': return []
    }
    if (test(/^\[/, value)) { return getWords(value) }
    return value
}

function vueGatherArgs(args) {
    if (args.length == 1) {
        return [{}, args[0]]
    } else if (args.length == 2) {
        if (isString(args[0])) {
            args[0] = {
                class: args[0]
            }
        }
        return args
    } else {
        console.log(); throw 'only 1 or 2 args accepted.'
    }
}


function looksLikeVueOptions(x) {
    if (!isObject(x)) return false
    const keys = ['ref', 'class', 'directives', 'on', 'style', 'scopedSlots']
    for (let key of keys) {
        if (key in x) {
            return true
        }
    }
}
function renderWrapper(h, options, ...components) {
    const parentOptions = looksLikeVueOptions(options)
        ? options
        : isObject(options)
        ? {props: options}
        : { class: options || 'render-wrapper-default' }
    return h('div', parentOptions, gatherArgs(components).filter(exists))
}

function vueRenderFactoryHelper(tag = 'div', fn = identity) {
    return function lambdaRenderer(h, ...args) {
        const [options, value] = vueGatherArgs(args)
        return h(tag, options, fn(value))
    }
}

const LetterQuestionComponent =
    loremVerySimpleComponent('childPropData')
const LetterComponent =
    loremVerySimpleComponent('childPropData')

function emitNext(state, data) {
    const name = state.$options.name 
    state.$emit('next', name, data)
}




function vueSetupErrorHandler() {
     Vue.config.errorHandler = (err, vm, info) => {
         console.log('error')
         console.log(err.stack)
         throw new Error('stop')
     }
}


function addClasses(o, ...args) {
    o.class = args.join(' ')
}

function addDirectives(o, value, ...args) {
    ensureDirectives(o)
    for (let arg of args) {
        o.directives.push({name: arg, value})
    }
    return o
}









function renderTimelineComponent(h, state, childComponent) {

    /* 
     * state.timeline must be defined @state
     * childprop must be defined as timelineItem
     * or it will be implicitly added @addVuePropKeyOnce
     * because this function hardcodes the key as 'timelineItem'
     * see line 791
     * */

    addVuePropKeyOnce(childComponent, 'timelineItem')

    const children = state.timeline.map((timelineItem, i) => {
        const options = {
            props: { timelineItem },
            key: i,
        }

        injectRespondToNextPropOption(
            state,
            options,
            childComponent, /* optional */
            'respondToNext',  /* optional */
        )

        return h(childComponent, options)
    })
    return transitionWrapper(h, 'transition-wrapper', children)
}




function createTimelineSources() {
    const timelineSources = ['a', 'b', 'c', 'd', 'e'].reduce(
        (acc, item, i) => {
            let key = item.repeat(3)
            let n = char2n(item)
            for (let i = 0; i < n + 1; i++) {
                let value =
                    item + 'x' + n2char(rng(10 + i)).repeat(i)
                acc.add(key, value)
            }
            return acc
        },
        new Storage()
    ).value
}




function componentsFromSchema(s) {
    /* it should construct a pretty large data structure */
    /* serialize && deserialize it
     * structures are inherently tied to data
     *
     *
     * */
    let items = split(s, '')
    pairlog('[componentsFromSchema, items]', items)
    const f = renderFromComponentAndPropsFactory
    //items = [GQ]
    return items.map((item, i) => {
        return f(...getComponentAndProps(item))
    })

    function getComponentAndProps(x) {
        switch (x) {
            case 'g':
            case 'i':
            case 'x':
            case 'x':
            case 'x':
            case 'x':
                return [QC]
            default:
                return [LVSC, x]
        }
    }
}

function getVnodesFromSchema(h, state, schema) {
    const children = componentsFromSchema(schema)
    return children.map((x) => x(h, state))
}

//const dynamicComponentTemplate = '<div> <transition name="fade" mode="out-in"> <component @next="next" :is="computedComponent" v-bind="computedProps" :key="rootIndex" :class="computedComponent" /> </transition> </div>'
//vueSetupErrorHandler()

const incrementClick = vueStoreFactory('clicks', 'click', (x, state, args) => (x[args[0]] || 0) - 1, 'clickCount')
const renderPre = vueRenderFactoryHelper('pre', stringify)
const LVSC = loremVerySimpleComponent('childPropData')
const addPropertyKeyFactory = curryEmptyStart(addPropertyKey)
const ensureOn = addPropertyKeyFactory('on', '{}')
const ensureDirectives = addPropertyKeyFactory('directives', '[]')
//const colorDirectivePropOption = propOptionFactory('color')
//const enterPropOption = propOptionFactory('keydown', 'onEnter')
//const appearPropOption = propOptionFactory('directive', 'appear')
//const injectRespondToNextPropOption = propOptionInjectionFactory('next')
//const addVuePropKeyOnce = onceFunctionFactory(addVuePropKey)

//const clickPropOption = propOptionFactory('click')
//const clickPropOption = propListenerFactory('click')

function vueGetName(state) {
    
    try {
        return state.$options.name ||
                    state.$options.propsData._componentTag
    }
    catch(e) {
    return null
    }
}
class VueTree {
    constructor(root) {
        this.store = vueTree(root)
    }
    get(target) {
        const key = expensiveFuzzyFind(key, this.store)
        y = this.store[key]
        return y
    }
}
function vueTree(root) {
    const store = {}
    function runner(x) {
        for (let item of x.$children) {
            const key = vueGetName(item) || item._uid
            store[key] = item
            runner(item)
        }
    }
    runner(root)
    return store
}

function gvi(x, simple) {
    const value = simple ? {
        uid: x._uid,
        name:
            x.$options.name ||
            (x.$options.propsData &&
                x.$options.propsData._componentTag) || 'no-name',
    } :
    {
        uid: x._uid,
        dataKeys: x.$data && Object.keys(x.$data),
        propKeys: x.$props && Object.keys(x.$props),
        name:
            x.$options.name ||
            (x.$options.propsData &&
                x.$options.propsData._componentTag),
    }
    //console.log(value)
    return value
}


function renderList(h, items, component) {
  const children = items.map((item, i) => {
    return h(component, { 
        props: item,
        key: i,
    })
  })
  return transitionWrapper(h, children)
}




function vueWindowListener(vue) {
    const listener = vue.listener.bind(vue)
    window.addEventListener('keydown', listener)
    return () => {
        console.log('removing listener')
        window.removeEventListener('keydown', listener)
    }
}




function RHF(state, h) {
    return function lambda(item, i) {
        const component = getComponent(item.ckey)
        const propOptions = component.propOptions
        const options = propBuilder(state, item, i, propOptions)
        return h(component, options)
    }
}
function propBuilder(state, options, i) {
    const store = {}

    const props = options.props && (isObject(options.props) ?
        options.props : {value: options.props})

    if (props) store.props = props

    if (options.key == true) store.key == i
    else if (options.key) store.key = options.key
    if (options.onEnter == true) 
        if (state.onEnter) {
            addProperty(store, 'on', 'onEnter', state.onEnter.bind(state))
        } else {
            addProperty(store, 'on', 'onEnter', (...args) => {
                state.$emit('onEnter', ...args)
            })
        }
    else if (options.onEnter) {
        addProperty(store, 'on', 'onEnter', options.onEnter.bind(state))
    }

    return store
}

function renderHelper(state, h, item, i) {
    return h(getComponent(item.ckey), propBuilder(state, item, i))
}
function renderString(h, options, s) {
    return h('p', optionGetter(options), s)
}
function renderArray(state, h, items, parentOptions) {
    const filter = (x) => {
        return x.hasOwnProperty('if') ? x.if === true : true
    }
    const children = items.filter(filter).map((item, i) => {
        return renderHelper(state, h, item, i)
    })
    parentOptions = optionGetter(parentOptions)
    return h('ul', parentOptions, children)
}
function propagateEmit(e) {
    this.$emit(key, e)
}

function renderSvg(h, key, options = {}) {
    const child = {template: svgs[key]}
    return h(BaseIcon, options, child)
}
function optionGetter(parentOptions) {
  if (isString(parentOptions)) {
    parentOptions = {
      class: parentOptions,
    }
  }
  return parentOptions
}

function transitionElement(h, children) {
    const props = {
        props: { name: 'fade', mode: 'out-in', tag: 'div'}
    }
    return h('transition', props, children)
    return h('div', [h('transition', props, children)])
}

function $create(classFn) {
    let name = '$' + getFunctionName(classFn.toString())
    let state = this
    if (state[name]) return state[name]
    const fn = new classFn()
    state[name] = fn
    return fn
}


const VueRotationDirective = {
    name: 'rotation',
    bind(el, binding) {
        el.style.transition = 'transform 1s'
        el.style.transformStyle = 'preserve-3d'
    },
    update(el, binding) {
        let rotation = binding.rotation
        el.style.transform = `rotateY(${rotation * 180}deg)`
    }
}
const VueColorPickerHighlightDirective = {
    name: 'color-picker-highlight',
    update(el, binding) {
        let [i, j, x, y] = binding.value
        if (i == y && j == x) {
            //console.log([i, j, x, y])
            modal('good to go!')
            //scrollIntoView(el)
            highlight(el)
        }
    }
}


const VueColorDirective = {
    name: 'color',
    bind(el, binding) {
        el.style.transition = 'background 1s'
    },
    update(el, binding) {
        el.style.color = binding.style.color
        el.style.background = binding.style.background
    }
}

const GeneratorPlugin = {
    install(Vue, options) {
        const generator = new QuestionController()
        const student = new Student()
        Vue.prototype.$generator = generator
        Vue.prototype.$student = student
        Vue.prototype.$create =  $create
        vuetify(VueRotationDirective)
        vuetify(VueColorDirective)
        //vuetify(VueColorBindDirective)
        //vueSetupErrorHandler()
        vuetify(vueDispatch)
        vuetify(VueFocusItDirective)
        vuetify(VueKatexDirective)
        vuetify(VueDisableItDirective)
        vuetify(VueBoxDirective)
        vuetify(VueScrollDirective)
        vuetify(VueColorPickerHighlightDirective)


    },
}
