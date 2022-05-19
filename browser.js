function postMessage(data) {
    window.parent.postMessage(stringify(data))
}
function iframeParentListener(callback) {
    if (!callback)
        callback = (x) => {
            console.log(x, 'was got from the child iframe')
        }
    window.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)
        callback(data)
    })
}

function launch(c, o) {
    app = new Vue(c).$mount('#app')
    for (let [key, value] of Object.entries(o || {})) {
        if (typeof window[key] == 'undefined') {
            window[key] = value
            //console.log('seetting an alias', key)
        } else {
            //console.log(key, 'is already defined')
        }
    }
}

function downloadLocalStorage(key) {
    const value = key ? getStorage(key) : runner()
    download('local-storage.json', value)
    function runner() {
        return JSON.stringify(localStorage)
    }
}

function download(file, content) {
    if (!exists(content)) {
        return
    }

    if (isJson(file)) {
        content = stringify(content)
    } else {
        switch (type(content)) {
            case 'Object':
            case 'Storage':
                content = joined(Object.values(content))
                break
            case 'Array':
                content = joined(content)
                break
        }
    }

    const element = createElement('a', {
        href:
            'data:text/plain;charset=utf-8,' +
            encodeURIComponent(content),
        download: file,
    })

    element.click()
    element.remove()
}

function setStorage(key, value = '', birth = null) {
    if (!exists(value)) return
    localStorage.setItem(key, stringify(value, birth))
}

function getStorage(key, fallback = {}, revive = null) {
    let item = localStorage.getItem(key)
    return item
        ? parseJSON(item, revive)
        : getFallback(fallback)

    function getFallback(x) {
        if (x == null) {
            return ''
        }

        if (x == Array) {
            return []
        }

        if (x == Object) {
            return {}
        }

        if (x == String) {
            return ''
        }

        if (x == Number) {
            return 0
        }
        return x
    }
}

function getBoundingClientRect(element) {
    let { height, width, top, left } =
        element.getBoundingClientRect()

    left += window.scrollX
    top += window.scrollY

    return {
        height: height + 'px',
        width: width + 'px',
        left: left + 'px',
        top: top + 'px',
    }
}

function isTypable(e) {
    if (e.altKey || e.ctrlKey) return
    let s = e.key || e
    return s.length == 1 || s == ''
}

function clearStorage(key) {
    key ? delete localStorage[key] : localStorage.clear()
}

function getClipboard(s) {
    return navigator.clipboard.readText()
}

function setClipboard(s) {
    if (!exists(s)) {
        return
    }
    console.log('setting clipboard')
    return navigator.clipboard.writeText(stringify(s))
}

function scrollToTop(element) {
    if (!element) {
        window.scrollTo(0, 0)
        return
    }
    element.scrollTop = 0
}

