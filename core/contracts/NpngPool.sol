//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title No Pool No Game : Pool Contract
/// @author Perrin GRANDNE
/// @notice
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

    function mint(address sender, uint amount) external;

    function burn(address sender, uint amount) external;
}

/// Only the PoolAave functions we need
interface PoolAave {
    /// Deposit USDC to Aave Pool
    function supply(
        address asset,
        uint amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    /// Withdraw USDC from Aave Pool
    function withdraw(
        address asset,
        uint amount,
        address to
    ) external;
}

contract NpngPool is NpngGame {
    mapping(address => uint) private balanceOfUser;
    mapping(address => uint) private idContestOfDeposit;
    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 private npngToken;
    PoolAave private poolAave;

    constructor() {
        usdcToken = IERC20(0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43);
        aUsdcToken = IERC20(0x1Ee669290939f8a8864497Af3BC83728715265FF);
        poolAave = PoolAave(0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6);
        npngToken = IERC20(0x8ad6d963600F5c45DaBd5fF6faA04d51A6D549f0);
    }

    /// WRITE FUNCTIONS
    function changeNpngTokenAddress(address _newAddress) public onlyOwner {
        npngToken = IERC20(_newAddress);
    }

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
}
