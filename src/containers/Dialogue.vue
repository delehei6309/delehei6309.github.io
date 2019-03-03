<template>
    <div class="dialogue">
        <ul class="items-ul">
            <li v-for="item in items"
                :class="{'ok':item.ok}">
                <span>{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less">
    .items-ul{
        padding:20px 10px;
        li{
            margin-bottom: 22px;
            transform: scale(0);
            transform-origin:0 0;
            transition: all .5s;
            &.ok{
                transform: scale(1);
            }
            span{
                padding:8px 10px;
                background-color: #fff;
                border-radius: 10px 16px 16px 0;
                
            }
        }
    }
</style>
<script>
    export default {
        name: 'dialogue',
        data(){
            return {
                data:[
                    '嗨！👋','大夢誰先覺🙌','平生我自知','草堂春睡足','窗外日遲遲','一尊搔首东窗里。','想渊明、停云诗就，此时风味。','江左沈酣求名者，岂识浊醪妙理。','回首叫、云飞风起。','不恨古人吾不见，恨古人、不见吾狂耳。','知我者，二三子','人生若只如初见，','何事秋风悲画扇。','等闲变却故人心，','却道故人心易变。','骊山语罢清宵半，','泪雨霖铃终不怨。','何如薄幸锦衣郎，','比翼连枝当日愿'
                ],
                data1:[
                    {
                        q:'江左沈酣求名者，岂识浊醪妙理。',
                        a:[
                            {
                               value:'A',
                               label:"比翼连枝当日愿" 
                            },{
                               value:'B',
                               label:"骊山语罢清宵半，" 
                            },{
                               value:'C',
                               label:"何事秋风悲画扇。" 
                            }
                        ]
                    }
                ],
                items:[]
            }
        },
        components: {},
        created(){
            this.setItems()
        },
        computed: {},
        mounted() {

        },
        methods: {
            setItems(){
                let count = 0;
                let timer = setInterval(()=>{
                    if(count >= this.data.length){
                        clearInterval(timer);
                    }else{
                        this.items.push({
                            label:this.data[count],
                            ok:false
                        });
                        let count1 = count;
                        setTimeout(()=>{
                            this.items[count1].ok = true;
                            this.goBottom();
                        },20);
                        count ++;
                    }
                    
                },1000);
            },
            goBottom(){
                let height = document.scrollingElement.scrollHeight - document.body.clientHeight;
                console.log('hieght',height);
                let timer = null;
                let fun = () => {
                    let top = document.scrollingElement.scrollTop;
                    if(top < height){
                        top++;

                        document.scrollingElement.scrollTop = top;
                        timer = requestAnimationFrame(fun);
                    }else{
                        if(timer){
                            cancelAnimationFrame(timer)
                        }
                    }
                }
                fun();
                            
            }
        },
        destroyed(){
        }
    }
</script>