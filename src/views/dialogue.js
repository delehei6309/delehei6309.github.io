/**
 * Created by DELL on 2017/8/9.
 */
import Vue from 'vue';
import Dialogue from '../containers/Dialogue';
import 'flex.css/dist/flex.css';
import '../less/base.less';
import '../less/mobile.less';

new Vue({
	el: '#app',
	render: h => h(Dialogue)
});