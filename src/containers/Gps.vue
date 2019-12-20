<template>
    <div flex="dir:top" class="gps" style="height:100%">
        <div flex-box="0">
            <div>
                <mt-field label="GPS经度" placeholder="请输入经度" v-model="longitude"></mt-field>
                <mt-field label="GPS纬度" placeholder="请输入纬度" v-model="latitude"></mt-field>
            </div>
            <div style="padding:10px;">
                <mt-button type="primary" @click="start">获取百度坐标</mt-button>
            </div>
        </div>
        <div>
            <h3 style="padding-left:10px;">百度坐标：</h3>
            <mt-cell :title="`经度：${longitude2}`"></mt-cell>
            <mt-cell :title="`纬度：${latitude2}`"></mt-cell>
        </div>
        <div flex-box="1" id="allmap"></div>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    export default {
        name:'gps',
        data() {
            return {
                longitude:116.3236430182,
                latitude:39.9381360788,
                longitude2:'',
                latitude2:''
            }
        },
        created() {
            
        },
        methods: {
            start(loading){
                this.longitude2 = '';
                this.latitude2 = '';
                loading != 'loading' && Indicator.open();
                // 百度地图API功能
                //GPS坐标
                var gpsPoint = new BMap.Point(this.longitude,this.latitude);
                console.log(gpsPoint)
                //地图初始化
                var bm = new BMap.Map("allmap");
                bm.centerAndZoom(gpsPoint, 15);
                bm.addControl(new BMap.NavigationControl());
                var that = this;
                // //添加谷歌marker和label
                // var markergps = new BMap.Marker(gpsPoint);
                // bm.addOverlay(markergps); //添加GPS标注
                // var labelgps = new BMap.Label("我是GPS标注哦",{offset:new BMap.Size(20,-10)});
                // markergps.setLabel(labelgps); //添加GPS标注
                // console.log(gpsPoint)
                //坐标转换完之后的回调函数
                var translateCallback = function (point){
                    var marker = new BMap.Marker(point);
                    bm.addOverlay(marker);
                    var label = new BMap.Label("月月，我是百度标注哦🌛🌛🌛",{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label); //添加百度label
                    bm.setCenter(point);
                    // alert(point.lng + "," + point.lat);
                    that.longitude2 = point.lng;
                    that.latitude2 = point.lat;
                }

                setTimeout(function(){
                    BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标
                    Indicator.close();
                }, 2000);
            },
            //定位
            getLocation(){
                Indicator.open();
                let showPosition = (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.start('loading');
                };
                let error = (err) => {
                    console.log(err);
                    Indicator.close();
                    alert(err.message);
                };
                let options = {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                };
                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(showPosition,error,options);
                }else{
                    this.start();
                    alert('不支持Geolocation定位')
                }
            }
        },
        mounted() {
            this.getLocation();
        },
    }
</script>