import {Profile} from '../../Components/Users'
import React, {useEffect, useState} from "react";
import Header from "../../Components/Header/Header";
import University from "../../Components/Users/University";
import Company from "../../Components/Users/Company";
import apis from "../../Apis";
import {useParams} from 'react-router'

const UsersPage = ({match, user}) => {
  const params = useParams()
  const [profile, setProfile] = useState(null)
  const [me, setMe] = useState(false)

  useEffect(() => {
    if (params.user_id === 'me') {
      apis.user.getMyProfile().then(res => {
        setProfile(res.data);
        setMe(true)
        console.log(res.data);
      })
    } else {
      apis.user.getIdProfile(params.user_id).then(res => {
        setProfile(res.data);
        setMe(false)
        console.log(res.data);
      })
    }
  }, []);

  return (
    <div className="app">
      {profile ?
        (<>
          <Header/>
          <Profile profile={profile} me={me}/>
          <Company profile={profile} me={me}/>
          <University profile={profile} me={me}/>
        </>) : null}
    </div>
  );
}

export default UsersPage