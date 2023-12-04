import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState();
  function signWithGoogle() {
    window.location.href =
      "https://safe-stories.auth.ap-south-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=5sheuf31b6khelk2cssimksh8n&redirect_uri=http://localhost:8081/api/v1/auth/google/&state=STATE&scope=email openid profile aws.cognito.signin.user.admin";
  }

  function logout() {
    window.location.href =
      "https://safe-stories.auth.ap-south-1.amazoncognito.com/logout?identity_provider=Google&response_type=code&client_id=5sheuf31b6khelk2cssimksh8n&logout_uri=http://localhost:8081/api/v1/auth/logout/&state=STATE&scope=email openid profile aws.cognito.signin.user.admin";
  }

  async function getTokens() {
    const ip = "http://localhost:8081/api/v1/users/tokens";
    const res = await axios.get(ip, { withCredentials: true });
    const data = await res.data;
    setToken(data.data.accessToken);
  }

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <>
      <button onClick={signWithGoogle}>sign in</button>
      {token ? <button onClick={logout}>logout</button> : null}
    </>
  );
}

export default App;
