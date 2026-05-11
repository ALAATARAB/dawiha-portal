import {
  DefaultPropsProvider_default,
  require_prop_types,
  useDefaultProps
} from "./chunk-PNVBXSQH.js";
import {
  require_jsx_runtime
} from "./chunk-D4LBJ6EK.js";
import {
  require_react
} from "./chunk-KFZ7WD7U.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.5__@emotion_4a5fa442b92e968c27c9123e51ce9d9a/node_modules/@mui/material/esm/DefaultPropsProvider/DefaultPropsProvider.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
true ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  value: import_prop_types.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

export {
  useDefaultProps2 as useDefaultProps
};
//# sourceMappingURL=chunk-3CKFBXBL.js.map
