import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
     message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
     name: string
     password: string;
    auth : AuthService;
  
    constructor(
      private authService: AuthService, 
      private router: Router){}
    
    ngOnInit(){
          this.auth = this.authService
      }
  
    setMessage() {
        this.message = this.authService.isLoggedIn ?
            'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
    }
  
    // Connecte l'utilisateur auprès du Guard
    login() {
        this.message = 'Tentative de connexion en cours ...';
        this.authService.login(this.name, this.password)
        .subscribe((isLoggedIn: boolean) => {
            this.setMessage();
            if (isLoggedIn) {
                this.router.navigate(['/pokemons'])
            } else {
                this.password = ''
                this.router.navigate(['/login'])

            }
        });
    }
  
    // Déconnecte l'utilisateur
    logout() {
        this.authService.logout();
        this.message ='Vous êtes déconnecté';
    }
}
