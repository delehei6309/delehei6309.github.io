/**
 * Created by DELL on 2017/8/9.
 */
import Vue from 'vue';
import Love from '../containers/Love';
import 'flex.css/dist/flex.css';
import '../less/base.less';
import '../less/mobile.less';
import '../less/love.less';

new Vue({
	el: '#app',
	render: h => h(Love)
});