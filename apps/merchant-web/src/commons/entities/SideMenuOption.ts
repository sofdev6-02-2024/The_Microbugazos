export default class SideMenuOption {

  icon: string;
  text: string;
  route: string;

  constructor(icon: string, text: string, route: string = "") {
    this.icon = icon;
    this.text = text;
    this.route = route;
  }
}
