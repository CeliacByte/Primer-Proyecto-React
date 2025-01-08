//Aclarar que se debe exportar
import './App.css';
import {TwitterFollowCard} from './TwitterFollowCard.jsx';
export function Componentes(){
    const formatUserName = (userName => `@${userName}`);
    return (
        <div className='App'>
         <TwitterFollowCard formatUserName={formatUserName}  userName ="Akral" name="Uriel Barrios"/>
         <TwitterFollowCard formatUserName={formatUserName}  userName ="Morgan" name="Serverus Morgan"/>
        </div>
        
    )
}