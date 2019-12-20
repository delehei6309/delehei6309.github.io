/**
 * Created by liuge on 2019/12/14.
 */
import Vue from 'vue';
import YueYue from '../containers/YueYue';
import 'flex.css/dist/flex.css';
import '../less/base.less';
import '../less/mobile.less';
import '../less/yue.less';

new Vue({
	el: '#app',
	render: h => h(YueYue)
});