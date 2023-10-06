import { Link, useNavigate } from "react-router-dom";
import { Container, Login, LogoutButton } from "../index";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: authStatus,
    },
    {
      name: "Register",
      path: "/register",
      active: !authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-400">
      <Container>
        <ul className="flex ml-auto gap-2">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
};

export default Header;
