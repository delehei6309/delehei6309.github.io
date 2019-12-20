<template>
    <div class="yueyue" ref="yue"
        @touchstart="scrollStop = true"
        @touchend="scrollStop = false">
        <div class="music" ref="music">
            <audio id="audio" :src="musicSrc" controls=""></audio>
        </div>
        <div flex="dir:top main:center cross:center" class="yueyue-content">
            <p v-for="(item,index) in textItems"
                :key="index"
                ref="refp">
                <span v-for="(val,k) in item"
                    :key="`${index}${k}`"
                    :class="{'show':val.show}">{{val.word}}</span>
            </p>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
	import {Toast,Checklist,Radio} from 'mint-ui';
    Vue.component(Checklist.name, Checklist);
    Vue.component(Radio.name, Radio);
    export default {
        name: 'yueyue',
        data(){
            return {
                musicSrc:'../static/music.mp3',
                verse:'明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
                textItems:[],
                count:0,
                scrollStop:false
            }
        },
        components: {},
        created(){
            this.dealVerse();
        },
        computed: {},
        mounted() {
            this.audioPlay();
            
            this.showWord();
        },
        methods: {
            dealVerse(){
                let verse = this.verse.substring(0, this.verse.length - 1);
                verse = verse.replace(/[，。！？]/g,',');
                let verseArray = verse.split(',');
                let count = 0;
                verseArray.forEach((item,index)=>{
                    let arr = item.split('');
                    let brr = [];
                    arr.forEach((im,key)=>{
                        count++;
                        brr.push({
                            show:false,
                            word:im,
                            count
                        });
                    });
                    this.textItems.push(brr);
                });
                console.log(this.textItems)
            },
            showWord(){
                console.log('000')
                this.textItems.forEach((item,index)=>{
                    item.forEach(val => {
                        let time = Math.random()*200;
                        setTimeout(()=>{
                            val.show = true;
                            if(!this.scrollStop){
                                this.scrollTo(index);
                            }
                            
                        },1000+(val.count*500)+time);
                    })
                })
            },
            audioPlay(){
                //--创建页面监听，等待微信端页面加载完毕 触发音频播放
                document.addEventListener('DOMContentLoaded', function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById('audio');
                        audio.play();
                        document.addEventListener("WeixinJSBridgeReady", function () {
                            audio.play();
                        }, false);
                    }
                    audioAutoPlay();
                });
                //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
                document.addEventListener('touchstart', function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById('audio');
                            audio.play();
                    }
                    audioAutoPlay();
                });
            },
            scrollTo(index){
                // console.log(index)
                let height = this.$refs['refp'][index].offsetTop;
                let oh = this.$refs['yue'].offsetHeight/2;

                console.log(this.$refs['yue'].offsetHeight)
                
                this.animate(height-oh)
            },
            animate(height){
                
                let h = 0;
                let fun = (height) => {
                    let top = this.$refs['yue'].scrollTop;
                    console.log('---->',height,top)
                    if(height > top){
                        top++;
                        console.log(top)
                        this.$refs['yue'].scrollTo(0,top);
                        if(!this.scrollStop){
                            requestAnimationFrame(() => {
                                fun(height)
                            });
                        }
                    }else{
                        this.$refs['yue'].scrollTo(0,height);
                    }
                };
                fun(height);
                console.log(this.$refs['yue'].scrollTop);
                // this.$refs['yue'].scrollTo(0,height-oh);
            },
            scroll(){
                this.scrollStop = true;
            }
            
        },
        destroyed(){
        }
    }
</script>