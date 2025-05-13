import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/form/InputField";
import InputPassword from "../../components/form/InputPassword";
import { useAuth } from "../../components/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

useEffect(() => {
  if (user) {
    if (user.role === "user") {
      navigate("/user/assets");
    } else {
      navigate("/");
    }
  }
}, [user, navigate]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <img src="/logo.webp" alt="logo" className="w-1/3 m-auto"/>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputPassword
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-purpuleLight text-white py-2 rounded hover:bg-primary transition"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purpuleLight hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
