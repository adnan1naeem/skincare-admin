// Replace AsyncStorage with localStorage or sessionStorage
// const getToken = () => localStorage.getItem('token');

const token = localStorage.getItem('custom-auth-token');

export const postRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`http://152.42.225.202/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    alert(error.message);
    console.error('Error:', error);
    throw new Error(error);
  }
};

export const getRequest = async (endpoint) => {
  try {
    const response = await fetch(`http://152.42.225.202/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    alert('Error:', error);
    throw new Error(error);
  }
};

export const putRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`http://152.42.225.202/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error);
  }
};

export const postRequestToken = async (endpoint, body) => {
  try {
    const response = await fetch(`http://152.42.225.202/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    alert(error.message);
    throw new Error(error);
  }
};
export const deleteRequestToken = async (endpoint) => {
  try {
    const response = await fetch(`http://152.42.225.202/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Replace `token` with your actual token management logic
      },
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(jsonResponse.message || 'Request failed');
    }
  } catch (error) {
    alert(error.message);
    throw new Error(error);
  }
};