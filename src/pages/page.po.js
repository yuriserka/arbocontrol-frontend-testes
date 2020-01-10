const NavBar = require('../helpers/navbar');
const Header = require('../helpers/header');

const Page = function () {
  this.navbar = new NavBar();
  this.header = new Header();

  this.logout = function () {
    return this.header.logout();
  };

  this.mostarBarraNavegacao = async function () {
    await this.navbar.exibir();
  };
};

module.exports = Page;
