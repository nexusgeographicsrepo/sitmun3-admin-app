import { Component} from '@angular/core';
import { AuthService, LanguageService, Language } from 'dist/sitmun-frontend-core/';
import { LoginService } from 'dist/sitmun-frontend-core/';
import { environment } from 'src/environments/environment';
import { config } from 'src/config';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/** Login component*/
@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
} )
export class LoginComponent {
    langs:any[];
    /** bad credentials message*/
    badCredentials: string;

    /** translate service*/
    translate;

    /** form */
    form: FormGroup;

    /** constructor */
    constructor( private fb: FormBuilder,
        private authService: AuthService,
        private loginService: LoginService,
        private languageService: LanguageService,
        private router: Router,
        private trans: TranslateService ) {
        
        this.translate = trans;
        let navigatorLang=config.languages.find(element => element.id===window.navigator.language);
        let defaultLang=config.defaultLang;
        if( navigatorLang!=undefined){
            defaultLang=window.navigator.language
        }
        this.form = this.fb.group( {
            username: ['', Validators.required],
            password: ['', Validators.required],
            lang:[defaultLang, Validators.required],
        } );
        this.langs=config.languages
    }

    /** login action */
    login() {
        const val = this.form.value;

        if ( val.username && val.password ) {
            this.loginService.login( val ).then(() => {
                this.translate.use(this.form.value.lang)
                this.translate.setDefaultLang(this.form.value.lang);
                localStorage.setItem('lang',this.form.value.lang );
                this.loadLanguages();
                console.log( 'User is logged in' );
                this.router.navigateByUrl( '/' );
            }, ( err ) => {
                this.badCredentials = 'ERROR';

            } );

        }
    }

      //Load from server all languages that we will use
  async loadLanguages(){
    let catalanLanguage = null;
    let spanishLanguage = null;
    let englishLanguage = null;
    this.languageService.getAll().subscribe(
      async result => {
        console.log(result);
        result.forEach(language => {
          if(language.name == 'Catala') { catalanLanguage= language }
          if(language.name == 'Español') { spanishLanguage= language }
          if(language.name == 'English') { englishLanguage= language }
        });

        if(catalanLanguage != null){
          config.languagesObjects.catalan=catalanLanguage;
        }
        else{
          let catalanLanguageObj = new Language();
          catalanLanguageObj.name= 'Catala';
          catalanLanguageObj.shortname= 'ca';
          console.log( await this.languageService.save(catalanLanguageObj).toPromise() );
        }

        if(spanishLanguage != null){
          config.languagesObjects.spanish=spanishLanguage;
        }
        // else{
        //   let spanishLanguageObj = new Language();
        //   spanishLanguageObj.name= 'Español';
        //   spanishLanguageObj.shortname= 'spa';
        //   config.languagesObjects.spanish= await this.languageService.save(spanishLanguageObj).toPromise();
        // }

        if(englishLanguage != null){
          config.languagesObjects.english=englishLanguage;
        }
        else{
          let englishLanguageObj = new Language();
          englishLanguageObj.name= 'English';
          englishLanguageObj.shortname= 'en';
          config.languagesObjects.english= await this.languageService.save(englishLanguageObj).toPromise()
        }

      }
    )
  }
}
