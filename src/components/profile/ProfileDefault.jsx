import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../../apis/AuthContextApi";
import Spinner from "../../pages/Spinner";
import Styles from "./_profile.module.css";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../../apis/firebase";

const ProfileDefault = () => {
  let { authUser } = useContext(AuthContext);
  console.log(authUser);
  let { uid } = authUser === null ? "" : authUser;
  let [profile, setProfile] = useState("");

  let fetchData = useCallback(async () => {
    onSnapshot(doc(db, "users", uid), doc => {
      setProfile(doc.data());
    });
  }, [uid]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className={Styles.mainProfileBlock}>
      {profile === "" ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Profile</h1>
          <article>
            <aside className={Styles.asideIcon}>
              <Link to="/profile/upload-profile-photo">
                <figure>
                  <img
                    src={authUser.photoURL || profile.photoURL}
                    alt={profile.displayName || authUser.displayName}
                  />
                </figure>
                <main>
                  <span className={Styles.cameraIcon}>
                    <FaCamera />
                  </span>
                </main>
              </Link>
            </aside>
            <footer>
              <h1>{profile.displayName}</h1>
              <h4>{profile.email}</h4>
            </footer>
            <aside className={Styles.profileUser}>
              <Fragment>
                <p>
                  <p>Firstname : {profile.firstname} </p>
                  <p>Lastname : {profile.lastname}</p>
                </p>
                <p>{profile.city}</p>
                <p>{profile.gender}</p>
                <p>{profile.address}</p>
              </Fragment>
            </aside>
          </article>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileDefault;
