//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title No Pool No Game : Game Contract
/// @author Perrin GRANDNE
/// @notice Contract for Playing Memory Game
/// @custom:experimental This is an experimental contract.

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NpngGame is Pausable, Ownable {
    /// @notice struct for saving results of Player on each contest
    struct ContestsResult {
        uint idContest;
        address player;
        uint score;
    }

    /// @notice struct for recording status of the player
    /// @notice Did he request to play, did he play, did he claimed ?
    struct RequestPlaying {
        bool requested;
        bool played;
        bool claimed;
    }

    /// @notice Array of scores per player and per contest
    ContestsResult[] public contestsResult;

    mapping(uint => uint) public numberOfPlayersPerContest;

    /// @notice mapping for status of the player for each contest
    mapping(address => mapping(uint => RequestPlaying))
        internal contestPlayerStatus;

    /// @notice Frequence of contests
    uint private gameFrequence;

    uint internal currentIdContest;
    uint private lastContestTimestamp;

    /// @notice Address with rights for recording score (backend)
    address private recorderAddress;

    constructor() {
        /// @notice initiate the start date for the first contest and the id of the contest
        lastContestTimestamp = block.timestamp;
        currentIdContest = 1;
        //1 week = 604800s ; 1 day = 86400s ; 5 minutes = 300s
        gameFrequence = 300;
        recorderAddress = address(this);
    }

    /// WRITE FUNCTIONS

    ///Pausable functions
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice update the Id of the contest based on the block.timestamp and the game frequence
    function updateIdContest() internal {
        uint currentTimestamp = block.timestamp;
        uint numberNewContests = (currentTimestamp - lastContestTimestamp) /
            gameFrequence;
        if (numberNewContests > 0) {
            currentIdContest += numberNewContests;
            lastContestTimestamp = currentTimestamp;
        }
    }

    /// @notice Record a request of a player for playing (when you click on Play)
    function requestPlaying() internal {
        require(
            contestPlayerStatus[msg.sender][currentIdContest].requested ==
                false,
            "You already requested"
        );
        require(
            contestPlayerStatus[msg.sender][currentIdContest].played == false,
            "Player already played"
        );
        contestPlayerStatus[msg.sender][currentIdContest].requested = true;
    }

    /// @notice Save the score after the play
    function saveScore(address _player, uint _score) public {
        require(
            msg.sender == recorderAddress,
            "You are not allowed to save a score!"
        );
        require(
            contestPlayerStatus[_player][currentIdContest].requested == true,
            "No request from player"
        );
        require(
            contestPlayerStatus[_player][currentIdContest].played == false,
            "Player already played"
        );
        contestsResult.push(ContestsResult(currentIdContest, _player, _score));
        contestPlayerStatus[_player][currentIdContest].played = true;
        numberOfPlayersPerContest[currentIdContest]++;
    }

    function changeGameFrequence(uint _newFrequence) public onlyOwner {
        gameFrequence = _newFrequence;
    }

    function changeRecorder(address _newRecorderAddress) public onlyOwner {
        recorderAddress = _newRecorderAddress;
    }

    /// READ FUNCTIONS
    function getIdContest() public view returns (uint) {
        return (currentIdContest);
    }

    /// @notice Get all scores from all contests
    function getListScores() public view returns (ContestsResult[] memory) {
        return (contestsResult);
    }

    /// @notice Get the end of the current contest in Timestamp
    function getEndOfContest() public view returns (uint) {
        uint endOfContest = lastContestTimestamp + gameFrequence;
        return (endOfContest);
    }

    /// @notice Get the rank of a player for a specific contest
    function getContestRank(uint _idContest, address _player)
        public
        view
        returns (uint)
    {
        uint playerIndex;
        uint playerScore;
        uint rank = 1;
        for (uint i = 0; i < contestsResult.length; i++) {
            if (
                _idContest == contestsResult[i].idContest &&
                _player == contestsResult[i].player
            ) {
                playerIndex = i;
                playerScore = contestsResult[i].score;
                break;
            }
        }
        for (uint i = 0; i < contestsResult.length; i++) {
            if (
                _idContest == contestsResult[i].idContest &&
                playerScore > contestsResult[i].score
            ) {
                rank++;
            }
        }
        return (rank);
    }
}
