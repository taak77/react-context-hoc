/* eslint-disable react/no-multi-comp, max-nested-callbacks, react/prop-types, no-empty, padded-blocks */
import React, {PropTypes, Component} from "react";
import ReactDOM from "react-dom";
import {provideContext} from "../../src/index";

describe("provideContext", () => {
    let node;

    beforeEach(() => {
        node = document.createElement("div");
    });

    afterEach(() => {
        try {
            ReactDOM.unmountComponentAtNode(node);
        } catch (err) {}
    });

    it("can pass data as conext to children", (done) => {
        class Child extends Component {
            static contextTypes = {
                appName: PropTypes.string
            }
            componentDidMount() {
                expect(this.context.appName).to.equal("My Application");
                done();
            }
            render() {
                return (
                    <div>Child</div>
                );
            }
        }

        class App extends Component {
            render() {
                return (
                    <div><Child/></div>
                );
            }
        }

        const WrappedApp = provideContext({
            appName: "My Application"
        }, {
            appName: PropTypes.string
        })(App);

        ReactDOM.render((
            <WrappedApp />
        ), node);

    });

    it("works with decorator", (done) => {
        class Child extends Component {
            static contextTypes = {
                appName: PropTypes.string
            }
            componentDidMount() {
                expect(this.context.appName).to.equal("My Application");
                done();
            }
            render() {
                return (
                    <div>Child</div>
                );
            }
        }

        @provideContext({
            appName: "My Application"
        }, {
            appName: PropTypes.string
        })
        class App extends Component {
            render() {
                return (
                    <div><Child/></div>
                );
            }
        }

        ReactDOM.render((
            <App />
        ), node);

    });
});
