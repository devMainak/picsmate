const setSecureCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true, // Force true — you’re using HTTPS on Vercel
    sameSite: "None", // Must be 'None' to allow cross-site
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res;
};

module.exports = { setSecureCookie };
