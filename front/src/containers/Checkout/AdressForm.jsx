import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function AddressForm({ user, handleChange, state }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Necesitamos que por favor nos completes estos datos:
      </Typography>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
						onChange= { handleChange }
						value= { state.telefono || user.telefono }
            required
            id="tel"
            name="telefono"
            label="Telefono"
            fullWidth
            autoComplete="tel"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
						onChange= { handleChange } 
						value= { state.domicilio || user.domicilio }
            required
            id="address1"
            name="domicilio"
            label="Domicilio"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
						onChange= { handleChange }
						value= { state.ciudad || user.ciudad }
            required
            id="city"
            name="ciudad"
            label="Ciudad"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
						onChange= { handleChange }
						value= { state.provincia || user.provincia }
						id="state" 
						name="provincia" 
						label="Provincia" 
						fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;