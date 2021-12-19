/**
 * Log in to app, returns JWT.
 * @param {Object} account - Object representing account .
 * @param {string} account.email - E-mail for the account.
 * @param {string} account.password - Password for the account.
 * @returns {Object} with success and token properties.
 */
export async function logIn(account) {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
/**
 * Sign up a new account.
 * @param {Object} account - Object representing account .
 * @param {string} account.name - Name of the account owner.
 * @param {string} account.email - E-mail for the account.
 * @param {string} account.password - Password for the account.
 * @returns {Object} with success property.
 */

export async function signUp(account) {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/account`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });

    const parsedResponse = await response.json();
    if (parsedResponse.status === 'Success') {
      return parsedResponse;
    } else {
      return parsedResponse;
    }
  } catch (error) {
    throw error;
  }
}
