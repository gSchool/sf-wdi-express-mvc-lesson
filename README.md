# MVC Lesson

This is Bookcase, a sample application derived from Galvanize Bookshelf.

The objective is to refactor a monolithic Express app (everything in a single source file) into multiple modules satisfying the MVC pattern.

Setup:
```bash
createdb galvanize_bookcase_dev
npm install
npm run knex -- migrate:latest
npm run knex -- seed:run
```

# MVC Objectives

- Explain what MVC is
- List typical concerns of a web application and which MVC category they fall under
- Refactor a monolithic Express app (single source file) into multiple modules satisfying MVC

# What is MVC?

## Modular programming

Recall our lesson on Modular Programming...
- Modular programming is a technique to divide a software program (or application or system) into smaller, discrete, minimally-dependent modules (or sub-programs), each of which is responsible for a specific aspect of functionality. In other words, it’s all about separation of concerns and single responsibly
- Commonly, modules are composed of other modules, creating dependencies between modules. That said, in practice, you want to limit the number of dependencies any particular module has on other modules.
- Generally speaking, there are two types of modularization:
    - Logical: this happens inside your code (i.e., how you organize your code into functions and/or classes)
    - Physical: this is about organizing your source code files (i.e., into Node modules)

What are some of the concerns we’ve seen in the applications we’ve build so far?

- Data access
- Data persistence
- Operations on data (CRUD)
- Data transformation
- User interaction (event handling)
- Processing user input
- Presenting data to the user in some form (i.e. updating what the user sees)
- Routing requests

## Model-View-Controller

How are modular programming and MVC related?

MVC can be thought of as a specific, and more prescriptive, implementation of modular programming.

MVC stands for Model-View-Controller. It is a commonly used software design pattern used for implementing applications that have a user interface. The pattern recommends modularizing an application into 3 separate and decoupled concerns:
- The **Model** Layer - Responsible for the domain model (e.g., data access, data persistence, operations on data (CRUD), business logic, etc.)
- The **View** Layer - Responsible for presenting/displaying information from the domain model to the user in some form (e.g., HTML, XML, JSON, GUI, etc.)
- The **Controller** Layer - Responsible for handling user interaction, processing user input, and updating the “Model”

The ideas behind MVC were originally introduced in the late 70’s and formalized in the 80’s as a best practice pattern for implementing Graphical User Interfaces (for desktop applications).

In the late 90’s / early 2000’s, when development of Web applications exploded and became the norm, the MVC pattern was adapted for server-side web applications.

Original Implementation (70s-90s):
- Used to implement desktop GUIs
- Controller does not update the View directly
- The View listens to the Model and updates itself whenever the Model changes (Observer Pattern)
    - Where else have we seen the Observer Pattern in action?

Server-Side Web Implementation (early 2000-2010):
- Used to implement server-generated Web interfaces
- Controller coordinates between the Model and View
- Literally 100s of frameworks, for every language, emerged around the MVC pattern:
    - Ruby on Rails (Ruby)
    - Django (Python)
    - Spring MVC (Java)
    - ASP.NET MVC (C#)

Client-Side Web Implementation (2010-2015):
- Used to implement client-generated Web interfaces
- Sort of a hybrid of the previous implementations
    - Model still deals with data (the domain), except communicates with a remote server
    - View and Controller hybrid (View-Controller) dealing with presenting data to user, but may also deal with user interaction and input directly
    - Controller may or may not be explicitly implemented
- Backbone and Angular 1 were popular MVC-ish frameworks of that era

What does the evolution of MVC tell us?
- The interpretation and utility of applied software patterns shift over time to adapt to an ever-changing environment.
- Over time, a software pattern that was originally designed to solve one problem may evolve (get adapted, expanded, and generalized) to solve other problems.

Further Reading:
- https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
- http://stephenwalther.com/archive/2008/08/24/the-evolution-of-mvc
