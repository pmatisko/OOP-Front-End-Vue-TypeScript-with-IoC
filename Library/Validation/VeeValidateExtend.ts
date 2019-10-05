
import  VeeValidate  from 'vee-validate';


export default class VeeValidateExtend
{

    public extendVeeValidate(vue : any)   //Vue type doesnt work here, 'use' is missing
    {
        const validSlug = {
            getMessage(field, args) {
                return 'Slug can only contain small letters, underscores, dashes and numbers. It cannot start with a number.'
            },
            validate(value, args) {
                let rule = /^[a-z_][a-z0-9_-]+$/u;
                return rule.test(value);
            }
        };

        VeeValidate.Validator.extend('validSlug', validSlug);


        const alpha_num_specials = {
            getMessage(field, args) {
                return 'Field can only contain alpha numeric characters, spaces and common special characters: -@#$%^&!/()';
            },
            validate(value, args) {
                let rule =/^[a-zA-Z\s0-9_\-@#$%^&!/()áàâäãåąçčďéěèêëíìîïľłĺňñóòôöõřŕśšťúùûüůýÿæœžÁÀÂÄÃÅĄÇČĎÉÈÊĚËÍÌÎÏĽŁĹÑÓÒÔÖÕŘŔŚŠßŤÚÙÛÜŮÝŸÆŒŽ]+$/u;
                return rule.test(value);
            }
        };

        VeeValidate.Validator.extend('alpha_num_specials', alpha_num_specials);



        vue.use(VeeValidate, {fieldsBagName: 'formFields'});
    }

}