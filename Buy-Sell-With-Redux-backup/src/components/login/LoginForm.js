// Application builds when code for image is commented out
import TalenticaLogo from "../../images/Talentica.png";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import React, { PropTypes } from "react";

const LoginForm = ({
  loginCredentials,
  allRoles,
  onLogin,
  loggingIn,
  errors,
  onChange
}) => {
  return (
    <form>
      <img src={TalenticaLogo} alt="Talentica logo" />
      <TextInput
        name="username"
        label="Username"
        value={loginCredentials.username}
        onChange={onChange}
        error={errors.username}
      />

      <TextInput
        name="password"
        label="Password"
        value={loginCredentials.password}
        onChange={onChange}
        error={errors.password}
        type="password"
      />

      <SelectInput
        name="role"
        label="Login As"
        value={loginCredentials.role}
        defaultOption="Select Role"
        options={allRoles}
        onChange={onChange}
        error={errors.role}
      />

      <input
        type="submit"
        disabled={loggingIn}
        value={loggingIn ? "Logging in..." : "Login"}
        className="btn btn-primary"
        onClick={onLogin}
      />
    </form>
  );
};

LoginForm.propTypes = {
  loginCredentials: PropTypes.object.isRequired,
  allRoles: PropTypes.array.isRequired,
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  errors: PropTypes.object
};

export default LoginForm;
