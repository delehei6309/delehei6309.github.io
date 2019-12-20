<template>
	<div class="canvas" style="margin:8px;padding:12px">
		
		<div flex style="font-size:20px;">
			<input type="text" v-model="name" style="width:360px;height:48px;border:1px solid #d0d0d0;font-size:20px;">
            <button @click="submit" style="height:48px;width:120px;text-align:center;background-color:#23baaa;color:#fff;font-size:20px;">生成</button>
		</div>
        <div style="padding:18px; height:200px">
			<canvas ref="canvas"></canvas>
		</div>
        <div style="height:300px; overflow-y:auto;margin:18px;border:1px solid #d0d0d0">{{base64}}</div>
	</div>
</template>
<script>
	export default {
		name:'canvas-demo',
		data(){
			return {
                name:'',
				ctx:null,
                size:180,
                items:[],
                base64:''
			}
		},
		computed:{
			canvas:function(){
				return this.$refs['canvas'];
			},
			radio:function(){
				return this.size/450;
			}
		},
		components:{
			// CanvasRing
		},
		methods: {
            submit(){
                if(this.name){
                    this.items = this.name.split('');
                    this.start()
                }else{
                    alert('输入值无效！')
                }
                
            },
			start(){
				//背景色
				// this.ctx.fillStyle = "#fff";
				// this.ctx.fillRect(0, 0, 400, 400);
                let w = 450;
                if(this.items.length == 2){
                    w = 320;
                }
                this.canvas.width = w*this.radio;
                this.canvas.height = 165*this.radio;
                this.ctx = this.canvas.getContext("2d");
                //矩形
				this.ctx.strokeStyle = "#ff2619";
				this.ctx.lineWidth = 20*this.radio;
				this.ctx.strokeRect(0, 0, w*this.radio, 165*this.radio);
				//名字
				this.ctx.fillStyle = "#ff2619";
                this.ctx.font = `${120*this.radio}px Microsoft YaHei`;
                this.items.forEach((item,index)=>{
                    this.ctx.fillText(item,(35+130*index)*this.radio,125*this.radio);
                });
				// this.ctx.fillText("邹", 35*this.radio,125*this.radio);
				// this.ctx.fillText("玉", 165*this.radio,125*this.radio);
				// this.ctx.fillText("梅", 295*this.radio,125*this.radio);
				//
                // console.log(this.canvas.toDataURL())
                this.base64 = this.canvas.toDataURL();
			}
		},
		mounted(){
			
			// this.start();
		}
	}
</script>