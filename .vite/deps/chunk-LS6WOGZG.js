import {
  BrandingContext,
  NavigationContext,
  PaletteModeContext,
  RouterContext,
  WindowContext
} from "./chunk-XVGMJFLG.js";
import {
  LocalizationProvider,
  NotificationsProvider
} from "./chunk-5GO332DN.js";
import {
  CssBaseline_default,
  useMediaQuery_default
} from "./chunk-IAK2FYW7.js";
import {
  useEventCallback_default
} from "./chunk-A34NXKM3.js";
import {
  InitColorSchemeScript_default,
  ThemeProvider,
  useColorScheme
} from "./chunk-7ODAVFXW.js";
import {
  createTheme,
  require_prop_types
} from "./chunk-PNVBXSQH.js";
import {
  require_jsx_runtime
} from "./chunk-D4LBJ6EK.js";
import {
  require_react
} from "./chunk-KFZ7WD7U.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/invariant@2.2.4/node_modules/invariant/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/invariant@2.2.4/node_modules/invariant/browser.js"(exports, module) {
    "use strict";
    var invariant4 = function(condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === void 0) {
          throw new Error("invariant requires an error message argument");
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() {
              return args[argIndex++];
            })
          );
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant4;
  }
});

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/AppProvider.js
var React6 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useDialogs/useDialogs.js
var import_invariant = __toESM(require_browser(), 1);
var React2 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useDialogs/DialogsContext.js
var React = __toESM(require_react(), 1);
var DialogsContext = React.createContext(null);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useDialogs/useDialogs.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useDialogs/DialogsProvider.js
var import_invariant2 = __toESM(require_browser(), 1);
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function DialogsProvider(props) {
  const {
    children,
    unmountAfter = 1e3
  } = props;
  const [stack, setStack] = React3.useState([]);
  const keyPrefix = React3.useId();
  const nextId = React3.useRef(0);
  const requestDialog = useEventCallback_default(function open(Component, payload, options = {}) {
    const {
      onClose = async () => {
      }
    } = options;
    let resolve;
    const promise = new Promise((resolveImpl) => {
      resolve = resolveImpl;
    });
    (0, import_invariant2.default)(resolve, "resolve not set");
    const key = `${keyPrefix}-${nextId.current}`;
    nextId.current += 1;
    const newEntry = {
      key,
      open: true,
      promise,
      Component,
      payload,
      onClose,
      resolve
    };
    setStack((prevStack) => [...prevStack, newEntry]);
    return promise;
  });
  const closeDialogUi = useEventCallback_default(function closeDialogUi2(dialog) {
    setStack((prevStack) => prevStack.map((entry) => entry.promise === dialog ? {
      ...entry,
      open: false
    } : entry));
    setTimeout(() => {
      setStack((prevStack) => prevStack.filter((entry) => entry.promise !== dialog));
    }, unmountAfter);
  });
  const closeDialog = useEventCallback_default(async function closeDialog2(dialog, result) {
    const entryToClose = stack.find((entry) => entry.promise === dialog);
    (0, import_invariant2.default)(entryToClose, "dialog not found");
    await entryToClose.onClose(result);
    entryToClose.resolve(result);
    closeDialogUi(dialog);
    return dialog;
  });
  const contextValue = React3.useMemo(() => ({
    open: requestDialog,
    close: closeDialog
  }), [requestDialog, closeDialog]);
  return (0, import_jsx_runtime2.jsxs)(DialogsContext.Provider, {
    value: contextValue,
    children: [children, stack.map(({
      key,
      open,
      Component,
      payload,
      promise
    }) => (0, import_jsx_runtime2.jsx)(Component, {
      payload,
      open,
      onClose: async (result) => {
        await closeDialog(promise, result);
      }
    }, key))]
  });
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/AppThemeProvider.js
var React5 = __toESM(require_react(), 1);
var import_invariant3 = __toESM(require_browser(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/persistence/useStorageState.js
var React4 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/persistence/codec.js
var CODEC_STRING = {
  parse: (value) => value,
  stringify: (value) => value
};

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/persistence/useStorageState.js
var currentTabChangeListeners = /* @__PURE__ */ new Map();
function onCurrentTabStorageChange(key, handler) {
  let listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    listeners = /* @__PURE__ */ new Set();
    currentTabChangeListeners.set(key, listeners);
  }
  listeners.add(handler);
}
function offCurrentTabStorageChange(key, handler) {
  const listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    return;
  }
  listeners.delete(handler);
  if (listeners.size === 0) {
    currentTabChangeListeners.delete(key);
  }
}
function emitCurrentTabStorageChange(key) {
  const listeners = currentTabChangeListeners.get(key);
  if (listeners) {
    listeners.forEach((listener) => listener());
  }
}
if (typeof window !== "undefined") {
  const origSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function setItem(key, value) {
    const result = origSetItem.call(this, key, value);
    emitCurrentTabStorageChange(key);
    return result;
  };
}
function subscribe(area, key, callback) {
  if (!key) {
    return () => {
    };
  }
  const storageHandler = (event) => {
    if (event.storageArea === area && event.key === key) {
      callback();
    }
  };
  window.addEventListener("storage", storageHandler);
  onCurrentTabStorageChange(key, callback);
  return () => {
    window.removeEventListener("storage", storageHandler);
    offCurrentTabStorageChange(key, callback);
  };
}
function getSnapshot(area, key) {
  if (!key) {
    return null;
  }
  try {
    return area.getItem(key);
  } catch {
    return null;
  }
}
function setValue(area, key, value) {
  if (!key) {
    return;
  }
  try {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
  } catch {
    return;
  }
  emitCurrentTabStorageChange(key);
}
var serverValue = [null, () => {
}];
function useStorageStateServer() {
  return serverValue;
}
function encode(codec, value) {
  return value === null ? null : codec.stringify(value);
}
function decode(codec, value) {
  return value === null ? null : codec.parse(value);
}
var getKeyServerSnapshot = () => null;
function useStorageState(area, key, initializer = null, options) {
  const codec = (options == null ? void 0 : options.codec) ?? CODEC_STRING;
  const [initialValue] = React4.useState(initializer);
  const encodedInitialValue = React4.useMemo(() => encode(codec, initialValue), [codec, initialValue]);
  const subscribeKey = React4.useCallback((callback) => subscribe(area, key, callback), [area, key]);
  const getKeySnapshot = React4.useCallback(() => getSnapshot(area, key) ?? encodedInitialValue, [area, encodedInitialValue, key]);
  const encodedStoredValue = React4.useSyncExternalStore(subscribeKey, getKeySnapshot, getKeyServerSnapshot);
  const storedValue = React4.useMemo(() => decode(codec, encodedStoredValue), [codec, encodedStoredValue]);
  const setStoredValue = React4.useCallback((value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    const encodedValueToStore = encode(codec, valueToStore);
    setValue(area, key, encodedValueToStore);
  }, [area, codec, storedValue, key]);
  const [nonStoredValue, setNonStoredValue] = React4.useState(initialValue);
  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }
  return [storedValue, setStoredValue];
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useLocalStorageState/useLocalStorageState.js
var useLocalStorageStateBrowser = (...args) => useStorageState(window.localStorage, ...args);
var useLocalStorageState = typeof window === "undefined" ? useStorageStateServer : useLocalStorageStateBrowser;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/AppThemeProvider.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var _CssBaseline;
var _CssBaseline2;
var COLOR_SCHEME_STORAGE_KEY = "toolpad-color-scheme";
var MODE_STORAGE_KEY = "toolpad-mode";
function usePreferredMode(window2) {
  const prefersDarkMode = useMediaQuery_default("(prefers-color-scheme: dark)", window2 && {
    matchMedia: window2.matchMedia
  });
  return prefersDarkMode ? "dark" : "light";
}
function isCssVarsTheme(theme) {
  return "vars" in theme;
}
function LegacyThemeProvider(props) {
  const {
    children,
    theme,
    window: appWindow
  } = props;
  (0, import_invariant3.default)(!isCssVarsTheme(theme), "This provider only accepts legacy themes.");
  const isDualTheme = "light" in theme || "dark" in theme;
  const preferredMode = usePreferredMode(appWindow);
  const [userMode, setUserMode] = useLocalStorageState(MODE_STORAGE_KEY, "system");
  const paletteMode = !userMode || userMode === "system" ? preferredMode : userMode;
  const dualAwareTheme = React5.useMemo(() => isDualTheme ? theme[paletteMode === "dark" ? "dark" : "light"] ?? theme[paletteMode === "dark" ? "light" : "dark"] : theme, [isDualTheme, paletteMode, theme]);
  const paletteModeContextValue = React5.useMemo(() => ({
    paletteMode,
    setPaletteMode: setUserMode,
    isDualTheme
  }), [isDualTheme, paletteMode, setUserMode]);
  return (0, import_jsx_runtime3.jsx)(ThemeProvider, {
    theme: dualAwareTheme,
    children: (0, import_jsx_runtime3.jsxs)(PaletteModeContext.Provider, {
      value: paletteModeContextValue,
      children: [_CssBaseline || (_CssBaseline = (0, import_jsx_runtime3.jsx)(CssBaseline_default, {
        enableColorScheme: true
      })), children]
    })
  });
}
function CssVarsPaletteModeProvider(props) {
  const {
    children,
    window: appWindow
  } = props;
  const preferredMode = usePreferredMode(appWindow);
  const {
    mode,
    setMode,
    allColorSchemes
  } = useColorScheme();
  const paletteModeContextValue = React5.useMemo(() => {
    return {
      paletteMode: !mode || mode === "system" ? preferredMode : mode,
      setPaletteMode: setMode,
      isDualTheme: allColorSchemes.length > 1
    };
  }, [allColorSchemes, mode, preferredMode, setMode]);
  return (0, import_jsx_runtime3.jsx)(PaletteModeContext.Provider, {
    value: paletteModeContextValue,
    children
  });
}
function CssVarsThemeProvider(props) {
  const {
    children,
    theme,
    window: appWindow,
    nonce
  } = props;
  (0, import_invariant3.default)(isCssVarsTheme(theme), "This provider only accepts CSS vars themes.");
  return (0, import_jsx_runtime3.jsxs)(ThemeProvider, {
    theme,
    documentNode: appWindow == null ? void 0 : appWindow.document,
    colorSchemeNode: appWindow == null ? void 0 : appWindow.document.documentElement,
    disableNestedContext: true,
    colorSchemeStorageKey: COLOR_SCHEME_STORAGE_KEY,
    modeStorageKey: MODE_STORAGE_KEY,
    children: [(0, import_jsx_runtime3.jsx)(InitColorSchemeScript_default, {
      attribute: theme.colorSchemeSelector,
      colorSchemeStorageKey: COLOR_SCHEME_STORAGE_KEY,
      modeStorageKey: MODE_STORAGE_KEY,
      nonce
    }), (0, import_jsx_runtime3.jsxs)(CssVarsPaletteModeProvider, {
      window: appWindow,
      children: [_CssBaseline2 || (_CssBaseline2 = (0, import_jsx_runtime3.jsx)(CssBaseline_default, {
        enableColorScheme: true
      })), children]
    })]
  });
}
function AppThemeProvider(props) {
  const {
    children,
    theme,
    ...rest
  } = props;
  const useCssVarsProvider = isCssVarsTheme(theme);
  return useCssVarsProvider ? (0, import_jsx_runtime3.jsx)(CssVarsThemeProvider, {
    theme,
    ...rest,
    children
  }) : (0, import_jsx_runtime3.jsx)(LegacyThemeProvider, {
    theme,
    ...rest,
    children
  });
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/AppProvider.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var AuthenticationContext = React6.createContext(null);
var SessionContext = React6.createContext(null);
function createDefaultTheme() {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme"
    },
    colorSchemes: {
      dark: true
    }
  });
}
function AppProvider(props) {
  const {
    children,
    theme = createDefaultTheme(),
    branding = null,
    navigation = [],
    localeText,
    router = null,
    authentication = null,
    session = null,
    window: appWindow,
    nonce
  } = props;
  return (0, import_jsx_runtime4.jsx)(WindowContext.Provider, {
    value: appWindow,
    children: (0, import_jsx_runtime4.jsx)(AuthenticationContext.Provider, {
      value: authentication,
      children: (0, import_jsx_runtime4.jsx)(SessionContext.Provider, {
        value: session,
        children: (0, import_jsx_runtime4.jsx)(RouterContext.Provider, {
          value: router,
          children: (0, import_jsx_runtime4.jsx)(AppThemeProvider, {
            theme,
            window: appWindow,
            nonce,
            children: (0, import_jsx_runtime4.jsx)(LocalizationProvider, {
              localeText,
              children: (0, import_jsx_runtime4.jsx)(NotificationsProvider, {
                children: (0, import_jsx_runtime4.jsx)(DialogsProvider, {
                  children: (0, import_jsx_runtime4.jsx)(BrandingContext.Provider, {
                    value: branding,
                    children: (0, import_jsx_runtime4.jsx)(NavigationContext.Provider, {
                      value: navigation,
                      children
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
}
true ? AppProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Authentication methods.
   * @default null
   */
  authentication: import_prop_types.default.shape({
    signIn: import_prop_types.default.func.isRequired,
    signOut: import_prop_types.default.func.isRequired
  }),
  /**
   * Branding options for the app.
   * @default null
   */
  branding: import_prop_types.default.shape({
    homeUrl: import_prop_types.default.string,
    logo: import_prop_types.default.node,
    title: import_prop_types.default.string
  }),
  /**
   * The content of the app provider.
   */
  children: import_prop_types.default.node,
  /**
   * Locale text for components
   */
  localeText: import_prop_types.default.object,
  /**
   * Navigation definition for the app. [Find out more](https://mui.com/toolpad/core/react-app-provider/#navigation).
   * @default []
   */
  navigation: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.shape({
    action: import_prop_types.default.node,
    children: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.shape({
      kind: import_prop_types.default.oneOf(["header"]).isRequired,
      title: import_prop_types.default.string.isRequired
    }), import_prop_types.default.shape({
      kind: import_prop_types.default.oneOf(["divider"]).isRequired
    })]).isRequired),
    icon: import_prop_types.default.node,
    kind: import_prop_types.default.oneOf(["page"]),
    pattern: import_prop_types.default.string,
    segment: import_prop_types.default.string,
    title: import_prop_types.default.string
  }), import_prop_types.default.shape({
    kind: import_prop_types.default.oneOf(["header"]).isRequired,
    title: import_prop_types.default.string.isRequired
  }), import_prop_types.default.shape({
    kind: import_prop_types.default.oneOf(["divider"]).isRequired
  })]).isRequired),
  /**
   * The nonce to be used for inline scripts.
   */
  nonce: import_prop_types.default.string,
  /**
   * Router implementation used inside Toolpad components.
   * @default null
   */
  router: import_prop_types.default.shape({
    Link: import_prop_types.default.elementType,
    navigate: import_prop_types.default.func.isRequired,
    pathname: import_prop_types.default.string.isRequired,
    searchParams: import_prop_types.default.instanceOf(URLSearchParams).isRequired
  }),
  /**
   * Session info about the current user.
   * @default null
   */
  session: import_prop_types.default.shape({
    user: import_prop_types.default.shape({
      email: import_prop_types.default.string,
      id: import_prop_types.default.string,
      image: import_prop_types.default.string,
      name: import_prop_types.default.string
    })
  }),
  /**
   * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
   * @default createDefaultTheme()
   */
  theme: import_prop_types.default.object,
  /**
   * The window where the application is rendered.
   * This is needed when rendering the app inside an iframe, for example.
   * @default window
   */
  window: import_prop_types.default.object
} : void 0;

export {
  require_browser,
  AuthenticationContext,
  SessionContext,
  AppProvider
};
//# sourceMappingURL=chunk-LS6WOGZG.js.map
