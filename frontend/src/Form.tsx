import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const navifate = useNavigate();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Preencha todos os campos.");

      return;
    }

    const { status } = await axios.post("http://localhost:3333/short-form", {
      name,
      phone,
    });

    console.log("form-data", { name, phone });

    if (status === 200) {
      setName("");
      setPhone("");

      navifate("/wait");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Simple Form</h1>
      <input
        type="text"
        placeholder="Seu Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Seu Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit">Enviar</button>
    </form>
  );
};