function scrollToBottom(element) {
    if (!element) {
        //window.scrollTo(0, document.body.scrollHeight);
        window.scrollTo({ bottom: 0, behavior: 'smooth' })
        return
    }
    //setTimeout(() => (element.scrollTop = element.scrollHeight), 100)
    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

function getStylesheets() {
    function runner(sheet) {
        try {
            //if (sheet.rules.length > 100) return
            return Array.from(sheet.cssRules).map(
                (x) => x.cssText
            )
        } catch (e) {
            return null
        }
    }
    return Array.from(document.styleSheets)
        .map(runner)
        .filter(exists)
}

function removeStylesheets() {
    Array.from(document.styleSheets).forEach((sheet) => {
        sheet.disabled = true
        sheet.parentNode.removeChild(sheet)
    })
}

function speak(input, rate = 1) {
    if (!exists(input)) {
        //console.log('noinout')
        return
    }
    //console.log(input)
    if (rate < 0.1 || rate > 1 || !isNumber(rate)) rate = 1
    isArray(input) ? (input = input.join(' ')) : input
    const utter = new SpeechSynthesisUtterance()
    utter.rate = rate
    utter.pitch = 0.9
    utter.text = input.trimStart() || 'empty'
    utter.onsuccess = function () {
        //console.log('@onsuccess successful speak')
    }
    utter.onerror = function (e) {
        //console.log(e.error)
        //console.log('@onerror error at sp = k')
    }
    window.speechSynthesis.speak(utter)
}

function pretty(s, lang = 'js') {
    const prettierRef = {
        js: {
            parser: 'babel',
            plugins: prettierPlugins,
            arrowParens: 'always',
            bracketSpacing: true,
            printWidth: 70,
            tabWidth: 4,
            semi: false,
            singleQuote: true,
        },
        html: {
            parser: 'html',
            plugins: prettierPlugins,
        },
    }

    return prettier.format(s, prettierRef[lang || inferlang(s)])
}

function getFirstClassName(s) {
    return search(/[\w-]+/, s)
}
//function getClassName(s) {
//return getFirstClassName(s.className)
//}
function getClassNames(x, mode) {
    const fn = mode == 'all' ? split : getFirstClassName

    function getter(s) {
        return findall(/class="(.+?)"/g, s)
    }
    function runner(html) {
        return unique(flat(getter(html).map((x) => fn(x))))
    }

    if (x && isElement(x)) {
        return unique(split(x.className))
    } else {
        return runner(htmlgetter(x))
    }
}

function autoScroll(e) {
    e.scrollTop = e.scrollHeight
}

function elementgetter(el) {
    if (!el) {
        return
    }
    if (isVueNode(el)) {
        return el.$el
    }

    if (isElement(el)) {
        return el
    }

    if (isString(el)) {
        const selector = fixSelector(el)
        const value = document.querySelector(selector)
        return value
    }
}
function assignStyle(el, style) {
    if (isString(style)) {
        if (isCssWord(style)) {
            el.classList.add(style)
            return
        }
        style = cssEvaluator(style)
    } else if (style) {
        Object.assign(el.style, style)
    }
}

class StorageSystem {
    constructor(key) {
        if (!key) key = toDashCase(getCaller(-1))
        this.key = key
        this._store = getStorage(this.key, {})
        this.config = {
            automaticUpload: false,
        }

        window.addEventListener('beforeunload', () => {
            if (this.touched) return
            if (this.config.automaticUpload) this.upload()
        })
    }

    get() {
        return this._store
    }

    upload() {
        this.touched = true
        const value = this._upload
            ? this._upload()
            : this._store
        console.log('uploading', this.key, this._store)
        setStorage(this.key, _this.store)
    }
}

class StorageSystem2 {
    constructor(options = {}) {
        this.key = options.key
        const [transformer, reviver] = options.revive
            ? [functionStringBirth, functionStringRevive]
            : [null, null]

        this.store = getStorage(this.key, {}, reviver)

        window.addEventListener('beforeunload', () => {
            if (options.exit) {
                const store = isFunction(options.exit)
                    ? options.exit(this.store)
                    : this.store
                setStorage(this.key, store, transformer)
            }
        })

        if (options.enter) {
            options.enter(this.store)
        }
    }

    get(key) {
        return this.store[key] || ''
    }

    set(key, value) {
        if (value == null) return
        this.store[key] = value
    }

    reset() {
        this.store = {}
    }

    static normalizeDateKey(key) {
        if (isDate(key && !isToday(key))) {
            return datestamp()
        }
        return key
    }

    static dateKey() {
        let n = 0
        let base = datestamp()
        while (Math.abs(n) < 3) {
            let date = changeDate(base, n--)
            if (date in localStorage) {
                return date
            }
        }
        return base
    }
    static normalizeData(key, data) {
        if (!exists(data)) {
            return { [key]: '' }
        } else if (isString(data)) {
            return { [key]: data }
        } else {
            return data
        }
    }
}

function scroll(y) {
    window.scrollTo(0, y)
}

function scrollDown() {
    scroll(1000)
}

function scrollUp() {
    scroll(0)
}

function toggleStyle(el, key) {
    let value = el.style[key]
    el.style[key] = opposite(value)
}
function highlight(el) {
    const inOutOptions = {
      duration: 500,
      iterations: 1,
      easing: 'ease-in-out',
      direction: 'alternate',
      fill: 'forwards',
    }

    el.animate([
        {
            opacity: 0.3,
            offset: 0.5,
        }
    ], inOutOptions)
}
function highlightElement(base, other) {
    const element = elementgetter(other)
    //console.log(element, 'xxxxxxxxxxxxxxxxxxxxx')
    assignStyle(
        base,
        boundingTransform(getBoundingClientRect(element))
    )
    toggle(base.style, 'opacity', 0, 0.5)
}
function logJsonBinResult(x) {
    console.log(x)
}

function boundingTransform(x) {
    return x
}

function isNode() {
    return (
        typeof window === 'undefined' ||
        typeof navigator === 'undefined'
    )
}
function speakChinese(s) {
    const utterThis = new SpeechSynthesisUtterance(s)
    utterThis.voice = getVoice()
    synth.speak(utterThis)
}

function getVoice() {
    if (typeof __voice__ != 'undefined') return __voice__
    var synth = window.speechSynthesis
    var voices = synth.getVoices()
    __voice__ = voices.filter(
        (voice) => voice.lang.indexOf('zh') === 0
    )[3]
    return __voice__
}

function isBrowser() {
    return (
        exists(localStorage) && Object.keys(localStorage).length
    )
}

function fullScreenFactory() {
    let count = 0
    let element = document.documentElement

    function openFullscreen() {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
            /* Safari */
            element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
            /* IE11 */
            element.msRequestFullscreen()
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }

    return function toggleFullScreen() {
        isEven(count++) ? openFullscreen() : closeFullscreen()
    }
}

function htmlgetter(s) {
    if (!s) {
        return document.body.innerHTML
    }
    if (isElement(s)) {
        return s.innerHTML
    }
    if (isHtml(s)) {
        return s.trim()
    }

    return elementgetter(s).innerHTML
}

function stylegetter(element, ...args) {
    const ref = window.getComputedStyle(element)
    return reduce(args, (x) => {
        const key = toDashCase(x)
        return [key, ref.getPropertyValue(key)]
    })
}
function findElementByText(query, tag = 'div') {
    var xpath = `//${tag}[text()='${query}']`
    var element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue
    return element
}

function initWindowErrorListener() {
    function onError(error, url, lineNumber) {
        console.log(
            stringify({
                error: error.toString(),
                url,
                lineNumber,
            })
        )
    }
    window.onerror = onError
}

class WindowManager extends StorageSystem {
    constructor() {
        super()
        this.originalWindow = {}
        for (let [k, v] of Object.entries(super.get())) {
            this.originalWindow[k] = window[k]
            this.defineVariable(k, v)
        }
    }
    remove(key) {
        delete this.store[key]
        window[key] = this.originalWindow[key]
    }
    defineVariable(k, v) {
        if (isNull(v)) {
            announce(-1, k)
            return
        }
        this.store[k] = v
        const value = bringToLife(v)
        mergeState(window, k, value)
    }
}

function onWindowUnload(...args) {
    const [key, value] = argumentFiller(args, datestamp())
    window.addEventListener('beforeunload', () => {
        setStorage(key, value())
    })
}
function staticExit(key, value) {
    window.addEventListener('beforeunload', () => {
        setStorage(key, fparse(value))
    })
}

function scrollIntoView(el) {
    //return el.scrollIntoViewIfNeeded()
    if (!elementInWindow(el)) {
        el.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        })
    }
}
function elementInWindow(el) {
    if (
        el.getBoundingClientRect().bottom > window.innerHeight
    ) {
        return false
    }

    if (el.getBoundingClientRect().top < 0) {
        return true
    }
}
function getElementName(el) {
    return el.className || el.tagName
}

