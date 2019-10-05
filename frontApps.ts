
//include Vue and global libraries
import './App core/bootstrap.js';

declare var window : any;
declare var console: any;

//create IoC container
import { Container } from './App core/Container';
let container = Container.getInstance();

//create Application, put the  container into it
import { Application } from './App core/Application';
let app = Application.getInstance(container);
container.setAppPointer(app);


//import main service provider and register all classes
import { FrontAppServiceProvider } from "./App service providers/FrontAppServiceProvider";

let appServiceProvider = new FrontAppServiceProvider(app);
appServiceProvider.register();

import { vueLoader } from "./Departments/Vue modules/Vue loader";
vueLoader();   //loads all the vue modules



