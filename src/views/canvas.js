/**
 * Created by chunting on 2017/8/9.
 */
import Vue from 'vue';
import Canvas from '../containers/Canvas';
import 'flex.css/dist/flex.css';
import '../less/base.less';
new Vue({
	el: '#app',
	render: h => h(Canvas)
});