function isHtmlElement(x) {
    return (
        x &&
        x.constructor &&
        test(/^HTML.*?Element$/, x.constructor.name)
    )
}

function animationFactory(key, start, end) {
    return function animationRunner(el, options = {}) {
        el = toElement(el)
        const delay = pop(options, 'delay')
        if (pop(options, 'invisible')) toInvisibleElement(el)
        if (!options.duration) options.duration = 1000

        if (delay) {
            return setTimeout(() => {
                return animationRunner(el, options)
            }, delay)
        }

        const frames = [{ [key]: start }, { [key]: end }]
        //console.log('appearing an element', el)

        if (el.style.display == 'none') {
            el.style.display = 'block'
        }

        if (el.style.visibility == 'hidden') {
            el.style.visibility = 'visible'
        }

        el.style[key] = start
        scrollIntoView(el)

        const animation = el.animate(frames, options)
        //console.log(animation)
        //console.log(frames)
        return animation.finished.then(() => {
            el.style[key] = end
            return true
        })
    }
}

function elt(html) {
    const element = document.createElement('div')
    element.innerHTML = html
    return element
}
function createElement(
    tag = 'div',
    options = null,
    parent = document.body
) {
    if (tag == 'style' || tag == 'link' || tag == 'script') {
        parent = document.head
    } else if (isHtmlElement(tag)) {
        parent = tag
        tag = 'div'
        options = null
    }

    const element = document.createElement(tag)
    setAttributes(element, options)
    parent.appendChild(element)
    return element
}

