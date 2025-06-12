import { PageHeader } from "../../components";
import { UsersDataTable } from "../../components";

function ManageUsers() {
  return (
    <div>
      <PageHeader
        title="Gestión de Usuarios"
        subtitle="Aquí puedes administrar los usuarios de la plataforma"
      />
      <UsersDataTable />
    </div>
  );
}

export default ManageUsers;
