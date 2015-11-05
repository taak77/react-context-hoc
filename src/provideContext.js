import React, {PropTypes, Component} from "react";
import hoistStatics from "hoist-non-react-statics";

function getDisplayName(Comp) {
    return Comp.displayName || Comp.name || "Component";
}

export default function provideContext(context = {}, contextTypes = {}) {
    const childContextTypes = Object.keys(context).reduce((types, key) => {
        types[key] = contextTypes[key] || PropTypes.any;
        return types;
    }, {});

    return function wrap(ComposedComponent) {
        class Hoc extends Component {
            static displayName = `Hoc(${getDisplayName(ComposedComponent)})`

            static childContextTypes = childContextTypes

            getChildContext() {
                return context;
            }

            render() {
                return (
                    <ComposedComponent {...this.props}/>
                );
            }
        }

        return hoistStatics(Hoc, ComposedComponent);
    };
}
