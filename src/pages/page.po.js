const NavBar = require('../helpers/navbar');
const Header = require('../helpers/header');

const Page = function () {
  const navbar = new NavBar();
  const header = new Header();

  this.logout = function () {
    return header.logout();
  }

  this.mostarBarraNavegacao = async function () {
    await navbar.exibir();
  };
};

module.exports = Page;
