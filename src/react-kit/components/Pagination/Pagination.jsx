import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import paginationStyle from "../../assets/jss/material-kit-react/components/paginationStyle.jsx";

function Pagination({ ...props }) {
  const { classes, pages, color, type } = props;
  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {
                (() => {
                    if(prop.onClick !== undefined && type === 'board') {
                        if (prop.type === 'num')
                            return (
                                <Button onClick={() => prop.onClick('board', parseInt(prop.text))}
                                        className={paginationLink}>
                                    {prop.text}
                                </Button>
                            );
                        else
                            return (
                                <Button onClick={() => prop.onClick('board', prop.type)}
                                        className={paginationLink}>
                                    {prop.text}
                                </Button>
                            );
                    }
                    else if(prop.onClick !== undefined && type === 'qna'){
                        if (prop.type === 'num')
                            return (
                                <Button onClick={() => prop.onClick('qna', parseInt(prop.text))}
                                        className={paginationLink}>
                                    {prop.text}
                                </Button>
                            );
                        else
                            return (
                                <Button onClick={() => prop.onClick('qna', prop.type)}
                                        className={paginationLink}>
                                    {prop.text}
                                </Button>
                            );
                    }
                    else
                        return (
                            <Button color="primary">
                                {prop.text}
                            </Button>
                        );
                })()
            }
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["PREV", "NEXT", "..."])
      ]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(paginationStyle)(Pagination);
