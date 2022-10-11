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
    /// @notice we record the balance of the Player for the Contest to avoid big deposit after winning
    struct ContestsResult {
        uint idContest;
        address player;
        uint score;
        uint balancePlayer;
    }

    /// @notice struct for recording status of the player
    /// @notice Did he request to play, did he play, did he claimed ?
    struct RequestPlaying {
        bool requested;
        bool played;
        bool claimed;
    }

    struct AccountTable {
        uint idContest;
        uint rank;
        uint participant;
        uint prize;
    }

    /// @notice Array of scores per player and per contest
    ContestsResult[] internal contestsResult;

    mapping(uint => uint) public numberOfPlayersPerContest;

    /// @notice mapping for status of the player for each contest
    mapping(address => mapping(uint => RequestPlaying))
        internal contestPlayerStatus;

    /// @notice Frequence of contests
    uint internal gameFrequence;

    /// @notice balance of total claimed rewards per player
    mapping(address => uint) internal balanceOfClaimedRewards;

    uint internal currentIdContest;
    uint internal lastContestTimestamp;

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

    /// @notice Get the sum of deposit of 10 winners for calculation of rewards distribution
    function getWinnersDeposit() public view returns (uint) {
        uint winnersDeposit = 0;
        for (uint i = 0; i < contestsResult.length; i++) {
            if (
                currentIdContest == contestsResult[i].idContest &&
                getContestRank(currentIdContest, contestsResult[i].player) <= 10
            ) {
                winnersDeposit += contestsResult[i].balancePlayer;
            }
        }
        return (winnersDeposit);
    }

    function getPlayerStatus(address _account, uint _idContest)
        public
        view
        returns (RequestPlaying memory)
    {
        return (contestPlayerStatus[_account][_idContest]);
    }
}
