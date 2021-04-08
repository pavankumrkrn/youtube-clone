import React from "react";
import "./library.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { useHistory } from "react-router";
import { MyContext } from "../Context/MyContext";
import CardComponent from "../CardComponent";
const Library = () => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const { push } = useHistory();
  return (
    <MyContext.Consumer>
      {(value) => {
        const user = value[0].user;
        return (
          <div className="library">
            <div className="p-5">
              <div className="row">
                <div className=" col-lg-9 col-md-9 col-sm-12 content">
                  <p className="h5">
                    <HistoryIcon /> History
                  </p>
                  {user.history?.length ? (
                    <a
                      className="text-primary txt"
                      onClick={() => {
                        push("/history");
                      }}
                    >
                      See-all
                    </a>
                  ) : null}
                  <hr />

                  {user.history?.length ? (
                    <CardComponent items={user.history} />
                  ) : (
                    <>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-12">No Watch History</div>
                        </div>
                      </div>
                    </>
                  )}

                  <hr />
                  <p className="h5">
                    <AccessTimeIcon /> Watch-Later
                  </p>
                  {user?.playlists?.watchlater?.length ? (
                    <a
                      className="text-primary txt"
                      onClick={() => {
                        push("playlist/watchlater");
                      }}
                    >
                      See-all
                    </a>
                  ) : null}
                  <hr />
                  {user?.playlists?.watchlater?.length ? (
                    <CardComponent items={user.playlists.watchlater} />
                  ) : (
                    <>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-12">No Videos Added</div>
                        </div>
                      </div>
                    </>
                  )}
                  <hr />
                  <p className="h5">
                    <PlaylistPlayIcon /> PlayLists
                  </p>
                  <hr />
                  <div className="row">
                    {Object.keys(user.playlists).map((i, index) => {
                      return (
                        <div
                          className="col-lg-3 col-md-3 col-sm-12"
                          key={index}
                          onClick={() => push("/playlist/" + i)}
                        >
                          <div className="card">
                            <img
                              src="https://cdn0.iconfinder.com/data/icons/influencer-solid/48/playlist_video_movie_youtube-512.png"
                              alt=""
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <div className="card-text">
                                <p className="text-center h6">{i}</p>
                                <p className="text-center">
                                  {user.playlists[i].length + " videos"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 rightbar p-5">
                  <AccountCircleIcon className="userIcon" />
                  <p className="h6 text-left mt-5">{user.name}</p>
                  <p className="text-left">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default Library;
