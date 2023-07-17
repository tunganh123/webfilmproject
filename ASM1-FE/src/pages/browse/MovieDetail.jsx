import React, { forwardRef } from 'react'
import style from "../css/MovieList.module.css"
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import YouTube from 'react-youtube';
// Obj lưu các thuộc tính mặc định để sử dụng cho youtube
const opts = {
    height: '400',
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
};
export const MovieDetail = forwardRef((props, ref) => {
    let urlok = props.detailyoutube.idyoutube ? `https://www.youtube.com/watch?v=${props.detailyoutube.idyoutube}` : "https://image.tmdb.org/t/p/w500" + props.detail.backdrop_path
    const addmovie = () => {
        props.addlistmoviehandler(props.detail)
    }
    return (
        <>
            <div className={style.detail}>
                <div className={style.info}>
                    <h2>{props.detail.original_title}{props.addlistmoviehandler && <FontAwesomeIcon color={props.changecolor} onClick={addmovie} style={{ marginLeft: "1rem" }} icon="fa-solid fa-folder-plus" />}  </h2>
                    <p>Release Date: {props.detail.release_date
                    }</p>
                    <p>Vote: {props.detail.vote_average}/10</p>
                    <p>{props.detail.overview
                    }</p>
                    <div>
                        <FacebookShareButton
                            url={urlok}
                            description={"aiueo"}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={32} round /> Share
                        </FacebookShareButton>
                        <TwitterShareButton style={{ margin: "1rem" }}
                            title={"test"}
                            url={urlok}
                            hashtags={["hashtag1", "hashtag2"]}
                        >
                            <TwitterIcon size={32} round />
                            Share
                        </TwitterShareButton>
                    </div>
                </div>

                <div ref={ref} className={style.clip}>
                    {
                        // Kiểm tra nếu detailyoutube tồn tại idyoutube thì sẽ hiện thị click còn không sẽ hiện thị ảnh backdrops
                        props.detailyoutube.idyoutube ? <YouTube
                            videoId={props.detailyoutube.idyoutube}
                            opts={opts}

                        /> : <img style={{ width: "100%", height: "100%" }} src={"https://image.tmdb.org/t/p/w500" + props.detail.backdrop_path} alt="" />
                    }

                </div>

            </div>
        </>
    )
})
