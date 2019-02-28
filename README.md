# OOP Front-End core files - Vue, TypeScript

## Introduction & Motivation

VueJs is an amazing framework making your front-end development a joy. However, when your project gets bigger, you will have to solve 
a lot of issues. Installing many 3rd party packages, tweaking them for your own needs, plus your own packages will create a lot of 
different approaches on how to develop code.

I am a big fan of OOP principles and design patterns. It all helps us create more testable and easy to understand code. 

A few most important principles are

SOLID<br>
SoC - Separation of concerns<br>
IoC - Inversion of control

Files in this repository will make your initial phase of the front-end development easier. It establishes a few nice coding principles and contains 
an IoC container that will handle the inversion of control for you.

TypeScript is a safer and more modern version of JavaScript, so I prefer using it in all my projects. VueJs allows us to use TypeScript as well.
However, Vue components should not do too much of business logic, therefore JS is usually satisfactory.


## Core principles for proper OOP design

### Separation of Concerns

This is the most important and most useful principle of OOP programming. However, it is not easy to apply this principle within front-end development, because there is no framework systematically forcing you into separating stuff. A typical Vue component that needs to communicate with a server does it on its own. If you have several Vue components, you end up managing multiple instances of Axios communication features. After some time, this is unbearable.  Should a Vue component communicate with an API in the first place? The answer is **NO**! Your app should have only one communicator and all the components should use it.


## Core files in this repo ##

Let's have a look what we have in this repository

### frontApps.ts ###

This is the main file that you can use for the Webpack entry. It will be included in the website. Other files will be loaded by Webpack.

Main tasks for this file:

1. Create *Vue* object.
2. Create a *Container* handling IoC.
3. Create an instance of *Application* that is the only global object. Pass the container to the Application.
4. Call a *Service Provider* which creates objects on the container.
5. Create Vue modules (Vue applications).


### App core / Application.ts ###

Application is a global object that stores the Laravel's csrf hash, language, the site link, container and some others features if needed.

### App core / Container ###

Container is the top layer of the IoC. It knows how to create classes and how to resolve dependencies. You can register objects on the container in 4 different ways. It will be described in more detail further in the Service provider section.

If you need an instance of any class, you ask Container to create it for you.


### App service provider / FrontAppServiceProvider.ts ###

You can create as many service providers as needed. For example for the public front end, any kind of user admin section, etc. It will help you separate the app into indepdendent parts.

There are 4 ways for registering a class

1) *bind*<br>
`
 public bind(className : string, classDefinition : object, dependecies : Array<string> = [])
`<br>
example:<br>
`
 this._app.container.bind('ExceptionHandler', ExceptionHandler, ['EventBus', 'ExceptionFactory', 'StatusMessageQueue']);
`<br>
The example code will assign *ExceptionHandler* to a new class of the type ExceptionHandler. The array represents all the dependencies that the #ExceptionHandler# needs for its constructor. The order of the dependencies must follow the order of the constructor's arguments.<br>
After registering a class with the *bind* function, the *resolve* function always creates a new instance of the object.


2) *bindClosure*<br>
`
 public bindClosure(className : string, closure : (app : Application) => object) : void
`<br>
example:<br>
`
  this._app.container.bindClosure('LanguageChangeObserver', function(app)  {
      let eventBus = app.container.resolve('EventBus');
      return new LanguageChangeObserver(eventBus);
  });
`<br>
Use the function *bindClosure* in case you need to create the object in any custom way. Instead of just calling *new YourClass(dependencies)*, the *resolve* function will call the closure. After registering a class with the *bindClosure* function, the *resolve* function always creates a new instance of the object.


3) *singleton*<br>
`
 public singleton(className : string, classDefinition : object, dependecies : Array<string> = []) : void
`<br>
example:<br>
`
this._app.container.singleton('AuthBroker', AuthBroker, ['BrokerCore']);
`<br>
The principle is the same as for the *bind* function. The only difference is, that after registering a singleton, the *resolve* function will always return the same instance of the object. The closure creating the object will be called only once.


4) *singletonClosure*<br>
`
public singletonClosure(className : string, closure : (app : Application) => object) : void
`<br>
example:<br>
`
  this._app.container.singletonClosure('EventBus', function(app)  {
      return new Vue();
  });
`<br>
The principle is the same as for the *bindClosure* function. The only difference is, that after registering a singleton, the *resolve* function will always return the same instance of the object. The closure creating the object will be called only once.


### Resolving registered classes ###

In your JS/TS or Vue code, you can resolve objects using:

`
this.exceptionHandler = app.resolve('ExceptionHandler');
`

Typically, new objects are created in the #created# method of vue components.

### Departments ###

This is a place for all the modules and your packages. You can name it *modules* or *packages* or anyhow you want.
