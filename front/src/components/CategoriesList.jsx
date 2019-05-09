import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

function OutlinedChips(props) {
  const { classes, allCellars, allLines, allGrapes, handleDelete } = props;
  return (
		<div >
			<div>
				{
					allCellars[0] && allCellars.map((cellar,index) => {
						return (
							<Chip
								key={ cellar.id }
								label={ cellar.cellarName }
								onDelete={ () => handleDelete('allCellars','cellars',cellar.id,index) }
								className={ classes.chip }
								color="primary"
								variant="outlined"
							/>
						)
					})
				}
			</div>
			<div>
				{
					allLines[0] && allLines.map((line,index) => {
						return (
							<Chip
								key={ line.id }
								label={ line.lineName }
								onDelete={ () => handleDelete('allLines','lines',line.id,index) }
								className={ classes.chip }
								color="secondary"
								variant="outlined"
							/>
						)
					})
				}
			</div>
			<div>
				{
					allGrapes[0] && allGrapes.map((grape,index) => {
						return (
							<Chip
								key={ grape.id }
								label={ grape.grapeName }
								onDelete={ () => handleDelete('allGrapes','grapes',grape.id,index) }
								className={ classes.chip }
								variant="outlined"
							/>
						)
					})
				}
			</div>
		</div>
	)
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips);