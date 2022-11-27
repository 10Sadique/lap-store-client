import React from 'react';
import useTitle from '../hooks/useTitle';

const Blog = () => {
    useTitle('Blog');
    return (
        <div className="mx-auto max-w-[370px] md:max-w-3xl lg:max-w-6xl my-10 lg:my-14">
            <h1 className="mb-10 lg:text-3xl text-2xl text-center">Blogs</h1>
            <div className="space-y-10">
                {/* ques 1 */}
                <div className="p-5 bg-accent/10 rounded-2xl shadow-md">
                    <h1 className="font-bold text-2xl mb-3 text-primary">
                        What are the different ways to manage a state in a React
                        application?
                    </h1>
                    <div>
                        <div>
                            <p className="mb-2">
                                There are four main ways to properly manage
                                state in React apps:
                            </p>
                            <ol className="list-decimal list-inside mb-2">
                                <li>Local state</li>
                                <li>Global state</li>
                                <li>Server state</li>
                                <li>URL state</li>
                            </ol>
                            <p>
                                <strong>Local (UI) state</strong> – Local state
                                is data we manage in one or another component.
                                Local state is most often managed in React using
                                the <kbd className="kbd kbd-sm">useState</kbd>{' '}
                                hook.
                            </p>
                            <p>
                                <strong>Global (UI) state</strong> – Global
                                state is data we manage across multiple
                                components. A common example of global state is
                                authenticated user state.
                            </p>
                            <p>
                                <strong>Server state</strong> – Data that comes
                                from an external server that must be integrated
                                with our UI state. There are tools such as SWR
                                and TanStack Query that make managing server
                                state much easier.
                            </p>
                            <p>
                                <strong>URL state</strong> – Data that exists on
                                our URLs, including the pathname and query
                                parameters.{' '}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ques 2 */}
                <div className="p-5 bg-accent/10 rounded-2xl shadow-md">
                    <h1 className="font-bold text-2xl mb-3 text-primary">
                        How does prototypical inheritance work?
                    </h1>
                    <div>
                        <p>
                            {' '}
                            The Prototypal Inheritance is a feature in
                            javascript used to add methods and properties in
                            objects. It is a method by which an object can
                            inherit the properties and methods of another
                            object. Traditionally, in order to get and set the
                            [[Prototype]] of an object, we use
                            Object.getPrototypeOf and Object.setPrototypeOf.
                            Nowadays, in modern language, it is being set using
                            __proto__.
                        </p>
                    </div>
                </div>

                {/* ques 3 */}
                <div className="p-5 bg-accent/10 rounded-2xl shadow-md">
                    <h1 className="font-bold text-2xl mb-3 text-primary">
                        What is a unit test? Why should we write unit tests?
                    </h1>
                    <div>
                        <p className="mb-2">
                            A unit test is a way of testing a unit - the
                            smallest piece of code that can be logically
                            isolated in a system.
                        </p>
                        <p>
                            The main objective of unit testing is to isolate
                            written code to test and determine if it works as
                            intended. Unit testing is an important step in the
                            development process, because import useTitle from
                            './../hooks/useTitle'; if done correctly, it can
                            help detect early flaws in code which may be more
                            difficult to find in later testing stages. For
                            Test-Driven Development (TDD), we write unit tests
                            before writing any implementation. This makes your
                            implementation details in your code shorter and
                            easier to understand.
                        </p>
                    </div>
                </div>

                {/* ques 4 */}
                <div className="p-5 bg-accent/10 rounded-2xl shadow-md">
                    <h1 className="font-bold text-2xl mb-3 text-primary">
                        React vs. Angular vs. Vue?
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div>
                            <p className="mb-2 font-bold">React</p>
                            <p>
                                Facebook released React.js in March 2013 as a
                                JavaScript library. Because React just provides
                                one view, it is not appropriate for building an
                                MVC architecture: you must solve the model and
                                controller yourself. Besides this, there are
                                only advantages and lots of advantages. One of
                                the biggest of them is that React.js uses a
                                virtual DOM that only compares the previous HTML
                                code differences and only loads the different
                                parts. This significantly impacts the loading
                                times. In a positive way, of course.
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 font-bold">Angular</p>
                            <p>
                                AngularJS was developed in 2009 by Google. The
                                first version was Angular.JS. Angular is
                                currently known as a JavaScript framework.
                                Obviously, all significant Google projects have
                                been developed with Angular. Angular.js is an
                                MVC framework. A major disadvantage of Angular
                                is that it uses a regular DOM, and thus, the
                                entire tree structure of the HTML tags is
                                updated, which massively impacts the loading
                                time.
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 font-bold">Vue</p>
                            <p>
                                Vue.js is a JavaScript-based progressive
                                framework for creating single-page applications.
                                It was created with scalability and
                                incrementality in mind, as well as ease of
                                integration with other view layer frameworks.
                                Vue is built from the bottom up to be
                                progressively adaptable, unlike other monolithic
                                frameworks. The core library focuses solely on
                                the view layer, and it’s simple to use and
                                connect with other libraries or applications.
                                This framework’s fast learning angle is almost a
                                trademark.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
