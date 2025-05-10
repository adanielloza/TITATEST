import React from "react";
import { PageHeader } from "../../components";
import { PatientsDataTable } from "../../components";

function PatientsManagement() {
  return (
    <div>
      <PageHeader
        title="Gestión de Pacientes"
        subtitle="Aquí puedes administrar los pacientes"
      />
      <PatientsDataTable />
    </div>
  );
}

export default PatientsManagement;
