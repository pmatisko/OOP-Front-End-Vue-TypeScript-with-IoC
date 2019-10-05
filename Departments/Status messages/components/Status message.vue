<script type="text/babel">

    'use strict';

    export default {

        inject : ['app'],

        props: {
            messageType : {
                default : 'info'
            },

           message : {
                default : null,
                type : String,
           },
            time : {
                default : 8
            },
            showAgain : {
                default : false
            }
        } ,

        data : function() {
            return {
                msgType : 'info',  //info, error, warning
                intMessage : '',
                eventBus : null,
                timer : null,

                icons : {
                    general : 'fa-info',
                    warning : 'fa-exclamation',
                    info : 'fa-check',
                    error : 'fa-exclamation-triangle'
                }

            }
        },

        created : function() {

            this.eventBus = this.app.resolve('EventBus');
            this.timer = this.app.resolve('Timer');

            if (this.message) {  //input was provided by PHP, otherwise, the message box is called by eventBus
                this.intMessage = this.message;
                this.msgType = this.messageType;
            }

            this.eventBus.$on('newStatusMessage', statusMessageQueue => this.retrieveMessage(statusMessageQueue));

        },

        methods : {

            retrieveMessage : async function (statusMessageQueue)
            {
                let message;
                while((message = statusMessageQueue.getMessage()) !== null) {
                    await this.show(message.text, message.type);
                }
            },


            show : async function(message, type)
            {
                if (!type) {
                    type = 'info';
                }

                this.intMessage = message;
                this.msgType = type;
                if (this.timer !== null) {
                    clearInterval(this.timer);
                }

                await this.timer.wait(6);
                this.hideMsg();
            },

            hideMsg : function ()
            {
               this.intMessage = '';
            },

        },

        computed : {
            showed : function ()
            {
                return this.intMessage !== '';
            },
        },

        watch : {
            message : function ()
            {
                this.msgType = this.messageType;
                this.intMessage = this.message;
                this.show(this.intMessage, this.msgType);
            },

            showAgain : function ()
            {
                this.msgType = this.messageType;
                this.intMessage = this.message;
                this.show(this.intMessage, this.msgType);
            },

        },
    }

</script>

<template>
    <div class="statusMessages" v-if="showed">
        <transition name="fade">
            <div id="msgBox" class = "msgBox" @click="hideMsg" v-show="showed" :class="msgType">
                <i class="far" :class="icons[msgType]"></i>
                {{ intMessage }}
            </div>
        </transition>
    </div>
</template>


<style lang="scss" type="text/scss" scoped>

    @import "../../../scss/Vue components/common";

    .statusMessages {

    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }

    position: relative;

    .msgBox {
        position: fixed;
        bottom: 20px;
        right: 5%;
        z-index: 10000;
        font-size: 18px;
        color: #fefefe;

        padding: 10px 20px;
        border: 2px solid;
        @include border-radius(5px);
        min-width: 160px;
        text-align: center;

        cursor: pointer;

        .far {
            margin-right: 10px;
            font-size: larger;
        }
    }

    .error {
        @include background-gradient(#FFBABA, #ef1f1f);
        border-color: #8e1212;

        display: block;

    &:hover {
        @include background-gradient(#FFBABA, #af1515);
     }
    }

    .warning {
        @include background-gradient(#eded61, #949420);
        border-color: #d1d102;

        display: block;
    }

    .info {
        @include background-gradient(#79f299, #3ba056);
        border-color: #128e33;

        display: block;
    }

    .general {
        @include background-gradient(#5c8ed4, #586daf);
        border-color: #3d437b;

        display: block;
    }

}
</style>