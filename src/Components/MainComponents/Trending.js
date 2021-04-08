import React from "react";
import { MyContext } from "../Context/MyContext";
import AddToPlaylist from "../UIComponents/AddToPlaylist";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import update from "../UpdateMethod/update";
import "./trending.css";
const Trending = () => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=trend&maxResults=30&key=AIzaSyDdjWnjXcxnlNVUN7KbS8h35_K8IFtaxbs`;
  const [videoCards, setVideoCards] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const { push } = useHistory();
  React.useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setLoader(!loader);
        setVideoCards(data.items);
      });
  }, []);
  return (
    <MyContext.Consumer>
      {(value) => {
        return (
          <div className="p-5">
            {!loader ? (
              <div className="container p-5 abs">
                <div className="row justify-content-center pr-5">
                  <div className="col-sm-12 text-center">
                    {/* <Loader
                      type="TailSpin"
                      color="Black"
                      height={100}
                      width={100}
                    /> */}
                  </div>
                </div>
              </div>
            ) : null}
            <p className="h5">Trending</p>
            <hr />
            {videoCards
              .filter((i) => i.snippet.title !== i.snippet.channelTitle)
              .map((i, index) => {
                return (
                  <div className="row mb-5" key={index + "srch"}>
                    <div className="col-sm-4">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={i.snippet.thumbnails.high.url}
                          alt=""
                          onClick={() => {
                            update.pushToHistory(value[0].user, i);
                            push("/playvideo/" + i.id.videoId);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-5 mt-2">
                      <b
                        className="videoTitle"
                        onClick={() => {
                          update.pushToHistory(value[0].user, i);
                          push("/playvideo/" + i.id.videoId);
                        }}
                      >
                        {i.snippet.title.split("").slice(0, 30).join("") +
                          "..."}
                      </b>
                      <p className="">
                        {i.snippet.description.split("").slice(0, 50).join("") +
                          "..."}
                      </p>
                      <p className="h6">{i.snippet.channelTitle}</p>
                      <p className="">
                        {"uploaded on " + i.snippet.publishTime.split("T")[0]}
                      </p>
                    </div>
                    <div className="col-sm-2 text-center">
                      <AddToPlaylist video={i} />
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default Trending;
