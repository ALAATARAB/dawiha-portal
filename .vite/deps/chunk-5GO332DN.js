import {
  Close_default
} from "./chunk-32ZV56J7.js";
import {
  Alert_default,
  SnackbarContent_default,
  Snackbar_default
} from "./chunk-IAK2FYW7.js";
import {
  Badge_default
} from "./chunk-ODSX66VG.js";
import {
  Button_default
} from "./chunk-WLZPUYGY.js";
import {
  useSlotProps_default
} from "./chunk-VWHI757I.js";
import {
  IconButton_default
} from "./chunk-4Y2VNWMO.js";
import {
  useTheme
} from "./chunk-5Q6FWKAG.js";
import {
  require_prop_types,
  require_react_is
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

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useNotifications/useNotifications.js
var React2 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useNotifications/NotificationsContext.js
var React = __toESM(require_react(), 1);
var NotificationsContext = React.createContext(null);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useNotifications/useNotifications.js
var serverNotifications = {
  show: () => {
    throw new Error("Not supported on server side");
  },
  close: () => {
    throw new Error("Not supported on server side");
  }
};
function useNotifications() {
  const context = React2.useContext(NotificationsContext);
  if (context) {
    return context;
  }
  return serverNotifications;
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useNotifications/NotificationsProvider.js
var React5 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+utils@0.15.0_react@19.2.5/node_modules/@toolpad/utils/esm/react.js
var React3 = __toESM(require_react());
var ReactIs = __toESM(require_react_is());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function useNonNullableContext(context, name) {
  const maybeContext = React3.useContext(context);
  if (maybeContext === null || maybeContext === void 0) {
    throw new Error(`context "${name}" was used without a Provider`);
  }
  return maybeContext;
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/LocalizationProvider.js
var React4 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/locales/getLocalization.js
var getLocalization = (translations) => {
  return {
    components: {
      MuiLocalizationProvider: {
        defaultProps: {
          localeText: {
            ...translations
          }
        }
      }
    }
  };
};

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/locales/en.js
var en = {
  // Account
  accountSignInLabel: "Sign In",
  accountSignOutLabel: "Sign Out",
  // AccountPreview
  accountPreviewTitle: "Account",
  accountPreviewIconButtonLabel: "Current User",
  // SignInPage
  signInTitle: (brandingTitle) => brandingTitle ? `Sign in to ${brandingTitle}` : "Sign in",
  signInSubtitle: "Welcome user, please sign in to continue",
  signInRememberMe: "Remember Me",
  providerSignInTitle: (provider) => `Sign in with ${provider}`,
  // Common authentication labels
  email: "Email",
  password: "Password",
  username: "Username",
  passkey: "Passkey",
  // Common action labels
  save: "Save",
  cancel: "Cancel",
  ok: "Ok",
  or: "Or",
  to: "To",
  with: "With",
  close: "Close",
  delete: "Delete",
  alert: "Alert",
  confirm: "Confirm",
  loading: "Loading...",
  // CRUD
  createNewButtonLabel: "Create new",
  reloadButtonLabel: "Reload data",
  createLabel: "Create",
  createSuccessMessage: "Item created successfully.",
  createErrorMessage: "Failed to create item. Reason:",
  editLabel: "Edit",
  editSuccessMessage: "Item edited successfully.",
  editErrorMessage: "Failed to edit item. Reason:",
  deleteLabel: "Delete",
  deleteConfirmTitle: "Delete item?",
  deleteConfirmMessage: "Do you wish to delete this item?",
  deleteConfirmLabel: "Delete",
  deleteCancelLabel: "Cancel",
  deleteSuccessMessage: "Item deleted successfully.",
  deleteErrorMessage: "Failed to delete item. Reason:",
  deletedItemMessage: "This item has been deleted."
};
var en_default = getLocalization(en);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/AppProvider/LocalizationProvider.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var LocalizationContext = React4.createContext({});
var LocalizationProvider = function LocalizationProvider2(props) {
  var _a, _b, _c;
  const {
    localeText: propsLocaleText,
    children
  } = props;
  const theme = useTheme();
  const themeLocaleText = (_c = (_b = (_a = theme == null ? void 0 : theme.components) == null ? void 0 : _a.MuiLocalizationProvider) == null ? void 0 : _b.defaultProps) == null ? void 0 : _c.localeText;
  const defaultLocaleText2 = en_default.components.MuiLocalizationProvider.defaultProps.localeText;
  const localeText = React4.useMemo(() => ({
    ...defaultLocaleText2,
    ...themeLocaleText,
    ...propsLocaleText
  }), [defaultLocaleText2, themeLocaleText, propsLocaleText]);
  return (0, import_jsx_runtime2.jsx)(LocalizationContext.Provider, {
    value: localeText,
    children
  });
};
true ? LocalizationProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * Locale for components texts
   */
  localeText: import_prop_types.default.object
} : void 0;
function useLocaleText() {
  return React4.useContext(LocalizationContext);
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useNotifications/NotificationsProvider.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var _CloseIcon;
var RootPropsContext = React5.createContext(null);
var defaultLocaleText = {
  close: "Close"
};
function Notification({
  notificationKey,
  open,
  message,
  options,
  badge
}) {
  var _a, _b;
  const globalLocaleText = useLocaleText();
  const localeText = {
    ...defaultLocaleText,
    ...globalLocaleText
  };
  const {
    close
  } = useNonNullableContext(NotificationsContext);
  const {
    severity,
    actionText,
    onAction,
    autoHideDuration
  } = options;
  const handleClose = React5.useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    close(notificationKey);
  }, [notificationKey, close]);
  const action = (0, import_jsx_runtime3.jsxs)(React5.Fragment, {
    children: [onAction ? (0, import_jsx_runtime3.jsx)(Button_default, {
      color: "inherit",
      size: "small",
      onClick: onAction,
      children: actionText ?? "Action"
    }) : null, (0, import_jsx_runtime3.jsx)(IconButton_default, {
      size: "small",
      "aria-label": localeText == null ? void 0 : localeText.close,
      title: localeText == null ? void 0 : localeText.close,
      color: "inherit",
      onClick: handleClose,
      children: _CloseIcon || (_CloseIcon = (0, import_jsx_runtime3.jsx)(Close_default, {
        fontSize: "small"
      }))
    })]
  });
  const props = React5.useContext(RootPropsContext);
  const SnackbarComponent = ((_a = props == null ? void 0 : props.slots) == null ? void 0 : _a.snackbar) ?? Snackbar_default;
  const snackbarSlotProps = useSlotProps_default({
    elementType: SnackbarComponent,
    ownerState: props,
    externalSlotProps: (_b = props == null ? void 0 : props.slotProps) == null ? void 0 : _b.snackbar,
    additionalProps: {
      open,
      autoHideDuration,
      onClose: handleClose,
      action
    }
  });
  return (0, import_jsx_runtime3.jsx)(SnackbarComponent, {
    ...snackbarSlotProps,
    children: (0, import_jsx_runtime3.jsx)(Badge_default, {
      badgeContent: badge,
      color: "primary",
      sx: {
        width: "100%"
      },
      children: severity ? (0, import_jsx_runtime3.jsx)(Alert_default, {
        severity,
        sx: {
          width: "100%"
        },
        action,
        children: message
      }) : (0, import_jsx_runtime3.jsx)(SnackbarContent_default, {
        message,
        action
      })
    })
  }, notificationKey);
}
function Notifications({
  state
}) {
  const currentNotification = state.queue[0] ?? null;
  return currentNotification ? (0, import_jsx_runtime3.jsx)(Notification, {
    ...currentNotification,
    badge: state.queue.length > 1 ? String(state.queue.length) : null
  }) : null;
}
var nextId = 0;
var generateId = () => {
  const id = nextId;
  nextId += 1;
  return id;
};
function NotificationsProvider(props) {
  const {
    children
  } = props;
  const [state, setState] = React5.useState({
    queue: []
  });
  const show = React5.useCallback((message, options = {}) => {
    const notificationKey = options.key ?? `::toolpad-internal::notification::${generateId()}`;
    setState((prev) => {
      if (prev.queue.some((n) => n.notificationKey === notificationKey)) {
        return prev;
      }
      return {
        ...prev,
        queue: [...prev.queue, {
          message,
          options,
          notificationKey,
          open: true
        }]
      };
    });
    return notificationKey;
  }, []);
  const close = React5.useCallback((key) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((n) => n.notificationKey !== key)
    }));
  }, []);
  const contextValue = React5.useMemo(() => ({
    show,
    close
  }), [show, close]);
  return (0, import_jsx_runtime3.jsx)(RootPropsContext.Provider, {
    value: props,
    children: (0, import_jsx_runtime3.jsxs)(NotificationsContext.Provider, {
      value: contextValue,
      children: [children, (0, import_jsx_runtime3.jsx)(Notifications, {
        state
      })]
    })
  });
}

export {
  useNotifications,
  LocalizationContext,
  LocalizationProvider,
  useLocaleText,
  NotificationsProvider
};
//# sourceMappingURL=chunk-5GO332DN.js.map
