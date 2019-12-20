/**
 * Created by chunting on 2019/12/19.
 */
import Vue from 'vue';
import Gps from '../containers/Gps';
import 'flex.css/dist/flex.css';
import '../less/base.less';
import { Field,Button,IndexList, IndexSection,Cell } from 'mint-ui';
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Cell.name, Cell);
new Vue({
	el: '#app',
	render: h => h(Gps)
});