function setAttributes(element, options) {
    if (options) {
        for (let [k, v] of Object.entries(options)) {
            if (v) element.setAttribute(k, v)
        }
    }
}

function cssLoader(s, el) {
    if (!exists(s)) {
        return
    }
    if (!el) {
        el = createElement('style')
    }

    s = removeAllComments(s)
    const css = cssParseFromString(s)
    console.log(css)
    el.innerHTML ? (el.innerHTML += css) : (el.innerHTML = css)

    return el
}

function addKeyListenerFactory(keypress, gn) {
    return function listener(fn) {
        return window.addEventListener(keypress, (e) => {
            if (gn) gn(e)
            fn(e.key)
        })
    }
}

const toggleFullScreen = fullScreenFactory()
const appear = animationFactory('opacity', 0, 1, 1000)
const disappear = animationFactory('opacity', 1, 0, 1000)

function isMac() {
    return typeof navigator != 'undefined'
        ? /Mac/.test(navigator.platform)
        : false
}
function toElement(el) {
    const name = el.constructor.name
    if (name == 'VNode') {
        return el.elm
    }

    if (name == 'HtmlElement') {
        return el
    }
    if (el.$el) return el.$el
    return el
}

function toInvisibleElement(el) {
    el = toElement(el)
    if (el.dataset.invisible) return
    el.style.display = 'none'
    el.style.opacity = 0
    el.dataset.invisible = '1'
}

function checkExistingScripts() {
    return Array.from(
        document.getElementsByTagName('script'),
        (x) => tail(x.src)
    ).filter(exists)
}

function checkExistingCss() {
    return Array.from(
        document.getElementsByTagName('link'),
        (x) => tail(x.href)
    ).filter(exists)
}

function webLoader(...dependencies) {
    const [scriptDependencies, cssDependencies] = partition(
        gatherArgs(dependencies),
        isJavascriptFile
    )

    const existingCss = checkExistingCss()
    const existingJs = checkExistingScripts()
    const js = unique(scriptDependencies, existingJs)
    const css = unique(cssDependencies, existingCss)
    css.forEach(cssFileLoader)
    return waterfall2(js.map(scriptFileLoader))
}
function fileLoader(dependencies, vueComponentKey) {
    const [scriptDependencies, cssDependencies] = partitioned(
        dependencies,
        isJavascriptFile
    )
    const existingCss = checkExistingCss()
    //console.log(existingCss)
    const existingJs = checkExistingScripts()
    //console.log(existingJs)
    //console.log(); throw ''

    const css = unique(cssDependencies, existingCss)
    css.forEach(cssFileLoader)

    const scripts = unique(scriptDependencies, existingJs)

    scripts.forEach((item, i, arr) => {
        setTimeout(() => {
            scriptFileLoader2(item)
        }, 500 * i)
        if (i == arr.length - 1) {
            setTimeout(() => {
                loadVue(vueComponentKey)
            }, 500 * i * 2)
        }
    })

    //return waterfall(scripts.map(scriptFileLoader)).then(() => {
    //loadVue(vueComponentKey)
    //})
}

function scriptFileLoader(url, i) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        const delay = globalJavascriptLibraries.includes(url)
            ? 0
            : 1000 + i * 250
        script.src = url
        script.defer = true
        script.async = false
        script.charset = 'utf8'
        script.addEventListener('load', () => {
            console.log('loading file', url)
            setTimeout(resolve, delay, true)
        })
        document.head.appendChild(script)
    })
}

