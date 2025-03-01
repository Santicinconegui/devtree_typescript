import { Link } from 'react-router-dom';
const LoginView = () => {
  return (
    <>
      <div className="py-10">
        <h1 className="text-4xl text-center font-bold text-white">Iniciar Sesión </h1>
      </div>
      <nav className="mt-10">
        <p className=" text-center text-white text-lg block">
          ¿No tienes una cuenta?
          <Link className="font-bold" to={'/auth/register'}>
            {' '}
            Crea tu cuenta aqui
          </Link>
        </p>
      </nav>
    </>
  );
};

export default LoginView;
