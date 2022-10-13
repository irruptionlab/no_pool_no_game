//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title No Pool No Game : Pool Contract
/// @author Perrin GRANDNE
/// @notice Contract for Deposit and Withdraw on the Pool
/// @custom:experimental This is an experimental contract.

import {NpngGame} from "./NpngGame.sol";

/// @notice Only the ERC-20 functions we need
interface IERC20 {
    /// @notice Get the balance of aUSDC in No Pool No Game
    /// @notice and balance of USDC from the Player
    function balanceOf(address acount) external view returns (uint);

    /// @notice Approve the deposit of USDC from No Pool No Game to Aave
    function approve(address spender, uint amount) external returns (bool);

    /// @notice Confirm the allowed amount before deposit
    function allowance(address owner, address spender)
        external
        view
        returns (uint);

    /// @notice Withdraw USDC from No Pool No Game
    function transfer(address recipient, uint amount) external returns (bool);

    /// @notice Transfer USDC from User to No Pool No Game
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    /// @notice Mint NPNGaUSDC when user deposits on the pool
    function mint(address sender, uint amount) external;

    /// @notice Burn NPNGaUSDC when user withdraws from the pool
    function burn(address sender, uint amount) external;
}

/// @notice Only the PoolAave functions we need
interface PoolAave {
    /// @notice Deposit USDC to Aave Pool
    function supply(
        address asset,
        uint amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    /// @notice Withdraw USDC from Aave Pool
    function withdraw(
        address asset,
        uint amount,
        address to
    ) external;
}

/// BEGINNING OF THE CONTRACT
contract NpngPool is NpngGame {
    /// @notice struc for savings info of pool states per contest
    struct PoolStatus {
        uint idContest;
        uint endContestPoolValue;
        uint globalPrizePool;
        uint contestRewards;
        uint winnersDeposit;
    }

    struct ContestTable {
        uint rank;
        uint score;
        address player;
        uint prize;
    }

    /// @notice Array of info per contest
    PoolStatus[] private poolStatus;

    /// @notice balance of Users in the Pool
    mapping(address => uint) private balanceOfUser;

    /// @notice Sum of all deposits during the current contest
    uint private currentContestDeposits;

    /// @notice Sum of all witdhraws during the current contest
    uint private currentContestWithdraws;

    /// @notice Record the last Contest of Deposit
    mapping(address => uint) private lastIdContestOfDeposit;

    mapping(uint => uint) private remainedUnclaimedRewardsPerContest;

    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 private npngToken;
    PoolAave private poolAave;

    constructor() {
        usdcToken = IERC20(0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43);
        poolAave = PoolAave(0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6);
        aUsdcToken = IERC20(0x1Ee669290939f8a8864497Af3BC83728715265FF);
        npngToken = IERC20(0x8ad6d963600F5c45DaBd5fF6faA04d51A6D549f0);

        poolStatus.push(
            PoolStatus({
                idContest: 0,
                endContestPoolValue: 0,
                globalPrizePool: 0,
                contestRewards: 0,
                winnersDeposit: 0
            })
        );
    }

    /// WRITE FUNCTIONS

    /// @notice Update the NPNG Token address if a new contract is deployed
    function changeNpngTokenAddress(address _newAddress) public onlyOwner {
        npngToken = IERC20(_newAddress);
    }

    /// @notice Deposit USDC on Pool which will be deposited on Aave and get the same amount ofNPNGaUSCD
    function depositOnAave(uint _amount) public {
        require(
            _amount <= usdcToken.balanceOf(msg.sender),
            "Insufficent amount of USDC"
        );
        require(
            _amount <= usdcToken.allowance(msg.sender, address(this)),
            "Insufficient allowed USDC"
        );
        usdcToken.transferFrom(msg.sender, address(this), _amount);
        usdcToken.approve(address(poolAave), _amount);
        poolAave.supply(address(usdcToken), _amount, address(this), 0);
        balanceOfUser[msg.sender] += _amount;
        currentContestDeposits += _amount;
        npngToken.mint(msg.sender, _amount);
        lastIdContestOfDeposit[msg.sender] = NpngGame.currentIdContest;
    }

    /// @notice Withdraw from the Pool, it will be withdraw from Aave and NPNG Token will be burnt
    function withdraw(uint _amount) public {
        require(balanceOfUser[msg.sender] >= _amount, "Insufficient balance");
        require(
            lastIdContestOfDeposit[msg.sender] + 2 <= NpngGame.currentIdContest,
            "Please wait 2 contests after your deposit to witdraw"
        );
        poolAave.withdraw(address(usdcToken), _amount, address(this));
        usdcToken.transfer(msg.sender, _amount);
        balanceOfUser[msg.sender] -= _amount;
        currentContestWithdraws += _amount;
        npngToken.burn(msg.sender, _amount);
    }

    /// @notice update the Id of the contest based on the block.timestamp and the game frequence
    /// @notice save info about Pool states from the previous id Contest
    function updateContest() public {
        require(
            block.timestamp >=
                NpngGame.lastContestTimestamp + NpngGame.gameFrequence,
            "No contest update!"
        );
        lastContestTimestamp = block.timestamp;
        uint currentAavePoolValue = aUsdcToken.balanceOf(address(this));

        /// @notice TD : Add fees in the table for the contest
        poolStatus.push(
            PoolStatus({
                idContest: currentIdContest,
                endContestPoolValue: poolStatus[currentIdContest - 1]
                    .endContestPoolValue +
                    currentContestDeposits -
                    currentContestWithdraws +
                    poolStatus[currentIdContest - 1].contestRewards,
                globalPrizePool: currentAavePoolValue -
                    (poolStatus[currentIdContest - 1].endContestPoolValue +
                        currentContestDeposits -
                        currentContestWithdraws +
                        poolStatus[currentIdContest - 1].contestRewards),
                contestRewards: getContestRewards(currentIdContest),
                winnersDeposit: getWinnersDeposit()
            })
        );
        currentContestDeposits = 0;
        currentContestWithdraws = 0;
        remainedUnclaimedRewardsPerContest[currentIdContest] = poolStatus[
            currentIdContest
        ].contestRewards;
        currentIdContest++;
        getRemainedUnclaimedRewards();
    }

    /// @notice Record the contest played by the player to verify if he can and save his request
    function getPlay() public {
        require(balanceOfUser[msg.sender] > 0, "No deposit, No Game!");
        NpngGame.requestPlaying();
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
        NpngGame.contestsResult.push(
            ContestsResult(
                currentIdContest,
                _player,
                _score,
                balanceOfUser[_player]
            )
        );
        contestPlayerStatus[_player][currentIdContest].played = true;
        numberOfPlayersPerContest[currentIdContest]++;
    }

    function claim() public {
        uint onClaiming = 0;
        uint reward;
        uint limitContest;
        if (currentIdContest - 60 > 0) {
            limitContest = currentIdContest - 60;
        } else {
            limitContest = 0;
        }
        for (uint i = currentIdContest - 1; i > limitContest; i--) {
            if (contestPlayerStatus[msg.sender][i].claimed == true) {
                break;
            } else {
                reward = getRewardsPerPlayer(i, msg.sender);
                onClaiming += reward;
                remainedUnclaimedRewardsPerContest[i] -= reward;
                contestPlayerStatus[msg.sender][i].claimed = true;
            }
        }
        if (onClaiming > 1) {
            balanceOfUser[msg.sender] += onClaiming;
            balanceOfClaimedRewards[msg.sender] += onClaiming;
            npngToken.mint(msg.sender, onClaiming);
        }
    }

    function getRemainedUnclaimedRewards() internal {
        require(msg.sender == recorderAddress, "You are not allowed to claim!");
        if (currentIdContest - 60 > 0) {
            uint unclaimed = remainedUnclaimedRewardsPerContest[
                currentIdContest - 60
            ];
            balanceOfUser[recorderAddress] += unclaimed;
            npngToken.mint(recorderAddress, unclaimed);
            remainedUnclaimedRewardsPerContest[currentIdContest - 60] = 0;
        }
    }

    /// READ FUNCTIONS
    function getUserBalance(address _account) public view returns (uint) {
        return (balanceOfUser[_account]);
    }

    ///@notice Get all the rewards claimed from a player
    function getTotalClaimedRewards(address _account)
        public
        view
        returns (uint)
    {
        return (balanceOfClaimedRewards[_account]);
    }

    /// @notice Calculate the interest by substracting the Pool balance to the current balance on Aave
    function getGlobalPrizePool() public view returns (uint) {
        uint currentAavePoolValue = aUsdcToken.balanceOf(address(this));
        return (currentAavePoolValue -
            (poolStatus[currentIdContest - 1].endContestPoolValue +
                currentContestDeposits -
                currentContestWithdraws +
                poolStatus[currentIdContest - 1].contestRewards));
    }

    /// @notice Calculate the reward per player and contest based on his score
    function getRewardsPerPlayer(uint _idContest, address _player)
        public
        view
        returns (uint)
    {
        require(
            currentIdContest > _idContest,
            "Not possible on unclosed contest"
        );
        uint reward;
        uint rank = getContestRank(_idContest, _player);
        uint balancePlayer;
        for (uint i = 0; i < contestsResult.length; i++) {
            if (
                contestsResult[i].idContest == _idContest &&
                contestsResult[i].player == _player
            ) {
                balancePlayer = contestsResult[i].balancePlayer;
                break;
            }
        }
        if (rank <= 10) {
            reward = ((poolStatus[_idContest].globalPrizePool *
                ((balancePlayer * 10**6) /
                    poolStatus[_idContest].winnersDeposit) *
                (101 - rank)**5) / 10**16);
        } else {
            reward = 0;
        }
        return (reward);
    }

    function getPoolStatus() public view returns (PoolStatus[] memory) {
        return (poolStatus);
    }

    /// @notice Get the pending rewards of a player. These rewards can be claimed
    function getPendingRewards(address _account) public view returns (uint) {
        uint onClaiming = 0;
        uint limitContest;
        if (currentIdContest - 60 > 0) {
            limitContest = currentIdContest - 60;
        } else {
            limitContest = 0;
        }
        for (uint i = currentIdContest - 1; i > limitContest; i--) {
            if (contestPlayerStatus[_account][i].claimed == true) {
                break;
            } else {
                onClaiming += getRewardsPerPlayer(i, _account);
            }
        }
        return (onClaiming);
    }

    /// @notice table of last 10 contests for a player, used for ranking history in the Page Account
    function getAccountTable(address _player)
        public
        view
        returns (AccountTable[10] memory)
    {
        AccountTable[10] memory accountTable;
        uint indexDecrement;
        uint j = 0;
        uint previousIdContest = currentIdContest - 1;
        if (previousIdContest < 10) {
            indexDecrement = previousIdContest;
        } else {
            indexDecrement = 10;
        }
        for (
            uint i = previousIdContest;
            i > previousIdContest - indexDecrement;
            i--
        ) {
            accountTable[j] = AccountTable({
                idContest: i,
                rank: getContestRank(i, _player),
                participant: numberOfPlayersPerContest[i],
                prize: getRewardsPerPlayer(i, _player)
            });
            j++;
        }
        return (accountTable);
    }

    /// @notice table of top 10 players for a contest, used for modal contest in the Page Account
    function getContestTable(uint _idContest)
        public
        view
        returns (ContestTable[10] memory)
    {
        ContestTable[10] memory contestTable;
        uint rank;
        for (uint i = 0; i < contestsResult.length; i++) {
            if (_idContest == contestsResult[i].idContest) {
                rank = getContestRank(_idContest, contestsResult[i].player);
                if (rank != 0 && rank <= 10) {
                    contestTable[rank - 1] = ContestTable({
                        rank: rank,
                        score: contestsResult[i].score,
                        player: contestsResult[i].player,
                        prize: getRewardsPerPlayer(
                            _idContest,
                            contestsResult[i].player
                        )
                    });
                }
            }
        }
        return (contestTable);
    }

    /// @notice Get the sum of rewards of 10 best playesr for a contest
    function getContestRewards(uint _idContest) public view returns (uint) {
        uint contestRewards;
        ContestTable[10] memory contestTable;
        contestTable = getContestTable(_idContest);
        for (uint i = 0; i < 10; i++) {
            contestRewards += contestTable[i].prize;
        }
        return (contestRewards);
    }
}
