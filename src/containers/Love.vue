<template>
    <div flex class="love" :style="{transform:`translateX(${translateX}%)`}">
    	<div flex="dir:top main:justify" class="love-item love-item-1">
    		<div class="header">
	    		<span>{{she}}</span>女士，您好！非常荣幸在您百忙之中参与我们的回访调查工作，请按实填写后面的内容，一旦填写成功，不能更改！
	    	</div>
	    	<div flex="main:center" class="btns">
	    		<a href="javascript:;" @click="translateX = -10">开始填写</a>
	    	</div>
	    	<div class="footer">*解释权归本调查机构所有</div>
    	</div>
    	<div flex="dir:top main:justify" class="love-item love-item2">
    		<p>为了确定是您本人操作，我们需要对您身份进行验证（出生年月日）</p>
    		<div flex="dir:top cross:center">
                <div class="photo">
                    <img src="../images/photo.jpg" alt="">
                </div>
                <div class="input">
                    <input type="text" placeholder="示例:1992-01-10" v-model="date">
                </div>      
            </div>
    		<div flex="main:center" class="btns">
	    		<a href="javascript:;" @click="sureShe">确认身份</a>
	    	</div>
    	</div>
		<div flex="dir:top main:justify" class="love-item love-item3">
			<p>No1、如何评价您自己</p>
			<div>
				<mt-checklist title="请选择" 
                    v-model="value1"
                    :options="['美丽动人', '楚楚动人', '知书达理','女神','女汉子','有点二','弱女子']">

				</mt-checklist>
			</div>
			<div flex="main:center" class="btns">
				<a href="javascript:;" @click="next1">下一题</a>
			</div>
		</div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No2、您对目前的工作收入情况满意吗？</p>
            <div>
                <mt-radio
                    title="单选框列表"
                    v-model="value2"
                    :options="['非常满意', '满意', '凑合','不满意','满意个锤子','想炒了领导']">
                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next2">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No3、您对目前的生活态度是？</p>
            <div>
                <mt-radio
                    title="单选框列表"
                    v-model="value3"
                    :options="['积极向上', '乐观豁达', '消极反动','得过且过','爱咋咋地','无所谓','我想静静']">
                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next3">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No4、您怎样看待“有的人活着，他已经死了；有的人死了他还活着。”这句话？</p>
            <div>
                <mt-radio
                    title="单选框列表"
                    v-model="value4"
                    :options="['纯属放屁', '价值体现', '人生要有意义','很有道理','不知道','不想回答']">
                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next4">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No5、“青青子衿，悠悠我心；但为君故，沉吟至今。”讲的是什么？</p>
            <div>
                <mt-radio
                    title="单选框列表"
                    v-model="value5"
                    :options="['诗', '书', '礼','仪','乐','春秋','孟德']">
                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next5">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No6、您怎样看待恋爱&结婚？</p>
            <div>
                <mt-radio
                    title="单选框列表"
                    v-model="value6"
                    :options="['宁缺毋滥', '我喜欢他他可以不喜欢我', '两情相悦','衷心对我好就行','日久生情','不知道']">
                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next6">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No7、客观讲，您觉得您的朋友王春廷是个怎样的人？</p>
            <div>
                <mt-checklist title="请选择" 
                    v-model="value7"
                    :options="['帅气大方', '才貌双全', '积极乐观','貌比潘安','才高八斗','非常完美','真诚友善','国之栋梁','词穷']">

                </mt-checklist>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next7">下一题</a>
            </div>
        </div>
        <div flex="dir:top main:justify" class="love-item love-item4">
            <p>No8、对于王春廷的表白，您打算怎样处理？</p>
            <div>
                <mt-radio title="请选择" 
                    v-model="value8"
                    :options="options">

                </mt-radio>
            </div>
            <div flex="main:center" class="btns">
                <a href="javascript:;" @click="next8">保存提交</a>
            </div>
        </div>
        <audio id="audio" autoplay >
		  <source src="/static/music.mp3" type="audio/mpeg">
			您的浏览器不支持 audio 元素。
		</audio>
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
                she:'刘亚楠',
                translateX:0,
				date:'',
				date0:'1992-01-16',
                value1:[],
                value2:'',
                value3:'',
                value4:'',
                value5:'',
                value6:'',
                value7:[],
                value8:'',
                options:[
                    {
                        label:'同意',
                        value:'1'
                    },{
                        label:'欣然接受',
                        value:'2'
                    },{
                        label:'同意',
                        value:'3'
                    },{
                        label:'欣然接受',
                        value:'4'
                    },{
                        label:'同意',
                        value:'5'
                    },{
                        label:'欣然接受',
                        value:'6'
                    },{
                        label:'同意',
                        value:'7'
                    },{
                        label:'欣然接受',
                        value:'8'
                    },{
                        disabled:true,
                        label:'残忍拒绝'
                    }
                ]
            }
        },
        components: {},
        created(){
        },
        computed: {},
        mounted() {
            this.audioPlay();
        },
        methods: {
            audioPlay(){
                //--创建页面监听，等待微信端页面加载完毕 触发音频播放
                document.addEventListener('DOMContentLoaded', function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById('audio');
                        console.log(audio)
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
            sureShe(){
                let {date,date0} = this;
                if(date == date0){
                    this.translateX = -20;
				}else{
                    Toast('验证没通过！试试农历生日吧亲~');
				}
			},
            next1(){
                if(this.value1.length>0){
                    this.translateX = -30;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next2(){
                if(this.value2){
                    this.translateX = -40;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next3(){
                if(this.value3){
                    this.translateX = -50;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next4(){
                if(this.value4){
                    this.translateX = -60;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next5(){
                if(this.value5){
                    this.translateX = -70;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next6(){
                if(this.value6){
                    this.translateX = -80;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next7(){
                if(this.value7.length>0){
                    this.translateX = -90;
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            },
            next8(){
                if(this.value8){
                    Toast('提交成功，请截图发给作者！');
                    setTimeout(()=>{
                        window.location.href = '/textPraticle';
                    },3000);
                }else{
                    Toast('不要在还没选择的时候就点提交！');
                }
            }
        },
        destroyed(){
        }
    }
</script>