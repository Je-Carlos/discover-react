import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "../../components/Card/Card";

function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents((prevState) => [...prevState, newStudent]);
  }

  /* UseEffect é uma função que executa uma função apenas quando o componente é renderizado pela primeira vez
   ou foi especificado dentro do [] quando ele deve ser renderizado 
   Neste exemplo utilizei a API do GH para pegar dados*/
  useEffect(() => {
    fetch("https://api.github.com/users/je-carlos")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          avatar: data.avatar_url,
          name: data.name,
        });
      });
  }, []);

  return (
    // utilizar div para embrulhar os elementos
    // também é possível utilizar o componente Fragment <> </>
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default App;
