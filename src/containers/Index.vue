<template>
    <div flex="main:center cross:center" class="index">
        <div v-html="text"></div>
    </div>
</template>
<style lang="less">
    .index{
        font-size: 24px;
        height: 100%;
        padding:20px 30px;
        text-indent: 2em;
        >div{
            border-radius:8px;
            box-shadow: 0 0 10px;
            padding:12px;
            //font-family: '楷体';
        }
    }
</style>
<script>
    export default {
        name: 'index',
        data(){
            return {
                text:'<p>绝学无忧，唯之与阿，相去几何？善之与恶，相去若何？人之所畏，不可不畏。荒兮其未央哉！众人熙熙如享太牢、如春登台。我独泊兮其未兆，如婴儿之未孩；儡儡(lěi,羸弱)兮若无所归。众人皆有馀，而我独若遗。我愚人之心也哉！沌沌兮。俗人昭昭，我独昏昏；俗人察察，我独闷闷。众人皆有以，而我独顽且鄙。我独异於人，而贵食母。</p>'
            }
        },
        components: {},
        created(){},
        computed: {},
        mounted() {

        },
        methods: {},
        destroyed(){
        }
    }
</script>