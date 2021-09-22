import React, { useState, useEffect } from 'react';
import Wave from "@foobar404/wave";



export default function AudioPlayer() {
    let [wave] = useState(new Wave());


    useEffect(() => {

        wave.fromElement("player", "playerCanvas", { type: 'dualbars', colors: ['lightpurple','lightgreen','white','red','magenta'] });


        return () => {
        }
    }, []);




    return (
        <div className="AudioPlayer">
            <canvas className="playerCanvas" id="playerCanvas" height={window.innerHeight} width={window.innerWidth}></canvas>
            <audio id="player" src="http://87.249.44.34:8000/radio.mp3" crossOrigin="anonymous" autoPlay></audio>
        </div>
    )
}