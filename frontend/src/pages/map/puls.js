import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { red, lightBlue, yellow, green } from "@material-ui/core/colors";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";

const warningColor = yellow[200];

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    display: "inline-block"
  },
  badge: {
    position: "absolute",
    top: 10,
    display: "flex",
    flexBasis: "1 0 100px",
    direction: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dangerBadge: {
    color: red[500]
  },
  warningBadge: {
    color: warningColor
  },
  infoBadge: {
    color: lightBlue[500]
  },
  successBadge: {
    color: green[500]
  },
  badgeBorder: {
    borderRadius: theme.shape.borderRadius + 15
  },
  dangerBadgeBorder: {
    border: `1px solid ${red[500]}`
  },
  warningBadgeBorder: {
    border: `1px solid ${warningColor}`
  },
  infoBadgeBorder: {
    border: `1px solid ${lightBlue[500]}`
  },
  successBadgeBorder: {
    border: `1px solid ${green[500]}`
  },
  text: {
   //fontWeight:[500],
    marginLeft: 7,
    marginTop:5,
    fontSize:15,
  },
  circle: {
    margin: 0,
    width: 17,
    height: 17,
    borderRadius: "50%"
  },
  warningCircle: {
    backgroundColor: warningColor,
    boxShadow: `0 0 0 ${alpha(warningColor, 0.5)}`,
    animation: `$pulsing-warning 1500ms ${
      theme.transitions.easing.easeOut
    } infinite`
  },
  dangerCircle: {
    backgroundColor: red[500],
    boxShadow: `0 0 0 ${alpha(red[500], 0.5)}`,
    animation: `$pulsing-danger 1500ms ${
      theme.transitions.easing.easeOut
    } infinite`
  },
  infoCircle: {
    backgroundColor: lightBlue[500],
    boxShadow: `0 0 0 ${alpha(lightBlue[500], 0.5)}`,
    animation: `$pulsing-info 1500ms ${
      theme.transitions.easing.easeOut
    } infinite`
  },
  successCircle: {
    backgroundColor: green[500],
    boxShadow: `0 0 0 ${alpha(green[500], 0.5)}`,
    animation: `$pulsing-success 1500ms ${
      theme.transitions.easing.easeOut
    } infinite`
  },

  "@keyframes pulsing-danger": {
    "0%": {
      boxShadow: `0 0 0 0 ${alpha(red[500], 0.5)}`
    },
    "70%": {
      boxShadow: `0 0 0 8px ${alpha(red[500], 0.0)}`
    },
    "100%": {
      boxShadow: `0 0 0 0 ${alpha(red[500], 0.0)}`
    }
  },
  "@keyframes pulsing-warning": {
    "0%": {
      boxShadow: `0 0 0 0 ${alpha(warningColor, 0.5)}`
    },
    "70%": {
      boxShadow: `0 0 0 8px ${alpha(warningColor, 0.0)}`
    },
    "100%": {
      boxShadow: `0 0 0 0 ${alpha(warningColor, 0.0)}`
    }
  },

  "@keyframes pulsing-info": {
    "0%": {
      boxShadow: `0 0 0 0 ${alpha(lightBlue[500], 0.5)}`
    },
    "70%": {
      boxShadow: `0 0 0 8px ${alpha(lightBlue[500], 0.0)}`
    },
    "100%": {
      boxShadow: `0 0 0 0 ${alpha(lightBlue[500], 0.0)}`
    }
  },
  "@keyframes pulsing-success": {
    "0%": {
      boxShadow: `0 0 0 0 ${alpha(green[500], 0.5)}`
    },
    "70%": {
      boxShadow: `0 0 0 8px ${alpha(green[500], 0.0)}`
    },
    "100%": {
      boxShadow: `0 0 0 0 ${alpha(green[500], 0.0)}`
    }
  }
}));

const PulsingBadge = ({
 
  withBorder = false,
  badgeLabel = "",
  variant = "danger"
}) => {
  const classes = useStyles();
  return (
      <div
        className={clsx(classes.badge, classes[variant + "Badge"], {
          [classes[variant + "BadgeBorder"]]: withBorder,
          [classes.badgeBorder]: withBorder
        })}
      >
        <div className={clsx(classes.circle, classes[variant + "Circle"])} />
        <Typography
          variant="caption"
          className={clsx({ [classes.text]: badgeLabel.length > 0 })}
        >
          {badgeLabel}
        </Typography>
      </div>
  );
};
export default PulsingBadge;
