const NavBar = require('../helpers/navbar');
const Header = require('../helpers/header');

class Page {
  constructor(browser) {
    this.header = new Header();
    this.navbar = new NavBar(browser);
  }

  logout() {
    return this.header.logout();
  };

  async mostarBarraNavegacao() {
    await this.navbar.exibir();
  };
};

module.exports = Page;
