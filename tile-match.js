const TileQuestion = QuestionDisplay
const TileAnswer = QuestionDisplay
const TileSetup = {
    name: 'TileSetup',
    props: ['value'],
    render(h) {
        let [a,b] = this.value
        return h('div', [
            h(QuestionDisplay, {props: a}),
            h(QuestionDisplay, {props: b}),
        ])
    },
}

const VueTileMatch = {
    components: {TileQuestion},
    name: 'TileMatch',
    template: `
        <div class="tile-match">
        	<div class="tile-container">
        <transition-group name="fade" mode="out-in">
            		<div class="tile" :key="tile.value" v-for="(tile, i) in tiles" @click="click(i)" v-rotation="tile.rotation" v-color="tile.style"><component :is="'Tile' + tile.type" :value="tile.value"/></div>
        </transition-group>
        	</div>
        </div>
    `,
    data() {
        return {
            tiles: []
        }
    },

    methods: {
        click(i) {
            const result = this.$tileMatch.click(i)
            console.log(result)
	    }
    },
    async mounted() {
        console.log('hello from TileMatch2')
        this.$tileMatch = this.$create(TileMatch)
        this.tiles = this.$tileMatch.load(generateTiles())
        await sleep(200)
        this.$tileMatch.click(0)
        this.$tileMatch.click(1)
        this.$tileMatch.click(2)
    },
}

