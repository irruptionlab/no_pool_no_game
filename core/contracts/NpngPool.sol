//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title No Pool No Game : Pool Contract
/// @author Perrin GRANDNE
/// @notice Contract for Deposit and Withdraw on the Pool
/// @dev
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

contract NpngPool is NpngGame {
    mapping(address => uint) private balanceOfUser;

    /// @notice Associate the Deposit of user to the current Id Contest
    mapping(address => uint) private idContestOfDeposit;

    /// @notice To record if the player has already played during the current contest
    mapping(address => mapping(uint => bool)) contestPlayedPerPlayer;
    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 private npngToken;
    PoolAave private poolAave;

    constructor() {
        usdcToken = IERC20(0x9aa7fEc87CA69695Dd1f879567CcF49F3ba417E2);
        aUsdcToken = IERC20(0xCdc2854e97798AfDC74BC420BD5060e022D14607);
        poolAave = PoolAave(0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B);
        npngToken = IERC20(0xc6993Fdd6a8fe92f27192b7c8ccD8015b97fac86);
    }

    /// WRITE FUNCTIONS

    /// @notice Update the NPNG Token address if a new contract is deployed
    function changeNpngTokenAddress(address _newAddress) public onlyOwner {
        npngToken = IERC20(_newAddress);
    }

    /// @notice Deposit USDC on Pool which will be deposited on Aave and get the same amount ofNPNGaUSCD
    function depositOnAave(uint _amount) public {
        require(_amount <= usdcToken.balanceOf(msg.sender));
        require(
            _amount <= usdcToken.allowance(msg.sender, address(this)),
            "Insufficient allowed USDC"
        );
        usdcToken.transferFrom(msg.sender, address(this), _amount);
        usdcToken.approve(address(poolAave), _amount);
        poolAave.supply(address(usdcToken), _amount, address(this), 0);
        balanceOfUser[msg.sender] = balanceOfUser[msg.sender] + _amount;
        balanceOfUser[address(this)] = balanceOfUser[address(this)] + _amount;
        npngToken.mint(msg.sender, _amount);
        NpngGame.updateIdContest();
        idContestOfDeposit[msg.sender] = NpngGame.getCurrentIdContest();
    }

    /// @notice Withdraw from the Pool, it will be withdraw from Aave and NPNG Token will be burnt
    function withdraw(uint _amount) public {
        require(balanceOfUser[msg.sender] >= _amount, "Insufficient balance");
        require(
            idContestOfDeposit[msg.sender] <= getCurrentIdContest() + 2,
            "Please wait 2 contests after your deposit to witdraw"
        );
        poolAave.withdraw(address(usdcToken), _amount, address(this));
        usdcToken.transfer(msg.sender, _amount);
        balanceOfUser[msg.sender] = balanceOfUser[msg.sender] - _amount;
        balanceOfUser[address(this)] = balanceOfUser[address(this)] - _amount;
        npngToken.burn(msg.sender, _amount);
    }

    // function claimRewards(uint _idContest) public {
    //     require (calculateRewards(_idContest, msg.sender) > 0,"No reward to claim");
    // }

    /// @notice Record the contest played by the player to verify on played game per contest
    function getPlay() public {
        require(balanceOfUser[msg.sender] > 0, "No deposit, No Game!");
        require(
            contestPlayedPerPlayer[msg.sender][getCurrentIdContest()] != true,
            "You already played!"
        );
        contestPlayedPerPlayer[msg.sender][getCurrentIdContest()] = true;
    }

    /// READ FUNCTIONS
    function getMyBalance(address _account) public view returns (uint) {
        return (balanceOfUser[_account]);
    }

    function interestEarned() public view returns (uint) {
        return (aUsdcToken.balanceOf(address(this)) -
            balanceOfUser[address(this)]);
    }

    function getTotalAmountTopPlayers(uint _idContest)
        public
        view
        returns (uint)
    {
        uint totalAmountTopPlayers = 0;
        ContestsResult[10] memory topPlayers = NpngGame.getTopPlayers(
            _idContest
        );
        for (uint i = 0; i < 10; i++) {
            totalAmountTopPlayers = totalAmountTopPlayers + topPlayers[i].score;
        }
        return (totalAmountTopPlayers);
    }

    function calculateRewards(uint _idContest, address _player)
        public
        view
        returns (uint)
    {
        uint playerRank = NpngGame.checkPlayerRank(_idContest, _player);
        uint playerDeposit = balanceOfUser[_player];
        uint totalAmountTopPlayers = getTotalAmountTopPlayers(_idContest);
        uint playerReward = (playerDeposit / totalAmountTopPlayers) *
            139 *
            (1 - playerRank / 100)**5;
        return (playerReward);
    }

    /// @notice Check if the player already played
    function checkGamePlayed() public view returns (bool) {
        uint idContest = getCurrentIdContest();
        return (contestPlayedPerPlayer[msg.sender][idContest]);
    }
}
