import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Footer, Header } from "../../../layout/Layout";
import { VscLoading } from "react-icons/vsc";
import { useLogin } from "./LoginFetch";

const Login = () => {
  const { loginFetch } = useLogin();
  return (
    <div className="login">
      <Header title="Iniciar sesión" />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo no valido.")
            .required("Ingrese un correo."),
          password: Yup.string().required("Ingrese una contraseña."),
        })}
        onSubmit={async (values) => {
          await loginFetch(values);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="loginForm">
            <div className="Field">
              <ErrorMessage component="p" name="email" />
              <Field
                component="input"
                name="email"
                type="email"
                placeholder="Correo"
              />
            </div>
            <div className="Field">
              <ErrorMessage component="p" name="password" />
              <Field
                component="input"
                name="password"
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <VscLoading /> : "Iniciar sesión"}
            </button>
            <Link to="/signup">Registrarse</Link>
          </Form>
        )}
      </Formik>

      <Footer />
    </div>
  );
};

export default Login;
