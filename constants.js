module.exports = {
  AREA: {
    USER: 1,
  },
  PAYMENT_REFERRER_REWARD: 10,
  Messages: {
    USER_INPUT_ERROR: {
      NONE_FIELDS_AVAILABLE: "Atleast one field is required!",
      NOT_ALL_FIELDS_AVAILABLE: "All fields are required!",
    },
    USER: {
      CREATION_ERROR: "Some error occurred while creating the User.",
      EMAIL_ALREADY_EXISTS: "Account already exist with this email",
      MOBILE_ALREADY_EXISTS: "Account already exist with this mobile",
      INVALID_CREDS: "Invalid credentials!",
      ACCOUNT_NOT_FOUND: "Account does not exists!",
    },
    AUTH: {
      TOKEN_UNAVAILABLE: "A token is required for authentication",
      INVALID_TOKEN: "Invalid Token",
    },
    LOGIN: {
      LOGGED_IN: (email) => `Yor are logged in as ${email}!`,
      NOT_LOGGED_IN: "Yor are not logged in!",
    },
    PAYMENT: {
      DONE: "Payment Done Successfully",
      UNAUTHORISED_PAYMENT: "Please provide your own email",
      FAILED: "Payment Failed",
      DONE_AND_REWARDED:
        "User payment handled and awarded reward to referrering User",
    },
  },
  JWT_CONFIG: {
    ISSUER: "TestIssuer",
    SUBJECT: "some@user.com",
    AUDIENCE: "http://Test.in",
    ALOGO: "RS256",
    TOKEN: {
      VALIDITY: "100h",
      RESET_VALIDITY: "1h",
    },
  },
};
