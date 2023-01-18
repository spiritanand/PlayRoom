import React, {memo} from "react";
import {getSumOfArray} from "../utils/getSumOfArray.js";

const PlayerCard = ({
					  className,
					  playerType,
					  hasWon,
					  nums
					}) => {
  
  console.log(className);
  
  return (
	<div className = {`room ${className}`}>
	  <div>
		<p>
		  Player {playerType}
		</p>
		<p>
		  Total Score {getSumOfArray(nums)}
		</p>
	  </div>
	  <ul>
		{nums.map((num, index) => (
		  <li key = {index}>
			{num}
		  </li>
		))}
	  </ul>
	  {
		hasWon &&
		<h1>
		  You Win
		</h1>
	  }
	</div>
  );
};

export default memo(PlayerCard);
