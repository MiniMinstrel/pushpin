const NavbarProfile = ({ user }) => {
  return (
    <img
      id='navbar-profile'
      src={user.photoURL}
      alt='User profile'
      referrerpolicy='no-referrer'
    />
  );
};

export default NavbarProfile;
