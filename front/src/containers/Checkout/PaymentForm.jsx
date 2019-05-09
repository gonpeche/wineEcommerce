import React from 'react';
import Typography from '@material-ui/core/Typography';

function PaymentForm(props) {
  return (
    <React.Fragment>
      {
        !props.user.id ? 
        <Typography variant="h5" gutterBottom>
          Por favor necesitamos que ingreses a tu cuenta 
        </Typography>
        :
        <div>
          <Typography variant="h5" gutterBottom>
            ¡Bien! Ya estas a un paso de disfrutar de unos buenos vinos. 
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Ahora necesitamos pedirte algunos datos personales así nos ponemos en contacto con vos para acordar la entrega.
          </Typography>        
        </div>
      }

    </React.Fragment>
  );
}

export default PaymentForm;
