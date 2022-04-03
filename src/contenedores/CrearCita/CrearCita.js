import "./CrearCita.css";

import { useNavigate } from "react-router-dom";

const CrearCita = () => {
  //const history = useNavigate();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        descripcion: e.target[0].value,
        fechaDeVisita: e.target[1].value,
        idMascota: e.target[2].value,
      };

      const postCita = await fetch(
        "https://veterinaria-back.herokuapp.com/citas",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const obtenerMascota = await fetch(
        "https://veterinaria-back.herokuapp.com/mascotas/" + formData.idMascota,
        {
          method: "GET",
        }
      );
      const infoMascota = await obtenerMascota.json();
      //console.log(infoMascota + "Este es el objeto de la mascota");
      console.log("Form Sumbmit works", postCita);

      if (postCita) {
        //history("/listado/" + postUser.userId);
        return alert("Has creado una cita para " + infoMascota.nombre_mascota);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };

  return (
    <div>
      <h1>Cita para mascota</h1>
      <form onSubmit={(e) => formSubmit(e)}>
        <label for="descripcion">Descripción de la visita</label>
        <input type="text" id="descripcion" name="descripcion" />
        <label for="fechaDeVisita">Fecha en la que desa la visita</label>
        <input
          type="text"
          id="fechaDeVisita"
          name="fechaDeVisita"
          placeholder="aaaa-mm-dd hh:mm:ss"
        />
        <label for="idMascota">Introduzca el número de su mascota</label>
        <input type="text" id="idMascota" name="idMascota" />
        <input type="submit" value="SEND" className="sendButton" />
      </form>
    </div>
  );
};

export default CrearCita;