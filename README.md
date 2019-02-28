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