function loadVue(component, parent) {
    if (!component) return
    console.log('loading the vue')

    let name = 'app2'
    //let key = 'app1'
    //while (variableExists(key)) {
    //key = incrementName(key)
    //}

    const options = { id: name }
    if (!parent) parent = document.body
    else parent = elementgetter(parent)
    const div = createElement('div', options, parent)
    setTimeout(() => {
        let code = `new Vue(${component}Component).$mount('#${name}')`
        console.log(code)
        eval(`${name} = ${code}\nconsole.log(${name})`)
    }, 500)
}
function loadStylesheets(...stylesheets) {
    stylesheets.forEach(cssFileLoader)
}
function cssFileLoader(file) {
    return createElement(
        'link',
        {
            rel: 'stylesheet',
            href: file,
        },
        document.head
    )
}
function scriptLoader(scripts) {
    return waterfall(scripts.map(scriptFileLoader))
}

function loadEc(key = 'element-controller.js') {
    const componentKey = toPascal(removeExtension(key))
    let dependencies
    scriptFileLoader2('filebins.js')

    setTimeout(() => {
        dependencies = find(filebins, (bins) =>
            bins.includes(key)
        )
    }, 100)

    setTimeout(() => {
        fileLoader(dependencies, componentKey)
    }, 200)
}
// add this to removeCallables

function scriptFileLoader2(url) {
    console.log('loading script', url)
    return createElement('script', {
        defer: true,
        charset: 'utf8',
        src: url,
    })
}

function toggleAnimationFactory(key, value, duration = 1000) {
    return function animationRunner(
        el,
        options = {
            duration,
        }
    ) {
        el = el ? toElement(el) : document.body

        const start = el.style[key]
        const frames = [
            { [key]: start },
            { [key]: value },
            { [key]: start },
        ]

        el.animate(frames, options)
        //console.log('animating element', getElementName(el))
    }
}
const flash = toggleAnimationFactory(
    'background',
    'yellow',
    2000
)
const appearDisappear = toggleAnimationFactory('opacity', 1)

function modal(value) {
    if (typeof __el__ == 'undefined') {
        __el__ = createElement()
        enforce('document.body.style.position == relative')

        const style = {
            zIndex: '999',
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            background: 'yellow',
            fontSize: '24px',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            opacity: 0,
        }

        __caller__ = createElement(__el__)
        __value__ = createElement(__el__)

        assignStyle(__el__, style)
        assignStyle(__caller__, 'fw600 cmb7')
        assignStyle(__value__, 'fw600 cmb7')
    }
    let caller = getCaller(2)
    __caller__.textContent = caller
    __value__.textContent = value
    console.log(value)
    appearDisappear(__el__)
}

function jsonbin(data) {
    let id = '5f30add71823333f8f20b1bb'
    let apikey =
        '$2b$10$RpyRq6D2g4SIaVl.vix5W.vq33VVnyQgzeCev0fLf2pJo2LUVf8DC'

    let req = new XMLHttpRequest()

    req.open(
        data ? 'GET' : 'PUT',
        `https://api.jsonbin.io/v3/b/${id}`,
        true
    )
    req.setRequestHeader('X-Master-Key', apikey)
    req.send()
    return new Promise((resolve) => {
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const responseValue = data
                    ? req.responseText
                    : JSON.parse(req.responseText).record.value

                resolve(responseValue)
            }
        }
    })
}

function toIframe(el, s) {
    if (!s || s.length < 10) return
    const iframe = el.contentWindow
    try {
        iframe.document.open()
        iframe.document.writeln(s)
        //iframe.document.close()
    } catch (e) {
        return e.toString()
    }
}
function jsonbin(data) {
    let id = '5f30add71823333f8f20b1bb'
    let apikey =
        '$2b$10$RpyRq6D2g4SIaVl.vix5W.vq33VVnyQgzeCev0fLf2pJo2LUVf8DC'

    let req = new XMLHttpRequest()

    req.open(
        data ? 'PUT' : 'GET',
        `https://api.jsonbin.io/v3/b/${id}`,
        true
    )
    req.setRequestHeader('X-Master-Key', apikey)
    req.setRequestHeader('Content-Type', 'application/json')
    data
        ? req.send(JSON.stringify({ value: data }))
        : req.send()
    return new Promise((resolve) => {
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const responseValue = data
                    ? req.responseText
                    : JSON.parse(req.responseText).record.value

                console.log(responseValue)
                resolve(responseValue)
            }
        }
    })
}

function variableExists(v) {
    return eval(`typeof ${v} != undefined`)
}

