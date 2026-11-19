// 파일: src/hooks/useGithubAuth.js (বা .jsx)
import { useEffect, useState } from 'react';

const useGithubAuth = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam) {
      getGithubUserData(codeParam);
    }
  }, []);

  const getGithubUserData = async (code) => {
    try {
      let res = await fetch(`http://localhost:3000/getAccessToken?code=${code}`);
      let data = await res.json();
      
      if(data.userData){
        setUserData(data.userData); 
        console.log("Logged in user:", data.userData);
        // URL থেকে code মুছে ফেলা
        window.history.pushState({}, null, "/");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  // ফাংশনটির শেষে userData রিটার্ন করে দিন যাতে অন্য ফাইল এটি ব্যবহার করতে পারে
  return { userData };
};

export default useGithubAuth;