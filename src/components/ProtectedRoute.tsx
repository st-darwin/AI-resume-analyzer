import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isPro } : { isPro: boolean }) => {
  // If user hasn't paid, send them to pricing. If they have, let them in (Outlet).
  return isPro ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;