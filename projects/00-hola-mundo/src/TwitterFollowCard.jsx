import { useState } from "react";

export function TwitterFollowCard({formatUserName,userName,name}){
   const [isFollowing, setIsFollowing] = useState(false);
   
   const imageSrc = `https://unavatar.io/${userName}`;
   const text = isFollowing ? 'Siguiendo' : 'Seguir';
   const buttonClassName = isFollowing ? 
   'tw-followCard-button is-following' : 
   'tw-followCard-button';
   const handleClick = () => {
    setIsFollowing(!isFollowing);
   }
   return(
        <article className='tw-followCard'/*style={{display : 'flex', alignItems : 'center', color : '#FFF'}}*/>
            <header className='tw-followCard-header'>
                <img 
                className="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB-fuKwskdqWu_-pMissDd5FS97wDoESR68w&s" 
                alt="{userName}" 
                />
                <div>
                    <strong>{name}</strong>
                    <span>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                </button>
            </aside>

        </article>
    )
}