'use strict';

import {appInstance} from '../../App core/Application';

export default new Vue({
    el: '#status-messages',

    provide : {
        app : appInstance(),
    },

    components : {
        'status-message' : () => import(/* webpackChunkName: "front-commons" */ './components/Status message')
    },

});