function popupPre(s) {
    const win = window.open('', 'myWindow')
    const html = divify('pre', '', htmlEscape(s))
    win.document.write(html)
}


function popup(html) {
    const attrString = 'status=0, width=700, height=700'
    const myWindow = window.open('', 'myWindow', attrString)
    myWindow.document.write(html)
}

function xrequest(url, data, options) {
    const mode = data ? 'post' : 'get'
    if (!data && options) data = options
    return typeof axios != 'undefined'
        ? axios[mode](url, data).then((x) => x.data)
        : fetch(url, data).then((x) => x.data)
}

async function requestGithub(user, repo, file) {
    const url = `https://api.github.com/repos/${user}/${repo}/contents`
    const filepath = `https://raw.githubusercontent.com/${user}/${repo}/master/${file}`
    //console.log(url)
    //console.log(filepath)
    const value = await request(filepath)
    console.log(value)
}

async function request(url) {
    function isJsonResponse(response) {
        const type = response.headers.get('content-type')
        return type && type.indexOf('application/json') !== -1
    }

    const response = await fetch(fixUrl(url))
    return isJsonResponse(response)
        ? response.json()
        : response.text()
}

function storageSystem(key, fn) {
    let touched = false
    let data = getStorage(key, {})

    let uploader = () => {
        touched = true
        setStorage(key, fn())
    }

    window.addEventListener('beforeunload', () => {
        if (touched) return
        uploader()
    })

    return [data, uploader]
}

function announce(statusCode, message) {
    const caller = getCaller(-1)
    const statusMessage = statusCode > 0 ? 'success' : 'failure'
    console.log(['announcing', caller, statusMessage, message])
}
function prettierErrorInfo(s) {
    try {
        pretty(s)
    } catch (e) {
        z = e.toString()
        console.log({ z })
        let [name, message, line, ch] = search(
            /(\w+): (.*?) \((\d+):(\d+)\)/,
            e.toString()
        )
        ch = Number(ch)
        line = Number(line)
        return {
            name,
            message,
            line,
            ch,
        }
    }
}

function transformGist(name, value) {
    /* do it later */
    return { name, value }

    let ext = getExtension(name)
    const ignore = ['html', 'js', 'css']
    if (ignore.includes(ext)) {
        return { name, value }
    }
    switch (ext) {
        case 'scss':
            name = changeExtension(name, 'css')
            //value = convertToCss(value)
            //value = convertToHtml(value)
            break
        case 'babel':
            name = changeExtension(name, 'js')
            break
        case 'pug':
            name = changeExtension(name, 'html')
            break
    }
    return { name, value }
}

async function fetchGists(user = 'kdog3682') {
    const url = `https://api.github.com/users/${user}/gists`
    const gists = await request(url)
    return gists
}

async function chooseGists() {
    const gists = await fetchGists()

    const runner = async (item) => {
        const text = await request(item.raw_url)
        return transformGist(item.filename, text)
    }

    const filter = (x) => {
        const keep = [
            'html',
            'js',
            'css',
            'scss',
            'script',
            'babel',
            'pug',
        ]
        if (keep.includes(getExtension(x.filename))) {
            return true
        }
    }

    /* once u lose a domain ... u may lose it forever */
    /* it was a good name */
    const gist = await vueAsk(null, gists, displayGists)
    const files = Object.values(gist.files).filter(filter)
    const output = await Promise.all(files.map(runner))
    const final = transformGist(output)
    return final
}

async function vueAsk(vue, items, display) {
    vue.vtc.activate()
    announce('activating vtc')
    vue.vtc.override = (s) => {
        console.log('running the voice callback')
        if (isNumber(s)) {
            vue.answerInput = s
            console.log('setting an answer input', s)
        }
    }
    vue.displayables = display ? display(items) : items
    return await Clock.input((x) => {
        if (vue.answerInput) {
            const answerInput = vue.answerInput
            vue.answerInput = ''
            vue.vtc.deactivate()
            announce('deactivating vtc')
            const value = items[Number(answerInput) - 1]
            return value
            //return get ? get(value) : value
        }
    })
}

function displayGists(gists) {
    return gists.map((item, i) => {
        /* returns a hydrated but non-parsed component */
        return gistDisplayComponent(item)
    })
}

