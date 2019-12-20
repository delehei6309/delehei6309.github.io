/**
 * Created by DELL on 2017/8/9.
 */
import Vue from 'vue';
import About from '../containers/About';
import 'flex.css/dist/flex.css';
import '../less/base.less';
new Vue({
	el: '#app',
	render: h => h(About)
});