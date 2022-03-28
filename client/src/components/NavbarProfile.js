const NavbarProfile = ({ user }) => {
  return <img id='navbar-profile' src={user.photoURL} alt='User profile' />;
};

export default NavbarProfile;
