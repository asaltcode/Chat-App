import React from "react"
const ApiRoutes = {
    // Auth Routes
    SIGN_UP: {
      path: "/auth/register",
      authenticate: false,
    },
    LOG_IN: {
      path: "/auth/login",
      authenticate: false,
    },
    RE_SEND: {
      path: "/re-send",
      authenticate: false,
    },
    VERIFY: {
      path: "/verify",
      authenticate: false,
    },
    VERIFY_TRIGGER: {
      path: "/trigger",
      authenticate: false,
    },
    FOR_GOT: {
      path: "/auth/password/forgot",
      authenticate: false,
    },
    VERIFY_OTP: {
      path: "/otp-verify",
      authenticate: false,
    },
    RESET_PASSWORD: {
      path: "/auth/password/reset",
      authenticate: false,
    },
    PROFIL_UPDATE: {
      path: "/profile/update",
      authenticate: false,
    },
    // User Router
    GET_USER: {
        path: "/user",
        authenticate: true
    },
    SEARCH_USER: {
        path: "/user/search",
        authenticate: true
    },
    //Message Router
    MESSAGE: {
      path: "/message",
      authenticate: true
  },
}

export default ApiRoutes