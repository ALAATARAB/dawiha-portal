import {
  useEnhancedEffect_default
} from "./chunk-PNVBXSQH.js";
import {
  require_react
} from "./chunk-KFZ7WD7U.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/useForkRef/useForkRef.js
var React = __toESM(require_react(), 1);
function useForkRef(...refs) {
  const cleanupRef = React.useRef(void 0);
  const refEffect = React.useCallback((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return null;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup == null ? void 0 : refCleanup());
    };
  }, refs);
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}

// node_modules/.pnpm/@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.5__@emotion_4a5fa442b92e968c27c9123e51ce9d9a/node_modules/@mui/material/esm/utils/useForkRef.js
var useForkRef_default = useForkRef;

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// node_modules/.pnpm/@mui+utils@7.3.10_@types+react@19.2.14_react@19.2.5/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
var React2 = __toESM(require_react(), 1);
function useEventCallback(fn) {
  const ref = React2.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React2.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var useEventCallback_default = useEventCallback;

export {
  createChainedFunction,
  ownerDocument,
  ownerWindow,
  setRef,
  useEventCallback_default,
  useForkRef,
  useForkRef_default
};
//# sourceMappingURL=chunk-A34NXKM3.js.map
