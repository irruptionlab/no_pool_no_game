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
    /// @notice balance of Users in the Pool
    mapping(address => uint) private balanceOfUser;

    /// @notice Global Balance of the Pool
    uint private balanceOfPool;

    /// @notice Record the last Contest of Deposit
    mapping(address => uint) private lastIdContestOfDeposit;

    /// @notice Associate the Deposit of user to the Id Contest User
    /// @notice User address => Id Contest => Deposit
    mapping(address => mapping(uint => uint)) private playerDepositPerContest;

    mapping(uint => uint) private rewardsPerContest;

    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 private npngToken;
    PoolAave private poolAave;

    constructor() {
        usdcToken = IERC20(0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43);
        poolAave = PoolAave(0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6);
        aUsdcToken = IERC20(0x1Ee669290939f8a8864497Af3BC83728715265FF);
        npngToken = IERC20(0x8ad6d963600F5c45DaBd5fF6faA04d51A6D549f0);
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
        balanceOfPool += _amount;
        npngToken.mint(msg.sender, _amount);
        NpngGame.updateIdContest();
        lastIdContestOfDeposit[msg.sender] = NpngGame.currentIdContest;
        playerDepositPerContest[msg.sender][
            NpngGame.currentIdContest
        ] = _amount;
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
        balanceOfPool -= _amount;
        npngToken.burn(msg.sender, _amount);
    }

    /// @notice Record the contest played by the player to verify if he can and save his request
    function getPlay() public {
        require(balanceOfUser[msg.sender] > 0, "No deposit, No Game!");
        NpngGame.updateIdContest();
        NpngGame.requestPlaying();
    }

    /// @notice Claim rewards of a contest and record the claim
    function claimRewards(uint _idContest) public {
        require(
            _idContest < NpngGame.currentIdContest,
            "The contest is not closed"
        );
        require(
            contestPlayerStatus[msg.sender][_idContest].claimed == false,
            "You already claimed"
        );
        uint reward = getRewardsPerPlayer(_idContest, msg.sender);
        balanceOfUser[msg.sender] += reward;
        balanceOfPool += reward;
        contestPlayerStatus[msg.sender][_idContest].claimed = true;
    }

    /// @notice
    function closeContest() public {
        require(
            msg.sender == NpngGame.recorderAddress,
            "You cannot update the Contest"
        );
        uint tempIdContest = currentIdContest;
        NpngGame.updateIdContest();
        if (tempIdContest != currentIdContest) {
            rewardsPerContest[tempIdContest] = interestEarned();
        }
    }

    /// READ FUNCTIONS
    function getMyBalance(address _account) public view returns (uint) {
        return (balanceOfUser[_account]);
    }

    /// @notice Calculate the interest by substracting the Pool balance to the current balance on Aave
    function interestEarned() public view returns (uint) {
        return (aUsdcToken.balanceOf(address(this)) - balanceOfPool);
    }

    /// @notice Calculate the reward per player and contest based on his score
    function getRewardsPerPlayer(uint _idContest, address _player)
        public
        view
        returns (uint)
    {
        uint reward;
        if (
            NpngGame.contestPlayerStatus[msg.sender][_idContest].claimed == true
        ) {
            uint rank = NpngGame.getContestRank(_idContest, _player);
            if (rank <= 10) {
                uint totalReward = rewardsPerContest[_idContest];
                reward = (totalReward *
                    (balanceOfUser[_player] / balanceOfPool) *
                    (1 - ((rank - 1) / 100))**5);
            } else {
                reward = 0;
            }
        } else {
            reward = 0;
        }
        return (reward);
    }
}
