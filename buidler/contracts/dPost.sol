pragma solidity ^0.7.0;

contract dPost {
    
    address public creator;
    mapping (address => bool) adminList;
    mapping (address => bool) userList;
    struct Post {
        address author;
        uint timestamp;
        uint256 mood;
        bool removed;
        string content;
        uint256 numID;
    }
    uint256 public postNum;
    Post[] postList;
    mapping (address => uint) timer;
    
    string internal constant TIME_LOCKED = "You must wait to perform any additional actions.";
    string internal constant NOT_USER = "You are not a user.";
    string internal constant NOT_ADMIN = "You are not an admin.";
    string internal constant ALREADY_ADMIN = "User is already an admin.";
    string internal constant ALREADY_USER = "User is already registered.";
    string internal constant CHARACTER_LIMIT = "Post exceeds 200 character limit.";
    string internal constant POST_NA = "Post does not exist.";
    string internal constant POST_REMOVED = "Post has been removed by an admin.";
    string internal constant REMOVE_ADMIN = "You cannot delete an admin account.";
    string internal constant USER_NA = "User does not exist.";
    
    uint256 internal constant DELAY_1 = 14400;
    uint256 internal constant DELAY_2 = 7200;
    
    event OnboardAdmin(address admin);
    event OnboardUser(address user);
    event NewPost(address author, uint timestamp, string content, uint256 postID);
    event Moody(address moodster, uint256 postID);
    event UserRemoved(address removedUser, address removedBy);
    event PostRemoved(uint256 postID, address removedBy);
    
    constructor () public {
         creator = msg.sender;
         adminList[creator] = true;
         userList[creator] = true;
         emit OnboardAdmin(creator);
    }
    
    function addAdmin(address newAdmin) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(adminList[msg.sender] == true, NOT_ADMIN);
        require(adminList[newAdmin] == false, ALREADY_ADMIN);
        adminList[newAdmin] = true;
        if (!userList[newAdmin]) {
            userList[newAdmin] = true;
        }
        // adds 4 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_2);
        emit OnboardAdmin(newAdmin);
    }
    
    function addUser(address newUser) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(userList[msg.sender] == true, NOT_USER);
        require(userList[newUser] == false, ALREADY_USER);
        userList[newUser] = true;
        // adds 4 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_2);
        emit OnboardUser(newUser);
    }
    
    function addPost(string memory content) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(userList[msg.sender] == true, NOT_USER);
        require(bytes(content).length < 201, CHARACTER_LIMIT);
        postList.push(Post(msg.sender, block.timestamp, 0, false, content, postNum));
        // adds 4 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_2);
        emit NewPost(msg.sender, block.timestamp, content, postNum);
        postNum++;
    }
    
    function postMood(uint256 postID) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(userList[msg.sender] == true, NOT_USER);
        require(postID >= 0 && postID <= postNum, POST_NA);
        require(postList[postID].removed == false, POST_REMOVED);
        postList[postID].mood++;
        // adds 2 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_1);
        emit Moody(msg.sender, postID);
    }
    
    function removeUser(address removedUser) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(adminList[msg.sender] == true, NOT_ADMIN);
        require(adminList[removedUser] == false, REMOVE_ADMIN);
        require(userList[removedUser] == true, USER_NA);
        userList[removedUser] = false;
        // adds 2 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_1);
        emit UserRemoved(removedUser, msg.sender);
    }
    
    function removePost(uint256 postID) public {
        require(block.timestamp > timer[msg.sender], TIME_LOCKED);
        require(adminList[msg.sender] == true, NOT_ADMIN);
        require(postID >= 0 && postID <= postNum, POST_NA);
        require(postList[postID].removed == false, POST_REMOVED);
        postList[postID].removed = true;
        postList[postID].content = POST_REMOVED;
        // adds 2 hour wait period
        timer[msg.sender] = (block.timestamp + DELAY_1);
        emit PostRemoved(postID, msg.sender);
    }
    
    function getPostById(uint256 postID) public view returns(address, uint, uint256, bool, string memory, uint256){
        require(postID >= 0 && postID <= postNum, POST_NA);
        return(postList[postID].author, postList[postID].timestamp, postList[postID].mood, postList[postID].removed, postList[postID].content, postList[postID].numID);
    }
    
    function checkUser(address user) public view returns(bool){
        bool check = false;
        if (userList[user] == true) {
            check = true;
        }
        return check;
    }
    
    function checkAdmin(address admin) public view returns(bool){
        bool check = false;
        if (adminList[admin] == true) {
            check = true;
        }
        return check;
    }
    
     function checkTime(address user) public view returns(uint, uint) {
        require(userList[user] == true, NOT_USER);
        return (block.timestamp, timer[user]);
    }

    function getPostNum() public view returns(uint256) {
        return postNum;
    }
   
}
    