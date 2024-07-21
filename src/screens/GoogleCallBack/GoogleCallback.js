import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleGoogleCallback } from "../../api/api";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const code = searchParams.get("code");

    if (code) {
      handleGoogleCallback(code)
        .then((response) => {
          if (response.data.success) {
            const token = response.data.token;
            const userId = response.data.userId;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);
            navigate("/");
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {});
    }
    return () => {
      isMounted = false;
    };
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default GoogleCallback;
