import React, { useRef, useState, useEffect } from 'react'
import YouTube from 'react-youtube';

const SearchMusic = () => {
    const playerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const opts = {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          start: 0
        },
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const paddedSecs = secs < 10 ? `0${secs}` : secs;
        return `${minutes}:${paddedSecs}`;
      }

    const handleReady = (event) => {
        console.log('Player ready');
        setIsReady(true);
        const player = event.target;
        
        // Store player reference
        playerRef.current = player;
        const duration = playerRef.current.getDuration()
        setDuration(duration)
        // console.log(playerRef.current.getCurrentTime())
        
        // Try to play immediately
        try {
            player.playVideo();
            console.log('Started playback');
        } catch (error) {
            console.error('Error starting playback:', error);
        }
    };

    const handleStateChange = (event) => {
        // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
        const player = event.target;
        playerRef.current = player;
        console.log(event.data);
        switch (event.data) {
            case 1: // Playing
                setIsPlaying(true);
                break;
            case 2: // Paused
                setIsPlaying(false);
                break;
            case 0: // Ended
                setIsPlaying(false);
                playSong(mockResults[1])
                break;
            default:
                break;
        }
    };

    const handleError = (event) => {
        console.error('YouTube player error:', event.data);
    };

    const mockResults = [
        { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', artist: 'Rick Astley', duration: '3:33' },
        { id: 'kJQP7kiw5Fk', title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', duration: '4:42' },
        { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
        { id: 'hT_nvWreIhg', title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53' },
        { id: 'JGwWNGJdvx8', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', duration: '3:57' }
    ];

    const playSong = (song) => {
        console.log('Playing song:', song.title);
        setCurrentSong(song);
        
        if (playerRef.current && isReady) {
            try {
                playerRef.current.loadVideoById(song.id);
                playerRef.current.playVideo();
            } catch (error) {
                console.error('Error playing song:', error);
            }
        }
    };

    const togglePlayPause = () => {
        if (playerRef.current && isReady) {
            try {
                if (isPlaying) {
                    playerRef.current.pauseVideo();
                } else {
                    playerRef.current.playVideo();
                }
            } catch (error) {
                console.error('Error toggling play/pause:', error);
            }
        }
    };

    useEffect(() => {
        // Set the first song as current
        if (mockResults.length > 0) {
            setCurrentSong(mockResults[0]);
        }
    }, []);

    useEffect(()=>{
        let interval = null
        if(playerRef?.current && isPlaying){
            interval = setInterval(()=>{
                const time = playerRef.current.getCurrentTime()
                setCurrentTime(time)
            }, 1000)
        }

        return () => clearInterval(interval)
    },[isPlaying])

    // console.log(currentTime)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen overflow-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">YouTube Music Player</h1>
            
            {/* Status indicators */}
            <div className="mb-6 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm mr-2 ${
                    isReady ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                    {isReady ? 'Player Ready' : 'Loading...'}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    isPlaying ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                    {isPlaying ? 'Playing' : 'Paused'}
                </span>
            </div>
            
            {/* Current song display */}
            {currentSong && (
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
                    <h3 className="text-lg">{currentSong.title}</h3>
                    <p className="text-gray-400">{currentSong.artist}</p>
                    <div className='flex flex-row gap-2'>
                        <p className="text-sm text-gray-500 mt-1">{formatTime(currentTime)}</p>
                        <input type='range' min='0' max={duration} value={currentTime} onChange={(e)=>{
                            playerRef?.current?.seekTo(e.target.value, true)
                            setCurrentTime(e.target.value)
                        }} />
                        <p className="text-sm text-gray-500 mt-1">{formatTime(duration)}</p>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={togglePlayPause}
                            disabled={!isReady}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Song list */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Available Songs</h2>
                <div className="space-y-2">
                    {mockResults.map((song) => (
                        <div
                            key={song.id}
                            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                                currentSong?.id === song.id 
                                    ? 'bg-blue-900 border border-blue-600' 
                                    : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                            onClick={() => playSong(song)}
                        >
                            <div>
                                <h3 className="font-medium">{song.title}</h3>
                                <p className="text-gray-400 text-sm">{song.artist}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-400 text-sm">{song.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Hidden YouTube Player */}
            <div className="absolute top-[-9999px] left-[-9999px] w-1 h-1 opacity-0 pointer-events-none">
                <YouTube 
                    onReady={handleReady}
                    onStateChange={handleStateChange}
                    onError={handleError}
                    videoId={currentSong?.id || "dQw4w9WgXcQ"} 
                    opts={opts} 
                    ref={playerRef} 
                />
            </div>
            
            {/* Debug info */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Debug Info:</h3>
                <div className="text-xs text-gray-400 space-y-1">
                    <p>Player Ready: {isReady ? 'Yes' : 'No'}</p>
                    <p>Is Playing: {isPlaying ? 'Yes' : 'No'}</p>
                    <p>Current Video ID: {currentSong?.id || 'None'}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchMusic;