# peer-review-frontend

A demo web application (front-end) to allow employees to review another employee's performance.


## How to run this app:

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Technology Stack:
 - Vue.js (As Frontend Framework)
 - JavaScript (As Development Language)
 - Webpack (As Module Bundler)
 - Vuetify (As UI Library)
 - Vuex (As State Management Tool)
 - Axios (As Promised based HTTP Client)

## Application Architecture:
The whole application is structured in modular structure. This application two modules: Employee and Admin. The main purpose of adopting modular structure is to make this application scalable. Though the current size of application is small, but it will grow with time and modular structure is helpful to add new modules/features to a large scale application.
The state management tool (Vuex) is also structured in modular structure for easy maintenance and scalability. Currently it has two modules: Employee and Admin. Future developer can easily add new modules without changing the core code base.

Modular structure will help to follow the one of the important design principles: Open-closed Principle. This application is open for extension and closed for modification.
