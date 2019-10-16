import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkStyles from "../../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import classNames from "classnames";

const styles = {...tableStyle, ...checkStyles};

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, type, handleClickOpen, handleChangeCheckbox, isAllCheck, isAdmin } = props;
  return (
      isAdmin===true
      ?
      (
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>
              {tableHead !== undefined ? (
                  <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow>
                      {tableHead.map((prop, key) => {
                        return (
                            <TableCell
                                className={classes.tableCell + " " + classes.tableHeadCell}
                                key={key}
                            >
                              {prop}
                            </TableCell>
                        );
                      })}
                      <Checkbox
                          id='isAllCheck'
                          onChange={handleChangeCheckbox}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{ checked: classes.checked }}
                      />
                    </TableRow>
                  </TableHead>
              ) : null}
              <TableBody>
                {tableData.map((prop, key) => {
                  return (
                      type ==='comments'
                          ?
                          (
                              <TableRow key={key}>
                                {prop.map((props, key) => {
                                  return (
                                      <TableCell className={classes.tableCell} key={key}>
                                        {props}
                                      </TableCell>
                                  );
                                })}
                              </TableRow>
                          )
                          :
                          (
                              <TableRow key={key}>
                                {
                                  prop.map((props, key) => {
                                        if(prop.length===key+1)
                                          return (
                                              <Checkbox
                                                  key={key}
                                                  id={prop[0]}
                                                  onChange={handleChangeCheckbox}
                                                  checked={props==='true'}
                                                  checkedIcon={<Check className={classes.checkedIcon} />}
                                                  icon={<Check className={classes.uncheckedIcon} />}
                                                  classes={{ checked: classes.checked }}
                                              />
                                          );
                                        else
                                          return (
                                              <TableCell className={classes.tableCell} key={key} onClick={() => handleClickOpen(prop[0], 'parent')}>
                                                {props}
                                              </TableCell>
                                          );
                                      }
                                  )}
                              </TableRow>
                          )
                  );
                })}
              </TableBody>
            </Table>
          </div>
      )
      :
      (
          <div className={classes.tableResponsive}>
            <Table className={classes.table}>
              {tableHead !== undefined ? (
                  <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow>
                      {tableHead.map((prop, key) => {
                        return (
                            <TableCell
                                className={classes.tableCell + " " + classes.tableHeadCell}
                                key={key}
                            >
                              {prop}
                            </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
              ) : null}
              <TableBody>
                {tableData.map((prop, key) => {
                  return (
                      type ==='comments'
                          ?
                          (
                              <TableRow key={key}>
                                {prop.map((props, key) => {
                                  return (
                                      <TableCell className={classes.tableCell} key={key}>
                                        {props}
                                      </TableCell>
                                  );
                                })}
                              </TableRow>
                          )
                          :
                          (
                              <TableRow key={key}>
                                {
                                  prop.map((props, key) => {
                                          return (
                                              <TableCell className={classes.tableCell} key={key} onClick={() => handleClickOpen(prop[0], 'parent')}>
                                                {props}
                                              </TableCell>
                                          );
                                      }
                                  )}
                              </TableRow>
                          )
                  );
                })}
              </TableBody>
            </Table>
          </div>
      )
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(styles)(CustomTable);
