import React from 'react';

//dashboard will show all the events
export default function Dashboard(){
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    return(
        <div>
            hello from dashboard  
        </div>
    )
}