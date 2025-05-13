import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostQuery from "../../hooks/usePostQuery";
import { baseUrl } from "../../utils/data";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField"; 
import InputPassword from "../../components/form/InputPassword";

const SignupPage = () => {
  const navigate = useNavigate();
  const { createPost, loading, error } = usePostQuery(
    `${baseUrl}/api/users/register`
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     await createPost(formData);
      navigate("/login");

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      > <img src="/logo.webp" alt="logo" className="w-1/3 m-auto"/>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <SelectField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          options={["user", "admin"]}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purpuleLight text-white py-2 rounded hover:bg-primary transition mt-5"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm mt-4 text-center">
          You have an account?{" "}
          <Link to="/login" className="text-purpuleLight hover:underline">
            Login
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
