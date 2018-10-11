import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class CheckboxesGroup extends React.Component {
  state = {
    PRPI: true,
    HRPI: true,
    Sibor1mth: false,
    markedSeries: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { PRPI, HRPI, Sibor1mth } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Property Indices</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={PRPI} onChange={this.handleChange('PRPI')} value="PRPI" />
              }
              label="Private Residential Property Price Index"
            />
            <FormControlLabel
              control={
                <Checkbox checked={HRPI} onChange={this.handleChange('HRPI')} value="HRPI" />
              }
              label="HDB Resale Price Index"
            />
          </FormGroup>
          <FormHelperText>Toggle display on/off</FormHelperText>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Other Controls</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={Sibor1mth} onChange={this.handleChange('Sibor1mth')} value="Sibor1mth" />
              }
              label="SIBOR rate"
            />
          </FormGroup>
          <FormHelperText>Click here for more details</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxesGroup);