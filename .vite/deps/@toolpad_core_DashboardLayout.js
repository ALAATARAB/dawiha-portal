import {
  Link,
  warnOnce
} from "./chunk-5JOMAQVJ.js";
import {
  AuthenticationContext,
  SessionContext,
  require_browser
} from "./chunk-LS6WOGZG.js";
import {
  BrandingContext,
  DashboardSidebarPageItemContext,
  NavigationContext,
  PaletteModeContext,
  RouterContext,
  WindowContext
} from "./chunk-XVGMJFLG.js";
import {
  useLocaleText
} from "./chunk-5GO332DN.js";
import "./chunk-32ZV56J7.js";
import "./chunk-TKDFY3IY.js";
import {
  AppBar_default,
  Avatar_default,
  Collapse_default,
  ListItemButton_default,
  ListItem_default,
  useMediaQuery_default
} from "./chunk-IAK2FYW7.js";
import {
  Stack_default
} from "./chunk-CY7STL4U.js";
import {
  ListSubheader_default,
  Toolbar_default,
  Tooltip_default
} from "./chunk-ODSX66VG.js";
import {
  Button_default
} from "./chunk-WLZPUYGY.js";
import "./chunk-K3BP6FC2.js";
import {
  Drawer_default
} from "./chunk-VCIN23OT.js";
import "./chunk-NAZ4UGJK.js";
import {
  Divider_default,
  Grow_default,
  ListItemIcon_default,
  ListItemText_default,
  List_default,
  Popover_default
} from "./chunk-VWHI757I.js";
import {
  IconButton_default
} from "./chunk-4Y2VNWMO.js";
import {
  Typography_default
} from "./chunk-EGTMXRJK.js";
import "./chunk-YDQHKM2X.js";
import "./chunk-HMMVYQAC.js";
import "./chunk-MIXUTIRM.js";
import "./chunk-3ZCGMVEC.js";
import {
  Paper_default
} from "./chunk-MOSWNLTR.js";
import "./chunk-WLO2JI25.js";
import "./chunk-GYEXATTH.js";
import {
  createSvgIcon
} from "./chunk-H4ODAJCZ.js";
import "./chunk-A34NXKM3.js";
import "./chunk-G5J2LIQE.js";
import "./chunk-3CKFBXBL.js";
import {
  Box_default
} from "./chunk-I5LZ43DR.js";
import "./chunk-7SQVPYHU.js";
import "./chunk-7ODAVFXW.js";
import {
  useTheme
} from "./chunk-5Q6FWKAG.js";
import {
  require_prop_types,
  styled_default2 as styled_default
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

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardLayout.js
var React17 = __toESM(require_react(), 1);
var import_prop_types8 = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/Menu.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Menu_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/MenuOpen.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var MenuOpen_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5z"
}), "MenuOpen");

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/Account.js
var React7 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/SignInButton.js
var React2 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/AccountLocaleContext.js
var React = __toESM(require_react(), 1);
var AccountLocaleContext = React.createContext(null);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/SignInButton.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function SignInButton(props) {
  const authentication = React2.useContext(AuthenticationContext);
  const globalLocaleText = useLocaleText();
  const accountLocaleText = React2.useContext(AccountLocaleContext);
  const localeText = {
    ...globalLocaleText,
    ...accountLocaleText
  };
  return (0, import_jsx_runtime3.jsx)(Button_default, {
    disableElevation: true,
    variant: "contained",
    size: "small",
    onClick: authentication == null ? void 0 : authentication.signIn,
    sx: {
      textTransform: "capitalize",
      filter: "opacity(0.9)",
      width: "50%",
      margin: (theme) => `${theme.spacing(1)} auto`,
      transition: "filter 0.2s ease-in",
      "&:hover": {
        filter: "opacity(1)"
      }
    },
    ...props,
    children: localeText == null ? void 0 : localeText.accountSignInLabel
  });
}
true ? SignInButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/SignOutButton.js
var React3 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/Logout.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var Logout_default = createSvgIcon((0, import_jsx_runtime4.jsx)("path", {
  d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
}), "Logout");

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/SignOutButton.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _LogoutIcon;
function SignOutButton(props) {
  const authentication = React3.useContext(AuthenticationContext);
  const globalLocaleText = useLocaleText();
  const accountLocaleText = React3.useContext(AccountLocaleContext);
  const localeText = {
    ...globalLocaleText,
    ...accountLocaleText
  };
  return (0, import_jsx_runtime5.jsx)(Button_default, {
    disabled: !authentication,
    variant: "outlined",
    size: "small",
    disableElevation: true,
    onClick: authentication == null ? void 0 : authentication.signOut,
    sx: {
      textTransform: "capitalize",
      fontWeight: "normal",
      filter: "opacity(0.9)",
      transition: "filter 0.2s ease-in",
      "&:hover": {
        filter: "opacity(1)"
      }
    },
    startIcon: _LogoutIcon || (_LogoutIcon = (0, import_jsx_runtime5.jsx)(Logout_default, {})),
    ...props,
    children: localeText == null ? void 0 : localeText.accountSignOutLabel
  });
}
true ? SignOutButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types2.default.node
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/AccountPreview.js
var React4 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/MoreVert.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var MoreVert_default = createSvgIcon((0, import_jsx_runtime6.jsx)("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
}), "MoreVert");

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/AccountPreview.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var _MoreVertIcon;
function AccountPreview(props) {
  var _a, _b, _c, _d, _e, _f, _g4;
  const {
    slots,
    variant = "condensed",
    slotProps,
    open,
    handleClick,
    sx
  } = props;
  const session = React4.useContext(SessionContext);
  const globalLocaleText = useLocaleText();
  const accountLocaleText = React4.useContext(AccountLocaleContext);
  const localeText = {
    ...globalLocaleText,
    ...accountLocaleText
  };
  if (!session || !session.user) {
    return null;
  }
  const avatarContent = (slots == null ? void 0 : slots.avatar) ? (0, import_jsx_runtime7.jsx)(slots.avatar, {}) : (0, import_jsx_runtime7.jsx)(Avatar_default, {
    src: ((_a = session.user) == null ? void 0 : _a.image) || "",
    alt: ((_b = session.user) == null ? void 0 : _b.name) || ((_c = session.user) == null ? void 0 : _c.email) || "",
    sx: {
      height: variant === "expanded" ? 48 : 32,
      width: variant === "expanded" ? 48 : 32
    },
    ...slotProps == null ? void 0 : slotProps.avatar
  });
  if (variant === "expanded") {
    return (0, import_jsx_runtime7.jsxs)(Stack_default, {
      direction: "row",
      justifyContent: "space-between",
      sx: {
        py: 1,
        px: 2,
        gap: 2,
        ...sx
      },
      children: [(0, import_jsx_runtime7.jsxs)(Stack_default, {
        direction: "row",
        justifyContent: "flex-start",
        spacing: 2,
        overflow: "hidden",
        children: [avatarContent, (0, import_jsx_runtime7.jsxs)(Stack_default, {
          direction: "column",
          justifyContent: "space-evenly",
          overflow: "hidden",
          children: [(0, import_jsx_runtime7.jsx)(Typography_default, {
            variant: "body2",
            fontWeight: "bolder",
            noWrap: true,
            children: (_d = session.user) == null ? void 0 : _d.name
          }), (0, import_jsx_runtime7.jsx)(Typography_default, {
            variant: "caption",
            noWrap: true,
            children: (_e = session.user) == null ? void 0 : _e.email
          })]
        })]
      }), handleClick && ((slots == null ? void 0 : slots.moreIconButton) ? (0, import_jsx_runtime7.jsx)(slots.moreIconButton, {}) : (0, import_jsx_runtime7.jsx)(IconButton_default, {
        size: "small",
        onClick: handleClick,
        ...slotProps == null ? void 0 : slotProps.moreIconButton,
        sx: {
          alignSelf: "center",
          ...(_f = slotProps == null ? void 0 : slotProps.moreIconButton) == null ? void 0 : _f.sx
        },
        children: _MoreVertIcon || (_MoreVertIcon = (0, import_jsx_runtime7.jsx)(MoreVert_default, {
          fontSize: "small"
        }))
      }))]
    });
  }
  return (0, import_jsx_runtime7.jsx)(Tooltip_default, {
    title: session.user.name ?? (accountLocaleText == null ? void 0 : accountLocaleText.accountPreviewTitle),
    children: (slots == null ? void 0 : slots.avatarIconButton) ? (0, import_jsx_runtime7.jsx)(slots.avatarIconButton, {
      ...slotProps == null ? void 0 : slotProps.avatarIconButton
    }) : (0, import_jsx_runtime7.jsx)(Stack_default, {
      sx: {
        py: 0.5,
        ...sx
      },
      children: (0, import_jsx_runtime7.jsx)(IconButton_default, {
        onClick: handleClick,
        "aria-label": localeText == null ? void 0 : localeText.accountPreviewIconButtonLabel,
        size: "small",
        "aria-controls": open ? "account-menu" : void 0,
        "aria-haspopup": "true",
        "aria-expanded": open ? "true" : void 0,
        ...slotProps == null ? void 0 : slotProps.avatarIconButton,
        sx: {
          width: "fit-content",
          margin: "0 auto",
          ...(_g4 = slotProps == null ? void 0 : slotProps.avatarIconButton) == null ? void 0 : _g4.sx
        },
        children: avatarContent
      })
    })
  });
}
true ? AccountPreview.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The handler used when the preview is expanded
   */
  handleClick: import_prop_types3.default.func,
  /**
   * The state of the Account popover
   * @default false
   */
  open: import_prop_types3.default.bool,
  /**
   * The props used for each slot inside.
   */
  slotProps: import_prop_types3.default.shape({
    avatar: import_prop_types3.default.object,
    avatarIconButton: import_prop_types3.default.object,
    moreIconButton: import_prop_types3.default.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: import_prop_types3.default.shape({
    avatar: import_prop_types3.default.elementType,
    avatarIconButton: import_prop_types3.default.elementType,
    moreIconButton: import_prop_types3.default.elementType
  }),
  /**
   * The prop used to customize the styling of the preview
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * The type of account details to display.
   * @property {'condensed'} condensed - Shows only the user's avatar.
   * @property {'expanded'} expanded - Displays the user's avatar, name, and email if available.
   * @default 'condensed'
   */
  variant: import_prop_types3.default.oneOf(["condensed", "expanded"])
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/AccountPopoverHeader.js
var React5 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function AccountPopoverHeader(props) {
  const {
    children,
    ...rest
  } = props;
  return (0, import_jsx_runtime8.jsx)(Stack_default, {
    ...rest,
    children
  });
}
true ? AccountPopoverHeader.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types4.default.node
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/AccountPopoverFooter.js
var React6 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function AccountPopoverFooter(props) {
  const {
    children,
    ...rest
  } = props;
  return (0, import_jsx_runtime9.jsx)(Box_default, {
    ...rest,
    sx: {
      display: "flex",
      flexDirection: "row",
      p: 1,
      justifyContent: "flex-end",
      ...rest.sx
    },
    children
  });
}
true ? AccountPopoverFooter.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types5.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object])
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/Account/Account.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var _AccountPopoverHeader;
var _Divider;
var defaultAccountLocaleText = {
  accountPreviewIconButtonLabel: "Current User",
  accountPreviewTitle: "Account",
  accountSignInLabel: "Sign in",
  accountSignOutLabel: "Sign out"
};
function Account(props) {
  var _a;
  const {
    localeText: propsLocaleText
  } = props;
  const globalLocaleText = useLocaleText();
  const localeText = React7.useMemo(() => ({
    ...defaultAccountLocaleText,
    ...globalLocaleText,
    ...propsLocaleText
  }), [globalLocaleText, propsLocaleText]);
  const {
    slots,
    slotProps
  } = props;
  const [anchorEl, setAnchorEl] = React7.useState(null);
  const session = React7.useContext(SessionContext);
  const authentication = React7.useContext(AuthenticationContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!authentication) {
    return null;
  }
  let accountContent = null;
  if (!(session == null ? void 0 : session.user)) {
    accountContent = (slots == null ? void 0 : slots.signInButton) ? (0, import_jsx_runtime10.jsx)(slots.signInButton, {
      onClick: authentication.signIn
    }) : (0, import_jsx_runtime10.jsx)(SignInButton, {
      ...slotProps == null ? void 0 : slotProps.signInButton
    });
  } else {
    accountContent = (0, import_jsx_runtime10.jsxs)(React7.Fragment, {
      children: [(slots == null ? void 0 : slots.preview) ? (0, import_jsx_runtime10.jsx)(slots.preview, {
        handleClick,
        open
      }) : (0, import_jsx_runtime10.jsx)(AccountPreview, {
        variant: "condensed",
        handleClick,
        open,
        ...slotProps == null ? void 0 : slotProps.preview
      }), (slots == null ? void 0 : slots.popover) ? (0, import_jsx_runtime10.jsx)(slots.popover, {
        open,
        onClick: handleClick,
        onClose: handleClose,
        ...slotProps == null ? void 0 : slotProps.popover
      }) : (0, import_jsx_runtime10.jsx)(Popover_default, {
        anchorEl,
        id: "account-menu",
        open,
        onClose: handleClose,
        onClick: handleClose,
        transformOrigin: {
          horizontal: "right",
          vertical: "top"
        },
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom"
        },
        ...slotProps == null ? void 0 : slotProps.popover,
        slotProps: {
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: (theme) => `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
              mt: 1,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          },
          ...(_a = slotProps == null ? void 0 : slotProps.popover) == null ? void 0 : _a.slotProps
        },
        children: (slots == null ? void 0 : slots.popoverContent) ? (0, import_jsx_runtime10.jsx)(slots.popoverContent, {
          ...slotProps == null ? void 0 : slotProps.popoverContent
        }) : (0, import_jsx_runtime10.jsxs)(Stack_default, {
          direction: "column",
          ...slotProps == null ? void 0 : slotProps.popoverContent,
          children: [_AccountPopoverHeader || (_AccountPopoverHeader = (0, import_jsx_runtime10.jsx)(AccountPopoverHeader, {
            children: (0, import_jsx_runtime10.jsx)(AccountPreview, {
              variant: "expanded"
            })
          })), _Divider || (_Divider = (0, import_jsx_runtime10.jsx)(Divider_default, {})), (0, import_jsx_runtime10.jsx)(AccountPopoverFooter, {
            children: (0, import_jsx_runtime10.jsx)(SignOutButton, {
              ...slotProps == null ? void 0 : slotProps.signOutButton
            })
          })]
        })
      })]
    });
  }
  return (0, import_jsx_runtime10.jsx)(AccountLocaleContext.Provider, {
    value: localeText,
    children: accountContent
  });
}
true ? Account.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The labels for the account component.
   */
  localeText: import_prop_types6.default.object,
  /**
   * The props used for each slot inside.
   */
  slotProps: import_prop_types6.default.shape({
    popover: import_prop_types6.default.object,
    popoverContent: import_prop_types6.default.object,
    preview: import_prop_types6.default.shape({
      handleClick: import_prop_types6.default.func,
      open: import_prop_types6.default.bool,
      slotProps: import_prop_types6.default.shape({
        avatar: import_prop_types6.default.object,
        avatarIconButton: import_prop_types6.default.object,
        moreIconButton: import_prop_types6.default.object
      }),
      slots: import_prop_types6.default.shape({
        avatar: import_prop_types6.default.elementType,
        avatarIconButton: import_prop_types6.default.elementType,
        moreIconButton: import_prop_types6.default.elementType
      }),
      sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object]),
      variant: import_prop_types6.default.oneOf(["condensed", "expanded"])
    }),
    signInButton: import_prop_types6.default.object,
    signOutButton: import_prop_types6.default.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: import_prop_types6.default.shape({
    popover: import_prop_types6.default.elementType,
    popoverContent: import_prop_types6.default.elementType,
    preview: import_prop_types6.default.elementType,
    signInButton: import_prop_types6.default.elementType,
    signOutButton: import_prop_types6.default.elementType
  })
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardSidebarSubNavigation.js
var React10 = __toESM(require_react(), 1);

// node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/shared/navigation.js
var import_invariant = __toESM(require_browser(), 1);
var getItemKind = (item) => item.kind ?? "page";
var isPageItem = (item) => getItemKind(item) === "page";
var getItemTitle = (item) => {
  return isPageItem(item) ? item.title ?? item.segment ?? "" : item.title;
};
function buildItemToPathMap(navigation) {
  const map = /* @__PURE__ */ new Map();
  const visit = (item, base) => {
    if (isPageItem(item)) {
      const path = `${base.startsWith("/") ? base : `/${base}`}${base && base !== "/" && item.segment ? "/" : ""}${item.segment || ""}` || "/";
      map.set(item, path);
      if (item.children) {
        for (const child of item.children) {
          visit(child, path);
        }
      }
    }
  };
  for (const item of navigation) {
    visit(item, "");
  }
  return map;
}
var itemToPathMapCache = /* @__PURE__ */ new WeakMap();
function getItemToPathMap(navigation) {
  let map = itemToPathMapCache.get(navigation);
  if (!map) {
    map = buildItemToPathMap(navigation);
    itemToPathMapCache.set(navigation, map);
  }
  return map;
}
function buildItemLookup(navigation) {
  const map = /* @__PURE__ */ new Map();
  const visit = (item) => {
    if (isPageItem(item)) {
      const path = getItemPath(navigation, item);
      if (map.has(path)) {
        console.warn(`Duplicate path in navigation: ${path}`);
      }
      map.set(path, item);
      if (item.pattern) {
        const basePath = item.segment ? path.slice(0, -item.segment.length) : path;
        map.set(pathToRegexp(basePath + item.pattern), item);
      }
      if (item.children) {
        for (const child of item.children) {
          visit(child);
        }
      }
    }
  };
  for (const item of navigation) {
    visit(item);
  }
  return map;
}
var itemLookupMapCache = /* @__PURE__ */ new WeakMap();
function getItemLookup(navigation) {
  let map = itemLookupMapCache.get(navigation);
  if (!map) {
    map = buildItemLookup(navigation);
    itemLookupMapCache.set(navigation, map);
  }
  return map;
}
function matchPath(navigation, path) {
  const lookup = getItemLookup(navigation);
  for (const [key, item] of lookup.entries()) {
    if (typeof key === "string" && key === path) {
      return item;
    }
    if (key instanceof RegExp && key.test(path)) {
      return item;
    }
  }
  return null;
}
function getItemPath(navigation, item) {
  const map = getItemToPathMap(navigation);
  const path = map.get(item);
  (0, import_invariant.default)(path, `Item not found in navigation: ${item.title}`);
  return path;
}
function hasSelectedNavigationChildren(navigation, item, activePagePath) {
  if (item.children) {
    return item.children.some((nestedItem) => {
      if (!isPageItem(nestedItem)) {
        return false;
      }
      if (nestedItem.children) {
        return hasSelectedNavigationChildren(navigation, nestedItem, activePagePath);
      }
      return activePagePath === getItemPath(navigation, nestedItem);
    });
  }
  return false;
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/utils.js
function getDrawerSxTransitionMixin(isExpanded, property) {
  return {
    transition: (theme) => theme.transitions.create(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
    })
  };
}
function getDrawerWidthTransitionMixin(isExpanded) {
  return {
    ...getDrawerSxTransitionMixin(isExpanded, "width"),
    overflowX: "hidden"
  };
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/useActivePage/useActivePage.js
var React8 = __toESM(require_react(), 1);
function useActivePage() {
  const navigationContext = React8.useContext(NavigationContext);
  const routerContext = React8.useContext(RouterContext);
  const pathname = (routerContext == null ? void 0 : routerContext.pathname) ?? "/";
  const activeItem = matchPath(navigationContext, pathname);
  const rootItem = matchPath(navigationContext, "/");
  return React8.useMemo(() => {
    if (!activeItem) {
      return null;
    }
    const breadcrumbs = [];
    if (rootItem) {
      breadcrumbs.push({
        title: getItemTitle(rootItem),
        path: "/"
      });
    }
    const segments = pathname.split("/").filter(Boolean);
    let prefix = "";
    for (const segment of segments) {
      const path = `${prefix}/${segment}`;
      prefix = path;
      const item = matchPath(navigationContext, path);
      if (!item) {
        continue;
      }
      const itemPath = getItemPath(navigationContext, item);
      const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
      if ((lastCrumb == null ? void 0 : lastCrumb.path) !== itemPath) {
        breadcrumbs.push({
          title: getItemTitle(item),
          path: itemPath
        });
      }
    }
    return {
      title: getItemTitle(activeItem),
      path: getItemPath(navigationContext, activeItem),
      breadcrumbs
    };
  }, [activeItem, rootItem, pathname, navigationContext]);
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardSidebarPageItem.js
var React9 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/ExpandMore.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var ExpandMore_default = createSvgIcon((0, import_jsx_runtime11.jsx)("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardSidebarPageItem.js
var import_invariant2 = __toESM(require_browser(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/shared.js
var MINI_DRAWER_WIDTH = 84;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardSidebarPageItem.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var NavigationListItemButton = styled_default(ListItemButton_default)(({
  theme
}) => ({
  borderRadius: 8,
  "&.Mui-selected": {
    "& .MuiListItemIcon-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiTypography-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiSvgIcon-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiAvatar-root": {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiTouchRipple-child": {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark
    }
  },
  "& .MuiSvgIcon-root": {
    color: (theme.vars ?? theme).palette.action.active
  },
  "& .MuiAvatar-root": {
    backgroundColor: (theme.vars ?? theme).palette.action.active
  }
}));
var LIST_ITEM_ICON_SIZE = 34;
function DashboardSidebarPageItem(props) {
  const navigationContext = React9.useContext(NavigationContext);
  const pageItemContextProps = React9.useContext(DashboardSidebarPageItemContext);
  (0, import_invariant2.default)(pageItemContextProps, "No navigation page item context provided.");
  const contextAwareProps = {
    ...pageItemContextProps,
    ...props
  };
  const {
    item,
    href = getItemPath(navigationContext, item),
    LinkComponent: LinkComponentProp,
    expanded = false,
    selected = false,
    disabled = false,
    id,
    onClick,
    isMini = false,
    isSidebarFullyExpanded = true,
    isSidebarFullyCollapsed = false,
    renderNestedNavigation
  } = contextAwareProps;
  const [hoveredMiniSidebarItemId, setHoveredMiniSidebarItemId] = React9.useState(null);
  const handleClick = React9.useCallback(() => {
    onClick(id, item);
  }, [id, item, onClick]);
  let nestedNavigationCollapseSx = {
    display: "none"
  };
  if (isMini && isSidebarFullyCollapsed) {
    nestedNavigationCollapseSx = {
      fontSize: 18,
      position: "absolute",
      top: "41.5%",
      right: "2px",
      transform: "translateY(-50%) rotate(-90deg)"
    };
  } else if (!isMini && isSidebarFullyExpanded) {
    nestedNavigationCollapseSx = {
      ml: 0.5,
      transform: `rotate(${expanded ? 0 : -90}deg)`,
      transition: (theme) => theme.transitions.create("transform", {
        easing: theme.transitions.easing.sharp,
        duration: 100
      })
    };
  }
  const hasExternalHref = href.startsWith("http://") || href.startsWith("https://");
  const LinkComponent = LinkComponentProp ?? (hasExternalHref ? "a" : Link);
  const title = getItemTitle(item);
  const listItem = (0, import_jsx_runtime12.jsxs)(ListItem_default, {
    ...item.children && isMini ? {
      onMouseEnter: () => {
        setHoveredMiniSidebarItemId(id);
      },
      onMouseLeave: () => {
        setHoveredMiniSidebarItemId(null);
      }
    } : {},
    sx: {
      py: 0,
      px: 1,
      overflowX: "hidden"
    },
    children: [(0, import_jsx_runtime12.jsxs)(NavigationListItemButton, {
      selected,
      disabled,
      sx: {
        px: 1.4,
        height: isMini ? 60 : 48
      },
      ...item.children && !isMini ? {
        onClick: handleClick
      } : {},
      ...!item.children ? {
        LinkComponent,
        ...hasExternalHref ? {
          target: "_blank",
          rel: "noopener noreferrer"
        } : {},
        href,
        onClick: handleClick
      } : {},
      children: [item.icon || isMini ? (0, import_jsx_runtime12.jsxs)(Box_default, {
        sx: isMini ? {
          position: "absolute",
          left: "50%",
          top: "calc(50% - 6px)",
          transform: "translate(-50%, -50%)"
        } : {},
        children: [(0, import_jsx_runtime12.jsxs)(ListItemIcon_default, {
          sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: LIST_ITEM_ICON_SIZE
          },
          children: [item.icon ?? null, !item.icon && isMini ? (0, import_jsx_runtime12.jsx)(Avatar_default, {
            sx: {
              width: LIST_ITEM_ICON_SIZE - 7,
              height: LIST_ITEM_ICON_SIZE - 7,
              fontSize: 12
            },
            children: title.split(" ").slice(0, 2).map((titleWord) => titleWord.charAt(0).toUpperCase())
          }) : null]
        }), isMini ? (0, import_jsx_runtime12.jsx)(Typography_default, {
          variant: "caption",
          sx: {
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            fontWeight: 500,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: MINI_DRAWER_WIDTH - 28
          },
          children: title
        }) : null]
      }) : null, !isMini ? (0, import_jsx_runtime12.jsx)(ListItemText_default, {
        primary: title,
        sx: {
          ml: 1.2,
          whiteSpace: "nowrap",
          zIndex: 1
        }
      }) : null, item.action && !isMini && isSidebarFullyExpanded ? item.action : null, item.children ? (0, import_jsx_runtime12.jsx)(ExpandMore_default, {
        sx: nestedNavigationCollapseSx
      }) : null]
    }), item.children && isMini ? (0, import_jsx_runtime12.jsx)(Grow_default, {
      in: id === hoveredMiniSidebarItemId,
      children: (0, import_jsx_runtime12.jsx)(Box_default, {
        sx: {
          position: "fixed",
          left: MINI_DRAWER_WIDTH - 2,
          pl: "6px"
        },
        children: (0, import_jsx_runtime12.jsx)(Paper_default, {
          sx: {
            pt: 0.5,
            pb: 0.5,
            transform: "translateY(calc(50% - 30px))"
          },
          children: renderNestedNavigation(item.children)
        })
      })
    }) : null]
  });
  return (0, import_jsx_runtime12.jsxs)(React9.Fragment, {
    children: [listItem, item.children && !isMini ? (0, import_jsx_runtime12.jsx)(Collapse_default, {
      in: expanded,
      timeout: "auto",
      unmountOnExit: true,
      children: renderNestedNavigation(item.children)
    }) : null]
  }, id);
}
true ? DashboardSidebarPageItem.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the item is disabled.
   * @default false
   */
  disabled: import_prop_types7.default.bool,
  /**
   * If `true`, expands any nested navigation in the item, otherwise collapse it.
   * @default false
   */
  expanded: import_prop_types7.default.bool,
  /**
   * Link `href` for when the item is rendered as a link.
   * @default getItemPath(navigationContext, item)
   */
  href: import_prop_types7.default.string,
  /**
   * Navigation page item definition.
   */
  item: import_prop_types7.default.shape({
    action: import_prop_types7.default.node,
    children: import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.object, import_prop_types7.default.shape({
      kind: import_prop_types7.default.oneOf(["header"]).isRequired,
      title: import_prop_types7.default.string.isRequired
    }), import_prop_types7.default.shape({
      kind: import_prop_types7.default.oneOf(["divider"]).isRequired
    })]).isRequired),
    icon: import_prop_types7.default.node,
    kind: import_prop_types7.default.oneOf(["page"]),
    pattern: import_prop_types7.default.string,
    segment: import_prop_types7.default.string,
    title: import_prop_types7.default.string
  }).isRequired,
  /**
   * The component used to render the item as a link.
   * @default Link
   */
  LinkComponent: import_prop_types7.default.elementType,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: import_prop_types7.default.bool
} : void 0;

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardSidebarSubNavigation.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function DashboardSidebarSubNavigationPageItem({
  id,
  item,
  isExpanded,
  onClick,
  depth,
  onLinkClick,
  isMini,
  isFullyExpanded,
  isFullyCollapsed,
  sidebarExpandedWidth,
  renderPageItem
}) {
  const navigationContext = React10.useContext(NavigationContext);
  const activePage = useActivePage();
  const isActive = !!activePage && activePage.path === getItemPath(navigationContext, item);
  const isSelected = activePage && item.children && isMini ? hasSelectedNavigationChildren(navigationContext, item, activePage.path) : isActive && !item.children;
  const pageItemContextProps = React10.useMemo(() => ({
    expanded: isExpanded,
    selected: isSelected,
    id,
    onClick,
    isMini,
    isSidebarFullyExpanded: isFullyExpanded,
    isSidebarFullyCollapsed: isFullyCollapsed,
    renderNestedNavigation: () => (0, import_jsx_runtime13.jsx)(DashboardSidebarSubNavigation, {
      subNavigation: item.children ?? [],
      depth: depth + 1,
      onLinkClick,
      isPopover: isMini,
      sidebarExpandedWidth
    })
  }), [depth, id, isExpanded, isFullyCollapsed, isFullyExpanded, isMini, isSelected, item.children, onClick, onLinkClick, sidebarExpandedWidth]);
  return (0, import_jsx_runtime13.jsx)(DashboardSidebarPageItemContext.Provider, {
    value: pageItemContextProps,
    children: renderPageItem ? renderPageItem(item, {
      mini: isMini
    }) : (0, import_jsx_runtime13.jsx)(DashboardSidebarPageItem, {
      item
    })
  });
}
function DashboardSidebarSubNavigation({
  subNavigation,
  depth = 0,
  onLinkClick,
  isMini = false,
  isPopover = false,
  isFullyExpanded = true,
  isFullyCollapsed = false,
  hasDrawerTransitions = false,
  sidebarExpandedWidth,
  renderPageItem
}) {
  const navigationContext = React10.useContext(NavigationContext);
  const activePage = useActivePage();
  const initialExpandedItemIds = React10.useMemo(() => subNavigation.map((navigationItem, navigationItemIndex) => ({
    navigationItem,
    originalIndex: navigationItemIndex
  })).filter(({
    navigationItem
  }) => isPageItem(navigationItem) && !!activePage && hasSelectedNavigationChildren(navigationContext, navigationItem, activePage.path)).map(({
    originalIndex
  }) => `page-${depth}-${originalIndex}`), [activePage, depth, navigationContext, subNavigation]);
  const [expandedItemIds, setExpandedItemIds] = React10.useState(initialExpandedItemIds);
  const handlePageItemClick = React10.useCallback((itemId, item) => {
    if (item.children && !isMini) {
      setExpandedItemIds((previousValue) => previousValue.includes(itemId) ? previousValue.filter((previousValueItemId) => previousValueItemId !== itemId) : [...previousValue, itemId]);
    } else if (!item.children) {
      onLinkClick();
    }
  }, [isMini, onLinkClick]);
  return (0, import_jsx_runtime13.jsx)(List_default, {
    sx: {
      padding: 0,
      mt: isPopover && depth === 1 ? 0.5 : 0,
      mb: depth === 0 && !isPopover ? 4 : 0.5,
      pl: (isPopover ? 1 : 2) * (isPopover ? depth - 1 : depth),
      minWidth: isPopover && depth === 1 ? 240 : "auto",
      width: isMini ? MINI_DRAWER_WIDTH : "auto"
    },
    children: subNavigation.map((navigationItem, navigationItemIndex) => {
      if (navigationItem.kind === "header") {
        return (0, import_jsx_runtime13.jsx)(ListSubheader_default, {
          sx: {
            fontSize: 12,
            fontWeight: "700",
            height: isMini ? 0 : 40,
            ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, "height") : {},
            px: 2,
            minWidth: sidebarExpandedWidth,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            zIndex: 2
          },
          children: getItemTitle(navigationItem)
        }, `subheader-${depth}-${navigationItemIndex}`);
      }
      if (navigationItem.kind === "divider") {
        const nextItem = subNavigation[navigationItemIndex + 1];
        return (0, import_jsx_runtime13.jsx)("li", {
          children: (0, import_jsx_runtime13.jsx)(Divider_default, {
            sx: {
              borderBottomWidth: 2,
              mx: 1,
              mt: 1,
              mb: (nextItem == null ? void 0 : nextItem.kind) === "header" && !isMini ? 0 : 1,
              ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, "margin") : {}
            }
          })
        }, `divider-${depth}-${navigationItemIndex}`);
      }
      const pageItemId = `page-${depth}-${navigationItemIndex}`;
      return (0, import_jsx_runtime13.jsx)(DashboardSidebarSubNavigationPageItem, {
        id: pageItemId,
        item: navigationItem,
        isExpanded: expandedItemIds.includes(pageItemId),
        onClick: handlePageItemClick,
        depth,
        onLinkClick,
        isMini,
        isFullyExpanded,
        isFullyCollapsed,
        sidebarExpandedWidth,
        renderPageItem
      }, pageItemId);
    })
  });
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/ToolbarActions.js
var React13 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/ThemeSwitcher.js
var React12 = __toESM(require_react(), 1);

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/DarkMode.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var DarkMode_default = createSvgIcon((0, import_jsx_runtime14.jsx)("path", {
  d: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"
}), "DarkMode");

// node_modules/.pnpm/@mui+icons-material@7.3.10_@mui+material@7.3.10_@emotion+react@11.14.0_@types+react@19._2f14e8099a41e769c7744e9ec0f352e1/node_modules/@mui/icons-material/esm/LightMode.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var LightMode_default = createSvgIcon((0, import_jsx_runtime15.jsx)("path", {
  d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"
}), "LightMode");

// node_modules/.pnpm/@toolpad+utils@0.15.0_react@19.2.5/node_modules/@toolpad/utils/esm/hooks/useSsr.js
var React11 = __toESM(require_react());
function subscribe() {
  return () => {
  };
}
function getSnapshot() {
  return false;
}
function getServerSnapshot() {
  return true;
}
function useSsr() {
  return React11.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/ThemeSwitcher.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var _DarkModeIcon;
var _LightModeIcon;
function ThemeSwitcher() {
  const isSsr = useSsr();
  const theme = useTheme();
  const {
    paletteMode,
    setPaletteMode,
    isDualTheme
  } = React12.useContext(PaletteModeContext);
  const toggleMode = React12.useCallback(() => {
    setPaletteMode(paletteMode === "dark" ? "light" : "dark");
  }, [paletteMode, setPaletteMode]);
  return isDualTheme ? (0, import_jsx_runtime16.jsx)(Tooltip_default, {
    title: isSsr ? "Switch mode" : `${paletteMode === "dark" ? "Light" : "Dark"} mode`,
    enterDelay: 1e3,
    children: (0, import_jsx_runtime16.jsx)("div", {
      children: (0, import_jsx_runtime16.jsx)(IconButton_default, {
        "aria-label": isSsr ? "Switch theme mode" : `Switch to ${paletteMode === "dark" ? "light" : "dark"} mode`,
        onClick: toggleMode,
        sx: {
          color: (theme.vars ?? theme).palette.primary.dark
        },
        children: theme.getColorSchemeSelector ? (0, import_jsx_runtime16.jsxs)(React12.Fragment, {
          children: [(0, import_jsx_runtime16.jsx)(DarkMode_default, {
            sx: {
              display: "inline",
              [theme.getColorSchemeSelector("dark")]: {
                display: "none"
              }
            }
          }), (0, import_jsx_runtime16.jsx)(LightMode_default, {
            sx: {
              display: "none",
              [theme.getColorSchemeSelector("dark")]: {
                display: "inline"
              }
            }
          })]
        }) : (0, import_jsx_runtime16.jsx)(React12.Fragment, {
          children: isSsr || paletteMode !== "dark" ? _DarkModeIcon || (_DarkModeIcon = (0, import_jsx_runtime16.jsx)(DarkMode_default, {})) : _LightModeIcon || (_LightModeIcon = (0, import_jsx_runtime16.jsx)(LightMode_default, {}))
        })
      })
    })
  }) : null;
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/ToolbarActions.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var _Stack;
function ToolbarActions() {
  return _Stack || (_Stack = (0, import_jsx_runtime17.jsx)(Stack_default, {
    direction: "row",
    alignItems: "center",
    children: (0, import_jsx_runtime17.jsx)(ThemeSwitcher, {})
  }));
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/AppTitle.js
var React16 = __toESM(require_react(), 1);

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/ToolpadLogo.js
var React14 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var _g;
var _path;
var _g2;
var _path2;
var _g3;
function ToolpadLogo({
  size = 40
}) {
  return (0, import_jsx_runtime18.jsxs)("svg", {
    width: size,
    height: size,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [_g || (_g = (0, import_jsx_runtime18.jsxs)("g", {
      mask: "url(#a)",
      children: [(0, import_jsx_runtime18.jsx)("path", {
        d: "M22.74 27.73v-7.6l6.64-3.79v7.6l-6.64 3.79Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "M16.1 23.93v-7.59l6.64 3.8v7.59l-6.65-3.8Z",
        fill: "#39F"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "m16.1 16.34 6.64-3.8 6.64 3.8-6.64 3.8-6.65-3.8Z",
        fill: "#A5D8FF"
      })]
    })), (0, import_jsx_runtime18.jsx)("mask", {
      id: "b",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "17",
      width: "14",
      height: "15",
      children: _path || (_path = (0, import_jsx_runtime18.jsx)("path", {
        d: "M8.5 22.3c0-1.05.56-2 1.46-2.53l3.75-2.14c.89-.5 1.98-.5 2.87 0l3.75 2.14a2.9 2.9 0 0 1 1.46 2.52v4.23c0 1.04-.56 2-1.46 2.52l-3.75 2.14c-.89.5-1.98.5-2.87 0l-3.75-2.14a2.9 2.9 0 0 1-1.46-2.52v-4.23Z",
        fill: "#D7DCE1"
      }))
    }), _g2 || (_g2 = (0, import_jsx_runtime18.jsxs)("g", {
      mask: "url(#b)",
      children: [(0, import_jsx_runtime18.jsx)("path", {
        d: "M15.14 32v-7.6l6.65-3.8v7.6L15.14 32Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "M8.5 28.2v-7.6l6.64 3.8V32L8.5 28.2Z",
        fill: "#39F"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "m8.5 20.6 6.64-3.79 6.65 3.8-6.65 3.8-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    })), (0, import_jsx_runtime18.jsx)("mask", {
      id: "c",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "4",
      width: "22",
      height: "20",
      children: _path2 || (_path2 = (0, import_jsx_runtime18.jsx)("path", {
        d: "M24.17 4.82a2.9 2.9 0 0 0-2.87 0L9.97 11.22a2.9 2.9 0 0 0-1.47 2.53v4.22c0 1.04.56 2 1.46 2.52l3.75 2.14c.89.5 1.98.5 2.87 0l11.33-6.42a2.9 2.9 0 0 0 1.47-2.52V9.48c0-1.04-.56-2-1.46-2.52l-3.75-2.14Z",
        fill: "#D7DCE1"
      }))
    }), _g3 || (_g3 = (0, import_jsx_runtime18.jsxs)("g", {
      mask: "url(#c)",
      children: [(0, import_jsx_runtime18.jsx)("path", {
        d: "M15.14 23.46v-7.6L29.38 7.8v7.59l-14.24 8.07Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "M8.5 19.66v-7.6l6.64 3.8v7.6l-6.64-3.8Z",
        fill: "#39F"
      }), (0, import_jsx_runtime18.jsx)("path", {
        d: "M8.5 12.07 22.74 4l6.64 3.8-14.24 8.06-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    }))]
  });
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/shared/branding.js
var React15 = __toESM(require_react(), 1);
function useApplicationTitle() {
  const branding = React15.useContext(BrandingContext);
  return (branding == null ? void 0 : branding.title) ?? "Toolpad";
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/AppTitle.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var _ToolpadLogo;
var LogoContainer = styled_default("div")({
  position: "relative",
  height: 40,
  display: "flex",
  alignItems: "center",
  "& img": {
    maxHeight: 40
  }
});
function AppTitle(props) {
  var _a, _b, _c;
  const theme = useTheme();
  const defaultTitle = useApplicationTitle();
  const title = ((_a = props == null ? void 0 : props.branding) == null ? void 0 : _a.title) ?? defaultTitle;
  return (0, import_jsx_runtime19.jsx)(Link, {
    href: ((_b = props == null ? void 0 : props.branding) == null ? void 0 : _b.homeUrl) ?? "/",
    style: {
      textDecoration: "none"
    },
    children: (0, import_jsx_runtime19.jsxs)(Stack_default, {
      direction: "row",
      alignItems: "center",
      children: [(0, import_jsx_runtime19.jsx)(LogoContainer, {
        children: ((_c = props == null ? void 0 : props.branding) == null ? void 0 : _c.logo) ?? (_ToolpadLogo || (_ToolpadLogo = (0, import_jsx_runtime19.jsx)(ToolpadLogo, {
          size: 40
        })))
      }), (0, import_jsx_runtime19.jsx)(Typography_default, {
        variant: "h6",
        sx: {
          color: (theme.vars ?? theme).palette.primary.main,
          fontWeight: "700",
          ml: 1,
          whiteSpace: "nowrap",
          lineHeight: 1
        },
        children: title
      })]
    })
  });
}

// node_modules/.pnpm/@toolpad+core@0.15.0_c0ee6244c4cc17862dbc2ec4de13f58d/node_modules/@toolpad/core/esm/DashboardLayout/DashboardLayout.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var _MenuOpenIcon;
var _MenuIcon;
var _Toolbar;
var AppBar = styled_default(AppBar_default)(({
  theme
}) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1
}));
function DashboardLayout(props) {
  const {
    children,
    branding: brandingProp,
    navigation: navigationProp,
    defaultSidebarCollapsed = false,
    disableCollapsibleSidebar = false,
    hideNavigation = false,
    sidebarExpandedWidth = 320,
    renderPageItem,
    slots,
    slotProps,
    sx
  } = props;
  if (navigationProp && true) {
    warnOnce("The navigation prop in the DashboardLayout component is deprecated and will eventually be removed. Set the navigation prop in the AppProvider instead (https://mui.com/toolpad/core/react-app-provider/#navigation).");
  }
  const theme = useTheme();
  const brandingContext = React17.useContext(BrandingContext);
  const navigationContext = React17.useContext(NavigationContext);
  const appWindowContext = React17.useContext(WindowContext);
  const branding = {
    ...brandingContext,
    ...brandingProp
  };
  const navigation = navigationProp ?? navigationContext;
  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = React17.useState(!defaultSidebarCollapsed);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = React17.useState(false);
  const isOverSmViewport = useMediaQuery_default(theme.breakpoints.up("sm"), appWindowContext && {
    matchMedia: appWindowContext.matchMedia
  });
  const isOverMdViewport = useMediaQuery_default(theme.breakpoints.up("md"), appWindowContext && {
    matchMedia: appWindowContext.matchMedia
  });
  const isNavigationExpanded = isOverMdViewport ? isDesktopNavigationExpanded : isMobileNavigationExpanded;
  const setIsNavigationExpanded = React17.useCallback((newExpanded) => {
    if (isOverMdViewport) {
      setIsDesktopNavigationExpanded(newExpanded);
    } else {
      setIsMobileNavigationExpanded(newExpanded);
    }
  }, [isOverMdViewport]);
  const [isNavigationFullyExpanded, setIsNavigationFullyExpanded] = React17.useState(isNavigationExpanded);
  const [isNavigationFullyCollapsed, setIsNavigationFullyCollapsed] = React17.useState(!isNavigationExpanded);
  React17.useEffect(() => {
    if (isNavigationExpanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsNavigationFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);
      return () => clearTimeout(drawerWidthTransitionTimeout);
    }
    setIsNavigationFullyExpanded(false);
    return () => {
    };
  }, [isNavigationExpanded, theme]);
  React17.useEffect(() => {
    if (!isNavigationExpanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsNavigationFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);
      return () => clearTimeout(drawerWidthTransitionTimeout);
    }
    setIsNavigationFullyCollapsed(false);
    return () => {
    };
  }, [isNavigationExpanded, theme]);
  const handleSetNavigationExpanded = React17.useCallback((newExpanded) => () => {
    setIsNavigationExpanded(newExpanded);
  }, [setIsNavigationExpanded]);
  const toggleNavigationExpanded = React17.useCallback(() => {
    setIsNavigationExpanded(!isNavigationExpanded);
  }, [isNavigationExpanded, setIsNavigationExpanded]);
  const handleNavigationLinkClick = React17.useCallback(() => {
    setIsMobileNavigationExpanded(false);
  }, [setIsMobileNavigationExpanded]);
  const isDesktopMini = !disableCollapsibleSidebar && !isDesktopNavigationExpanded;
  const isMobileMini = !disableCollapsibleSidebar && !isMobileNavigationExpanded;
  const getMenuIcon = React17.useCallback((isExpanded) => {
    const expandMenuActionText = "Expand";
    const collapseMenuActionText = "Collapse";
    return (0, import_jsx_runtime20.jsx)(Tooltip_default, {
      title: `${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`,
      enterDelay: 1e3,
      children: (0, import_jsx_runtime20.jsx)("div", {
        children: (0, import_jsx_runtime20.jsx)(IconButton_default, {
          "aria-label": `${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`,
          onClick: toggleNavigationExpanded,
          children: isExpanded ? _MenuOpenIcon || (_MenuOpenIcon = (0, import_jsx_runtime20.jsx)(MenuOpen_default, {})) : _MenuIcon || (_MenuIcon = (0, import_jsx_runtime20.jsx)(Menu_default, {}))
        })
      })
    });
  }, [toggleNavigationExpanded]);
  const hasDrawerTransitions = isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);
  const ToolbarActionsSlot = (slots == null ? void 0 : slots.toolbarActions) ?? ToolbarActions;
  const ToolbarAccountSlot = (slots == null ? void 0 : slots.toolbarAccount) ?? Account;
  const SidebarFooterSlot = (slots == null ? void 0 : slots.sidebarFooter) ?? null;
  const getDrawerContent = React17.useCallback((isMini, viewport) => {
    var _a;
    return (0, import_jsx_runtime20.jsxs)(React17.Fragment, {
      children: [_Toolbar || (_Toolbar = (0, import_jsx_runtime20.jsx)(Toolbar_default, {})), (0, import_jsx_runtime20.jsxs)(Box_default, {
        component: "nav",
        "aria-label": `${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`,
        sx: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "auto",
          scrollbarGutter: isMini ? "stable" : "auto",
          overflowX: "hidden",
          pt: ((_a = navigation[0]) == null ? void 0 : _a.kind) === "header" && !isMini ? 0 : 2,
          ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isNavigationFullyExpanded, "padding") : {}
        },
        children: [(0, import_jsx_runtime20.jsx)(DashboardSidebarSubNavigation, {
          subNavigation: navigation,
          onLinkClick: handleNavigationLinkClick,
          isMini,
          isFullyExpanded: isNavigationFullyExpanded,
          isFullyCollapsed: isNavigationFullyCollapsed,
          hasDrawerTransitions,
          sidebarExpandedWidth,
          renderPageItem
        }), SidebarFooterSlot ? (0, import_jsx_runtime20.jsx)(SidebarFooterSlot, {
          mini: isMini,
          ...slotProps == null ? void 0 : slotProps.sidebarFooter
        }) : null]
      })]
    });
  }, [SidebarFooterSlot, handleNavigationLinkClick, hasDrawerTransitions, isNavigationFullyCollapsed, isNavigationFullyExpanded, navigation, sidebarExpandedWidth, renderPageItem, slotProps == null ? void 0 : slotProps.sidebarFooter]);
  const getDrawerSharedSx = React17.useCallback((isMini, isTemporary) => {
    const drawerWidth = isMini ? MINI_DRAWER_WIDTH : sidebarExpandedWidth;
    return {
      displayPrint: "none",
      width: drawerWidth,
      flexShrink: 0,
      ...getDrawerWidthTransitionMixin(isNavigationExpanded),
      ...isTemporary ? {
        position: "absolute"
      } : {},
      [`& .MuiDrawer-paper`]: {
        position: "absolute",
        width: drawerWidth,
        boxSizing: "border-box",
        backgroundImage: "none",
        ...getDrawerWidthTransitionMixin(isNavigationExpanded)
      }
    };
  }, [isNavigationExpanded, sidebarExpandedWidth]);
  return (0, import_jsx_runtime20.jsxs)(Box_default, {
    sx: {
      position: "relative",
      display: "flex",
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      ...sx
    },
    children: [(0, import_jsx_runtime20.jsx)(AppBar, {
      color: "inherit",
      position: "absolute",
      sx: {
        displayPrint: "none"
      },
      children: (0, import_jsx_runtime20.jsx)(Toolbar_default, {
        sx: {
          backgroundColor: "inherit",
          mx: {
            xs: -0.75,
            sm: -1
          }
        },
        children: (0, import_jsx_runtime20.jsxs)(Stack_default, {
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          sx: {
            flexWrap: "wrap",
            width: "100%"
          },
          children: [(0, import_jsx_runtime20.jsxs)(Stack_default, {
            direction: "row",
            children: [!hideNavigation ? (0, import_jsx_runtime20.jsxs)(React17.Fragment, {
              children: [(0, import_jsx_runtime20.jsx)(Box_default, {
                sx: {
                  mr: {
                    sm: disableCollapsibleSidebar ? 0 : 1
                  },
                  display: {
                    md: "none"
                  }
                },
                children: getMenuIcon(isMobileNavigationExpanded)
              }), (0, import_jsx_runtime20.jsx)(Box_default, {
                sx: {
                  display: {
                    xs: "none",
                    md: disableCollapsibleSidebar ? "none" : "block"
                  },
                  mr: disableCollapsibleSidebar ? 0 : 1
                },
                children: getMenuIcon(isDesktopNavigationExpanded)
              })]
            }) : null, (slots == null ? void 0 : slots.appTitle) ? (0, import_jsx_runtime20.jsx)(slots.appTitle, {
              ...slotProps == null ? void 0 : slotProps.appTitle
            }) : (
              /* Hierarchy of application of `branding`
               * 1. Branding prop passed in the `slotProps.appTitle`
               * 2. Branding prop passed to the `DashboardLayout`
               * 3. Branding prop passed to the `AppProvider`
               */
              (0, import_jsx_runtime20.jsx)(AppTitle, {
                branding,
                ...slotProps == null ? void 0 : slotProps.appTitle
              })
            )]
          }), (0, import_jsx_runtime20.jsxs)(Stack_default, {
            direction: "row",
            alignItems: "center",
            spacing: 1,
            sx: {
              marginLeft: "auto"
            },
            children: [(0, import_jsx_runtime20.jsx)(ToolbarActionsSlot, {
              ...slotProps == null ? void 0 : slotProps.toolbarActions
            }), (0, import_jsx_runtime20.jsx)(ToolbarAccountSlot, {
              ...slotProps == null ? void 0 : slotProps.toolbarAccount
            })]
          })]
        })
      })
    }), !hideNavigation ? (0, import_jsx_runtime20.jsxs)(React17.Fragment, {
      children: [(0, import_jsx_runtime20.jsx)(Drawer_default, {
        container: appWindowContext == null ? void 0 : appWindowContext.document.body,
        variant: "temporary",
        open: isMobileNavigationExpanded,
        onClose: handleSetNavigationExpanded(false),
        ModalProps: {
          keepMounted: true
          // Better open performance on mobile.
        },
        sx: {
          display: {
            xs: "block",
            sm: disableCollapsibleSidebar ? "block" : "none",
            md: "none"
          },
          ...getDrawerSharedSx(false, true)
        },
        children: getDrawerContent(false, "phone")
      }), (0, import_jsx_runtime20.jsx)(Drawer_default, {
        variant: "permanent",
        sx: {
          display: {
            xs: "none",
            sm: disableCollapsibleSidebar ? "none" : "block",
            md: "none"
          },
          ...getDrawerSharedSx(isMobileMini, false)
        },
        children: getDrawerContent(isMobileMini, "tablet")
      }), (0, import_jsx_runtime20.jsx)(Drawer_default, {
        variant: "permanent",
        sx: {
          display: {
            xs: "none",
            md: "block"
          },
          ...getDrawerSharedSx(isDesktopMini, false)
        },
        children: getDrawerContent(isDesktopMini, "desktop")
      })]
    }) : null, (0, import_jsx_runtime20.jsxs)(Box_default, {
      sx: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [(0, import_jsx_runtime20.jsx)(Toolbar_default, {
        sx: {
          displayPrint: "none"
        }
      }), (0, import_jsx_runtime20.jsx)(Box_default, {
        component: "main",
        sx: {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto"
        },
        children
      })]
    })]
  });
}
true ? DashboardLayout.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Branding options for the dashboard.
   * @default null
   */
  branding: import_prop_types8.default.shape({
    homeUrl: import_prop_types8.default.string,
    logo: import_prop_types8.default.node,
    title: import_prop_types8.default.string
  }),
  /**
   * The content of the dashboard.
   */
  children: import_prop_types8.default.node,
  /**
   * Whether the sidebar should start collapsed in desktop size screens.
   * @default false
   */
  defaultSidebarCollapsed: import_prop_types8.default.bool,
  /**
   * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
   * @default false
   */
  disableCollapsibleSidebar: import_prop_types8.default.bool,
  /**
   * Whether the navigation bar and menu icon should be hidden.
   * @default false
   */
  hideNavigation: import_prop_types8.default.bool,
  /**
   * Navigation definition for the dashboard. [Find out more](https://mui.com/toolpad/core/react-dashboard-layout/#navigation).
   * @default []
   * @deprecated Set the navigation in the [AppProvider](https://mui.com/toolpad/core/react-app-provider/#navigation) instead.
   */
  navigation: import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.shape({
    action: import_prop_types8.default.node,
    children: import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.object, import_prop_types8.default.shape({
      kind: import_prop_types8.default.oneOf(["header"]).isRequired,
      title: import_prop_types8.default.string.isRequired
    }), import_prop_types8.default.shape({
      kind: import_prop_types8.default.oneOf(["divider"]).isRequired
    })]).isRequired),
    icon: import_prop_types8.default.node,
    kind: import_prop_types8.default.oneOf(["page"]),
    pattern: import_prop_types8.default.string,
    segment: import_prop_types8.default.string,
    title: import_prop_types8.default.string
  }), import_prop_types8.default.shape({
    kind: import_prop_types8.default.oneOf(["header"]).isRequired,
    title: import_prop_types8.default.string.isRequired
  }), import_prop_types8.default.shape({
    kind: import_prop_types8.default.oneOf(["divider"]).isRequired
  })]).isRequired),
  /**
   * Render each page item.
   *
   * @param {NavigationPageItem} item
   * @param {{ mini: boolean }} params
   * @returns {ReactNode}
   */
  renderPageItem: import_prop_types8.default.func,
  /**
   * Width of the sidebar when expanded.
   * @default 320
   */
  sidebarExpandedWidth: import_prop_types8.default.oneOfType([import_prop_types8.default.number, import_prop_types8.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types8.default.shape({
    appTitle: import_prop_types8.default.shape({
      branding: import_prop_types8.default.shape({
        homeUrl: import_prop_types8.default.string,
        logo: import_prop_types8.default.node,
        title: import_prop_types8.default.string
      })
    }),
    sidebarFooter: import_prop_types8.default.shape({
      mini: import_prop_types8.default.bool.isRequired
    }),
    toolbarAccount: import_prop_types8.default.shape({
      localeText: import_prop_types8.default.object,
      slotProps: import_prop_types8.default.shape({
        popover: import_prop_types8.default.object,
        popoverContent: import_prop_types8.default.object,
        preview: import_prop_types8.default.object,
        signInButton: import_prop_types8.default.object,
        signOutButton: import_prop_types8.default.object
      }),
      slots: import_prop_types8.default.shape({
        popover: import_prop_types8.default.elementType,
        popoverContent: import_prop_types8.default.elementType,
        preview: import_prop_types8.default.elementType,
        signInButton: import_prop_types8.default.elementType,
        signOutButton: import_prop_types8.default.elementType
      })
    }),
    toolbarActions: import_prop_types8.default.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types8.default.shape({
    appTitle: import_prop_types8.default.elementType,
    sidebarFooter: import_prop_types8.default.elementType,
    toolbarAccount: import_prop_types8.default.elementType,
    toolbarActions: import_prop_types8.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object])
} : void 0;
export {
  DashboardLayout,
  DashboardSidebarPageItem,
  ThemeSwitcher,
  ToolbarActions
};
//# sourceMappingURL=@toolpad_core_DashboardLayout.js.map
