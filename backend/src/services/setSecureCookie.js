const setSecureCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res;
};

module.exports = { setSecureCookie };
