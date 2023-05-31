import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  // {path :'/vehicles' , title:'Vehicles events', icon:'directions_car' , class:''},
  // {path :'/rooms' , title:'Rooms', icon:'meeting_room' , class:''},
  // {path :'/users' , title:'Users', icon:'engineering' , class:''},
  // {path :'/user-management' , title: 'User Management',  icon:'manage_accounts', class:''},
  // { path: '/requests' , title:'requests' , icon:'person_add' , class:''},

  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    
    { path: '/requests' , title:'requests' , icon:'person_add' , class:''},
    { path: '/user-management', title: 'User Management',  icon:'manage_accounts', class: '' },
    { path: '/conference-rooms', title: 'Conference Rooms',  icon:'meeting_room', class: '' },
    {path :'/vehicles' , title:'Vehicules ', icon:'directions_car' , class:''},
    { path: '/technical team', title: 'Technical Teams',  icon:'engineering', class: '' },
    { path: '/virtualisation', title: 'Environment labs',  icon:'storage', class: '' },

    
    
    
    
    

    

    

    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  

  constructor(private authService:AuthService) { }

  ngOnInit() {
    
    this.menuItems = ROUTES;
    const isAdmin = this.checkAdmin();
    this.menuItems = ROUTES.filter(menuItem => {
      if (isAdmin) {
        return true; // show all routes to admin users
      } else {
        return menuItem.path !== '/requests'; // hide user management route for non-admin users
      }
    });
  }
  
  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }

  toggleDropdown() {
    var dropdownContent = document.getElementById("myDropdown");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};
  
  
  
}
