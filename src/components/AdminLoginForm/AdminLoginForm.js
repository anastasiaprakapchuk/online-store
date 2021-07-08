import React from 'react';
import {withRouter} from 'react-router';

import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './AdminLoginForm.css';

class AdminLoginForm extends React.Component {
  loginRef=null;
  passwordRef=null;

  setLogin = (ref) => {
    this.loginRef=ref;
  }

  setPassword = (ref) => {
    this.passwordRef=ref;
  }

  submit = () =>{
    if(this.loginRef&&this.passwordRef){
      if(this.loginRef.value==='admin'&&this.passwordRef.value==='admin'){
           this.props.history.push('/admin');
      }
    }
  }


  render() {

    return (
      <div className='formAdmin'>
          <form  method='post'>
          <table>
            <tbody>
            <tr>
              <td>
                  Логин:
              </td>
              <td>
                  <input type="text" name="login" ref={this.setLogin}/>
              </td>
            </tr>
            <tr>
              <td>
                  Пароль:
              </td>
              <td>
                  <input type="password" name="password" ref={this.setPassword} />
              </td>
            </tr>
            <tr>
              <td>
                  
              </td>
              <td className='submit'>
                  <input type="submit" value="Войти" onClick={this.submit}/>
              </td>
            </tr>                    
            </tbody>            
          </table>
          
        </form>
      </div>
        
      
    );
    
  }
  }

export default withRouter(AdminLoginForm);  