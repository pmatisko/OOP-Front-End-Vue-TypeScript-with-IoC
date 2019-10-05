let Exceptions =
{
    data: function () {
        return {
            serverExceptions : null,
            exceptionHandler : null,
        }
    },

  created : function()
  {
      this.serverExceptions = this.app.resolve('ServerExceptions');
      this.exceptionHandler = this.app.resolve('ExceptionHandler');
  },


    methods : {

        $validateInputs : async function ()
        {
             if(!this.$validator)
                 return true;

            let __this = this;  //lambdas cannot use "this", so we create a local variable

            return await this.$validator.validateAll()
             .then(async function(result) {

                    //validate all children
                     let validations = __this.$children.map(function(child){
                         return child.$validator.validateAll();
                     });

                    let returnFalse = false;
                    if (!result) {
                        returnFalse = true;
                    }
                    else {

                        //if any of the children has errors, show general error message
                        for(let validation of validations) {
                            if(!await validation) {
                                returnFalse = true;
                            }
                        }
                    }

                    if(returnFalse) {
                        __this.app.resolve('StatusMessageQueue').createMessage('Inputs still contain errors. Please fix them before saving.', 'error');
                        return false;
                    }

                    return true;
             })
             .catch((e) => {
                 console.log(e);

                this.app.resolve('StatusMessageQueue').createMessage('Inputs3 still contain errors. Please fix them before saving.', 'error');
                return false;
            });
        }
    }

};



export default Exceptions;