import {
  useEffect,
  useState
} from "react";
import PlayerCard from "./components/PlayerCard";
import {getRandomNum} from "./utils/getRandomNum.js";
import {getSumOfArray} from "./utils/getSumOfArray.js";
import {useKey} from "./utils/useKey.js";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [numOfChances, setNumOfChances] = useState(10);
  const [leftNums, setLeftNums] = useState([]);
  const [rightNums, setRightNums] = useState([]);
  const [hasRightWon, setHasRightWon] = useState(false);
  const [hasLeftWon, setHasLeftWon] = useState(false);
  
  console.log("app");
  
  useKey("Space", handleSpace);
  useKey("KeyP", handlePlay);
  useKey("KeyS", handleGameReset);
  useKey("KeyR", handleGameReset);
  
  function handleSpace() {
	if (numOfChances > 0 && isPlaying) {
	  setNumOfChances(prevState => {
		setNumOfChances(prevState - 1);
	  });
	  const num = getRandomNum();
	  if (num % 2 === 0)
		setLeftNums(prevState => {
		  setLeftNums([
			...prevState,
			num
		  ]);
		});
	  else
		setRightNums(prevState => {
		  setRightNums([
			...prevState,
			num
		  ]);
		});
	}
  }
  
  useEffect(() => {
	console.log("useEffect");
	if (numOfChances === 0) {
	  const leftSum = getSumOfArray(leftNums);
	  const rightSum = getSumOfArray(rightNums);
	  if (leftSum > rightSum)
		setHasLeftWon(true);
	  else
		setHasRightWon(true);
	}
  }, [numOfChances]);
  
  function handlePlay(e) {
	setIsPlaying(true);
  }
  
  function handleGameReset() {
	setIsPlaying(false);
	setNumOfChances(10);
	setLeftNums([]);
	setRightNums([]);
	setHasRightWon(false);
	setHasLeftWon(false);
  }
  
  return (
	<div className = "App">
	  <h1>Play Room</h1>
	  {
		(
		  numOfChances > 0
		) && isPlaying
		? (
		  <>
			<p>
			  This game has {numOfChances} attempts left.
			</p>
			<p>
			  Hit space to play the next turn.
			</p>
		  </>
		)
		: (
		  <></>
		)
	  }
	  <div className = "game-room">
		<PlayerCard className = "room-left"
					playerType = "Even"
					hasWon = {hasLeftWon}
					nums = {leftNums}
		></PlayerCard>
		<PlayerCard className = "room-right"
					playerType = "Odd"
					hasWon = {hasRightWon}
					nums = {rightNums}
		></PlayerCard>
	  </div>
	  {isPlaying
	   ? (
		 <>
		   {numOfChances > 0
			? (
			  <p>
				Hit S to stop the game.
			  </p>
			)
			: (
			  <p>
				Hit R to reset.
			  </p>
			)}
		 </>
	   )
	   : (
		 <p>
		   Hit P to start the game.
		 </p>
	   )}
	</div>
  );
}

export default App;
