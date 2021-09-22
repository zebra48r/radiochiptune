import React from 'react';
import axios from 'axios';
import { ShowTrackList } from './ShowTrackList';

export class GetTrackInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  //Вызываем инфу по альбому
  async getTrackList() {

    var config = {
      method: 'get',
      url: 'http://87.249.44.34/api/nowplaying/tiktok_radio',
      headers: {}
    };

    function sec2time(timeInSeconds) {
      var pad = function (num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);

      return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
      // return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
    }

    await axios(config)
      .then(response => {
        console.log(response.data);
        let now_playing = response.data.now_playing;
        let trackname = response.data.now_playing.song.title;
        let albumname = response.data.now_playing.song.album;
        let logo = response.data.now_playing.song.art;
        let artist = response.data.now_playing.song.artist;
        let songid = response.data.now_playing.song.id;
        let fullname = response.data.now_playing.song.text;
        let duration = response.data.now_playing.duration;
        let elapsed = response.data.now_playing.elapsed;
        let played_at = response.data.now_playing.played_at;
        let remaining = response.data.now_playing.remaining;
        let sh_id = response.data.now_playing.sh_id;
        let streamer = response.data.now_playing.streamer;
        let playNextFullName = response.data.playing_next.song.text;
        //convert seconds to HH:mm:ss with sec2time function
        duration = sec2time(duration);
        elapsed = sec2time(elapsed);
        remaining = sec2time(remaining);
        played_at = Date(played_at);
 
        this.setState({
          track: trackname, album: albumname, logo: logo, artist: artist, songid: songid, fullname: fullname, duration: duration, elapsed: elapsed,
          played_at: played_at, remaining: remaining, sh_id: sh_id, streamer: streamer, playNextFullName:playNextFullName
        });
        //console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async componentDidMount() {
    await this.getTrackList();
    this.intervalID = setInterval(() => {
      this.getTrackList();
    }, 1000 * 1);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {

    const traklistinfo = {
      track: this.state.track,
      album: this.state.album,
      logo: this.state.logo,
      artist: this.state.artist,
      songid: this.state.songid,
      fullname: this.state.fullname,
      duration: this.state.duration,
      elapsed: this.state.elapsed,
      played_at: this.state.played_at,
      remaining: this.state.remaining,
      sh_id: this.state.sh_id,
      streamer: this.state.streamer,
      playNextFullName: this.state.playNextFullName
    };
    return (<div><ShowTrackList t={traklistinfo}></ShowTrackList></div>);
  }
}
