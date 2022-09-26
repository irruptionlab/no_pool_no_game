//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NpngGame is Ownable {
    struct ContestsResult {
        uint idContest;
        address player;
        uint score;
    }

    ContestsResult[] public contestsResult;
    mapping(uint => uint) public numberOfPlayersPerContest;
    uint private contestInit;
    uint private gameFrequence;
    uint private currentIdContest;
    uint private startContestTimestamp;
    uint private lastContestTimestamp;

    constructor() {
        startContestTimestamp = block.timestamp;
        lastContestTimestamp = startContestTimestamp;
        currentIdContest = 1;
        //1 semaine 604800s ; 1 jour = 86400s ; 5 minutes = 300s
        gameFrequence = 86400;
    }

    /// WRITE FUNCTIONS
    function updateIdContest() public {
        uint currentTimestamp = block.timestamp;
        uint numberNewContest = (currentTimestamp - lastContestTimestamp) /
            gameFrequence;
        if (numberNewContest > 0) {
            currentIdContest += numberNewContest;
            lastContestTimestamp = currentTimestamp;
        }
    }

    function changeGameFrequence(uint _newFrequence) public onlyOwner {
        gameFrequence = _newFrequence;
    }

    function saveScore(address player, uint score) public onlyOwner {
        updateIdContest();
        contestsResult.push(ContestsResult(currentIdContest, player, score));
        numberOfPlayersPerContest[currentIdContest] =
            numberOfPlayersPerContest[currentIdContest] +
            1;
    }

    /// READ FUNCTIONS
    function getCurrentIdContest() public view returns (uint) {
        return (currentIdContest);
    }

    function getGameFrequence() public view returns (uint) {
        return (gameFrequence);
    }

    function getScore() public view returns (ContestsResult[] memory) {
        return (contestsResult);
    }

    function getTopPlayers(uint _idContest)
        public
        view
        returns (ContestsResult[10] memory)
    {
        ContestsResult[10] memory topContest;
        for (uint i = 0; i < 10; i++) {
            topContest[i] = ContestsResult(
                _idContest,
                0x000000000000000000000000000000000000dEaD,
                0
            );
        }
        for (uint i = 0; i < 10; i++) {
            ContestsResult memory tempResult = topContest[9];
            for (uint j = 0; j < contestsResult.length; j++) {
                if (
                    contestsResult[j].idContest == _idContest &&
                    contestsResult[j].player != topContest[0].player &&
                    contestsResult[j].player != topContest[1].player &&
                    contestsResult[j].player != topContest[2].player &&
                    contestsResult[j].player != topContest[3].player &&
                    contestsResult[j].player != topContest[4].player &&
                    contestsResult[j].player != topContest[5].player &&
                    contestsResult[j].player != topContest[6].player &&
                    contestsResult[j].player != topContest[7].player &&
                    contestsResult[j].player != topContest[8].player &&
                    contestsResult[j].score > tempResult.score
                ) {
                    tempResult = contestsResult[j];
                }
            }
            topContest[i] = tempResult;
        }
        return (topContest);
    }

    function checkPlayerRank(uint _idContest, address _player)
        public
        view
        returns (uint)
    {
        ContestsResult[10] memory listTopPlayers = getTopPlayers(_idContest);
        uint playerRank = 0;
        for (uint i = 0; i < 10; i++) {
            if (_player == listTopPlayers[i].player) {
                playerRank = i + 1;
                break;
            }
        }
        return (playerRank);
    }
}
