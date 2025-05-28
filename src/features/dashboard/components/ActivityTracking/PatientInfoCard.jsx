import "../../styles/PatientInfoCard.css";

const PatientInfoCard = ({ patient }) => {
  if (!patient) return null;

  const {
    nombre,
    apellido,
    fechaNacimiento,
    sexo,
    nombreTutor,
    correoTutor,
    telefonoTutor,
    tipoTDAH,
    observaciones,
  } = patient;

  const avatarSrc =
    sexo === "Masculino" ? "/images/male.png" : "/images/female.png";

  return (
    <div className="patient-card">
      <div className="patient-card__header">
        <img src={avatarSrc} alt="Avatar" className="patient-card__avatar" />
        <h3 className="patient-card__name">
          {nombre} {apellido}
        </h3>
      </div>

      <div className="patient-card__titles">
        <div className="patient-card__title">Datos Personales</div>
        <div className="patient-card__title">Referencia</div>
      </div>

      <div className="patient-card__rows">
        <div className="patient-card__row">
          <div className="patient-card__field">
            <span className="patient-card__label">🎂 Fecha de nacimiento</span>
            <span className="patient-card__value">{fechaNacimiento}</span>
          </div>
          <div className="patient-card__field">
            <span className="patient-card__label">👤 Nombre</span>
            <span className="patient-card__value">{nombreTutor}</span>
          </div>
        </div>

        <div className="patient-card__row">
          <div className="patient-card__field">
            <span className="patient-card__label">⚧ Sexo</span>
            <span className="patient-card__value">{sexo}</span>
          </div>
          <div className="patient-card__field">
            <span className="patient-card__label">📧 Correo</span>
            <span className="patient-card__value">{correoTutor}</span>
          </div>
        </div>

        <div className="patient-card__row">
          <div className="patient-card__field">
            <span className="patient-card__label">🧠 Tipo de TDAH</span>
            <span className="patient-card__value">{tipoTDAH}</span>
          </div>
          <div className="patient-card__field">
            <span className="patient-card__label">📞 Teléfono</span>
            <span className="patient-card__value">{telefonoTutor}</span>
          </div>
        </div>
      </div>

      <div className="patient-card__observations">
        <span className="patient-card__label">📝 Observaciones</span>
        <p className="patient-card__value">{observaciones}</p>
      </div>
    </div>
  );
};

export default PatientInfoCard;
