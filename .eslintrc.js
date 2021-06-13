module.exports = {
    extends: "airbnb-typescript-prettier",
    rules: {
        "react/jsx-props-no-spreading": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-param-reassign": "off",
        "react/require-default-props": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "react-hooks/exhaustive-deps": "off"
    },
    "settings": {
      "prettier": {
        "printWidth": 120
      },
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    },
  },
};
