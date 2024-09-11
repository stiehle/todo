import { useState } from "react";
import "./LogIn.scss";
import { useNavigate } from "react-router-dom";
import { signInWithGithub, signInWithPassword } from "../../utils/supabase";
import Footer from "../../components/Footer";

function LogIn() {
  const emailAdress = useFormInput();
  const password = useFormInput();

  const navigate = useNavigate();

  function useFormInput() {
    const [inputValue, setInputValue] = useState<string>("");
    const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      console.log(event.target.value);
    };

    return {
      inputValue,
      handleInputChangeEvent,
    };
  }

  async function submitLogIn() {
    console.log(emailAdress.inputValue, password.inputValue);
    const logIn = await signInWithPassword({ email: emailAdress.inputValue, password: password.inputValue });

    if (!logIn) {
      alert("Anmeldung fehgeschlagen");
    } else navigate("/");
  }

  return (
    <>
      <div className="login">
        <img src="./LogInImage1.jpg" alt="Key Image" />
        <div className="login__header">
          <h2>Anmelden</h2>
          <label htmlFor="email">
            <p>Bitte gib deine E-Mail Adresse und Passwort ein: </p>
          </label>
        </div>

        <div className="login__item">
          <input type="email" id="email" value={emailAdress.inputValue} onChange={emailAdress.handleInputChangeEvent} placeholder="E-Mail Adresse" />
          <label htmlFor="password"></label>
          <input type="password" id="password" value={password.inputValue} onChange={password.handleInputChangeEvent} placeholder="Passwort" />
          <button
            onClick={() => {
              submitLogIn();
            }}>
            Anmelden
          </button>

          <p>oder Melde dich an mit: </p>
          <button
            onClick={() => {
              signInWithGithub();
            }}>
            Github
          </button>
        </div>
      </div>
      {/* <Search /> */}
      <Footer />
    </>
  );
}
export default LogIn;
