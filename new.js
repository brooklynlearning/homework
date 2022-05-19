const PASSWORDS = ['a', 'b', 'c']
const Login = {
    name: 'Login',
    template: `
        <div class="home-page">
            	<div v-if="newUser" class="login-component">
            	    <div class="login-grid">
            			<span class="login-text colon">name</span>
            			<input autofocus class="login-input" v-model="username"/>
            			<span class="login-text colon">password</span>
            			<input class="login-input" v-model="password" type="password"/>
            		</div>
            			<button class="login-submit-button btn" @click="submit">submit</button>
            	</div>
        </div>
	`,
    data() {
        return {
            title: 'First math challenge',
            newUser: true,
            username: '',
            password: '',
            progression: 0,
        }
    },
    methods: {
        submit() {
            if (PASSWORDS.includes(this.password)) {
                this.progression += 1
            }
        },
    },
    mounted() {
        let history = getStorage('history')
        if (history.username) {
            this.username = history.username
            this.newUser = false
        }
    },
}

function generatePassword({
    length = 6,
    capitals = false,
    numbers = true,
    startingNumber = false,
}) {
    let charset = 'abcdefghijklmnopqrstuvwxyz'
    if (capitals) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (numbers) {
        charset += '0123456789'
    }

    let s = ''
    for (var i = 0, n = charset.length; i < length; ++i) {
        s += charset.charAt(Math.floor(Math.random() * n))
    }
    return s
}
const DateDisplay = {
    name: 'DateDisplay',
    template: `
    <div class="date-display">
        <div>
          <div class="weekday">{{weekday}}</div>
          <div class="date-expr">{{dateExpr}}</div>
          <div class="time-container" v-visible="progression == 4">
            <p class="p">challenge started at:</p>
            <div class="time-expr">{{timeExpr}}</div>
          </div>
        </div>
    </div>
	`,
    data() {
        return {
            weekday: '',
            dateExpr: '',
            progression: 0,
            timeExpr: '',
        }
    },
    created() {
        const { day, phrase } = datePhrase()
        this.weekday = day
        this.dateExpr = phrase
    },
}

const HomePage = {
    components: { Login, DateDisplay },
    name: 'HomePage',
    template: `
        <div class="home-page">
              <div class="">
                	<div class="title">{{title}}</div>
                  <date-display/>
                  <login/>
              </div>

              <div class="">
                  <floating-math/>
                  <do-great :value="username"/>
                  <button class="">begin challenge</button>
              </div>
        </div>
    `,
    data() {
        return {
            title: 'First math challenge',
        }
    },

}


//Sam,
//You are going to do
//GREAT.


const DoGreat = {
  name: 'DoGreat',
  props: ['username', 'history'],
  data() {
    return {
      stack: [],
    }
  },
  render(h) {
    const self = this
  },
  methods: {
      
  },
  mounted() {
      const self = this
      this.clock = new Clock({
          onTick() {
              self.stack.push()
          },
      })
  },
}


