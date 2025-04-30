import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <>
      <body>
        <nav id="sidebar">
          <ul>
            <li>
              <span class="logo">MindAR - FUVIME</span>
              <button onclick="toggleSidebar()" id="toggle-btn">
                <img
                  src="icons/double_arrow_left.svg "
                  height="24px"
                  width="24px"
                />
              </button>
            </li>
            <li class="active">
              <a href="index.html">
                <img src="/icons/home.svg" height="24px" width="24px" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="dashboard.html">
                <img src="/icons/dashboard.svg" height="24px" width="24px" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <button onclick="toggleSubMenu(this)" class="dropdown-btn">
                <img src="icons/new_folder.svg" height="24px" width="24px" />
                <span>Create</span>
                <img src="icons/arrow_down.svg" height="24px" width="24px" />
              </button>
              <ul class="sub-menu">
                <div>
                  <li>
                    <a href="#">Folder</a>
                  </li>
                  <li>
                    <a href="#">Document</a>
                  </li>
                  <li>
                    <a href="#">Project</a>
                  </li>
                </div>
              </ul>
            </li>
            <li>
              <button onclick="toggleSubMenu(this)" class="dropdown-btn">
                <img src="icons/checklist.svg" height="24px" width="24px" />
                <span>Todo-Lists</span>
                <img src="icons/arrow_down.svg" height="24px" width="24px" />
              </button>
              <ul class="sub-menu">
                <div>
                  <li>
                    <a href="#">Work</a>
                  </li>
                  <li>
                    <a href="#">Private</a>
                  </li>
                  <li>
                    <a href="#">Coding</a>
                  </li>
                  <li>
                    <a href="#">Gardening</a>
                  </li>
                  <li>
                    <a href="#">School</a>
                  </li>
                </div>
              </ul>
            </li>
            <li>
              <a href="calendar.html">
                <img src="icons/calendar.svg" height="24px" width="24px" />
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="profile.html">
                <img src="icons/person.svg" height="24px" width="24px" />
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>
        <main>
          <div class="container">
            <h2>Hello World</h2>
            <p>Lorem</p>
          </div>
        </main>
      </body>
    </>
  );
}
