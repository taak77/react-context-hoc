import React, {PropTypes, Component} from "react";
import hoistStatics from "hoist-non-react-statics";
/**
 * @ignore
 */
function getDisplayName(Comp) {
    return Comp.displayName || Comp.name || "Component";
}
/**
 * A component decorator to set props. Also available as context.
 *
 * @param {Object} [props={}] An object to set as props and context.
 * @param {Object} [propTypes={}] A corresponding `propTypes` for the props object.
 * @returns {Function}
 * @public
 */
export default function configurable(props = {}, propTypes = {}) {
    /**
     * @ignore
     */
    const childContextTypes = Object.keys(props).reduce((types, key) => {
        types[key] = propTypes[key] || PropTypes.any;
        return types;
    }, {});

    return function wrap(ComposedComponent) {
        class Cofigufure extends Component {
            static displayName = `Cofigufured(${getDisplayName(ComposedComponent)})`

            static childContextTypes = childContextTypes

            getChildContext() {
                return props;
            }

            render() {
                return (
                    <ComposedComponent {...this.props} {...props}/>
                );
            }
        }

        return hoistStatics(Cofigufure, ComposedComponent);
    };
}
