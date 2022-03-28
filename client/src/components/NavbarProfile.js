const NavbarProfile = ({ user, onClickFunc }) => {
  return (
    <img
      id='navbar-profile'
      src={user.photoURL}
      alt='User profile'
      referrerPolicy='no-referrer'
      onClick={onClickFunc}
    />
  );
};

export default NavbarProfile;
