import {
  RouterContext
} from "./chunk-XVGMJFLG.js";
import {
  require_jsx_runtime
} from "./chunk-D4LBJ6EK.js";
import {
  require_react
} from "./chunk-KFZ7WD7U.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/shared/Link.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DefaultLink = React.forwardRef(function Link(props, ref) {
  const {
    children,
    href,
    onClick,
    history: history2,
    ...rest
  } = props;
  const routerContext = React.useContext(RouterContext);
  const handleLinkClick = React.useMemo(() => {
    if (!routerContext) {
      return onClick;
    }
    return (event) => {
      event.preventDefault();
      const url = new URL(event.currentTarget.href);
      routerContext.navigate(url.pathname, {
        history: history2
      });
      onClick == null ? void 0 : onClick(event);
    };
  }, [routerContext, onClick, history2]);
  return (0, import_jsx_runtime.jsx)("a", {
    ref,
    href,
    ...rest,
    onClick: handleLinkClick,
    children
  });
});
var Link2 = React.forwardRef(function Link3(props, ref) {
  const routerContext = React.useContext(RouterContext);
  const LinkComponent = (routerContext == null ? void 0 : routerContext.Link) ?? DefaultLink;
  return (0, import_jsx_runtime.jsx)(LinkComponent, {
    ref,
    ...props,
    children: props.children
  });
});

// node_modules/.pnpm/@toolpad+utils@0.15.0_react@19.2.5/node_modules/@toolpad/utils/esm/warnOnce.js
var history = /* @__PURE__ */ new Set();
function warnOnce(msg) {
  if (!history.has(msg)) {
    history.add(msg);
    console.warn(msg);
  }
}

export {
  warnOnce,
  Link2 as Link
};
//# sourceMappingURL=chunk-5JOMAQVJ.js.map
