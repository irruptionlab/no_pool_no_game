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

    struct ListNbPlayersPerContest {
        uint idContest;
        uint nbPlayers;
    }

    struct RankPerContest {
        uint idContest;
        uint rank;
    }

    /// @notice Array of scores per player and per contest
    ContestsResult[] private contestsResult;

    mapping(uint => uint) public numberOfPlayersPerContest;

    /// @notice mapping for status of the player for each contest
    mapping(address => mapping(uint => RequestPlaying))
        internal contestPlayerStatus;

    /// @notice Frequence of contests
    uint private gameFrequence;

    uint internal currentIdContest;
    uint private lastContestTimestamp;

    /// @notice Address with rights for recording score (backend)
    address internal recorderAddress;

    constructor() {
        /// @notice initiate the start date for the first contest and the id of the contest
        lastContestTimestamp = block.timestamp;
        currentIdContest = 1;
        //1 week = 604800s ; 1 day = 86400s ; 5 minutes = 300s
        gameFrequence = 3600;
        recorderAddress = 0x000000000000000000000000000000000000dEaD;
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
        require(
            block.timestamp >= lastContestTimestamp + gameFrequence,
            "No contest update!"
        );
        uint currentTimestamp = block.timestamp;
        uint numberNewContests = (currentTimestamp - lastContestTimestamp) /
            gameFrequence;
        currentIdContest += numberNewContests;
        lastContestTimestamp = currentTimestamp;
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

    ///@notice Get a array with number of participants for the last 10 contests
    function getListNbPlayers10LastContests()
        public
        view
        returns (ListNbPlayersPerContest[10] memory)
    {
        ListNbPlayersPerContest[10] memory listNbPlayersPerContest;
        uint j = 0;
        uint indexDecrement;
        if (currentIdContest < 10) {
            indexDecrement = currentIdContest;
        } else {
            indexDecrement = 10;
        }
        for (
            uint i = currentIdContest;
            i > currentIdContest - indexDecrement;
            i--
        ) {
            listNbPlayersPerContest[j] = ListNbPlayersPerContest({
                idContest: i,
                nbPlayers: numberOfPlayersPerContest[i]
            });
            j++;
        }
        return (listNbPlayersPerContest);
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
        /// @notice Find the index of the player in the contest
        /// @notice if no index found, rank=0
        for (uint i = 0; i < contestsResult.length; i++) {
            if (
                _idContest == contestsResult[i].idContest &&
                _player == contestsResult[i].player
            ) {
                playerIndex = i;
                playerScore = contestsResult[i].score;
                break;
            }
            if (i + 1 == contestsResult.length) {
                return (0);
            }
        }

        /// @notice rank the player from his score,
        /// @notice start with rank 1, increment if a better score is found
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

    /// @notice Get the rank of a player for the last 10 contests
    function getLast10ContestsRank(address _player)
        public
        view
        returns (RankPerContest[10] memory)
    {
        RankPerContest[10] memory last10contestsRank;
        uint j = 0;
        uint indexDecrement;
        if (currentIdContest < 10) {
            indexDecrement = currentIdContest;
        } else {
            indexDecrement = 10;
        }
        for (
            uint i = currentIdContest;
            i > currentIdContest - indexDecrement;
            i--
        ) {
            last10contestsRank[j] = RankPerContest({
                idContest: i,
                rank: getContestRank(i, _player)
            });
            j++;
        }
        return (last10contestsRank);
    }
}
