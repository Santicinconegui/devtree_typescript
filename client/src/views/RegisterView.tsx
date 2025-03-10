import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { RegisterCredentials } from '../types';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import api from '../config/axios';

const RegisterView = () => {
  const initialValues: RegisterCredentials = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: '',
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const password = watch('password');
  const handleRegister = async (formData: RegisterCredentials) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data.message);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <h1 className="text-4xl text-white font-bold text-center">Crear cuenta </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name', {
              required: 'El nombre es requerido',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'El email no es valido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle', {
              required: 'El handle es requerido',
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', {
              required: 'El password es requerido',
              minLength: {
                value: 8,
                message: 'El password debe tener al menos 8 caracteres',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password_confirmation" className="text-2xl text-slate-500">
            Repetir Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', {
              required: 'Se requiere confirmación de contraseña',
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>
      <nav className="mt-10 ">
        <p className=" text-center text-white text-lg block">
          ¿Ya tienes una cuenta?
          <Link className=" font-bold" to={'/auth/login'}>
            {' '}
            Inicia sesion aqui
          </Link>
        </p>
      </nav>
    </>
  );
};

export default RegisterView;
