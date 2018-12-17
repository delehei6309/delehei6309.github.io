<template>
    <div class="love">
        <div class="music">
            <audio id="audio" :src="musicSrc" controls=""></audio>
        </div>
        <div flex="dir:top main:center cross:center" class="love-content">
            <p v-for="item in textItems">
                <span v-for="val in item"
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
        name: 'love',
        data(){
            return {
                musicSrc:'../static/music.mp3',
                verse:'落花有意随流水，流水无心恋落花。我本将心向明月，奈何明月照沟渠。',
                textItems:[],
                count:0
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
                verse = verse.replace(/[，。]/g,',');
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
                this.textItems.forEach((item,index)=>{
                    item.forEach(val => {
                        let time = Math.random()*200;
                        setTimeout(()=>{
                            val.show = true;
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
            }
            
        },
        destroyed(){
        }
    }
</script>