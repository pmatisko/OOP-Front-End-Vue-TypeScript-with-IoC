declare var document : any;

export function vueLoader()
{
    if(document.getElementById("my-vue-module")) {
        import (/* import here  */);
    }
}