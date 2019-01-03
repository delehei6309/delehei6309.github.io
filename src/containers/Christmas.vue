<template>
    <div class="christmas">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
    export default {
        name: 'christmas',
        data(){
            return {}
        },
        components: {},
        created(){
            
        },
        computed: {},
        mounted() {
            // this.audioPlay();
            let dom = document.querySelector('#canvas');
            this.canvas(dom);
        },
        methods: {
            canvas(dom){
                var SCREEN_WIDTH = dom.offsetWidth;
                var SCREEN_HEIGHT = dom.offsetHeight;
                var container;
                var particle;
                var camera;
                var scene;
                var renderer;
                var mouseX = 0;
                var mouseY = 0;
                var particles = [];
                var particleImage = new Image();
                particleImage.src = 'http://static.hualumedia.com/nianhui/images/ParticleSmoke.png';
                container = document.createElement('div');
                dom.appendChild(container);
                var camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
                camera.position.z = 1000;
                var scene = new THREE.Scene();
                scene.add(camera);
                var renderer = new THREE.CanvasRenderer();
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
                for (var i = 0; i < 500; i++) {
		            particle = new Particle3D( material);
		            particle.position.x = Math.random() * 2000 - 1000;
		            particle.position.y = Math.random() * 2000 - 1000;
		            particle.position.z = Math.random() * 2000 - 1000;
		            particle.scale.x = particle.scale.y =  1;
		            scene.add( particle );                   
		            particles.push(particle); 
		        }
		        container.appendChild( renderer.domElement );
		        setInterval( loop, 1000/60  );
		        function loop() {
		            for(var i = 0; i<particles.length; i++){
		                var particle = particles[i]; 
		                particle.updatePhysics();
	                    if(particle.position.y<-1000) particle.position.y+=2000; 
	                    if(particle.position.x>1000) particle.position.x-=2000; 
	                    else if(particle.position.x<-1000) particle.position.x+=2000; 
	                    if(particle.position.z>1000) particle.position.z-=2000; 
	                    else if(particle.position.z<-1000) particle.position.z+=2000;               
		            }
		            camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		            camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		            camera.lookAt(scene.position); 
		            renderer.render( scene, camera );  
		        }
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