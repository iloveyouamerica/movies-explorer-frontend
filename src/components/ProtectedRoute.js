import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({element: Component, ...props}) {
  if(props.loading) {
    return null;
  }

  return(
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  );
}

export default ProtectedRouteElement;