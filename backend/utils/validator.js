exports.validateRegister = ({ nama, email, password }) => {
  if (!nama || !email || !password) {
    return "Semua field wajib diisi";
  }

  if (!email.includes("@")) {
    return "Email tidak valid";
  }

  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }

  return null;
};