function findWidthOffenders() {
    ;[].forEach.call(
        document.querySelectorAll('*'),
        function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el, 'OFFENDER')
                //nex outline @ch
            }
        }
    )
}

function getKeyArg(e) {
    let key = e.key || e
    let arg = ''
    if (e.ctrlKey) arg += 'Ctrl-'
    if (e.altKey) arg += 'Alt-'
    if (e.shiftKey && (e.key == 'Tab' || e.key == 'Enter')) {
        arg += 'Shift-'
    }
    arg += key
    return arg
}

function preventDefault(e, ...args) {
    if (e.ctrlKey && !test(/[ir\-\+]/i, e.key)) {
        e.preventDefault()
    } else if (args.includes(e.key)) {
        e.preventDefault()
    }
}

function toGoogleFontUrl(key) {
    if (key == 'inter') {
        cabmap[key] = [['font-family', '"Inter"']]
        return `@import url('https://rsms.me/${key}/${key}.css');`
    }

    const ref = {
        chinese: 'Noto Sans SC',
    }

    if (key in ref) {
        /* external modifier */
        cabmap[key] = [['font-family', singlequote(ref[key])]]
    }

    key = ref[key] || key
    key = prepareGoogleFontKey(key.replace(/ /g, '+'))
    const weightAndItalics = ''
    const url = `https://fonts.googleapis.com/css2?family=${key}${weightAndItalics}&display=swap`
    const value = `@import url(${url})`
    return value
}

function classNameGetter() {
    const elements = document.getElementsByTagName('*')
    const names = Array.from(elements, (x) => x.className)
    //console.log(names)
    //let foo = names.find((x) => x == 'FOO')
    //console.log(foo, 'yes')
    //console.log(type(document.querySelector('.FOO')))
    //throw ''
    return names
}

function windowListener(state) {
    const callback = state.callback.bind(state)
    window.addEventListener('keydown', callback)
    return () => {
        window.removeEventListener('keydown', callback)
    }
}

function autoFocus(x, delay = 250) {
    setTimeout(() => x.focus(), delay)
}

function isVue(x) {
    let name = x.constructor.name
    return (
        name == 'Vue' ||
        name == 'VNode' ||
        name == 'VueComponent'
    )
    return x._isVue
}

function isVueNode(x) {
    return x._isVue || x.$el
}

async function popOpen(
    url = 'reddit.com',
    { windowName = 'foo', delay = 10000 } = {}
) {
    if (hasNewline(url)) {
        const win = window.open('', windowName)
        const html = divify('pre', '', url)
        win.document.write(html)
    } else {
        const win = window.open(url, windowName)
        await sleep(delay)
        win.close()
    }
}

const SVGPaths = {
    star: '<path d="M8 .2l4.9 15.2L0 6h16L3.1 15.4z"/>',
}
function createStar() {
    return createSvg('star', 20, 'yellow')
}
function createSvg(key, size, color) {
    let path = SVGPaths[key]
    let width = size
    let height = size
    viewBox = `${a} ${b} ${width} ${height}`
    let fill = color
    let template = `
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="${width}" 
        height="${height}" 
        viewBox="${viewBox}" 
        aria-labelledby="${name}" 
        role="presentation"
      >
        <g fill="${fill}">
          ${path}
        </g>
      </svg>
    `
    return {
        template,
    }
}
function findDescendant(parent, regex, key = 'tagName') {
    for (let child of parent.children) {
        if (test(regex, child[key], 'i')) {
            return child
        }
        return findDescendant(child, regex)
    }
}


function getScriptContext(script) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",script.src)
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("the script text content is",xhr.responseText);
    }
  };
  xhr.send();
}

function arrowListener(state, ref, init) {
    const prevent = ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'Enter']

    if (init) {
        isFunction(init) ? init(state) : 
        Object.assign(state, init)
    }

    const listener = (e) => {
        if (e.key in ref) {
            const value = ref[e.key](state)
            if (value || prevent.includes(e.key)) {
                e.preventDefault()
            }
        }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
}

function motion(el, positions) {
  const options = {
      duration,
      easing,
      fill: 'forwards',
  }
  let unit = 'px'

	const keyframes = positions.map(([x,y], i) => {
      return {
          transform: `translate(${x}${unit}, ${y}${unit})`
      }
  })
  return el.animate(keyframes, options).finished
}

