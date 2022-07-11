import { useEffect, useState } from "react";

type User = {
  name: string;
  phone: string;
};

export const WaitingPage = () => {
  const [user, setUser] = useState<User>({ name: "", phone: "" });

  useEffect(() => {
    const source = new EventSource("http://localhost:3333/short-form");

    source.addEventListener("open", () => {
      console.log("SSE opened");
    });

    source.addEventListener("message", (e) => {
      console.log("data-backend", e.data);

      const data: User = JSON.parse(e.data);

      setUser(data);
    });

    source.addEventListener("error", (e) => {
      console.log("Error", e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <>
      <h1>Página de Espera</h1>
      {JSON.stringify(user)}
    </>
  );
};
